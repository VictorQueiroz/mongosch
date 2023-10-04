import CodeStream from "textstreamjs";
import { Model } from "./schema/Model";
import { FieldType } from "./schema/FieldType";
import { Field } from "./schema/Field";

export function getModelClassName(model: Model) {
  return `${model.className}Model`;
}

function getPopulatedInterfaceName(model: Model) {
  return `I${model.className}Populated`;
}

function getModelInterfaceName(model: Model) {
  return `I${model.className}`;
}

function getValidateFunctionName(model: Model) {
  return `validate${model.className}`;
}

export interface IFileGeneratorModelImport {
  path: string;
  exports: string[];
}

export default class FileGeneratorModel extends CodeStream {
  readonly #model;
  readonly #manager;
  readonly #imports: IFileGeneratorModelImport[];
  readonly #referencedModels = new Set<Model>();
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
      exports: ["Collection", "Filter"]
    });
    if (this.#referencedModels.size) {
      this.#import({
        path: "mongodb",
        exports: ["ObjectId"]
      });
    }
  }
  public generate() {
    const m = this.#model;
    for (const i of this.#imports) {
      this.write(`import {${i.exports.join(", ")}} from '${i.path}';\n`);
    }
    this.write(
      `export interface ${getModelInterfaceName(m)} {\n`,
      () => {
        this.#generateFields(m.fields);
      },
      "}\n"
    );
    this.write(
      `export interface ${getPopulatedInterfaceName(m)} {\n`,
      () => {
        const propNames = new Map<string, Model>();
        for (const model of this.#referencedModels) {
          propNames.set(model.collectionName, model);
        }
        for (const [collectionName, model] of propNames) {
          this.write(`${collectionName}: ${getModelInterfaceName(model)}[];\n`);
        }
      },
      "}\n"
    );
    this.#generateModelClass();
    this.#generateFilterClass();
    this.#generateValidateFunction();
  }
  #populateModelSetFromFieldType(fieldType: FieldType) {
    switch (fieldType._name) {
      case "fieldTypeModelReference.FieldTypeModelReference":
        const fileGenerator = this.#manager.resolve(fieldType.model);
        this.#import({
          fileGenerator,
          exports: [
            getModelInterfaceName(fieldType.model)
            // getModelClassName(fieldType.model)
          ]
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
        for (const method of ["find", "findOne"]) {
          this.write(
            `public async ${method}(value: Filter<${getModelInterfaceName(
              m
            )}>) {\n`,
            () => {
              this.write(
                `return this.${this.#model.collectionName}.${method}(value);\n`
              );
            },
            "}\n"
          );
        }
        if (this.#referencedModels.size) {
          this.#generatePopulateMethod();
        }
        this.write(
          `public async insert(value: ${getModelInterfaceName(m)}) {\n`,
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
                this.#model.collectionName
              }.insertOne(value, { forceServerObjectId: false });\n`
            );
            this.write(
              "if(!result.acknowledged) {\n",
              () => {
                this.write("return null;\n");
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
  #generateFields(fields: ReadonlyArray<Field>) {
    for (const f of fields) {
      this.write(`${f.name}: `);
      this.#generateFieldTypeCode(f.fieldType);
      this.append(";\n");
    }
  }
  #generateFieldTypeCode(fieldType: FieldType) {
    switch (fieldType._name) {
      case "fieldTypeString.FieldTypeString":
        this.append(`string`);
        break;
      case "fieldTypeModelReference.FieldTypeModelReference":
        this.append(`ObjectId`);
        break;
      case "fieldTypeObject.FieldTypeObject":
        this.append(`{\n`);
        this.indentBlock(() => {
          this.#generateFields(fieldType.properties);
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
        for (const i of fieldType.items) {
          this.append("{\n");
          this.indentBlock(() => {
            this.write(`id: ${i.id};\n`);
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
      case 'fieldTypeEnum.FieldTypeEnumString':
      case 'fieldTypeEnum.FieldTypeEnumInt': {
        for (const i of fieldType.fields) {
          switch(fieldType._name) {
            case "fieldTypeEnum.FieldTypeEnumString":
              this.append(`"${i.value}"`);
              break;
            case "fieldTypeEnum.FieldTypeEnumInt":
              this.append(`${i.value}`);
          }
          if (i !== fieldType.fields[fieldType.fields.length - 1]) {
            this.append(" | ");
          }
        }
        break;
      }
    }
  }
}
