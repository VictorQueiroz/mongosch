import {IUser} from './User';
import {ObjectId, Filter, Collection, UpdateFilter, OptionalId, WithId} from 'mongodb';
export interface IInputStory {
  /**
   * Story name
   */
  name: string;
  /**
   * The person who created the story.
   */
  authorId: ObjectId;
}
export interface IStory {
  /**
   * Story name
   */
  name: string;
  /**
   * The person who created the story.
   */
  authorId: ObjectId;
}
export interface IStoryPopulation {
  users: WithId<IUser>[];
}
export class StoryModel {
  public constructor(
    private readonly stories: Collection<IStory>,
    private readonly users: Collection<IUser>,
  ) {}
  public find(value: Filter<IStory>) {
    return this.stories.find(value);
  }
  public findOne(value: Filter<IStory>) {
    return this.stories.findOne(value);
  }
  public deleteOne(value: Filter<IStory>) {
    return this.stories.deleteOne(value);
  }
  public deleteMany(value: Filter<IStory>) {
    return this.stories.deleteMany(value);
  }
  public async updateOne(filter: Filter<IStory>, update: UpdateFilter<IStory> | Partial<IStory>) {
    if("$set" in update) {
      const validation = partiallyValidateStory(update['$set']);
      if(validation !== null) {
        return validation;
      }
    } else {
      const validation = partiallyValidateStory(update);
      if(validation !== null) {
        return validation;
      }
    }
    const result = await this.stories.updateOne(filter, update);
    if(!result.acknowledged) {
      return null;
    }
    return { success: result };
  }
  public async updateMany(filter: Filter<IStory>, update: UpdateFilter<IStory> | Partial<IStory>) {
    if("$set" in update) {
      const validation = partiallyValidateStory(update['$set']);
      if(validation !== null) {
        return validation;
      }
    } else {
      const validation = partiallyValidateStory(update);
      if(validation !== null) {
        return validation;
      }
    }
    const result = await this.stories.updateMany(filter, update);
    if(!result.acknowledged) {
      return null;
    }
    return { success: result };
  }
  public countDocuments() {
    return this.stories.countDocuments();
  }
  public async populate(value: IStory | ReadonlyArray<IStory>, entities: ("User")[] = ["User"]) {
    const population: IStoryPopulation = {
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
  public async add(value: OptionalId<IStory>) {
    const result = await this.insertOne(value);
    if('error' in result) {
      return result;
    }
    return this.findOne({_id: result});
  }
  public async insertOne(value: OptionalId<IStory>) {
    const validationErr = validateStory(value);
    if(validationErr !== null) {
      return validationErr;
    }
    const result = await this.stories.insertOne(value, { forceServerObjectId: false });
    if(!result.acknowledged) {
      return { error: 'Record creation not acknowledged' };
    }
    return result.insertedId;
  }
}
export function validateStory(value: unknown) {
  if(!(typeof value === 'object' && value !== null)) {
    return {
      error: `Expected "value" to be an object, but got typeof ${typeof value} instead`
    }
  }
  if(!('name' in value)) {
    return {
      error: `Expected "value" to have a property named ${'name'}, but only the following properties were found: ${Object.keys(value)}`
    }
  }
  const valueName1 = value['name'];
  if(!(typeof valueName1 === 'string')) {
    return {
      error: `Expected value.name to be a string, but got ${typeof valueName1} instead`
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
  return null;
}
export function partiallyValidateStory(value: unknown) {
  if(!(typeof value === 'object' && value !== null)) {
    return {
      error: `Expected "value" to be an object, but got typeof ${typeof value} instead`
    }
  }
  if('name' in value) {
    if(!('name' in value)) {
      return {
        error: `Expected "value" to have a property named ${'name'}, but only the following properties were found: ${Object.keys(value)}`
      }
    }
    const valueName3 = value['name'];
    if(!(typeof valueName3 === 'string')) {
      return {
        error: `Expected value.name to be a string, but got ${typeof valueName3} instead`
      }
    }
  }
  if('authorId' in value) {
    if(!('authorId' in value)) {
      return {
        error: `Expected "value" to have a property named ${'authorId'}, but only the following properties were found: ${Object.keys(value)}`
      }
    }
    const valueAuthorId4 = value['authorId'];
    if(!(valueAuthorId4 instanceof ObjectId)) {
      return {
        error: `Expected value.authorId to be an instance of ObjectId, but got typeof valueAuthorId4 instead`
      }
    }
  }
  return null;
}
