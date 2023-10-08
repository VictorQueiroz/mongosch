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
  public updateOne(filter: Filter<IPost>, update: UpdateFilter<IPost> | Partial<IPost>) {
    if("$set" in update) {
      update["$set"] = {
        ...update["$set"],
      }
    } else {
      update = {
        ...update,
      }
    }
    return this.posts.updateOne(filter, update);
  }
  public updateMany(filter: Filter<IPost>, update: UpdateFilter<IPost> | Partial<IPost>) {
    if("$set" in update) {
      update["$set"] = {
        ...update["$set"],
      }
    } else {
      update = {
        ...update,
      }
    }
    return this.posts.updateMany(filter, update);
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
