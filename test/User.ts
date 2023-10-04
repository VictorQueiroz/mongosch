import { Field } from "../src/schema/Field";
import { defaultFieldTypeString } from "../src/schema/FieldTypeString";
import { Model } from "../src/schema/Model";

export default function User() {
  return Model({
    className: "User",
    collectionName: "users",
    fields: [
      Field({
        description: "User name",
        fieldType: defaultFieldTypeString(),
        name: "name"
      })
    ]
  });
}
