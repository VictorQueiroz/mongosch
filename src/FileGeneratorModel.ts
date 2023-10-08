import CodeStream from "textstreamjs";
import { Model } from "./schema/Model";
import { FieldType } from "./schema/FieldType";
import { Field } from "./schema/Field";
import { UnionItem } from "./schema/FieldTypeUnion";
import Exception from "./Exception";
import { Event, EventOnCreate, compareEventTrait } from "./schema/Event";

export function getModelClassName(model: Model) {
  return `${model.className}Model`;
}

function upperFirst(value: string) {
  return `${value.substring(0, 1).toUpperCase()}${value.substring(1)}`;
}

function getPopulatedInterfaceName(model: Model) {
  return `I${upperFirst(model.className)}Populated`;
}

function getModelInterfaceName(model: Model) {
  return `I${upperFirst(model.className)}`;
}

function getModelInputInterfaceName(model: Model) {
  return `IInput${upperFirst(model.className)}`;
}

function getValidateFunctionName(model: Model) {
  return `validate${upperFirst(model.className)}`;
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
  return `${model.className}${suffixes.join("")}${lastSuffix}`;
}

function getEnumClassName(model: Model, path: PathItem[]) {
  return joinModelAndPath(model, path, "Type");
}

function hasModelReference(fieldType: FieldType) {
  switch (fieldType._name) {
    case "fieldTypeModelReference.FieldTypeModelReference":
      return true;
    case "fieldTypeObject.FieldTypeObject":
      for (const f of fieldType.properties) {
        if (hasModelReference(f.fieldType)) {
          return true;
        }
      }
      break;
    case "fieldTypeObject.FieldTypeArray":
      return hasModelReference(fieldType.arrayType);
    case "fieldTypeString.FieldTypeString":
    case "fieldTypeInteger.FieldTypeDouble":
    case "fieldTypeInteger.FieldTypeInt64":
    case "fieldTypeInteger.FieldTypeInt32":
    case "fieldTypeDate.FieldTypeDate":
    case "fieldTypeEnum.FieldTypeEnumString":
    case "fieldTypeEnum.FieldTypeEnumInt":
      break;
    case "fieldTypeUnion.FieldTypeUnion":
      for (const f of fieldType.items) {
        if (hasModelReference(f.fieldType)) {
          return true;
        }
      }
      break;
    case "fieldTypeBinary.FieldTypeBinary":
    case "fieldTypeBoolean.FieldTypeBoolean":
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
  readonly #referencedModels = new Set<Model>();
  readonly #pathByFieldTypeMap = new Map<FieldType, PathItem[]>();
  #modelClassArguments = new Array<Model>();
  public constructor({
    parent,
    manager,
    model
  }: {
    parent: CodeStream;
    manager: {
      resolve(value: Model): FileGeneratorModel;
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
  public modelClassArguments(): Array<Readonly<Model>> {
    return this.#modelClassArguments;
  }
  public outRelativePath() {
    return `${this.#model.className}.ts`;
  }
  public preprocess() {
    for (const f of this.#model.fields) {
      const { fieldType } = f;
      this.#populateModelSetFromFieldType(fieldType);
    }
    this.#preprocessFields(
      Array.from(this.#model.fields.values()).map((f) => f.fieldType)
    );
    this.#modelClassArguments = [this.#model, ...this.#referencedModels].reduce(
      (a, b) => {
        for (const i of a) {
          if (i.collectionName === b.collectionName) {
            return a;
          }
        }
        return [...a, b];
      },
      new Array<Model>()
    );
    this.#import({
      path: "mongodb",
      exports: ["Collection", "Filter", "UpdateFilter", "OptionalId"]
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
        const propNames = new Map<string, Model>();
        for (const model of this.#referencedModels) {
          propNames.set(model.collectionName, model);
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
      case "fieldTypeObject.FieldTypeObject":
        for (const prop of fieldType.properties) {
          this.#iterateWithPath(prop.fieldType, [...currentPath, prop], fn);
        }
        break;
      case "fieldTypeObject.FieldTypeArray":
        this.#iterateWithPath(
          fieldType.arrayType,
          [...currentPath, fieldType.arrayType],
          fn
        );
        break;
      case "fieldTypeUnion.FieldTypeUnion":
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
      case "fieldTypeEnum.FieldTypeEnumString":
      case "fieldTypeEnum.FieldTypeEnumInt":
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
      case "fieldTypeObject.FieldTypeObject":
        for (const prop of fieldType.properties) {
          this.#generateEnumClass(prop.fieldType);
        }
        break;
      case "fieldTypeObject.FieldTypeArray":
        this.#generateEnumClass(fieldType.arrayType);
        break;
      case "fieldTypeModelReference.FieldTypeModelReference":
      case "fieldTypeString.FieldTypeString":
      case "fieldTypeInteger.FieldTypeDouble":
      case "fieldTypeInteger.FieldTypeInt64":
      case "fieldTypeInteger.FieldTypeInt32":
      case "fieldTypeDate.FieldTypeDate":
      case "fieldTypeBinary.FieldTypeBinary":
      case "fieldTypeBoolean.FieldTypeBoolean":
        break;
      case "fieldTypeUnion.FieldTypeUnion":
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
      case "fieldTypeEnum.FieldTypeEnumString":
      case "fieldTypeEnum.FieldTypeEnumInt":
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
      case "fieldTypeModelReference.FieldTypeModelReference":
        const fileGenerator = this.#manager.resolve(fieldType.model);
        this.#import({
          fileGenerator,
          exports: [getModelInterfaceName(fieldType.model)]
        });
        this.#referencedModels.add(fieldType.model);
        break;
      case "fieldTypeObject.FieldTypeObject":
        for (const f of fieldType.properties) {
          this.#populateModelSetFromFieldType(f.fieldType);
        }
        break;
      case "fieldTypeObject.FieldTypeArray":
        this.#populateModelSetFromFieldType(fieldType.arrayType);
        break;
      case "fieldTypeUnion.FieldTypeUnion":
        for (const ft of fieldType.items) {
          this.#populateModelSetFromFieldType(ft.fieldType);
        }
        break;
      case "fieldTypeString.FieldTypeString":
      case "fieldTypeInteger.FieldTypeDouble":
      case "fieldTypeInteger.FieldTypeInt64":
      case "fieldTypeInteger.FieldTypeInt32":
      case "fieldTypeDate.FieldTypeDate":
      case "fieldTypeEnum.FieldTypeEnumString":
      case "fieldTypeEnum.FieldTypeEnumInt":
      case "fieldTypeBoolean.FieldTypeBoolean":
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
                  model.collectionName
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
                `return this.${this.#model.collectionName}.${method}(value);\n`
              );
            },
            "}\n"
          );
        }
        for (const method of ["updateOne", "updateMany"]) {
          this.write(
            `public ${method}(filter: Filter<${getModelInterfaceName(
              m
            )}>, update: UpdateFilter<${getModelInterfaceName(
              m
            )}> | Partial<${getModelInterfaceName(m)}>) {\n`,
            () => {
              this.write(
                'if("$set" in update) {\n',
                () => {
                  this.#generateModelDataChangingCode(
                    m.fields,
                    [],
                    EventOnCreate(),
                    'update["$set"]',
                    'update["$set"]'
                  );
                },
                "} else {\n"
              );
              this.indentBlock(() => {
                this.#generateModelDataChangingCode(
                  m.fields,
                  [],
                  EventOnCreate(),
                  "update",
                  "update"
                );
              });
              this.write("}\n");
              this.write(
                `return this.${
                  this.#model.collectionName
                }.${method}(filter, update);\n`
              );
            },
            "}\n"
          );
        }
        for (const method of ["countDocuments"]) {
          this.write(
            `public ${method}() {\n`,
            () => {
              this.write(
                `return this.${this.#model.collectionName}.${method}();\n`
              );
            },
            "}\n"
          );
        }
        if (this.#referencedModels.size) {
          this.#generatePopulateMethod();
        }
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
            // this.write(`let completeValue: ${getModelInterfaceName(m)};\n`);
            // this.#generateModelDataChangingCode(
            //   m.fields,
            //   [],
            //   EventOnCreate(),
            //   "value",
            //   "value"
            // );
            this.write(
              `const result = await this.${
                this.#model.collectionName
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
  #generateModelDataChangingCode(
    fields: ReadonlyArray<Field>,
    path: Field[] = [],
    event: Event,
    value: string,
    spreadObject: string
  ) {
    for (const f of fields) {
      const { fieldType } = f;
      switch (fieldType._name) {
        case "fieldTypeDate.FieldTypeDate":
          this.write(
            `${value} = {\n`,
            () => {
              this.write(`...${spreadObject},\n`);
              for (const flag of fieldType.flags) {
                switch (flag._name) {
                  case "fieldTypeDate.FieldTypeDateFlagUpdateOnEvent":
                    if (!compareEventTrait(event, flag.event)) {
                      continue;
                    }
                    this.write(`${f.name}: new Date()\n`);
                    break;
                  case "fieldTypeDate.FieldTypeDateFlagDefaultValueCurrentDate":
                    this.write(`${f.name}: new Date()\n`);
                    break;
                }
              }
            },
            "}\n"
          );
          break;
        case "fieldTypeObject.FieldTypeObject":
          this.#generateModelDataChangingCode(
            fieldType.properties,
            [...path, f],
            event,
            value,
            spreadObject
          );
          break;
        case "fieldTypeObject.FieldTypeArray":
        case "fieldTypeModelReference.FieldTypeModelReference":
        case "fieldTypeString.FieldTypeString":
        case "fieldTypeInteger.FieldTypeDouble":
        case "fieldTypeInteger.FieldTypeInt64":
        case "fieldTypeInteger.FieldTypeInt32":
        case "fieldTypeEnum.FieldTypeEnumString":
        case "fieldTypeEnum.FieldTypeEnumInt":
        case "fieldTypeUnion.FieldTypeUnion":
        case "fieldTypeBinary.FieldTypeBinary":
        case "fieldTypeBoolean.FieldTypeBoolean":
      }
    }
  }
  #generatePopulateMethod() {
    const m = this.#model;
    const entityNames = Array.from(this.#referencedModels.values()).map(
      (m) => m.className
    );
    this.write(
      `public async populate(value: ${getModelInterfaceName(
        m
      )}, entities: (${entityNames
        .map((name) => `"${name}"`)
        .join(" | ")})[] = [${entityNames
        .map((n) => `"${n}"`)
        .join(", ")}]) {\n`,
      () => {
        this.write(
          `const populated: ${getPopulatedInterfaceName(m)} = {\n`,
          () => {
            for (const m of this.#referencedModels) {
              this.write(`${m.collectionName}: [],\n`);
            }
          },
          "};\n"
        );
        this.write(
          `const ids = {\n`,
          () => {
            for (const m of this.#referencedModels) {
              this.write(`${m.collectionName}: new Array<ObjectId>(),\n`);
            }
          },
          "};\n"
        );
        let depth = 0;
        for (const field of this.#model.fields) {
          depth = this.#generatePopulateExpressions(
            field.fieldType,
            ["value"],
            field.name,
            depth + 1
          );
        }

        this.write(
          "await Promise.all([\n",
          () => {
            for (const m of this.#referencedModels) {
              this.write(
                `(async (list) => populated.${m.collectionName}.push(...(await list)))(entities.includes("${m.className}") ? this.${m.collectionName}.find({\n`,
                () => {
                  this.write(
                    "_id: {\n",
                    () => {
                      this.write(`$in: ids.${m.collectionName}\n`);
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

        this.write("return populated;\n");
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
      case "fieldTypeModelReference.FieldTypeModelReference":
        this.write(
          `ids.${fieldType.model.collectionName}.push(${currentPath.join(
            "."
          )});\n`
        );
        break;
      case "fieldTypeUnion.FieldTypeUnion":
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
      case "fieldTypeObject.FieldTypeObject":
        for (const f of fieldType.properties) {
          depth = this.#generatePopulateExpressions(
            f.fieldType,
            currentPath,
            f.name,
            depth + 1
          );
        }
        break;
      case "fieldTypeObject.FieldTypeArray": {
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
      case "fieldTypeString.FieldTypeString":
      case "fieldTypeInteger.FieldTypeDouble":
      case "fieldTypeInteger.FieldTypeInt64":
      case "fieldTypeInteger.FieldTypeInt32":
      case "fieldTypeDate.FieldTypeDate":
      case "fieldTypeEnum.FieldTypeEnumString":
      case "fieldTypeEnum.FieldTypeEnumInt":
      case "fieldTypeBoolean.FieldTypeBoolean":
    }
    return depth;
  }
  #generateFilterClass() {
    this.write(
      `export class ${this.#model.className}Filter {\n`,
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
      `export function ${getValidateFunctionName(
        m
      )}(value: ${getModelInterfaceName(m)}) {\n`,
      () => {
        for (const f of m.fields) {
          const fieldValueVarName = `value${depth}`;
          this.write(`const ${fieldValueVarName} = value['${f.name}'];\n`);
          depth = this.#generateFieldValidationExpression(
            f.fieldType,
            fieldValueVarName,
            depth + 1
          );
        }
        this.write("return null;\n");
      },
      "}\n"
    );
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
    value: string,
    depth: number
  ) {
    switch (fieldType._name) {
      case "fieldTypeModelReference.FieldTypeModelReference":
        this.#generateValidationIf(
          `${value} instanceof ObjectId`,
          `Expected ${value} to be an instance of ObjectId, but got typeof ${value} instead`
        );
        break;
      case "fieldTypeString.FieldTypeString":
        const isOptional = fieldType.flags.find(
          (f) => f._name === "fieldTypeString.FieldTypeStringFlagOptional"
        );
        if (isOptional) {
          this.#generateValidationIf(
            `typeof ${value} === 'string' || ${value} === null`,
            `Expected ${value} to be a string or null, but got \${typeof ${value}} instead`
          );
        } else {
          this.#generateValidationIf(
            `typeof ${value} === 'string'`,
            `Expected ${value} to be a string, but got \${typeof ${value}} instead`
          );
        }
        if (fieldType.flags.length > 0) {
          this.write(
            `if(${value} !== null) {\n`,
            () => {
              for (const f of fieldType.flags) {
                switch (f._name) {
                  case "fieldTypeString.FieldTypeStringFlagMinLength":
                    this.#generateValidationIf(
                      `${value}.length >= ${f.value}`,
                      `Expected ${value} string to have at least ${f.value} characters`
                    );
                    break;
                  case "fieldTypeString.FieldTypeStringFlagMaxLength":
                    this.#generateValidationIf(
                      `${value}.length <= ${f.value}`,
                      `Expected ${value} string to have up to ${f.value} characters`
                    );
                    break;
                }
              }
            },
            "}\n"
          );
        }
        break;
      case "fieldTypeObject.FieldTypeObject":
        for (const f of fieldType.properties) {
          depth = this.#generateFieldValidationExpression(
            f.fieldType,
            `${value}['${f.name}']`,
            depth + 1
          );
        }
        break;
      case "fieldTypeDate.FieldTypeDate":
        this.#generateValidationIf(
          `${value} instanceof Date`,
          `Expected ${value} to be of type Date, but got "\${typeof ${value}}" instead`
        );
        break;
      case "fieldTypeObject.FieldTypeArray": {
        this.#generateValidationIf(
          `Array.isArray(${value})`,
          `Expected ${value} to be an array, but got "\${typeof ${value}}" instead`
        );
        const arrayItemVarName = `item${depth}`;
        this.write(
          `for(const ${arrayItemVarName} of ${value}) {\n`,
          () => {
            depth = this.#generateFieldValidationExpression(
              fieldType.arrayType,
              arrayItemVarName,
              depth + 1
            );
          },
          "}\n"
        );
        break;
      }
      case "fieldTypeInteger.FieldTypeDouble":
      case "fieldTypeInteger.FieldTypeInt64":
      case "fieldTypeInteger.FieldTypeInt32":
        this.#generateValidationIf(
          `typeof ${value} === 'number'`,
          `Expected ${value} to be number, but got "\${typeof ${value}}" instead`
        );
        break;
      case "fieldTypeBoolean.FieldTypeBoolean":
        this.#generateValidationIf(
          `typeof ${value} === 'boolean'`,
          `Expected ${value} to be boolean, but got "\${typeof ${value}}" instead`
        );
        break;
      case "fieldTypeUnion.FieldTypeUnion":
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
                  `${value}.value`,
                  depth + 1
                );
                this.write("break;\n");
              });
            }
          },
          "}\n"
        );
        break;
      case "fieldTypeBinary.FieldTypeBinary":
        this.#generateValidationIf(
          `${value} instanceof Binary`,
          `Expected ${value} to be an instance of Binary, but got "\${typeof ${value}}" instead`
        );
        break;
      case "fieldTypeEnum.FieldTypeEnumInt":
      case "fieldTypeEnum.FieldTypeEnumString": {
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
                  `error: \`Expected ${value} to be one of ${oneOfStr}\`\n`
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
        //         `error: \`Expected ${value} to be one of ${oneOfStr}\`\n`
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
        case "fieldTypeBinary.FieldTypeBinary":
          this.#import({
            exports: ["Binary"],
            path: "mongodb"
          });
          break;
        case "fieldTypeString.FieldTypeString":
          break;
        case "fieldTypeModelReference.FieldTypeModelReference":
          this.#import({
            path: "mongodb",
            exports: ["ObjectId", "Filter"]
          });
          break;
        case "fieldTypeObject.FieldTypeObject":
          this.#preprocessFields(fieldType.properties.map((f) => f.fieldType));
          break;
        case "fieldTypeObject.FieldTypeArray":
          this.#preprocessFields([fieldType.arrayType]);
          break;
        case "fieldTypeInteger.FieldTypeDouble":
        case "fieldTypeInteger.FieldTypeInt64":
        case "fieldTypeInteger.FieldTypeInt32":
        case "fieldTypeDate.FieldTypeDate":
        case "fieldTypeBoolean.FieldTypeBoolean":
          break;
        case "fieldTypeUnion.FieldTypeUnion":
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
      case "fieldTypeDate.FieldTypeDate":
        let writtenOptionalQuestionMark = false;
        for (const flag of fieldType.flags) {
          switch (flag._name) {
            case "fieldTypeDate.FieldTypeDateFlagDefaultValueCurrentDate":
            case "fieldTypeDate.FieldTypeDateFlagUpdateOnEvent":
              if (writtenOptionalQuestionMark) {
                continue;
              }
              this.append("?");
              writtenOptionalQuestionMark = true;
              break;
          }
        }
        break;
      case "fieldTypeModelReference.FieldTypeModelReference":
      case "fieldTypeString.FieldTypeString":
      case "fieldTypeObject.FieldTypeObject":
      case "fieldTypeObject.FieldTypeArray":
      case "fieldTypeInteger.FieldTypeDouble":
      case "fieldTypeInteger.FieldTypeInt64":
      case "fieldTypeInteger.FieldTypeInt32":
      case "fieldTypeEnum.FieldTypeEnumString":
      case "fieldTypeEnum.FieldTypeEnumInt":
      case "fieldTypeUnion.FieldTypeUnion":
      case "fieldTypeBinary.FieldTypeBinary":
      case "fieldTypeBoolean.FieldTypeBoolean":
        break;
    }
  }
  #generateFieldTypeCode(fieldType: FieldType) {
    switch (fieldType._name) {
      case "fieldTypeBinary.FieldTypeBinary":
        this.append("Binary");
        break;
      case "fieldTypeString.FieldTypeString":
        this.append(`string`);
        break;
      case "fieldTypeModelReference.FieldTypeModelReference":
        this.append(`ObjectId`);
        break;
      case "fieldTypeObject.FieldTypeObject":
        this.append(`{\n`);
        this.indentBlock(() => {
          this.#generateFields({
            fields: fieldType.properties,
            flags: false
          });
        });
        this.write("}");
        break;
      case "fieldTypeObject.FieldTypeArray":
        this.append("ReadonlyArray<");
        this.#generateFieldTypeCode(fieldType.arrayType);
        this.append(">");
        break;
      case "fieldTypeDate.FieldTypeDate":
        this.append("Date");
        break;
      case "fieldTypeInteger.FieldTypeDouble":
      case "fieldTypeInteger.FieldTypeInt64":
      case "fieldTypeInteger.FieldTypeInt32":
        this.append("number");
        break;
      case "fieldTypeBoolean.FieldTypeBoolean":
        this.append("boolean");
        break;
      case "fieldTypeUnion.FieldTypeUnion":
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
      case "fieldTypeEnum.FieldTypeEnumString":
      case "fieldTypeEnum.FieldTypeEnumInt": {
        const fieldTypePath = this.#fieldTypePathOrFailure(fieldType);
        this.append(getEnumClassName(this.#model, fieldTypePath));
        break;
      }
    }
  }
}
