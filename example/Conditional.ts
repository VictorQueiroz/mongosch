import { Field } from "../src/schema/Field";
import { FieldType } from "../src/schema/FieldType";
import { FieldTypeObject } from "../src/schema/FieldTypeObject";
import Script from "./Script";

export function Conditional<T extends FieldType>(fieldType: T) {
  return FieldTypeObject({
    name: 'Conditional',
    properties: [
      Field({
        name: "condition",
        description: "Condition to be evaluated.",
        fieldType: Script
      }),
      Field({
        name: "value",
        description: "Actual value of the conditional template.",
        fieldType
      })
    ]
  });
}
