import {IUser} from './User';
import {IStory} from './Story';
import {IContentParagraph} from './ContentParagraph';
import {IContentUserInterface} from './ContentUserInterface';
import {ObjectId, Filter, Collection} from 'mongodb';
export interface IStoryChapter {
  name: string;
  authorId: ObjectId;
  storyId: ObjectId;
  initialContentId: {
    id: 0;
    value: ObjectId;
  } | {
    id: 1;
    value: ObjectId;
  };
}
export interface IStoryChapterPopulated {
  users: IUser[];
  stories: IStory[];
  contentParagraphs: IContentParagraph[];
  contentUserInterfaces: IContentUserInterface[];
}
export class StoryChapterModel {
  public constructor(
    private readonly storyChapters: Collection<IStoryChapter>,
    private readonly users: Collection<IUser>,
    private readonly stories: Collection<IStory>,
    private readonly contentParagraphs: Collection<IContentParagraph>,
    private readonly contentUserInterfaces: Collection<IContentUserInterface>,
  ) {}
  public async find(value: Filter<IStoryChapter>) {
    return this.storyChapters.find(value);
  }
  public async findOne(value: Filter<IStoryChapter>) {
    return this.storyChapters.findOne(value);
  }
  public async populate(value: IStoryChapter, entities: ("User" | "Story" | "ContentParagraph" | "ContentUserInterface")[] = ["User", "Story", "ContentParagraph", "ContentUserInterface"]) {
    const populated: IStoryChapterPopulated = {
      users: [],
      stories: [],
      contentParagraphs: [],
      contentUserInterfaces: [],
    }
    const ids = {
      users: new Array<ObjectId>(),
      stories: new Array<ObjectId>(),
      contentParagraphs: new Array<ObjectId>(),
      contentUserInterfaces: new Array<ObjectId>(),
    }
    ids.users.push(value.authorId);
    ids.stories.push(value.storyId);
    if(value.initialContentId.id === 0) {
      ids.contentParagraphs.push(value.initialContentId.value);
    }
    if(value.initialContentId.id === 1) {
      ids.contentUserInterfaces.push(value.initialContentId.value);
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
  public async insert(value: IStoryChapter) {
    const validationErr = validateStoryChapter(value);
    if(validationErr !== null) {
      return validationErr;
    }
    const result = await this.storyChapters.insertOne(value, { forceServerObjectId: false });
    if(!result.acknowledged) {
      return null;
    }
    return result.insertedId;
  }
}
export class StoryChapterFilter {
  readonly #filter: Filter<StoryChapterModel> = {};
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
  /**
    * Matches storyId with all exact parameters
    */
  public storyId(value: ObjectId) {
    this.#filter['storyId'] = value;
  }
  /**
    * Matches initialContentId with all exact parameters
    */
  public initialContentId(value: {
    id: 0;
    value: ObjectId;
  } | {
    id: 1;
    value: ObjectId;
  }) {
    this.#filter['initialContentId'] = value;
  }
}
export function validateStoryChapter(value: IStoryChapter) {
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
  const value2 = value['storyId'];
  if(!(value2 instanceof ObjectId)) {
    return {
      error: `Expected value2 to be an instance of ObjectId, but got typeof value2 instead`
    }
  }
  const value3 = value['initialContentId'];
  return null;
}
