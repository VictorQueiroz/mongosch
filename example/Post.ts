import { Field } from "../src/schema/Field";
import { defaultFieldTypeDate } from "../src/schema/FieldTypeDate";
import { defaultFieldTypeModelReference } from "../src/schema/FieldTypeModelReference";
import { defaultFieldTypeString } from "../src/schema/FieldTypeString";
import { Model, ModelIdentity } from "../src/schema/Model";
import User from "./User";

export default Model({
  identity: ModelIdentity({
    collectionName: "posts",
    className: "Post"
  }),
  fields: [
    Field({
      fieldType: defaultFieldTypeString(),
      name: "title",
      description: "Post title."
    }),
    Field({
      description: "User that authored the post.",
      name: "authorId",
      fieldType: defaultFieldTypeModelReference({
        model: User().identity
      })
    }),
    Field({
      name: "createdAt",
      description: "Date when the post was created",
      fieldType: defaultFieldTypeDate()
    })
  ]
});
