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
export interface IStoryChapterPopulation {
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
  public async updateOne(filter: Filter<IStoryChapter>, update: UpdateFilter<IStoryChapter> | Partial<IStoryChapter>) {
    if("$set" in update) {
      const validation = partiallyValidateStoryChapter(update['$set']);
      if(validation !== null) {
        return validation;
      }
    } else {
      const validation = partiallyValidateStoryChapter(update);
      if(validation !== null) {
        return validation;
      }
    }
    const result = await this.storyChapters.updateOne(filter, update);
    if(!result.acknowledged) {
      return null;
    }
    return { success: result };
  }
  public async updateMany(filter: Filter<IStoryChapter>, update: UpdateFilter<IStoryChapter> | Partial<IStoryChapter>) {
    if("$set" in update) {
      const validation = partiallyValidateStoryChapter(update['$set']);
      if(validation !== null) {
        return validation;
      }
    } else {
      const validation = partiallyValidateStoryChapter(update);
      if(validation !== null) {
        return validation;
      }
    }
    const result = await this.storyChapters.updateMany(filter, update);
    if(!result.acknowledged) {
      return null;
    }
    return { success: result };
  }
  public countDocuments() {
    return this.storyChapters.countDocuments();
  }
  public async populate(value: IStoryChapter | ReadonlyArray<IStoryChapter>, entities: ("User" | "Story" | "ContentParagraph" | "ContentUserInterface")[] = ["User", "Story", "ContentParagraph", "ContentUserInterface"]) {
    const population: IStoryChapterPopulation = {
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
      (async (list) => population.users.push(...(await list)))(entities.includes("User") ? this.users.find({
        _id: {
          $in: ids.users
        }
      }).toArray() : Promise.resolve([])),
      (async (list) => population.stories.push(...(await list)))(entities.includes("Story") ? this.stories.find({
        _id: {
          $in: ids.stories
        }
      }).toArray() : Promise.resolve([])),
      (async (list) => population.contentParagraphs.push(...(await list)))(entities.includes("ContentParagraph") ? this.contentParagraphs.find({
        _id: {
          $in: ids.contentParagraphs
        }
      }).toArray() : Promise.resolve([])),
      (async (list) => population.contentUserInterfaces.push(...(await list)))(entities.includes("ContentUserInterface") ? this.contentUserInterfaces.find({
        _id: {
          $in: ids.contentUserInterfaces
        }
      }).toArray() : Promise.resolve([])),
    ]);
    return population;
  }
  public async add(value: OptionalId<IStoryChapter>) {
    const result = await this.insertOne(value);
    if('error' in result) {
      return result;
    }
    return this.findOne({_id: result});
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
export function validateStoryChapter(value: unknown) {
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
  if(!('createdAt' in value)) {
    return {
      error: `Expected "value" to have a property named ${'createdAt'}, but only the following properties were found: ${Object.keys(value)}`
    }
  }
  const valueCreatedAt2 = value['createdAt'];
  if(!(valueCreatedAt2 instanceof Date)) {
    return {
      error: `Expected value.createdAt to be of type Date, but got "${typeof valueCreatedAt2}" instead`
    }
  }
  if(!('updatedAt' in value)) {
    return {
      error: `Expected "value" to have a property named ${'updatedAt'}, but only the following properties were found: ${Object.keys(value)}`
    }
  }
  const valueUpdatedAt3 = value['updatedAt'];
  if(!(valueUpdatedAt3 instanceof Date)) {
    return {
      error: `Expected value.updatedAt to be of type Date, but got "${typeof valueUpdatedAt3}" instead`
    }
  }
  if(!('userId' in value)) {
    return {
      error: `Expected "value" to have a property named ${'userId'}, but only the following properties were found: ${Object.keys(value)}`
    }
  }
  const valueUserId4 = value['userId'];
  if(!(valueUserId4 instanceof ObjectId)) {
    return {
      error: `Expected value.userId to be an instance of ObjectId, but got typeof valueUserId4 instead`
    }
  }
  if(!('storyId' in value)) {
    return {
      error: `Expected "value" to have a property named ${'storyId'}, but only the following properties were found: ${Object.keys(value)}`
    }
  }
  const valueStoryId5 = value['storyId'];
  if(!(valueStoryId5 instanceof ObjectId)) {
    return {
      error: `Expected value.storyId to be an instance of ObjectId, but got typeof valueStoryId5 instead`
    }
  }
  if(!('initialContentId' in value)) {
    return {
      error: `Expected "value" to have a property named ${'initialContentId'}, but only the following properties were found: ${Object.keys(value)}`
    }
  }
  const valueInitialContentId6 = value['initialContentId'];
  if(!(typeof valueInitialContentId6 === 'object' && valueInitialContentId6 !== null)) {
    return {
      error: `Expected value.initialContentId to be an object, but got "${typeof valueInitialContentId6}" instead`
    }
  }
  if(!('id' in valueInitialContentId6 && typeof valueInitialContentId6.id === 'number')) {
    return {
      error: `Expected value.initialContentId to have a property named "id", but only the following properties were found: ${Object.keys(valueInitialContentId6)}`
    }
  }
  switch(valueInitialContentId6.id) {
    case StoryChapterInitialContentIdType.Paragraph:
      if(!('value' in valueInitialContentId6)) {
        return {
          error: `Expected "valueInitialContentId6" to have a property named ${'value'}, but only the following properties were found: ${Object.keys(valueInitialContentId6)}`
        }
      }
      const valueInitialContentId6Value7 = valueInitialContentId6['value'];
      if(!(valueInitialContentId6Value7 instanceof ObjectId)) {
        return {
          error: `Expected valueInitialContentId6.value to be an instance of ObjectId, but got typeof valueInitialContentId6Value7 instead`
        }
      }
      break;
    case StoryChapterInitialContentIdType.UI:
      if(!('value' in valueInitialContentId6)) {
        return {
          error: `Expected "valueInitialContentId6" to have a property named ${'value'}, but only the following properties were found: ${Object.keys(valueInitialContentId6)}`
        }
      }
      const valueInitialContentId6Value8 = valueInitialContentId6['value'];
      if(!(valueInitialContentId6Value8 instanceof ObjectId)) {
        return {
          error: `Expected valueInitialContentId6.value to be an instance of ObjectId, but got typeof valueInitialContentId6Value8 instead`
        }
      }
      break;
  }
  return null;
}
export function partiallyValidateStoryChapter(value: unknown) {
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
    const valueTitle9 = value['title'];
    if(!(typeof valueTitle9 === 'string')) {
      return {
        error: `Expected value.title to be a string, but got ${typeof valueTitle9} instead`
      }
    }
  }
  if('createdAt' in value) {
    if(!('createdAt' in value)) {
      return {
        error: `Expected "value" to have a property named ${'createdAt'}, but only the following properties were found: ${Object.keys(value)}`
      }
    }
    const valueCreatedAt10 = value['createdAt'];
    if(!(valueCreatedAt10 instanceof Date)) {
      return {
        error: `Expected value.createdAt to be of type Date, but got "${typeof valueCreatedAt10}" instead`
      }
    }
  }
  if('updatedAt' in value) {
    if(!('updatedAt' in value)) {
      return {
        error: `Expected "value" to have a property named ${'updatedAt'}, but only the following properties were found: ${Object.keys(value)}`
      }
    }
    const valueUpdatedAt11 = value['updatedAt'];
    if(!(valueUpdatedAt11 instanceof Date)) {
      return {
        error: `Expected value.updatedAt to be of type Date, but got "${typeof valueUpdatedAt11}" instead`
      }
    }
  }
  if('userId' in value) {
    if(!('userId' in value)) {
      return {
        error: `Expected "value" to have a property named ${'userId'}, but only the following properties were found: ${Object.keys(value)}`
      }
    }
    const valueUserId12 = value['userId'];
    if(!(valueUserId12 instanceof ObjectId)) {
      return {
        error: `Expected value.userId to be an instance of ObjectId, but got typeof valueUserId12 instead`
      }
    }
  }
  if('storyId' in value) {
    if(!('storyId' in value)) {
      return {
        error: `Expected "value" to have a property named ${'storyId'}, but only the following properties were found: ${Object.keys(value)}`
      }
    }
    const valueStoryId13 = value['storyId'];
    if(!(valueStoryId13 instanceof ObjectId)) {
      return {
        error: `Expected value.storyId to be an instance of ObjectId, but got typeof valueStoryId13 instead`
      }
    }
  }
  if('initialContentId' in value) {
    if(!('initialContentId' in value)) {
      return {
        error: `Expected "value" to have a property named ${'initialContentId'}, but only the following properties were found: ${Object.keys(value)}`
      }
    }
    const valueInitialContentId14 = value['initialContentId'];
    if(!(typeof valueInitialContentId14 === 'object' && valueInitialContentId14 !== null)) {
      return {
        error: `Expected value.initialContentId to be an object, but got "${typeof valueInitialContentId14}" instead`
      }
    }
    if(!('id' in valueInitialContentId14 && typeof valueInitialContentId14.id === 'number')) {
      return {
        error: `Expected value.initialContentId to have a property named "id", but only the following properties were found: ${Object.keys(valueInitialContentId14)}`
      }
    }
    switch(valueInitialContentId14.id) {
      case StoryChapterInitialContentIdType.Paragraph:
        if(!('value' in valueInitialContentId14)) {
          return {
            error: `Expected "valueInitialContentId14" to have a property named ${'value'}, but only the following properties were found: ${Object.keys(valueInitialContentId14)}`
          }
        }
        const valueInitialContentId14Value15 = valueInitialContentId14['value'];
        if(!(valueInitialContentId14Value15 instanceof ObjectId)) {
          return {
            error: `Expected valueInitialContentId14.value to be an instance of ObjectId, but got typeof valueInitialContentId14Value15 instead`
          }
        }
        break;
      case StoryChapterInitialContentIdType.UI:
        if(!('value' in valueInitialContentId14)) {
          return {
            error: `Expected "valueInitialContentId14" to have a property named ${'value'}, but only the following properties were found: ${Object.keys(valueInitialContentId14)}`
          }
        }
        const valueInitialContentId14Value16 = valueInitialContentId14['value'];
        if(!(valueInitialContentId14Value16 instanceof ObjectId)) {
          return {
            error: `Expected valueInitialContentId14.value to be an instance of ObjectId, but got typeof valueInitialContentId14Value16 instead`
          }
        }
        break;
    }
  }
  return null;
}
