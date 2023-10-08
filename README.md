# Mongosch: Model Generation for MongoDB

Automatically generate model classes based on your model definitions to simplify server-side logic.

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
  - [Define Models](#define-models)
  - [Generate Models](#generate-models)
  - [Utilize Generated Models](#utilize-generated-models)

## Installation

Install `mongosch` as a development dependency:

```bash
npm install --save-dev mongosch
```

## Quick Start

### Define Models

Create an entry point file, for example `models-entry-point.js`, to define your models. Below is a sample code snippet that defines a `User` and a `Post` model.

```js
import {
  defaultFieldTypeDate,
  EnumFieldString,
  defaultFieldTypeModelReference,
  defaultFieldTypeString,
  Field,
  FieldTypeEnumString,
  FieldTypeObject,
  Model
} from "mongosch";
import { getCountries } from "libphonenumber-js";

// Define Phone FieldType
const Phone = FieldTypeObject({
  name: "Phone",
  properties: [
    Field({
      name: "countryCode",
      description: "Country code of the phone",
      fieldType: FieldTypeEnumString({
        name: "CountryCode",
        fields: getCountries().map((country) =>
          EnumFieldString({ value: country, name: country })
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

// Define User Model
function User() {
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

// Define Post Model
const Post = Model({
  collectionName: "posts",
  className: "Post",
  fields: [
    Field({
      fieldType: defaultFieldTypeString(),
      name: "title",
      description: "Post title"
    }),
    Field({
      description: "User that authored the post",
      name: "authorId",
      fieldType: defaultFieldTypeModelReference({
        model: User()
      })
    }),
    Field({
      name: "createdAt",
      description: "Date when the post was created",
      fieldType: defaultFieldTypeDate()
    })
  ]
});

export default [Post, User];
```

### Generate Models

Run the following command to generate model classes based on your definitions:

```bash
npx mongosch --input models-entry-point.js --output models
```

### Utilize Generated Models

Here's how you can use the generated models in your application:

```ts
import { DatabaseClient } from "./models";
import { IPost } from "./models/Post";
import { MongoClient, ObjectId } from "mongodb";

const url = "mongodb://database";

(async () => {
  // Initialize Database Client
  const models = new DatabaseClient((await MongoClient.connect(url)).db("app"));

  // Fetch a Post by its ID
  const post: IPost = await models.Post.find({
    _id: new ObjectId("6522f4be1d5091b42f81521d")
  });

  // Populate referenced models
  const { users } = await models.Post.populate();
  console.log(users);
})();
```
