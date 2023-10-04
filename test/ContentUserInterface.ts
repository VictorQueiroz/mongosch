import merge from "../src/merge";
import { Field } from "../src/schema/Field";
import {
  FieldTypeArray,
  FieldTypeObject,
  defaultFieldTypeArray
} from "../src/schema/FieldTypeObject";
import { defaultFieldTypeString } from "../src/schema/FieldTypeString";
import { Model, updateModel } from "../src/schema/Model";
import ContentBase from "./Content";
import Content from "./Content";
import Script from "./Script";

function Button() {
  return FieldTypeObject({
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

export function ContentUserInterfaceBase() {
  return Model({
    className: "ContentUserInterface",
    collectionName: "contentUserInterfaces",
    fields: [
      Field({
        description: "Button rows",
        name: "buttonRows",
        fieldType: FieldTypeArray({
          name: 'ButtonRows',
          flags: [],
          arrayType: ButtonRow()
        })
      })
    ]
  });
}

/**
 * This is what we pass to the compiler, to avoid circular dependencies.
 */
export function ContentUserInterface() {
  return merge(ContentUserInterfaceBase(), ContentBase());
}
