import FileGeneratorModel, { getModelClassName } from "./FileGeneratorModel";
import { Model, ModelIdentity } from "./schema/Model";
import Exception from "./Exception";
import CodeStream from "textstreamjs";
import getModelIdentity from "./getModelIdentity";
import assert from "assert";

export default class FileGeneratorManager {
  readonly #models;
  readonly #fileGenerators: Map<string, FileGeneratorModel> = new Map();
  public constructor(models: Model[]) {
    this.#models = models;
  }
  public resolve(model: ModelIdentity | Model) {
    const identity = getModelIdentity(model);
    const result = this.#fileGenerators.get(identity.collectionName);
    if (!result) {
      throw new Exception(
        `Failed to find file generator for model: ${identity.className}`
      );
    }
    return result;
  }
  public generate() {
    const cs = new CodeStream(undefined, {
      indentationSize: 2
    });
    const files = new Array<{
      path: string;
      contents: string;
    }>();
    for (const model of this.#models) {
      const modelGenerator = new FileGeneratorModel({
        parent: cs,
        model,
        manager: this
      });
      assert.strict.ok(
        model.identity.className.length > 0 &&
          model.identity.collectionName.length > 0,
        `Model identity should have collectionName, and className properties with at least 1 character: ${JSON.stringify(
          model,
          null,
          4
        )}`
      );
      this.#fileGenerators.set(model.identity.collectionName, modelGenerator);
    }
    for (const modelGenerator of this.#fileGenerators.values()) {
      modelGenerator.preprocess();
    }
    for (const modelGenerator of this.#fileGenerators.values()) {
      modelGenerator.generate();
      files.push({
        path: modelGenerator.outRelativePath(),
        contents: modelGenerator.value()
      });
    }
    cs.write("import { Db } from 'mongodb';\n");
    for (const m of this.#models) {
      cs.write(
        `import { ${getModelClassName(m)} } from './${m.identity.className}';\n`
      );
    }
    cs.write(
      "export class DatabaseClient {\n",
      () => {
        for (const m of this.#models) {
          cs.write(
            `public readonly ${m.identity.className}: ${getModelClassName(
              m
            )};\n`
          );
        }
        cs.write(
          `public constructor(db: Db) {\n`,
          () => {
            for (const m of this.#models) {
              cs.write(
                `this.${m.identity.className} = new ${m.identity.className}Model(\n`,
                () => {
                  const constructorArguments =
                    this.resolve(m).modelClassArguments();
                  for (const model of constructorArguments) {
                    cs.write(`db.collection('${model.collectionName}')`);
                    if (
                      model !==
                      constructorArguments[constructorArguments.length - 1]
                    ) {
                      cs.append(",");
                    }
                    cs.append("\n");
                  }
                },
                ")\n"
              );
            }
          },
          "}\n"
        );
      },
      "}\n"
    );
    files.push({
      path: "DatabaseClient.ts",
      contents: cs.value()
    });
    cs.write(`export { DatabaseClient } from "./DatabaseClient";\n`);
    files.push({
      path: "index.ts",
      contents: cs.value()
    });
    return files;
  }
}
