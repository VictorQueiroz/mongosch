import {IUser} from './User';
import {IStory} from './Story';
import {IContentParagraph} from './ContentParagraph';
import {IContentUserInterface} from './ContentUserInterface';
import {ObjectId, Filter, Collection, UpdateFilter, OptionalId, WithId} from 'mongodb';
export interface IInputStoryChapter {
  /**
   * Title of the story chapter
   */
  title: string;
  /**
   * Date when the chapter was last updated
   */
  createdAt: Date;
  /**
   * Date when the chapter was last updated
   */
  updatedAt: Date;
  /**
   * The chapter author id.
   */
  userId: ObjectId;
  /**
   * The story id to which this chapter belongs to.
   */
  storyId: ObjectId;
  /**
   * Initial content id
   */
  initialContentId: {
    id: StoryChapterInitialContentIdType.Paragraph;
    value: ObjectId;
  } | {
    id: StoryChapterInitialContentIdType.UI;
    value: ObjectId;
  };
}
export interface IStoryChapter {
  /**
   * Title of the story chapter
   */
  title: string;
  /**
   * Date when the chapter was last updated
   */
  createdAt: Date;
  /**
   * Date when the chapter was last updated
   */
  updatedAt: Date;
  /**
   * The chapter author id.
   */
  userId: ObjectId;
  /**
   * The story id to which this chapter belongs to.
   */
  storyId: ObjectId;
  /**
   * Initial content id
   */
  initialContentId: {
    id: StoryChapterInitialContentIdType.Paragraph;
    value: ObjectId;
  } | {
    id: StoryChapterInitialContentIdType.UI;
    value: ObjectId;
  };
}
export enum StoryChapterInitialContentIdType {
  Paragraph = 0,
  UI = 1,
}
export interface IStoryChapterPopulated {
  users: WithId<IUser>[];
  stories: WithId<IStory>[];
  contentParagraphs: WithId<IContentParagraph>[];
  contentUserInterfaces: WithId<IContentUserInterface>[];
}
export class StoryChapterModel {
  public constructor(
    private readonly storyChapters: Collection<IStoryChapter>,
    private readonly users: Collection<IUser>,
    private readonly stories: Collection<IStory>,
    private readonly contentParagraphs: Collection<IContentParagraph>,
    private readonly contentUserInterfaces: Collection<IContentUserInterface>,
  ) {}
  public find(value: Filter<IStoryChapter>) {
    return this.storyChapters.find(value);
  }
  public findOne(value: Filter<IStoryChapter>) {
    return this.storyChapters.findOne(value);
  }
  public deleteOne(value: Filter<IStoryChapter>) {
    return this.storyChapters.deleteOne(value);
  }
  public deleteMany(value: Filter<IStoryChapter>) {
    return this.storyChapters.deleteMany(value);
  }
  public updateOne(filter: Filter<IStoryChapter>, update: UpdateFilter<IStoryChapter> | Partial<IStoryChapter>) {
    if("$set" in update) {
      update["$set"] = {
        ...update["$set"],
      }
      update["$set"] = {
        ...update["$set"],
      }
    } else {
      update = {
        ...update,
      }
      update = {
        ...update,
      }
    }
    return this.storyChapters.updateOne(filter, update);
  }
  public updateMany(filter: Filter<IStoryChapter>, update: UpdateFilter<IStoryChapter> | Partial<IStoryChapter>) {
    if("$set" in update) {
      update["$set"] = {
        ...update["$set"],
      }
      update["$set"] = {
        ...update["$set"],
      }
    } else {
      update = {
        ...update,
      }
      update = {
        ...update,
      }
    }
    return this.storyChapters.updateMany(filter, update);
  }
  public countDocuments() {
    return this.storyChapters.countDocuments();
  }
  public async populate(value: IStoryChapter | ReadonlyArray<IStoryChapter>, entities: ("User" | "Story" | "ContentParagraph" | "ContentUserInterface")[] = ["User", "Story", "ContentParagraph", "ContentUserInterface"]) {
    const populated: IStoryChapterPopulated = {
      users: [],
      stories: [],
      contentParagraphs: [],
      contentUserInterfaces: [],
    };
    const ids = {
      users: new Array<ObjectId>(),
      stories: new Array<ObjectId>(),
      contentParagraphs: new Array<ObjectId>(),
      contentUserInterfaces: new Array<ObjectId>(),
    };
    const entitiesArray = Array.isArray(value) ? value : [value];
    for(const item of entitiesArray) {
      ids.users.push(item.userId);
      ids.stories.push(item.storyId);
      if(item.initialContentId.id === 0) {
        ids.contentParagraphs.push(item.initialContentId.value);
      }
      if(item.initialContentId.id === 1) {
        ids.contentUserInterfaces.push(item.initialContentId.value);
      }
    }
    await Promise.all([
      (async (list) => populated.users.push(...(await list)))(entities.includes("User") ? this.users.find({
        _id: {
          $in: ids.users
        }
      }).toArray() : Promise.resolve([])),
      (async (list) => populated.stories.push(...(await list)))(entities.includes("Story") ? this.stories.find({
        _id: {
          $in: ids.stories
        }
      }).toArray() : Promise.resolve([])),
      (async (list) => populated.contentParagraphs.push(...(await list)))(entities.includes("ContentParagraph") ? this.contentParagraphs.find({
        _id: {
          $in: ids.contentParagraphs
        }
      }).toArray() : Promise.resolve([])),
      (async (list) => populated.contentUserInterfaces.push(...(await list)))(entities.includes("ContentUserInterface") ? this.contentUserInterfaces.find({
        _id: {
          $in: ids.contentUserInterfaces
        }
      }).toArray() : Promise.resolve([])),
    ]);
    return populated;
  }
  public async insertOne(value: OptionalId<IStoryChapter>) {
    const validationErr = validateStoryChapter(value);
    if(validationErr !== null) {
      return validationErr;
    }
    const result = await this.storyChapters.insertOne(value, { forceServerObjectId: false });
    if(!result.acknowledged) {
      return { error: 'Record creation not acknowledged' };
    }
    return result.insertedId;
  }
}
export function validateStoryChapter(value: IStoryChapter) {
  const value0 = value['title'];
  if(!(typeof value0 === 'string')) {
    return {
      error: `Expected value0 to be a string, but got ${typeof value0} instead`
    }
  }
  const value1 = value['createdAt'];
  if(!(value1 instanceof Date)) {
    return {
      error: `Expected value1 to be of type Date, but got "${typeof value1}" instead`
    }
  }
  const value2 = value['updatedAt'];
  if(!(value2 instanceof Date)) {
    return {
      error: `Expected value2 to be of type Date, but got "${typeof value2}" instead`
    }
  }
  const value3 = value['userId'];
  if(!(value3 instanceof ObjectId)) {
    return {
      error: `Expected value3 to be an instance of ObjectId, but got typeof value3 instead`
    }
  }
  const value4 = value['storyId'];
  if(!(value4 instanceof ObjectId)) {
    return {
      error: `Expected value4 to be an instance of ObjectId, but got typeof value4 instead`
    }
  }
  const value5 = value['initialContentId'];
  switch(value5.id) {
    case StoryChapterInitialContentIdType.Paragraph:
      if(!(value5.value instanceof ObjectId)) {
        return {
          error: `Expected value5.value to be an instance of ObjectId, but got typeof value5.value instead`
        }
      }
      break;
    case StoryChapterInitialContentIdType.UI:
      if(!(value5.value instanceof ObjectId)) {
        return {
          error: `Expected value5.value to be an instance of ObjectId, but got typeof value5.value instead`
        }
      }
      break;
  }
  return null;
}
