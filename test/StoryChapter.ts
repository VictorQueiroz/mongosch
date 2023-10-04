import { Field } from "../src/schema/Field";
import { defaultFieldTypeModelReference } from "../src/schema/FieldTypeModelReference";
import { defaultFieldTypeString } from "../src/schema/FieldTypeString";
import { Model } from "../src/schema/Model";
import { ContentRef } from "./Content";
import Story from "./Story";
import User from "./User";

export default function StoryChapter() {
  return Model({
    className: "StoryChapter",
    collectionName: "storyChapters",
    fields: [
      Field({
        fieldType: defaultFieldTypeString(),
        name: "name",
        description: "Name of the story chapter"
      }),
      Field({
        fieldType: defaultFieldTypeModelReference({
          model: User()
        }),
        description: "The chapter author id.",
        name: "authorId"
      }),
      Field({
        fieldType: defaultFieldTypeModelReference({
          model: Story()
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
