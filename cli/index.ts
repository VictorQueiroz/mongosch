import path from "path";
import fs from "fs";
import assert from "assert";
import { Model, isModel } from "../src/schema/Model";
import { getNamedArgument, getString } from "cli-argument-helper";
import FileGeneratorManager from "../src";

async function getModelsFromInputFile(inputFile: string) {
  const models = new Array<Model>();
  let result: unknown = await import(inputFile);
  if (typeof result === "object" && result !== null && "default" in result) {
    result = result.default;
  }
  assert.strict.ok(Array.isArray(result));
  for (const i of result) {
    let model: unknown;
    if (typeof i === "function") {
      model = i();
    } else {
      model = i;
    }
    if (!isModel(model)) {
      throw new Error(`Invalid return type coming from: ${inputFile}`);
    }
    models.push(model);
  }
  return models;
}

(async () => {
  const args = process.argv.slice(2);

  /**
   * get output directory
   */
  let outDir =
    getNamedArgument(args, "-o", getString) ??
    getNamedArgument(args, "--output", getString);
  assert.strict.ok(outDir !== null);
  outDir = path.resolve(process.cwd(), outDir);

  /**
   * load model definitions
   */
  let inputFile = getNamedArgument(args, "--input", getString);
  assert.strict.ok(inputFile !== null);
  inputFile = path.resolve(process.cwd(), inputFile);
  await fs.promises.access(inputFile, fs.constants.R_OK);
  const models = await getModelsFromInputFile(inputFile);

  const files = new FileGeneratorManager(models).generate();
  try {
    await fs.promises.access(outDir, fs.constants.R_OK | fs.constants.W_OK);
  } catch (reason) {
    await fs.promises.mkdir(outDir, {
      recursive: true
    });
  }
  for (const f of files) {
    assert.strict.ok(!path.isAbsolute(f.path));
    await fs.promises.writeFile(path.resolve(outDir, f.path), f.contents);
  }
})().catch((reason) => {
  process.exitCode = 1;
  console.error(reason);
});
