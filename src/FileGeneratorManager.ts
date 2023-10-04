import { MemorizerList } from "cachecraft";
import FileGeneratorModel, { getModelClassName } from "./FileGeneratorModel";
import { Model, compareModel } from "./schema/Model";
import Exception from "./Exception";
import CodeStream from "textstreamjs";

export default class FileGeneratorManager {
  readonly #models;
  readonly #fileGenerators: Map<string, FileGeneratorModel> = new Map();
  // TODO: I think this is no longer needed
  readonly #modelMemorizer = new MemorizerList(
    (model: Model) => model,
    compareModel
  );
  public constructor(models: Model[]) {
    this.#models = models.map((m) => this.#modelMemorizer.get(m));
  }
  public resolve(model: Model) {
    const result = this.#fileGenerators.get(model.collectionName);
    if (!result) {
      throw new Exception(
        `Failed to find file generator for model: ${model.className}`
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
      this.#fileGenerators.set(model.collectionName, modelGenerator);
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
      cs.write(`import { ${getModelClassName(m)} } from './${m.className}';\n`);
    }
    cs.write(
      "export class DatabaseClient {\n",
      () => {
        for (const m of this.#models) {
          cs.write(
            `public readonly ${m.className}: ${getModelClassName(m)};\n`
          );
        }
        cs.write(
          `public constructor(db: Db) {\n`,
          () => {
            for (const m of this.#models) {
              cs.write(
                `this.${m.className} = new ${m.className}Model(\n`,
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
    return files;
  }
}
