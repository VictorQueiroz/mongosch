import { Field, FieldTypeEnumString, FieldTypeObject, Model } from "../src";
import { defaultFieldTypeDate } from "../src/schema/FieldTypeDate";
import { EnumFieldString } from "../src/schema/FieldTypeEnum";
import { defaultFieldTypeString } from "../src/schema/FieldTypeString";
import {getCountries} from "libphonenumber-js";

const Phone = FieldTypeObject({
  properties: [
    Field({
      name: "countryCode",
      description: "Country code of the phone",
      fieldType: FieldTypeEnumString({
        fields: getCountries().map(country => EnumFieldString({
          value: country,
          name: country
        }))
      })
    }),
    Field({
      name: "nationalNumber",
      description: "National number",
      fieldType: defaultFieldTypeString()
    })
  ]
});

/**
 * @returns User model
 */
export default function User() {
  return Model({
    className: "User",
    collectionName: "users",
    fields: [
      Field({
        description: "Phone number",
        fieldType: Phone,
        name: "phone"
      }),
      Field({
        description: "Date when the user was created",
        fieldType: defaultFieldTypeDate(),
        name: "createdAt"
      })
    ]
  });
}
