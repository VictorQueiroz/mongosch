import { Field } from "../src/schema/Field";
import {
  FieldTypeIntegerFlagMin,
  defaultFieldTypeInt32
} from "../src/schema/FieldTypeInteger";
import { FieldTypeObject } from "../src/schema/FieldTypeObject";
import { defaultFieldTypeString } from "../src/schema/FieldTypeString";
import { Model } from "../src/schema/Model";
import mergeFields from "../src/mergeFields";
import ContentBase from "./Content";
import {
  FieldTypeArray,
  defaultFieldTypeArray
} from "../src/schema/FieldTypeArray";

const Sentence = FieldTypeObject({
  name: "Sentence",
  properties: [
    Field({
      description: "Sentence.",
      name: "value",
      fieldType: defaultFieldTypeString()
    }),
    Field({
      name: "duration",
      description:
        "How long is the sentence gonna take to be finally rendered.",
      fieldType: defaultFieldTypeInt32({
        flags: [
          FieldTypeIntegerFlagMin({
            value: 1
          })
        ]
      })
    })
  ]
});

const Paragraph = FieldTypeObject({
  name: "Paragraph",
  properties: [
    Field({
      name: "sentences",
      description: "Paragraph sentences.",
      fieldType: defaultFieldTypeArray({
        arrayType: Sentence
      })
    })
  ]
});

export function ContentParagraphBase() {
  return Model({
    className: "ContentParagraph",
    collectionName: "contentParagraphs",
    fields: [
      Field({
        description: "Paragraph list",
        name: "paragraphs",
        fieldType: FieldTypeArray({
          flags: [],
          name: "Paragraphs",
          arrayType: Paragraph
        })
      })
    ]
  });
}

export default function ContentParagraph() {
  return mergeFields(ContentParagraphBase(), ContentBase());
}
