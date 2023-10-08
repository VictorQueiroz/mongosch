import { Model } from "./schema/Model";

/**
 * merge model B fields into model A
 */
export default function mergeFields(a: Model, b: Model) {
  return Model({
    ...a,
    fields: [...a.fields, ...b.fields]
  });
}
