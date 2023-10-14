import { Field, FieldTypeEnumString, FieldTypeObject, Model } from "../src";
import { defaultFieldTypeDate } from "../src/schema/FieldTypeDate";
import { EnumFieldString } from "../src/schema/FieldTypeEnum";
import {
  FieldTypeString,
  FieldTypeStringFlagMatchRegularExpression,
  defaultFieldTypeString
} from "../src/schema/FieldTypeString";
import { getCountries } from "libphonenumber-js";
import { ModelIdentity } from "../src/schema/Model";

const Phone = FieldTypeObject({
  name: "Phone",
  properties: [
    Field({
      name: "countryCode",
      description: "Country code of the phone",
      fieldType: FieldTypeEnumString({
        name: "CountryCode",
        fields: getCountries().map((country) =>
          EnumFieldString({
            value: country,
            name: country
          })
        )
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
    identity: ModelIdentity({
      className: "User",
      collectionName: "users"
    }),
    fields: [
      Field({
        description: "Phone number",
        fieldType: Phone,
        name: "phone"
      }),
      Field({
        description: "User email address",
        fieldType: FieldTypeString({
          flags: [
            FieldTypeStringFlagMatchRegularExpression({
              value: "/^[a-zA-Z0-9._%+-]+@(gmail.com|hotmail.com)$/"
            })
          ]
        }),
        name: "email"
      }),
      Field({
        description: "Date when the user was created",
        fieldType: defaultFieldTypeDate(),
        name: "createdAt"
      })
    ]
  });
}
