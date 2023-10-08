import {IContentParagraph} from './ContentParagraph';
import {ObjectId, Filter, Collection, UpdateFilter, OptionalId, WithId} from 'mongodb';
export interface IInputContentUserInterface {
  /**
   * Button rows
   */
  buttonRows: ReadonlyArray<{
    /**
     * Row items.
     */
    buttons: ReadonlyArray<{
      /**
       * Condition that will defined whether this button row will be rendered or not.
       */
      condition: {
        /**
         * JavaScript code to be executed.
         */
        code: string;
      };
      /**
       * The name that should appear in the button.
       */
      title: string;
      /**
       * Script that will run when the user clicks on the button.
       */
      onClick: {
        /**
         * JavaScript code to be executed.
         */
        code: string;
      };
    }>;
  }>;
  /**
   * Next content after the content is fully processed by the client.
   */
  nextContent: {
    /**
     * Condition to be evaluated.
     */
    condition: {
      /**
       * JavaScript code to be executed.
       */
      code: string;
    };
    /**
     * Actual value of the conditional template.
     */
    value: {
      id: ContentUserInterfaceNextContentConditionalValueType.Paragraph;
      value: ObjectId;
    } | {
      id: ContentUserInterfaceNextContentConditionalValueType.UI;
      value: ObjectId;
    };
  };
  /**
   * Content creation date.
   */
  createdAt?: Date;
  /**
   * Content creation date.
   */
  updatedAt?: Date;
}
export interface IContentUserInterface {
  /**
   * Button rows
   */
  buttonRows: ReadonlyArray<{
    /**
     * Row items.
     */
    buttons: ReadonlyArray<{
      /**
       * Condition that will defined whether this button row will be rendered or not.
       */
      condition: {
        /**
         * JavaScript code to be executed.
         */
        code: string;
      };
      /**
       * The name that should appear in the button.
       */
      title: string;
      /**
       * Script that will run when the user clicks on the button.
       */
      onClick: {
        /**
         * JavaScript code to be executed.
         */
        code: string;
      };
    }>;
  }>;
  /**
   * Next content after the content is fully processed by the client.
   */
  nextContent: {
    /**
     * Condition to be evaluated.
     */
    condition: {
      /**
       * JavaScript code to be executed.
       */
      code: string;
    };
    /**
     * Actual value of the conditional template.
     */
    value: {
      id: ContentUserInterfaceNextContentConditionalValueType.Paragraph;
      value: ObjectId;
    } | {
      id: ContentUserInterfaceNextContentConditionalValueType.UI;
      value: ObjectId;
    };
  };
  /**
   * Content creation date.
   */
  createdAt: Date;
  /**
   * Content creation date.
   */
  updatedAt: Date;
}
export enum ContentUserInterfaceNextContentConditionalValueType {
  Paragraph = 0,
  UI = 1,
}
export interface IContentUserInterfacePopulated {
  contentParagraphs: WithId<IContentParagraph>[];
  contentUserInterfaces: WithId<IContentUserInterface>[];
}
export class ContentUserInterfaceModel {
  public constructor(
    private readonly contentUserInterfaces: Collection<IContentUserInterface>,
    private readonly contentParagraphs: Collection<IContentParagraph>,
  ) {}
  public find(value: Filter<IContentUserInterface>) {
    return this.contentUserInterfaces.find(value);
  }
  public findOne(value: Filter<IContentUserInterface>) {
    return this.contentUserInterfaces.findOne(value);
  }
  public deleteOne(value: Filter<IContentUserInterface>) {
    return this.contentUserInterfaces.deleteOne(value);
  }
  public deleteMany(value: Filter<IContentUserInterface>) {
    return this.contentUserInterfaces.deleteMany(value);
  }
  public updateOne(filter: Filter<IContentUserInterface>, update: UpdateFilter<IContentUserInterface> | Partial<IContentUserInterface>) {
    if("$set" in update) {
      update["$set"] = {
        ...update["$set"],
        createdAt: new Date()
      }
      update["$set"] = {
        ...update["$set"],
        updatedAt: new Date()
      }
    } else {
      update = {
        ...update,
        createdAt: new Date()
      }
      update = {
        ...update,
        updatedAt: new Date()
      }
    }
    return this.contentUserInterfaces.updateOne(filter, update);
  }
  public updateMany(filter: Filter<IContentUserInterface>, update: UpdateFilter<IContentUserInterface> | Partial<IContentUserInterface>) {
    if("$set" in update) {
      update["$set"] = {
        ...update["$set"],
        createdAt: new Date()
      }
      update["$set"] = {
        ...update["$set"],
        updatedAt: new Date()
      }
    } else {
      update = {
        ...update,
        createdAt: new Date()
      }
      update = {
        ...update,
        updatedAt: new Date()
      }
    }
    return this.contentUserInterfaces.updateMany(filter, update);
  }
  public countDocuments() {
    return this.contentUserInterfaces.countDocuments();
  }
  public async populate(value: IContentUserInterface | ReadonlyArray<IContentUserInterface>, entities: ("ContentParagraph" | "ContentUserInterface")[] = ["ContentParagraph", "ContentUserInterface"]) {
    const populated: IContentUserInterfacePopulated = {
      contentParagraphs: [],
      contentUserInterfaces: [],
    };
    const ids = {
      contentParagraphs: new Array<ObjectId>(),
      contentUserInterfaces: new Array<ObjectId>(),
    };
    const entitiesArray = Array.isArray(value) ? value : [value];
    for(const item of entitiesArray) {
      if(item.nextContent.value.id === 0) {
        ids.contentParagraphs.push(item.nextContent.value.value);
      }
      if(item.nextContent.value.id === 1) {
        ids.contentUserInterfaces.push(item.nextContent.value.value);
      }
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
  public async insertOne(value: OptionalId<IContentUserInterface>) {
    const validationErr = validateContentUserInterface(value);
    if(validationErr !== null) {
      return validationErr;
    }
    const result = await this.contentUserInterfaces.insertOne(value, { forceServerObjectId: false });
    if(!result.acknowledged) {
      return { error: 'Record creation not acknowledged' };
    }
    return result.insertedId;
  }
}
export function validateContentUserInterface(value: IContentUserInterface) {
  const value0 = value['buttonRows'];
  if(!(Array.isArray(value0))) {
    return {
      error: `Expected value0 to be an array, but got "${typeof value0}" instead`
    }
  }
  for(const item1 of value0) {
    if(!(Array.isArray(item1['buttons']))) {
      return {
        error: `Expected item1['buttons'] to be an array, but got "${typeof item1['buttons']}" instead`
      }
    }
    for(const item3 of item1['buttons']) {
      if(!(typeof item3['condition']['code'] === 'string')) {
        return {
          error: `Expected item3['condition']['code'] to be a string, but got ${typeof item3['condition']['code']} instead`
        }
      }
      if(!(typeof item3['title'] === 'string')) {
        return {
          error: `Expected item3['title'] to be a string, but got ${typeof item3['title']} instead`
        }
      }
      if(!(typeof item3['onClick']['code'] === 'string')) {
        return {
          error: `Expected item3['onClick']['code'] to be a string, but got ${typeof item3['onClick']['code']} instead`
        }
      }
    }
  }
  const value9 = value['nextContent'];
  if(!(typeof value9['condition']['code'] === 'string')) {
    return {
      error: `Expected value9['condition']['code'] to be a string, but got ${typeof value9['condition']['code']} instead`
    }
  }
  switch(value9['value'].id) {
    case ContentUserInterfaceNextContentConditionalValueType.Paragraph:
      if(!(value9['value'].value instanceof ObjectId)) {
        return {
          error: `Expected value9['value'].value to be an instance of ObjectId, but got typeof value9['value'].value instead`
        }
      }
      break;
    case ContentUserInterfaceNextContentConditionalValueType.UI:
      if(!(value9['value'].value instanceof ObjectId)) {
        return {
          error: `Expected value9['value'].value to be an instance of ObjectId, but got typeof value9['value'].value instead`
        }
      }
      break;
  }
  const value15 = value['createdAt'];
  if(!(value15 instanceof Date)) {
    return {
      error: `Expected value15 to be of type Date, but got "${typeof value15}" instead`
    }
  }
  const value16 = value['updatedAt'];
  if(!(value16 instanceof Date)) {
    return {
      error: `Expected value16 to be of type Date, but got "${typeof value16}" instead`
    }
  }
  return null;
}
