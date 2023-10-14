import mergeFields from "../src/mergeFields";
import { Field } from "../src/schema/Field";
import {
  FieldTypeArray,
  defaultFieldTypeArray
} from "../src/schema/FieldTypeArray";
import { FieldTypeObject } from "../src/schema/FieldTypeObject";
import { defaultFieldTypeString } from "../src/schema/FieldTypeString";
import { Model, ModelIdentity } from "../src/schema/Model";
import ContentBase from "./Content";
import Script from "./Script";

function Button() {
  return FieldTypeObject({
    name: "Button",
    properties: [
      Field({
        name: "condition",
        fieldType: Script,
        description:
          "Condition that will defined whether this button row will be rendered or not."
      }),
      Field({
        name: "title",
        fieldType: defaultFieldTypeString(),
        description: "The name that should appear in the button."
      }),
      Field({
        name: "onClick",
        fieldType: Script,
        description: "Script that will run when the user clicks on the button."
      })
    ]
  });
}

function ButtonRow() {
  return FieldTypeObject({
    name: "ButtonRow",
    properties: [
      Field({
        name: "buttons",
        fieldType: defaultFieldTypeArray({
          arrayType: Button()
        }),
        description: "Row items."
      })
    ]
  });
}

export const ContentUserInterfaceIdentity = ModelIdentity({
  className: "ContentUserInterface",
  collectionName: "contentUserInterfaces"
});

export default function ContentUserInterface() {
  return mergeFields(
    Model({
      identity: ContentUserInterfaceIdentity,
      fields: [
        Field({
          description: "Button rows",
          name: "buttonRows",
          fieldType: FieldTypeArray({
            name: "ButtonRows",
            flags: [],
            arrayType: ButtonRow()
          })
        })
      ]
    }),
    ContentBase()
  );
}
