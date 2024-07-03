import CodeStream from "textstreamjs";
import { Model, ModelIdentity } from "./schema/Model";
import { FieldType } from "./schema/FieldType";
import { Field, updateField } from "./schema/Field";
import { UnionItem } from "./schema/FieldTypeUnion";
import Exception from "./Exception";
import { Event, EventOnUpdate, compareEventTrait } from "./schema/Event";
import {
  FieldTypeObject,
  updateFieldTypeObject
} from "./schema/FieldTypeObject";
import getModelIdentity from "./getModelIdentity";

interface IGenerateValidationFieldsOptions {
  /**
   * whether or not to generate partial validation, defaults to false
   */
  partial: boolean;
}

export function getModelClassName(model: Model) {
  return `${getModelIdentity(model).className}Model`;
}

function upperFirst(value: string) {
  return `${value.substring(0, 1).toUpperCase()}${value.substring(1)}`;
}

function getPopulatedInterfaceName(model: Model) {
  return `I${upperFirst(getModelIdentity(model).className)}Population`;
}

function getModelInterfaceName(model: ModelIdentity | Model) {
  return `I${upperFirst(getModelIdentity(model).className)}`;
}

function getModelInputInterfaceName(model: Model) {
  return `IInput${upperFirst(getModelIdentity(model).className)}`;
}

function getValidateFunctionName(model: Model) {
  return `validate${upperFirst(getModelIdentity(model).className)}`;
}

function getPartialValidateFunctionName(model: Model) {
  return `partiallyValidate${upperFirst(getModelIdentity(model).className)}`;
}

function getEnumValuesConstantName(model: Model, path: PathItem[]) {
  return joinModelAndPath(model, path, "Values");
}

function joinModelAndPath(model: Model, path: PathItem[], lastSuffix: string) {
  const suffixes = path
    .reduce((a, b) => {
      if ("name" in b) {
        return [...a, b.name];
      }
      return a;
    }, new Array<string>())
    .map((p) => `${p[0].toUpperCase()}${p.slice(1)}`);
  return `${getModelIdentity(model).className}${suffixes.join(
    ""
  )}${lastSuffix}`;
}

function sanitize(value: string) {
  return value.replace(/[^a-zA-Z0-9_$]+/g, "");
}

function getEnumClassName(model: Model, path: PathItem[]) {
  return joinModelAndPath(model, path, "Type");
}

function hasModelReference(fieldType: FieldType) {
  switch (fieldType._name) {
    case "field-type-model-reference.FieldTypeModelReference":
      return true;
    case "field-type-object.FieldTypeObject":
      for (const f of fieldType.properties) {
        if (hasModelReference(f.fieldType)) {
          return true;
        }
      }
      break;
    case "field-type-array.FieldTypeArray":
      return hasModelReference(fieldType.arrayType);
    case "field-type-string.FieldTypeString":
    case "field-type-integer.FieldTypeDouble":
    case "field-type-integer.FieldTypeInt64":
    case "field-type-integer.FieldTypeInt32":
    case "field-type-date.FieldTypeDate":
    case "field-type-enum.FieldTypeEnumString":
    case "field-type-enum.FieldTypeEnumInt":
      break;
    case "field-type-union.FieldTypeUnion":
      for (const f of fieldType.items) {
        if (hasModelReference(f.fieldType)) {
          return true;
        }
      }
      break;
    case "field-type-binary.FieldTypeBinary":
    case "field-type-boolean.FieldTypeBoolean":
  }
  return false;
}

export interface IGenerateFieldsOptions {
  /**
   * whether or not to process flags, defaults to false
   */
  flags: boolean;
  fields: ReadonlyArray<Field>;
}

export interface IFileGeneratorModelImport {
  path: string;
  exports: string[];
}

type PathItem = Field | FieldType | UnionItem;

export default class FileGeneratorModel extends CodeStream {
  readonly #model;
  readonly #manager;
  readonly #imports: IFileGeneratorModelImport[];
  readonly #referencedModels = new Set<ModelIdentity>();
  readonly #pathByFieldTypeMap = new Map<FieldType, PathItem[]>();
  #modelClassArguments = new Array<ModelIdentity>();
  public constructor({
    parent,
    manager,
    model
  }: {
    parent: CodeStream;
    manager: {
      resolve(value: ModelIdentity): FileGeneratorModel;
    };
    model: Model;
  }) {
    super(parent, {
      indentationSize: 2
    });
    this.#manager = manager;
    this.#imports = [];
    this.#model = model;
  }
  public modelClassArguments(): Array<Readonly<ModelIdentity>> {
    return this.#modelClassArguments;
  }
  public outRelativePath() {
    return `${getModelIdentity(this.#model).className}.ts`;
  }
  public preprocess() {
    for (const f of this.#model.fields) {
      const { fieldType } = f;
      this.#populateModelSetFromFieldType(fieldType);
    }
    this.#preprocessFields(
      Array.from(this.#model.fields.values()).map((f) => f.fieldType)
    );
    this.#modelClassArguments = [
      this.#model.identity,
      ...this.#referencedModels
    ].reduce((a, b) => {
      for (const i of a) {
        if (i.collectionName === b.collectionName) {
          return a;
        }
      }
      return [...a, b];
    }, new Array<ModelIdentity>());
    this.#import({
      path: "mongodb",
      exports: [
        "Collection",
        "Filter",
        "UpdateFilter",
        "OptionalId",
        "Document",
        "CountDocumentsOptions"
      ]
    });
    if (this.#referencedModels.size) {
      this.#import({
        path: "mongodb",
        exports: ["ObjectId", "WithId"]
      });
    }
    for (const f of this.#model.fields) {
      this.#iterateWithPath(f.fieldType, [f], (fieldType, path) => {
        this.#pathByFieldTypeMap.set(fieldType, [...path]);
      });
    }
  }
  public generate() {
    const m = this.#model;
    for (const i of this.#imports) {
      this.write(`import {${i.exports.join(", ")}} from '${i.path}';\n`);
    }
    this.write(
      `export interface ${getModelInputInterfaceName(m)} {\n`,
      () => {
        this.#generateFields({
          fields: m.fields,
          flags: true
        });
      },
      "}\n"
    );
    this.write(
      `export interface ${getModelInterfaceName(m)} {\n`,
      () => {
        this.#generateFields({
          fields: m.fields,
          flags: false
        });
      },
      "}\n"
    );
    this.#generateEnumClasses();
    this.write(
      `export interface ${getPopulatedInterfaceName(m)} {\n`,
      () => {
        const propNames = new Map<string, ModelIdentity>();
        for (const model of this.#referencedModels) {
          propNames.set(getModelIdentity(model).collectionName, model);
        }
        for (const [collectionName, model] of propNames) {
          this.write(
            `${collectionName}: WithId<${getModelInterfaceName(model)}>[];\n`
          );
        }
      },
      "}\n"
    );
    this.#generateModelClass();
    this.#generateFilterClass;
    this.#generateValidateFunction();
  }
  #iterateWithPath(
    fieldType: FieldType,
    path: PathItem[],
    fn: (fieldType: FieldType, path: PathItem[]) => void
  ) {
    const currentPath = [...path, fieldType];
    fn(fieldType, path);
    switch (fieldType._name) {
      case "field-type-object.FieldTypeObject":
        for (const prop of fieldType.properties) {
          this.#iterateWithPath(prop.fieldType, [...currentPath, prop], fn);
        }
        break;
      case "field-type-array.FieldTypeArray":
        this.#iterateWithPath(
          fieldType.arrayType,
          [...currentPath, fieldType.arrayType],
          fn
        );
        break;
      case "field-type-union.FieldTypeUnion":
        for (const f of fieldType.items) {
          this.#iterateWithPath(f.fieldType, [...currentPath, f], fn);
        }
        break;
    }
  }
  #generateEnumClasses() {
    for (const f of this.#model.fields) {
      this.#generateEnumClass(f.fieldType);
    }
  }
  #fieldTypePathOrFailure(fieldType: FieldType) {
    const path = this.#pathByFieldTypeMap.get(fieldType);
    if (!path) {
      throw new Exception(
        `Failed to find path for field type: ${fieldType._name}`
      );
    }
    return path;
  }
  #generateEnumClass(fieldType: FieldType) {
    const fieldTypePath = this.#fieldTypePathOrFailure(fieldType);
    switch (fieldType._name) {
      case "field-type-enum.FieldTypeEnumString":
      case "field-type-enum.FieldTypeEnumInt":
        this.write(
          `export const ${getEnumValuesConstantName(
            this.#model,
            fieldTypePath
          )} = [\n`,
          () => {
            for (const i of fieldType.fields) {
              this.write(
                `${typeof i.value === "string" ? `"${i.value}"` : i.value},\n`
              );
            }
          },
          "];\n"
        );
        break;
    }
    switch (fieldType._name) {
      case "field-type-object.FieldTypeObject":
        for (const prop of fieldType.properties) {
          this.#generateEnumClass(prop.fieldType);
        }
        break;
      case "field-type-array.FieldTypeArray":
        this.#generateEnumClass(fieldType.arrayType);
        break;
      case "field-type-model-reference.FieldTypeModelReference":
      case "field-type-string.FieldTypeString":
      case "field-type-integer.FieldTypeDouble":
      case "field-type-integer.FieldTypeInt64":
      case "field-type-integer.FieldTypeInt32":
      case "field-type-date.FieldTypeDate":
      case "field-type-binary.FieldTypeBinary":
      case "field-type-boolean.FieldTypeBoolean":
        break;
      case "field-type-union.FieldTypeUnion":
        this.write(
          `export enum ${getEnumClassName(this.#model, fieldTypePath)} {\n`,
          () => {
            for (const i of fieldType.items) {
              this.write(`${i.name} = ${i.id},\n`);
            }
          },
          "}\n"
        );
        break;
      case "field-type-enum.FieldTypeEnumString":
      case "field-type-enum.FieldTypeEnumInt":
        this.write(
          `export enum ${getEnumClassName(this.#model, fieldTypePath)} {\n`,
          () => {
            for (const i of fieldType.fields) {
              this.write(
                `${i.name} = ${
                  typeof i.value === "string" ? `"${i.value}"` : i.value
                },\n`
              );
            }
          },
          "}\n"
        );
        break;
    }
  }
  #populateModelSetFromFieldType(fieldType: FieldType) {
    switch (fieldType._name) {
      case "field-type-model-reference.FieldTypeModelReference":
        const fileGenerator = this.#manager.resolve(fieldType.model);
        this.#import({
          fileGenerator,
          exports: [getModelInterfaceName(getModelIdentity(fieldType.model))]
        });
        this.#referencedModels.add(getModelIdentity(fieldType.model));
        break;
      case "field-type-object.FieldTypeObject":
        for (const f of fieldType.properties) {
          this.#populateModelSetFromFieldType(f.fieldType);
        }
        break;
      case "field-type-array.FieldTypeArray":
        this.#populateModelSetFromFieldType(fieldType.arrayType);
        break;
      case "field-type-union.FieldTypeUnion":
        for (const ft of fieldType.items) {
          this.#populateModelSetFromFieldType(ft.fieldType);
        }
        break;
      case "field-type-string.FieldTypeString":
      case "field-type-integer.FieldTypeDouble":
      case "field-type-integer.FieldTypeInt64":
      case "field-type-integer.FieldTypeInt32":
      case "field-type-date.FieldTypeDate":
      case "field-type-enum.FieldTypeEnumString":
      case "field-type-enum.FieldTypeEnumInt":
      case "field-type-boolean.FieldTypeBoolean":
    }
  }
  #generateModelClass() {
    const m = this.#model;
    this.write(
      `export class ${getModelClassName(m)} {\n`,
      () => {
        this.write(
          "public constructor(\n",
          () => {
            for (const model of this.#modelClassArguments) {
              this.write(
                `private readonly ${
                  getModelIdentity(model).collectionName
                }: Collection<${getModelInterfaceName(model)}>,\n`
              );
            }
          },
          ") {}\n"
        );
        for (const method of ["find", "findOne", "deleteOne", "deleteMany"]) {
          this.write(
            `public ${method}(value: Filter<${getModelInterfaceName(m)}>) {\n`,
            () => {
              this.write(
                `return this.${
                  getModelIdentity(this.#model).collectionName
                }.${method}(value);\n`
              );
            },
            "}\n"
          );
        }
        for (const method of ["updateOne", "updateMany"]) {
          this.write(
            `public async ${method}(filter: Filter<${getModelInterfaceName(
              m
            )}>, update: UpdateFilter<${getModelInterfaceName(
              m
            )}> | Partial<${getModelInterfaceName(m)}>) {\n`,
            () => {
              this.write(
                'if("$set" in update) {\n',
                () => {
                  this.write(
                    "if(!update['$set']) {\n",
                    () => {
                      this.write("update['$set'] = {};\n");
                    },
                    "}\n"
                  );
                  this.write("let changes = {...update['$set']};\n");
                  for (const f of m.fields) {
                    this.#updateSetAtomicOperatorIfEvent(
                      f.fieldType,
                      ["changes", f.name],
                      EventOnUpdate()
                    );
                  }
                  this.write(`update['$set'] = changes;\n`);
                  this.write(
                    `const validation = ${getPartialValidateFunctionName(
                      m
                    )}(update['$set']);\n`
                  );
                  this.write(
                    `if(validation !== null) {\n`,
                    () => {
                      this.write("return validation;\n");
                    },
                    "}\n"
                  );
                },
                "} else {\n"
              );
              this.indentBlock(() => {
                this.write(
                  `const validation = ${getPartialValidateFunctionName(
                    m
                  )}(update);\n`
                );
                this.write(
                  `if(validation !== null) {\n`,
                  () => {
                    this.write("return validation;\n");
                  },
                  "}\n"
                );
              });
              this.write("}\n");
              this.write(
                `const result = await this.${
                  getModelIdentity(this.#model).collectionName
                }.${method}(filter, update);\n`
              );
              this.write(
                `if(!result.acknowledged) {\n`,
                () => {
                  this.write("return null;\n");
                },
                "}\n"
              );
              this.write("return { success: result };\n");
            },
            "}\n"
          );
        }
        for (const method of ["countDocuments"]) {
          this.write(
            `public ${method}(filter?: Document, options?: CountDocumentsOptions) {\n`,
            () => {
              this.write(
                `return this.${
                  getModelIdentity(this.#model).collectionName
                }.${method}(filter, options);\n`
              );
            },
            "}\n"
          );
        }
        if (this.#referencedModels.size) {
          this.#generatePopulateMethod();
        }
        this.write(
          `public async add(value: OptionalId<${getModelInterfaceName(
            m
          )}>) {\n`,
          () => {
            this.write("const result = await this.insertOne(value);\n");
            this.write(
              `if('error' in result) {\n`,
              () => {
                this.write("return result;\n");
              },
              "}\n"
            );
            this.write(`return this.findOne({_id: result});\n`);
          },
          "}\n"
        );
        this.write(
          `public async insertOne(value: OptionalId<${getModelInterfaceName(
            m
          )}>) {\n`,
          () => {
            this.write(
              `const validationErr = ${getValidateFunctionName(m)}(value);\n`
            );
            this.write(
              `if(validationErr !== null) {\n`,
              () => {
                this.write(`return validationErr;\n`);
              },
              "}\n"
            );
            this.write(
              `const result = await this.${
                getModelIdentity(this.#model).collectionName
              }.insertOne(value, { forceServerObjectId: false });\n`
            );
            this.write(
              "if(!result.acknowledged) {\n",
              () => {
                this.write(
                  "return { error: 'Record creation not acknowledged' };\n"
                );
              },
              "}\n"
            );
            this.write("return result.insertedId;\n");
          },
          "}\n"
        );
      },
      "}\n"
    );
  }
  #updateSetAtomicOperatorIfEvent(
    fieldType: FieldType,
    path: string[],
    currentEvent: Event
  ) {
    switch (fieldType._name) {
      case "field-type-date.FieldTypeDate":
        for (const flag of fieldType.flags) {
          switch (flag._name) {
            case "field-type-date.FieldTypeDateFlagUpdateOnEvent":
              if (currentEvent._name === "event.EventOnUpdate") {
                this.write(`${path.join(".")} = new Date();\n`);
              }
              break;
          }
        }
        break;
      case "field-type-object.FieldTypeObject":
        for (const p of fieldType.properties) {
          this.#updateSetAtomicOperatorIfEvent(
            p.fieldType,
            [...path, p.name],
            currentEvent
          );
        }
        break;
      case "field-type-array.FieldTypeArray":
        this.#updateSetAtomicOperatorIfEvent(
          fieldType.arrayType,
          [...path, "$[]"],
          currentEvent
        );
        break;
      case "field-type-model-reference.FieldTypeModelReference":
      case "field-type-string.FieldTypeString":
      case "field-type-integer.FieldTypeDouble":
      case "field-type-integer.FieldTypeInt64":
      case "field-type-integer.FieldTypeInt32":
      case "field-type-enum.FieldTypeEnumString":
      case "field-type-enum.FieldTypeEnumInt":
      case "field-type-union.FieldTypeUnion":
      case "field-type-binary.FieldTypeBinary":
      case "field-type-boolean.FieldTypeBoolean":
    }
  }
  #generatePopulateMethod() {
    const m = this.#model;
    const entityNames = Array.from(this.#referencedModels.values()).map(
      (m) => getModelIdentity(m).className
    );
    const valueArgumentType = `${getModelInterfaceName(m)}`;
    this.write(
      `public async populate(value: ${valueArgumentType} | ReadonlyArray<${valueArgumentType}>, entities: (${entityNames
        .map((name) => `"${name}"`)
        .join(" | ")})[] = [${entityNames
        .map((n) => `"${n}"`)
        .join(", ")}]) {\n`,
      () => {
        const collectionNames = new Set(
          Array.from(this.#referencedModels.values()).map(
            (m) => getModelIdentity(m).collectionName
          )
        );
        this.write(
          `const population: ${getPopulatedInterfaceName(m)} = {\n`,
          () => {
            for (const collectionName of collectionNames) {
              this.write(`${collectionName}: [],\n`);
            }
          },
          "};\n"
        );
        this.write(
          `const ids = {\n`,
          () => {
            for (const collectionName of collectionNames) {
              this.write(`${collectionName}: new Array<ObjectId>(),\n`);
            }
          },
          "};\n"
        );
        this.write(
          `const entitiesArray = Array.isArray(value) ? value : [value];\n`
        );

        let depth = 0;

        this.write(
          `for(const item of entitiesArray) {\n`,
          () => {
            for (const field of this.#model.fields) {
              depth = this.#generatePopulateExpressions(
                field.fieldType,
                ["item"],
                field.name,
                depth + 1
              );
            }
          },
          "}\n"
        );

        this.write(
          "await Promise.all([\n",
          () => {
            for (const m of this.#referencedModels) {
              this.write(
                `(async (list) => population.${
                  getModelIdentity(m).collectionName
                }.push(...(await list)))(entities.includes("${
                  getModelIdentity(m).className
                }") ? this.${getModelIdentity(m).collectionName}.find({\n`,
                () => {
                  this.write(
                    "_id: {\n",
                    () => {
                      this.write(
                        `$in: ids.${getModelIdentity(m).collectionName}\n`
                      );
                    },
                    "}\n"
                  );
                },
                "}).toArray() : Promise.resolve([])),\n"
              );
            }
          },
          "]);\n"
        );

        this.write("return population;\n");
      },
      "}\n"
    );
  }
  #generatePopulateExpressions(
    fieldType: FieldType,
    previousPath: string[],
    propertyKey: string,
    depth: number
  ) {
    if (!hasModelReference(fieldType)) {
      return depth;
    }
    const currentPath = [...previousPath, propertyKey];
    switch (fieldType._name) {
      case "field-type-model-reference.FieldTypeModelReference": {
        const hasOptionalFlag = fieldType.flags.some(
          (f) =>
            f._name ===
            "field-type-model-reference.FieldTypeModelReferenceFlagOptional"
        );
        const key = currentPath.join(".");
        let optionalValidation = "";
        if (hasOptionalFlag) {
          optionalValidation = `if(${key}) `;
        }
        this.write(
          `${optionalValidation}ids.${fieldType.model.collectionName}.push(${key});\n`
        );
        break;
      }
      case "field-type-union.FieldTypeUnion":
        for (const ft of fieldType.items) {
          this.write(
            `if(${currentPath.join(".")}.id === ${ft.id}) {\n`,
            () => {
              depth = this.#generatePopulateExpressions(
                ft.fieldType,
                currentPath,
                "value",
                depth + 1
              );
            },
            "}\n"
          );
        }
        break;
      case "field-type-object.FieldTypeObject":
        for (const f of fieldType.properties) {
          depth = this.#generatePopulateExpressions(
            f.fieldType,
            currentPath,
            f.name,
            depth + 1
          );
        }
        break;
      case "field-type-array.FieldTypeArray": {
        const itemVarName = `arrayElement_${depth}`;
        this.write(
          `for(const ${itemVarName} of ${currentPath.join(".")}) {\n`,
          () => {
            depth = this.#generatePopulateExpressions(
              fieldType.arrayType,
              [],
              itemVarName,
              depth + 1
            );
          },
          "}\n"
        );
        break;
      }
      case "field-type-string.FieldTypeString":
      case "field-type-integer.FieldTypeDouble":
      case "field-type-integer.FieldTypeInt64":
      case "field-type-integer.FieldTypeInt32":
      case "field-type-date.FieldTypeDate":
      case "field-type-enum.FieldTypeEnumString":
      case "field-type-enum.FieldTypeEnumInt":
      case "field-type-boolean.FieldTypeBoolean":
    }
    return depth;
  }
  #generateFilterClass() {
    this.write(
      `export class ${getModelIdentity(this.#model).className}Filter {\n`,
      () => {
        this.write(
          `readonly #filter: Filter<${getModelClassName(this.#model)}> = {};\n`
        );
        for (const f of this.#model.fields) {
          this.#generateFieldFilterMethod(f);
        }
      },
      "}\n"
    );
  }
  #generateFieldFilterMethod(field: Field) {
    const fieldType = field.fieldType;
    this.write("/**\n");
    this.write(`  * Matches ${field.name} with all exact parameters\n`);
    this.write("  */\n");
    this.write(`public ${field.name}(value: `);
    this.#generateFieldTypeCode(fieldType);
    this.append(") {\n");
    this.indentBlock(() => {
      this.write(`this.#filter['${field.name}'] = value;\n`);
    });
    this.write("}\n");
  }
  #generateValidateFunction() {
    const m = this.#model;
    let depth = 0;
    this.write(
      `export function ${getValidateFunctionName(m)}(value: unknown) {\n`,
      () => {
        depth = this.#generateValidationFields(m, "value", depth, {
          partial: false
        });
        this.write("return null;\n");
      },
      "}\n"
    );
    this.write(
      `export function ${getPartialValidateFunctionName(
        m
      )}(value: unknown) {\n`,
      () => {
        depth = this.#generateValidationFields(m, "value", depth, {
          partial: true
        });
        this.write("return null;\n");
      },
      "}\n"
    );
  }
  #generateValidationFields(
    m: Model | FieldTypeObject,
    value: string,
    depth: number,
    options: IGenerateValidationFieldsOptions
  ) {
    let props: ReadonlyArray<Field>;
    switch (m._name) {
      case "model.Model":
        props = m.fields;
        break;
      case "field-type-object.FieldTypeObject":
        props = m.properties;
        break;
    }
    this.#generateValidationIf(
      `typeof ${value} === 'object' && ${value} !== null`,
      `Expected "${value}" to be an object, but got typeof \${typeof ${value}} instead`
    );
    for (const f of props) {
      const generate = () => {
        depth = this.#generateFieldValidationExpression(
          f.fieldType,
          value,
          `'${f.name}'`,
          depth + 1,
          options
        );
      };
      if (options.partial) {
        this.write(
          `if('${f.name}' in ${value}) {\n`,
          () => {
            generate();
          },
          "}\n"
        );
      } else {
        generate();
      }
    }
    return depth;
  }
  #generateValidationIf(expression: string, error: string) {
    this.write(
      `if(!(${expression})) {\n`,
      () => {
        this.write(
          `return {\n`,
          () => {
            this.write(`error: \`${error}\`\n`);
          },
          "}\n"
        );
      },
      "}\n"
    );
  }
  /**
   * Generate expression to validate the field
   * @param field
   * @param value Variable name
   */
  #generateFieldValidationExpression(
    fieldType: FieldType,
    obj: string,
    key: string,
    depth: number,
    options: IGenerateValidationFieldsOptions
  ) {
    this.#generateValidationIf(
      `${key} in ${obj}`,
      `Expected "${obj}" to have a property named \${${key}}, but only the following properties were found: \${Object.keys(${obj})}`
    );
    const value = `${sanitize(obj)}${upperFirst(sanitize(key))}${depth}`;
    const humanReadableProp = `${obj}.${sanitize(key)}`;
    this.write(`const ${value} = ${obj}[${key}];\n`);
    switch (fieldType._name) {
      case "field-type-model-reference.FieldTypeModelReference":
        this.#generateValidationIf(
          `${value} instanceof ObjectId`,
          `Expected ${humanReadableProp} to be an instance of ObjectId, but got typeof ${value} instead`
        );
        break;
      case "field-type-string.FieldTypeString":
        const isOptional = fieldType.flags.find(
          (f) => f._name === "field-type-string.FieldTypeStringFlagOptional"
        );
        if (isOptional) {
          this.#generateValidationIf(
            `typeof ${value} === 'string' || ${value} === null`,
            `Expected ${humanReadableProp} to be a string or null, but got \${typeof ${value}} instead`
          );
        } else {
          this.#generateValidationIf(
            `typeof ${value} === 'string'`,
            `Expected ${humanReadableProp} to be a string, but got \${typeof ${value}} instead`
          );
        }
        if (fieldType.flags.length > 0) {
          this.write(
            `if(${value} !== null) {\n`,
            () => {
              for (const f of fieldType.flags) {
                switch (f._name) {
                  case "field-type-string.FieldTypeStringFlagMatchRegularExpression":
                    try {
                      new RegExp(f.value);
                    } catch (reason) {
                      throw new Exception(
                        `Failed to parse regular expression ${f.value}: ${reason}`
                      );
                    }
                    this.#generateValidationIf(
                      `${f.value}.test(${value})`,
                      `Expected ${humanReadableProp} to match ${f.value}, but it didn't`
                    );
                    break;
                  case "field-type-string.FieldTypeStringFlagMinLength":
                    this.#generateValidationIf(
                      `${value}.length >= ${f.value}`,
                      `Expected ${humanReadableProp} string to have at least ${f.value} characters`
                    );
                    break;
                  case "field-type-string.FieldTypeStringFlagMaxLength":
                    this.#generateValidationIf(
                      `${value}.length <= ${f.value}`,
                      `Expected ${humanReadableProp} string to have up to ${f.value} characters`
                    );
                    break;
                }
              }
            },
            "}\n"
          );
        }
        break;
      case "field-type-object.FieldTypeObject":
        depth = this.#generateValidationFields(
          fieldType,
          value,
          depth,
          options
        );
        break;
      case "field-type-date.FieldTypeDate":
        this.#generateValidationIf(
          `${value} instanceof Date`,
          `Expected ${humanReadableProp} to be of type Date, but got "\${typeof ${value}}" instead`
        );
        for (const f of fieldType.flags) {
          switch (f._name) {
            case "field-type-date.FieldTypeDateFlagFuture":
              this.#generateValidationIf(
                `${value}.getTime() > new Date().getTime()`,
                `Expected ${humanReadableProp} to be in the future, but it's in the past`
              );
              break;
            case "field-type-date.FieldTypeDateFlagPast":
              this.#generateValidationIf(
                `${value}.getTime() < new Date().getTime()`,
                `Expected ${humanReadableProp} to be in the future, but it's in the past`
              );
              break;
            case "field-type-date.FieldTypeDateFlagDefaultValueCurrentDate":
            case "field-type-date.FieldTypeDateFlagUpdateOnEvent":
          }
        }
        break;
      case "field-type-array.FieldTypeArray": {
        this.#generateValidationIf(
          `Array.isArray(${value})`,
          `Expected ${humanReadableProp} to be an array, but got "\${typeof ${value}}" instead`
        );
        const indexVarName = `index${depth}`;
        this.write(
          `for(let ${indexVarName} = 0; ${indexVarName} < ${value}.length; ${indexVarName}++) {\n`,
          () => {
            depth = this.#generateFieldValidationExpression(
              fieldType.arrayType,
              value,
              indexVarName,
              depth + 1,
              options
            );
          },
          "}\n"
        );
        break;
      }
      case "field-type-integer.FieldTypeDouble":
      case "field-type-integer.FieldTypeInt64":
      case "field-type-integer.FieldTypeInt32":
        this.#generateValidationIf(
          `typeof ${value} === 'number'`,
          `Expected ${humanReadableProp} to be number, but got "\${typeof ${value}}" instead`
        );
        break;
      case "field-type-boolean.FieldTypeBoolean":
        this.#generateValidationIf(
          `typeof ${value} === 'boolean'`,
          `Expected ${humanReadableProp} to be boolean, but got "\${typeof ${value}}" instead`
        );
        break;
      case "field-type-union.FieldTypeUnion":
        this.#generateValidationIf(
          `typeof ${value} === 'object' && ${value} !== null`,
          `Expected ${humanReadableProp} to be an object, but got "\${typeof ${value}}" instead`
        );
        this.#generateValidationIf(
          `'id' in ${value} && typeof ${value}.id === 'number'`,
          `Expected ${humanReadableProp} to have a property named "id", but only the following properties were found: \${Object.keys(${value})}`
        );
        this.write(
          `switch(${value}.id) {\n`,
          () => {
            for (const i of fieldType.items) {
              this.write(
                `case ${getEnumClassName(
                  this.#model,
                  this.#fieldTypePathOrFailure(fieldType)
                )}.${i.name}:\n`
              );
              this.indentBlock(() => {
                depth = this.#generateFieldValidationExpression(
                  i.fieldType,
                  value,
                  `'value'`,
                  depth + 1,
                  options
                );
                this.write("break;\n");
              });
            }
          },
          "}\n"
        );
        break;
      case "field-type-binary.FieldTypeBinary":
        this.#generateValidationIf(
          `${value} instanceof Binary`,
          `Expected ${humanReadableProp} to be an instance of Binary, but got "\${typeof ${value}}" instead`
        );
        break;
      case "field-type-enum.FieldTypeEnumInt":
      case "field-type-enum.FieldTypeEnumString": {
        this.#generateValidationIf(
          `typeof ${value} === '${
            fieldType._name === "field-type-enum.FieldTypeEnumInt"
              ? "number"
              : "string"
          }'`,
          `Expected ${humanReadableProp} to be an array, but got "\${typeof ${value}}" instead`
        );
        const fieldTypePath = this.#pathByFieldTypeMap.get(fieldType);
        if (!fieldTypePath) {
          throw new Exception(
            `Failed to find field type path for field type: ${fieldType._name}`
          );
        }
        this.write(
          `if(!${getEnumValuesConstantName(
            this.#model,
            fieldTypePath
          )}.includes(${value})) {\n`,
          () => {
            let values = fieldType.fields.map((f) => f.value);
            if (fieldType.fields.length > 10) {
              values = [...values.slice(0, 10), "..."];
            }
            const oneOfStr = values
              .map((i) => (typeof i === "string" ? `"${i}"` : i))
              .join(", ");
            this.write(
              "return {\n",
              () => {
                this.write(
                  `error: \`Expected ${humanReadableProp} to be one of ${oneOfStr}\`\n`
                );
              },
              "};\n"
            );
          },
          "}\n"
        );
        // this.write(
        //   "if(\n",
        //   () => {
        //     for (const i of fieldType.fields) {
        //       this.write(
        //         `${value} === ${
        //           typeof i.value === "string" ? `"${i.value}"` : i.value
        //         } || \n`
        //       );
        //     }
        //     this.write("false\n");
        //   },
        //   ") {\n"
        // );
        // this.indentBlock(() => {
        //   this.write(
        //     `return {\n`,
        //     () => {
        //       let values = fieldType.fields.map((f) => f.value);
        //       if (fieldType.fields.length > 10) {
        //         values = [...values.slice(0, 10), "..."];
        //       }
        //       const oneOfStr = values
        //         .map((i) => (typeof i === "string" ? `"${i}"` : i))
        //         .join(", ");
        //       this.write(
        //         `error: \`Expected ${humanReadableProp} to be one of ${oneOfStr}\`\n`
        //       );
        //     },
        //     "}\n"
        //   );
        // });
        // this.write("}\n");
        break;
      }
    }
    return depth;
  }
  #import(
    value:
      | IFileGeneratorModelImport
      | {
          fileGenerator: FileGeneratorModel;
          exports: string[];
        }
  ) {
    let finalImport: IFileGeneratorModelImport;
    if ("fileGenerator" in value) {
      if (value.fileGenerator === this) {
        return;
      }
      finalImport = {
        exports: value.exports,
        path: `./${value.fileGenerator.outRelativePath().replace(/\.ts$/, "")}`
      };
    } else {
      finalImport = value;
    }
    const existing = this.#imports.find((i) => i.path === finalImport.path);
    if (existing) {
      for (const e of finalImport.exports) {
        if (!existing.exports.includes(e)) {
          existing.exports.push(e);
        }
      }
      return;
    }
    this.#imports.push(finalImport);
  }
  #preprocessFields(fieldTypes: ReadonlyArray<FieldType>) {
    for (const fieldType of fieldTypes) {
      switch (fieldType._name) {
        case "field-type-binary.FieldTypeBinary":
          this.#import({
            exports: ["Binary"],
            path: "mongodb"
          });
          break;
        case "field-type-string.FieldTypeString":
          break;
        case "field-type-model-reference.FieldTypeModelReference":
          this.#import({
            path: "mongodb",
            exports: ["ObjectId", "Filter"]
          });
          break;
        case "field-type-object.FieldTypeObject":
          this.#preprocessFields(fieldType.properties.map((f) => f.fieldType));
          break;
        case "field-type-array.FieldTypeArray":
          this.#preprocessFields([fieldType.arrayType]);
          break;
        case "field-type-integer.FieldTypeDouble":
        case "field-type-integer.FieldTypeInt64":
        case "field-type-integer.FieldTypeInt32":
        case "field-type-date.FieldTypeDate":
        case "field-type-boolean.FieldTypeBoolean":
          break;
        case "field-type-union.FieldTypeUnion":
          this.#preprocessFields(fieldType.items.map((i) => i.fieldType));
      }
    }
  }
  #generateFields({ fields, flags = false }: IGenerateFieldsOptions) {
    for (const f of fields) {
      this.write("/**\n");
      this.write(` * ${f.description}\n`);
      this.write(" */\n");
      this.write(`${f.name}`);
      if (flags) {
        this.#generateAfterFieldNameCode(f);
      }
      this.append(": ");
      this.#generateFieldTypeCode(f.fieldType);
      this.append(";\n");
    }
  }
  #generateAfterFieldNameCode(f: Field) {
    const { fieldType } = f;
    switch (fieldType._name) {
      case "field-type-date.FieldTypeDate":
        let writtenOptionalQuestionMark = false;
        for (const flag of fieldType.flags) {
          switch (flag._name) {
            case "field-type-date.FieldTypeDateFlagDefaultValueCurrentDate":
            case "field-type-date.FieldTypeDateFlagUpdateOnEvent":
              if (writtenOptionalQuestionMark) {
                continue;
              }
              this.append("?");
              writtenOptionalQuestionMark = true;
              break;
          }
        }
        break;
      case "field-type-model-reference.FieldTypeModelReference":
      case "field-type-string.FieldTypeString":
      case "field-type-object.FieldTypeObject":
      case "field-type-array.FieldTypeArray":
      case "field-type-integer.FieldTypeDouble":
      case "field-type-integer.FieldTypeInt64":
      case "field-type-integer.FieldTypeInt32":
      case "field-type-enum.FieldTypeEnumString":
      case "field-type-enum.FieldTypeEnumInt":
      case "field-type-union.FieldTypeUnion":
      case "field-type-binary.FieldTypeBinary":
      case "field-type-boolean.FieldTypeBoolean":
        break;
    }
  }
  #generateFieldTypeCode(fieldType: FieldType) {
    switch (fieldType._name) {
      case "field-type-binary.FieldTypeBinary":
        this.append("Binary");
        break;
      case "field-type-string.FieldTypeString":
        this.append(`string`);
        break;
      case "field-type-model-reference.FieldTypeModelReference":
        this.append(`ObjectId`);
        break;
      case "field-type-object.FieldTypeObject":
        this.append(`{\n`);
        this.indentBlock(() => {
          this.#generateFields({
            fields: fieldType.properties,
            flags: false
          });
        });
        this.write("}");
        break;
      case "field-type-array.FieldTypeArray":
        this.append("ReadonlyArray<");
        this.#generateFieldTypeCode(fieldType.arrayType);
        this.append(">");
        break;
      case "field-type-date.FieldTypeDate":
        this.append("Date");
        break;
      case "field-type-integer.FieldTypeDouble":
      case "field-type-integer.FieldTypeInt64":
      case "field-type-integer.FieldTypeInt32":
        this.append("number");
        break;
      case "field-type-boolean.FieldTypeBoolean":
        this.append("boolean");
        break;
      case "field-type-union.FieldTypeUnion":
        const unionEnumType = getEnumClassName(
          this.#model,
          this.#fieldTypePathOrFailure(fieldType)
        );
        for (const i of fieldType.items) {
          this.append("{\n");
          this.indentBlock(() => {
            this.write(`id: ${unionEnumType}.${i.name};\n`);
            this.write(`value: `);
            this.#generateFieldTypeCode(i.fieldType);
            this.append(";\n");
          });
          this.write("}");
          if (i !== fieldType.items[fieldType.items.length - 1]) {
            this.append(" | ");
          }
        }
        break;
      case "field-type-enum.FieldTypeEnumString":
      case "field-type-enum.FieldTypeEnumInt": {
        const fieldTypePath = this.#fieldTypePathOrFailure(fieldType);
        this.append(getEnumClassName(this.#model, fieldTypePath));
        break;
      }
    }
  }
}
