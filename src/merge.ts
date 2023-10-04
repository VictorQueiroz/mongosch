import { Model } from "./schema/Model";

/**
 * merge model B fields into model A
 */
export default function merge(a: Model, b: Model) {
  return Model({
    ...a,
    fields: [...a.fields, ...b.fields]
  });
}
