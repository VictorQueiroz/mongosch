import {IUser} from './User';
import {ObjectId, Filter, Collection, UpdateFilter, OptionalId, Document, CountDocumentsOptions, WithId} from 'mongodb';
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
  /**
   * Date when the post was last updated.
   */
  updatedAt?: Date;
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
  /**
   * Date when the post was last updated.
   */
  updatedAt: Date;
}
export interface IPostPopulation {
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
      if(!update['$set']) {
        update['$set'] = {};
      }
      let changes = {...update['$set']};
      changes.updatedAt = new Date();
      update['$set'] = changes;
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
      if(!update['$set']) {
        update['$set'] = {};
      }
      let changes = {...update['$set']};
      changes.updatedAt = new Date();
      update['$set'] = changes;
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
  public countDocuments(filter?: Document, options?: CountDocumentsOptions) {
    return this.posts.countDocuments(filter, options);
  }
  public async populate(value: IPost | ReadonlyArray<IPost>, entities: ("User")[] = ["User"]) {
    const population: IPostPopulation = {
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
      (async (list) => population.users.push(...(await list)))(entities.includes("User") ? this.users.find({
        _id: {
          $in: ids.users
        }
      }).toArray() : Promise.resolve([])),
    ]);
    return population;
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
  if(!('updatedAt' in value)) {
    return {
      error: `Expected "value" to have a property named ${'updatedAt'}, but only the following properties were found: ${Object.keys(value)}`
    }
  }
  const valueUpdatedAt4 = value['updatedAt'];
  if(!(valueUpdatedAt4 instanceof Date)) {
    return {
      error: `Expected value.updatedAt to be of type Date, but got "${typeof valueUpdatedAt4}" instead`
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
    const valueTitle5 = value['title'];
    if(!(typeof valueTitle5 === 'string')) {
      return {
        error: `Expected value.title to be a string, but got ${typeof valueTitle5} instead`
      }
    }
  }
  if('authorId' in value) {
    if(!('authorId' in value)) {
      return {
        error: `Expected "value" to have a property named ${'authorId'}, but only the following properties were found: ${Object.keys(value)}`
      }
    }
    const valueAuthorId6 = value['authorId'];
    if(!(valueAuthorId6 instanceof ObjectId)) {
      return {
        error: `Expected value.authorId to be an instance of ObjectId, but got typeof valueAuthorId6 instead`
      }
    }
  }
  if('createdAt' in value) {
    if(!('createdAt' in value)) {
      return {
        error: `Expected "value" to have a property named ${'createdAt'}, but only the following properties were found: ${Object.keys(value)}`
      }
    }
    const valueCreatedAt7 = value['createdAt'];
    if(!(valueCreatedAt7 instanceof Date)) {
      return {
        error: `Expected value.createdAt to be of type Date, but got "${typeof valueCreatedAt7}" instead`
      }
    }
  }
  if('updatedAt' in value) {
    if(!('updatedAt' in value)) {
      return {
        error: `Expected "value" to have a property named ${'updatedAt'}, but only the following properties were found: ${Object.keys(value)}`
      }
    }
    const valueUpdatedAt8 = value['updatedAt'];
    if(!(valueUpdatedAt8 instanceof Date)) {
      return {
        error: `Expected value.updatedAt to be of type Date, but got "${typeof valueUpdatedAt8}" instead`
      }
    }
  }
  return null;
}
