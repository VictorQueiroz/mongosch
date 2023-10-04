import {IUser} from './User';
import {ObjectId, Filter, Collection, UpdateFilter} from 'mongodb';
export interface IPost {
  title: string;
  authorId: ObjectId;
  createdAt: Date;
}
export interface IPostPopulated {
  users: IUser[];
}
export class PostModel {
  public constructor(
    private readonly posts: Collection<IPost>,
    private readonly users: Collection<IUser>,
  ) {}
  public async find(value: Filter<IPost>) {
    return this.posts.find(value);
  }
  public async findOne(value: Filter<IPost>) {
    return this.posts.findOne(value);
  }
  public async deleteOne(value: Filter<IPost>) {
    return this.posts.deleteOne(value);
  }
  public async deleteMany(value: Filter<IPost>) {
    return this.posts.deleteMany(value);
  }
  public async updateOne(filter: Filter<IPost>, update: UpdateFilter<IPost> | Partial<IPost>) {
    return this.posts.updateOne(filter, update);
  }
  public async updateMany(filter: Filter<IPost>, update: UpdateFilter<IPost> | Partial<IPost>) {
    return this.posts.updateMany(filter, update);
  }
  public async populate(value: IPost, entities: ("User")[] = ["User"]) {
    const populated: IPostPopulated = {
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
  public async insertOne(value: IPost) {
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
export class PostFilter {
  readonly #filter: Filter<PostModel> = {};
  /**
    * Matches title with all exact parameters
    */
  public title(value: string) {
    this.#filter['title'] = value;
  }
  /**
    * Matches authorId with all exact parameters
    */
  public authorId(value: ObjectId) {
    this.#filter['authorId'] = value;
  }
  /**
    * Matches createdAt with all exact parameters
    */
  public createdAt(value: Date) {
    this.#filter['createdAt'] = value;
  }
}
export function validatePost(value: IPost) {
  const value0 = value['title'];
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
  const value2 = value['createdAt'];
  if(!(value2 instanceof Date)) {
    return {
      error: `Expected value2 to be of type Date, but got "${typeof value2}" instead`
    }
  }
  return null;
}
