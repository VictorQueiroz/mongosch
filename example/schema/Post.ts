import {IUser} from './User';
import {ObjectId, Filter, Collection, UpdateFilter, OptionalId, WithId} from 'mongodb';
export interface IInputPost {
  /**
   * Post title.
   */
  title: string;
  /**
   * User that authored the post.
   */
  authorId: ObjectId;
  /**
   * Date when the post was created
   */
  createdAt: Date;
}
export interface IPost {
  /**
   * Post title.
   */
  title: string;
  /**
   * User that authored the post.
   */
  authorId: ObjectId;
  /**
   * Date when the post was created
   */
  createdAt: Date;
}
export interface IPostPopulated {
  users: WithId<IUser>[];
}
export class PostModel {
  public constructor(
    private readonly posts: Collection<IPost>,
    private readonly users: Collection<IUser>,
  ) {}
  public find(value: Filter<IPost>) {
    return this.posts.find(value);
  }
  public findOne(value: Filter<IPost>) {
    return this.posts.findOne(value);
  }
  public deleteOne(value: Filter<IPost>) {
    return this.posts.deleteOne(value);
  }
  public deleteMany(value: Filter<IPost>) {
    return this.posts.deleteMany(value);
  }
  public async updateOne(filter: Filter<IPost>, update: UpdateFilter<IPost> | Partial<IPost>) {
    if("$set" in update) {
      const validation = partiallyValidatePost(update['$set']);
      if(validation !== null) {
        return validation;
      }
    } else {
      const validation = partiallyValidatePost(update);
      if(validation !== null) {
        return validation;
      }
    }
    const result = await this.posts.updateOne(filter, update);
    if(!result.acknowledged) {
      return null;
    }
    return { success: result };
  }
  public async updateMany(filter: Filter<IPost>, update: UpdateFilter<IPost> | Partial<IPost>) {
    if("$set" in update) {
      const validation = partiallyValidatePost(update['$set']);
      if(validation !== null) {
        return validation;
      }
    } else {
      const validation = partiallyValidatePost(update);
      if(validation !== null) {
        return validation;
      }
    }
    const result = await this.posts.updateMany(filter, update);
    if(!result.acknowledged) {
      return null;
    }
    return { success: result };
  }
  public countDocuments() {
    return this.posts.countDocuments();
  }
  public async populate(value: IPost | ReadonlyArray<IPost>, entities: ("User")[] = ["User"]) {
    const populated: IPostPopulated = {
      users: [],
    };
    const ids = {
      users: new Array<ObjectId>(),
    };
    const entitiesArray = Array.isArray(value) ? value : [value];
    for(const item of entitiesArray) {
      ids.users.push(item.authorId);
    }
    await Promise.all([
      (async (list) => populated.users.push(...(await list)))(entities.includes("User") ? this.users.find({
        _id: {
          $in: ids.users
        }
      }).toArray() : Promise.resolve([])),
    ]);
    return populated;
  }
  public async add(value: OptionalId<IPost>) {
    const result = await this.insertOne(value);
    if('error' in result) {
      return result;
    }
    return this.findOne({_id: result});
  }
  public async insertOne(value: OptionalId<IPost>) {
    const validationErr = validatePost(value);
    if(validationErr !== null) {
      return validationErr;
    }
    const result = await this.posts.insertOne(value, { forceServerObjectId: false });
    if(!result.acknowledged) {
      return { error: 'Record creation not acknowledged' };
    }
    return result.insertedId;
  }
}
export function validatePost(value: unknown) {
  if(!(typeof value === 'object' && value !== null)) {
    return {
      error: `Expected "value" to be an object, but got typeof ${typeof value} instead`
    }
  }
  if(!('title' in value)) {
    return {
      error: `Expected "value" to have a property named ${'title'}, but only the following properties were found: ${Object.keys(value)}`
    }
  }
  const valueTitle1 = value['title'];
  if(!(typeof valueTitle1 === 'string')) {
    return {
      error: `Expected value.title to be a string, but got ${typeof valueTitle1} instead`
    }
  }
  if(!('authorId' in value)) {
    return {
      error: `Expected "value" to have a property named ${'authorId'}, but only the following properties were found: ${Object.keys(value)}`
    }
  }
  const valueAuthorId2 = value['authorId'];
  if(!(valueAuthorId2 instanceof ObjectId)) {
    return {
      error: `Expected value.authorId to be an instance of ObjectId, but got typeof valueAuthorId2 instead`
    }
  }
  if(!('createdAt' in value)) {
    return {
      error: `Expected "value" to have a property named ${'createdAt'}, but only the following properties were found: ${Object.keys(value)}`
    }
  }
  const valueCreatedAt3 = value['createdAt'];
  if(!(valueCreatedAt3 instanceof Date)) {
    return {
      error: `Expected value.createdAt to be of type Date, but got "${typeof valueCreatedAt3}" instead`
    }
  }
  return null;
}
export function partiallyValidatePost(value: unknown) {
  if(!(typeof value === 'object' && value !== null)) {
    return {
      error: `Expected "value" to be an object, but got typeof ${typeof value} instead`
    }
  }
  if('title' in value) {
    if(!('title' in value)) {
      return {
        error: `Expected "value" to have a property named ${'title'}, but only the following properties were found: ${Object.keys(value)}`
      }
    }
    const valueTitle4 = value['title'];
    if(!(typeof valueTitle4 === 'string')) {
      return {
        error: `Expected value.title to be a string, but got ${typeof valueTitle4} instead`
      }
    }
  }
  if('authorId' in value) {
    if(!('authorId' in value)) {
      return {
        error: `Expected "value" to have a property named ${'authorId'}, but only the following properties were found: ${Object.keys(value)}`
      }
    }
    const valueAuthorId5 = value['authorId'];
    if(!(valueAuthorId5 instanceof ObjectId)) {
      return {
        error: `Expected value.authorId to be an instance of ObjectId, but got typeof valueAuthorId5 instead`
      }
    }
  }
  if('createdAt' in value) {
    if(!('createdAt' in value)) {
      return {
        error: `Expected "value" to have a property named ${'createdAt'}, but only the following properties were found: ${Object.keys(value)}`
      }
    }
    const valueCreatedAt6 = value['createdAt'];
    if(!(valueCreatedAt6 instanceof Date)) {
      return {
        error: `Expected value.createdAt to be of type Date, but got "${typeof valueCreatedAt6}" instead`
      }
    }
  }
  return null;
}
