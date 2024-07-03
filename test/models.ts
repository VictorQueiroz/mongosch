import test from "ava";
import { Db, MongoClient, ObjectId } from "mongodb";
import { DatabaseClient } from "../example/schema/DatabaseClient";
import { CountryCode } from "libphonenumber-js";
import { UserPhonePhoneCountryCodeType } from "../example/schema/User";
import assert from "assert";

let connection: MongoClient;
let db: Db;
let client: DatabaseClient;

test.beforeEach(async () => {
  connection = await MongoClient.connect("mongodb://localhost:27017");
  db = connection.db("test");
  for (const c of await db.collections()) {
    await c.drop();
  }
  client = new DatabaseClient(db);
});

test("User#insertOne: it should validate before adding user", async (t) => {
  const expectedUserId = new ObjectId();
  t.deepEqual(
    await client.User.insertOne({
      _id: expectedUserId,
      email: "vqueirozgalvao@gmail.com",
      phone: {
        countryCode: UserPhonePhoneCountryCodeType.BR,
        nationalNumber: "85999999999"
      },
      createdAt: new Date()
    }),
    expectedUserId
  );
});

test("User#updateOne: it should fail if an invalid `email` property is set", async (t) => {
  const newUser = await client.User.add({
    email: "vqueirozgalvao@gmail.com",
    phone: {
      countryCode: UserPhonePhoneCountryCodeType.BR,
      nationalNumber: "85999999999"
    },
    createdAt: new Date()
  });
  assert.strict.ok(newUser !== null && !("error" in newUser));
  const updateResult = await client.User.updateOne(
    { _id: newUser._id },
    {
      $set: {
        email: "a"
      }
    }
  );
  assert.strict.deepEqual(updateResult, {
    error:
      "Expected value.email to match /^[a-zA-Z0-9._%+-]+@(gmail.com|hotmail.com)$/, but it didn't"
  });
  t.deepEqual(await client.User.findOne({ _id: newUser._id }), {
    _id: newUser._id,
    email: "vqueirozgalvao@gmail.com",
    phone: {
      countryCode: UserPhonePhoneCountryCodeType.BR,
      nationalNumber: "85999999999"
    },
    createdAt: newUser.createdAt
  });
  t.pass();
});

test("User#add: it should return the added object after it is added", async (t) => {
  const expectedUserId = new ObjectId();
  const createdAt = new Date();
  t.deepEqual(
    await client.User.add({
      _id: expectedUserId,
      email: "vqueirozgalvao@gmail.com",
      phone: {
        countryCode: UserPhonePhoneCountryCodeType.BR,
        nationalNumber: "85999999999"
      },
      createdAt
    }),
    {
      _id: expectedUserId,
      email: "vqueirozgalvao@gmail.com",
      phone: {
        countryCode: UserPhonePhoneCountryCodeType.BR,
        nationalNumber: "85999999999"
      },
      createdAt
    }
  );
});

test("Post#updateOne: it should update `updatedAt` property automatically on `updateOne` call", async (t) => {
  const user = await client.User.add({
    email: "vqueirozgalvao@gmail.com",
    phone: {
      countryCode: UserPhonePhoneCountryCodeType.BR,
      nationalNumber: "85999999999"
    },
    createdAt: new Date()
  });
  const userValidation = user !== null && !("error" in user);
  t.assert(userValidation);
  if (!userValidation) {
    return;
  }
  const post = await client.Post.add({
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "Post #1",
    authorId: user._id
  });
  const newPostValidation = post !== null && !("error" in post);
  t.assert(newPostValidation);
  if (!newPostValidation) {
    return;
  }
  const updatePostResult = await client.Post.updateOne(
    {
      _id: post._id
    },
    {
      $set: {
        title: "Updated post #1"
      }
    }
  );
  const updatePostResultValidation =
    updatePostResult !== null && !("error" in updatePostResult);
  t.assert(updatePostResultValidation);
  if (!updatePostResultValidation) {
    return;
  }
  const updatedPost = await client.Post.findOne({
    _id: post._id
  });
  t.assert(updatedPost !== null);
  if (updatedPost === null) {
    return;
  }
  t.assert(
    updatedPost.updatedAt.getTime() !== post.updatedAt.getTime() &&
      updatedPost.updatedAt.getTime() > post.updatedAt.getTime()
  );
});

test("Post#populate: it should populate post document", async (t) => {
  const user = await client.User.add({
    email: "vqueirozgalvao@gmail.com",
    phone: {
      countryCode: UserPhonePhoneCountryCodeType.BR,
      nationalNumber: "85999999999"
    },
    createdAt: new Date()
  });
  assert.strict.ok(user !== null && !("error" in user));
  const post = await client.Post.add({
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "Post #1",
    authorId: user._id
  });
  assert.strict.ok(post !== null && !("error" in post));
  const postPopulation = await client.Post.populate(post);
  t.deepEqual(postPopulation, {
    users: [user]
  });
});
