import { Field } from "../src/schema/Field";
import { FieldTypeObject } from "../src/schema/FieldTypeObject";
import { defaultFieldTypeString } from "../src/schema/FieldTypeString";

const Script = FieldTypeObject({
  name: 'Script',
  properties: [
    Field({
      name: "code",
      fieldType: defaultFieldTypeString(),
      description: "JavaScript code to be executed."
    })
  ]
});

export default Script;
