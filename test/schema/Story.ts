import {IUser} from './User';
import {ObjectId, Filter, Collection} from 'mongodb';
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
  public async populate(value: IStory) {
    const populated: IStoryPopulated = {
      users: [],
    }
    const ids = {
      users: new Array<ObjectId>(),
    }
    ids.users.push(value.authorId);
    populated.users.push(...(await this.users.find({
      _id: {
        $in: ids.users
      }
    }).toArray()));
    return populated;
  }
  public async insert(value: IStory) {
    const validationErr = validateStory(value);
    if(validationErr !== null) {
      return validationErr;
    }
    const result = await this.stories.insertOne(value, { forceServerObjectId: false });
    if(!result.acknowledged) {
      return null;
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
