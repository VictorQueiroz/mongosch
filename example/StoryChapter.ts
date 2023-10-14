import { Field } from "../src/schema/Field";
import { defaultFieldTypeDate } from "../src/schema/FieldTypeDate";
import { defaultFieldTypeModelReference } from "../src/schema/FieldTypeModelReference";
import { defaultFieldTypeString } from "../src/schema/FieldTypeString";
import { Model, ModelIdentity } from "../src/schema/Model";
import { ContentRef } from "./Content";
import Story from "./Story";
import User from "./User";

/**
 * @returns Story chapter model
 */
export default function StoryChapter() {
  return Model({
    identity: ModelIdentity({
      className: "StoryChapter",
      collectionName: "storyChapters"
    }),
    fields: [
      Field({
        fieldType: defaultFieldTypeString(),
        name: "title",
        description: "Title of the story chapter"
      }),
      Field({
        description: "Date when the chapter was last updated",
        fieldType: defaultFieldTypeDate(),
        name: "createdAt"
      }),
      Field({
        fieldType: defaultFieldTypeDate(),
        description: "Date when the chapter was last updated",
        name: "updatedAt"
      }),
      Field({
        fieldType: defaultFieldTypeModelReference({
          model: User().identity
        }),
        description: "The chapter author id.",
        name: "userId"
      }),
      Field({
        fieldType: defaultFieldTypeModelReference({
          model: Story().identity
        }),
        description: "The story id to which this chapter belongs to.",
        name: "storyId"
      }),
      Field({
        fieldType: ContentRef(),
        description: "Initial content id",
        name: "initialContentId"
      })
    ]
  });
}
