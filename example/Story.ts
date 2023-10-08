import { Field } from "../src/schema/Field";
import { defaultFieldTypeModelReference } from "../src/schema/FieldTypeModelReference";
import { defaultFieldTypeString } from "../src/schema/FieldTypeString";
import { Model } from "../src/schema/Model";
import User from "./User";

export default function Story() {
  return Model({
    className: "Story",
    collectionName: "stories",
    fields: [
      Field({
        description: "Story name",
        fieldType: defaultFieldTypeString(),
        name: "name"
      }),
      Field({
        description: "The person who created the story.",
        fieldType: defaultFieldTypeModelReference({
          model: User()
        }),
        name: "authorId"
      })
    ]
  });
}
