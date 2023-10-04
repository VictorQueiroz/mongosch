import {IUser} from './User';
import {ObjectId, Filter, Collection, UpdateFilter} from 'mongodb';
export interface IStory {
  name: string;
  authorId: ObjectId;
}
export interface IStoryPopulated {
  users: IUser[];
}
export class StoryModel {
  public constructor(
    private readonly stories: Collection<IStory>,
    private readonly users: Collection<IUser>,
  ) {}
  public async find(value: Filter<IStory>) {
    return this.stories.find(value);
  }
  public async findOne(value: Filter<IStory>) {
    return this.stories.findOne(value);
  }
  public async deleteOne(value: Filter<IStory>) {
    return this.stories.deleteOne(value);
  }
  public async deleteMany(value: Filter<IStory>) {
    return this.stories.deleteMany(value);
  }
  public async updateOne(filter: Filter<IStory>, update: UpdateFilter<IStory> | Partial<IStory>) {
    return this.stories.updateOne(filter, update);
  }
  public async updateMany(filter: Filter<IStory>, update: UpdateFilter<IStory> | Partial<IStory>) {
    return this.stories.updateMany(filter, update);
  }
  public async populate(value: IStory, entities: ("User")[] = ["User"]) {
    const populated: IStoryPopulated = {
      users: [],
    };
    const ids = {
      users: new Array<ObjectId>(),
    };
    ids.users.push(value.authorId);
    await Promise.all([
      (async (list) => populated.users.push(...(await list)))(entities.includes("User") ? this.users.find({
        _id: {
          $in: ids.users
        }
      }).toArray() : Promise.resolve([])),
    ]);
    return populated;
  }
  public async insertOne(value: IStory) {
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
export class StoryFilter {
  readonly #filter: Filter<StoryModel> = {};
  /**
    * Matches name with all exact parameters
    */
  public name(value: string) {
    this.#filter['name'] = value;
  }
  /**
    * Matches authorId with all exact parameters
    */
  public authorId(value: ObjectId) {
    this.#filter['authorId'] = value;
  }
}
export function validateStory(value: IStory) {
  const value0 = value['name'];
  if(!(typeof value0 === 'string')) {
    return {
      error: `Expected value0 to be a string, but got ${typeof value0} instead`
    }
  }
  const value1 = value['authorId'];
  if(!(value1 instanceof ObjectId)) {
    return {
      error: `Expected value1 to be an instance of ObjectId, but got typeof value1 instead`
    }
  }
  return null;
}
