import {IContentUserInterface} from './ContentUserInterface';
import {ObjectId, Filter, Collection, UpdateFilter} from 'mongodb';
export interface IContentParagraph {
  paragraphs: ReadonlyArray<{
    sentences: ReadonlyArray<{
      value: string;
      duration: number;
    }>;
  }>;
  nextContent: {
    condition: {
      code: string;
    };
    value: {
      id: ContentParagraphConditionalValueType.Paragraph;
      value: ObjectId;
    } | {
      id: ContentParagraphConditionalValueType.UI;
      value: ObjectId;
    };
  };
}
export enum ContentParagraphConditionalValueType {
  Paragraph = 0,
  UI = 1,
}
export interface IContentParagraphPopulated {
  contentParagraphs: IContentParagraph[];
  contentUserInterfaces: IContentUserInterface[];
}
export class ContentParagraphModel {
  public constructor(
    private readonly contentParagraphs: Collection<IContentParagraph>,
    private readonly contentUserInterfaces: Collection<IContentUserInterface>,
  ) {}
  public find(value: Filter<IContentParagraph>) {
    return this.contentParagraphs.find(value);
  }
  public findOne(value: Filter<IContentParagraph>) {
    return this.contentParagraphs.findOne(value);
  }
  public deleteOne(value: Filter<IContentParagraph>) {
    return this.contentParagraphs.deleteOne(value);
  }
  public deleteMany(value: Filter<IContentParagraph>) {
    return this.contentParagraphs.deleteMany(value);
  }
  public updateOne(filter: Filter<IContentParagraph>, update: UpdateFilter<IContentParagraph> | Partial<IContentParagraph>) {
    return this.contentParagraphs.updateOne(filter, update);
  }
  public updateMany(filter: Filter<IContentParagraph>, update: UpdateFilter<IContentParagraph> | Partial<IContentParagraph>) {
    return this.contentParagraphs.updateMany(filter, update);
  }
  public countDocuments() {
    return this.contentParagraphs.countDocuments();
  }
  public async populate(value: IContentParagraph, entities: ("ContentParagraph" | "ContentUserInterface")[] = ["ContentParagraph", "ContentUserInterface"]) {
    const populated: IContentParagraphPopulated = {
      contentParagraphs: [],
      contentUserInterfaces: [],
    };
    const ids = {
      contentParagraphs: new Array<ObjectId>(),
      contentUserInterfaces: new Array<ObjectId>(),
    };
    for(const arrayElement_1 of value.paragraphs) {
      for(const arrayElement_3 of arrayElement_1.sentences) {
      }
    }
    if(value.nextContent.value.id === 0) {
      ids.contentParagraphs.push(value.nextContent.value.value);
    }
    if(value.nextContent.value.id === 1) {
      ids.contentUserInterfaces.push(value.nextContent.value.value);
    }
    await Promise.all([
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
  public async insertOne(value: IContentParagraph) {
    const validationErr = validateContentParagraph(value);
    if(validationErr !== null) {
      return validationErr;
    }
    const result = await this.contentParagraphs.insertOne(value, { forceServerObjectId: false });
    if(!result.acknowledged) {
      return { error: 'Record creation not acknowledged' };
    }
    return result.insertedId;
  }
}
export function validateContentParagraph(value: IContentParagraph) {
  const value0 = value['paragraphs'];
  if(!(Array.isArray(value0))) {
    return {
      error: `Expected value0 to be an array, but got "${typeof value0}" instead`
    }
  }
  for(const item1 of value0) {
    if(!(Array.isArray(item1['sentences']))) {
      return {
        error: `Expected item1['sentences'] to be an array, but got "${typeof item1['sentences']}" instead`
      }
    }
    for(const item3 of item1['sentences']) {
      if(!(typeof item3['value'] === 'string')) {
        return {
          error: `Expected item3['value'] to be a string, but got ${typeof item3['value']} instead`
        }
      }
      if(!(typeof item3['duration'] === 'number')) {
        return {
          error: `Expected item3['duration'] to be number, but got "${typeof item3['duration']}" instead`
        }
      }
    }
  }
  const value6 = value['nextContent'];
  if(!(typeof value6['condition']['code'] === 'string')) {
    return {
      error: `Expected value6['condition']['code'] to be a string, but got ${typeof value6['condition']['code']} instead`
    }
  }
  switch(value6['value'].id) {
    case ContentParagraphConditionalValueType.Paragraph:
      if(!(value6['value'].value instanceof ObjectId)) {
        return {
          error: `Expected value6['value'].value to be an instance of ObjectId, but got typeof value6['value'].value instead`
        }
      }
      break;
    case ContentParagraphConditionalValueType.UI:
      if(!(value6['value'].value instanceof ObjectId)) {
        return {
          error: `Expected value6['value'].value to be an instance of ObjectId, but got typeof value6['value'].value instead`
        }
      }
      break;
  }
  return null;
}
