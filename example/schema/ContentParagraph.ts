import {IContentUserInterface} from './ContentUserInterface';
import {ObjectId, Filter, Collection, UpdateFilter, OptionalId, Document, CountDocumentsOptions, WithId} from 'mongodb';
export interface IInputContentParagraph {
  /**
   * Paragraph list
   */
  paragraphs: ReadonlyArray<{
    /**
     * Paragraph sentences.
     */
    sentences: ReadonlyArray<{
      /**
       * Sentence.
       */
      value: string;
      /**
       * How long is the sentence gonna take to be finally rendered.
       */
      duration: number;
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
      id: ContentParagraphNextContentConditionalValueType.Paragraph;
      value: ObjectId;
    } | {
      id: ContentParagraphNextContentConditionalValueType.UI;
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
export interface IContentParagraph {
  /**
   * Paragraph list
   */
  paragraphs: ReadonlyArray<{
    /**
     * Paragraph sentences.
     */
    sentences: ReadonlyArray<{
      /**
       * Sentence.
       */
      value: string;
      /**
       * How long is the sentence gonna take to be finally rendered.
       */
      duration: number;
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
      id: ContentParagraphNextContentConditionalValueType.Paragraph;
      value: ObjectId;
    } | {
      id: ContentParagraphNextContentConditionalValueType.UI;
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
export enum ContentParagraphNextContentConditionalValueType {
  Paragraph = 0,
  UI = 1,
}
export interface IContentParagraphPopulation {
  contentParagraphs: WithId<IContentParagraph>[];
  contentUserInterfaces: WithId<IContentUserInterface>[];
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
  public async updateOne(filter: Filter<IContentParagraph>, update: UpdateFilter<IContentParagraph> | Partial<IContentParagraph>) {
    if("$set" in update) {
      if(!update['$set']) {
        update['$set'] = {};
      }
      let changes = {...update['$set']};
      changes.updatedAt = new Date();
      update['$set'] = changes;
      const validation = partiallyValidateContentParagraph(update['$set']);
      if(validation !== null) {
        return validation;
      }
    } else {
      const validation = partiallyValidateContentParagraph(update);
      if(validation !== null) {
        return validation;
      }
    }
    const result = await this.contentParagraphs.updateOne(filter, update);
    if(!result.acknowledged) {
      return null;
    }
    return { success: result };
  }
  public async updateMany(filter: Filter<IContentParagraph>, update: UpdateFilter<IContentParagraph> | Partial<IContentParagraph>) {
    if("$set" in update) {
      if(!update['$set']) {
        update['$set'] = {};
      }
      let changes = {...update['$set']};
      changes.updatedAt = new Date();
      update['$set'] = changes;
      const validation = partiallyValidateContentParagraph(update['$set']);
      if(validation !== null) {
        return validation;
      }
    } else {
      const validation = partiallyValidateContentParagraph(update);
      if(validation !== null) {
        return validation;
      }
    }
    const result = await this.contentParagraphs.updateMany(filter, update);
    if(!result.acknowledged) {
      return null;
    }
    return { success: result };
  }
  public countDocuments(filter?: Document, options?: CountDocumentsOptions) {
    return this.contentParagraphs.countDocuments(filter, options);
  }
  public async populate(value: IContentParagraph | ReadonlyArray<IContentParagraph>, entities: ("ContentParagraph" | "ContentUserInterface")[] = ["ContentParagraph", "ContentUserInterface"]) {
    const population: IContentParagraphPopulation = {
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
  public async add(value: OptionalId<IContentParagraph>) {
    const result = await this.insertOne(value);
    if('error' in result) {
      return result;
    }
    return this.findOne({_id: result});
  }
  public async insertOne(value: OptionalId<IContentParagraph>) {
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
export function validateContentParagraph(value: unknown) {
  if(!(typeof value === 'object' && value !== null)) {
    return {
      error: `Expected "value" to be an object, but got typeof ${typeof value} instead`
    }
  }
  if(!('paragraphs' in value)) {
    return {
      error: `Expected "value" to have a property named ${'paragraphs'}, but only the following properties were found: ${Object.keys(value)}`
    }
  }
  const valueParagraphs1 = value['paragraphs'];
  if(!(Array.isArray(valueParagraphs1))) {
    return {
      error: `Expected value.paragraphs to be an array, but got "${typeof valueParagraphs1}" instead`
    }
  }
  for(let index1 = 0; index1 < valueParagraphs1.length; index1++) {
    if(!(index1 in valueParagraphs1)) {
      return {
        error: `Expected "valueParagraphs1" to have a property named ${index1}, but only the following properties were found: ${Object.keys(valueParagraphs1)}`
      }
    }
    const valueParagraphs1Index12 = valueParagraphs1[index1];
    if(!(typeof valueParagraphs1Index12 === 'object' && valueParagraphs1Index12 !== null)) {
      return {
        error: `Expected "valueParagraphs1Index12" to be an object, but got typeof ${typeof valueParagraphs1Index12} instead`
      }
    }
    if(!('sentences' in valueParagraphs1Index12)) {
      return {
        error: `Expected "valueParagraphs1Index12" to have a property named ${'sentences'}, but only the following properties were found: ${Object.keys(valueParagraphs1Index12)}`
      }
    }
    const valueParagraphs1Index12Sentences3 = valueParagraphs1Index12['sentences'];
    if(!(Array.isArray(valueParagraphs1Index12Sentences3))) {
      return {
        error: `Expected valueParagraphs1Index12.sentences to be an array, but got "${typeof valueParagraphs1Index12Sentences3}" instead`
      }
    }
    for(let index3 = 0; index3 < valueParagraphs1Index12Sentences3.length; index3++) {
      if(!(index3 in valueParagraphs1Index12Sentences3)) {
        return {
          error: `Expected "valueParagraphs1Index12Sentences3" to have a property named ${index3}, but only the following properties were found: ${Object.keys(valueParagraphs1Index12Sentences3)}`
        }
      }
      const valueParagraphs1Index12Sentences3Index34 = valueParagraphs1Index12Sentences3[index3];
      if(!(typeof valueParagraphs1Index12Sentences3Index34 === 'object' && valueParagraphs1Index12Sentences3Index34 !== null)) {
        return {
          error: `Expected "valueParagraphs1Index12Sentences3Index34" to be an object, but got typeof ${typeof valueParagraphs1Index12Sentences3Index34} instead`
        }
      }
      if(!('value' in valueParagraphs1Index12Sentences3Index34)) {
        return {
          error: `Expected "valueParagraphs1Index12Sentences3Index34" to have a property named ${'value'}, but only the following properties were found: ${Object.keys(valueParagraphs1Index12Sentences3Index34)}`
        }
      }
      const valueParagraphs1Index12Sentences3Index34Value5 = valueParagraphs1Index12Sentences3Index34['value'];
      if(!(typeof valueParagraphs1Index12Sentences3Index34Value5 === 'string')) {
        return {
          error: `Expected valueParagraphs1Index12Sentences3Index34.value to be a string, but got ${typeof valueParagraphs1Index12Sentences3Index34Value5} instead`
        }
      }
      if(!('duration' in valueParagraphs1Index12Sentences3Index34)) {
        return {
          error: `Expected "valueParagraphs1Index12Sentences3Index34" to have a property named ${'duration'}, but only the following properties were found: ${Object.keys(valueParagraphs1Index12Sentences3Index34)}`
        }
      }
      const valueParagraphs1Index12Sentences3Index34Duration6 = valueParagraphs1Index12Sentences3Index34['duration'];
      if(!(typeof valueParagraphs1Index12Sentences3Index34Duration6 === 'number')) {
        return {
          error: `Expected valueParagraphs1Index12Sentences3Index34.duration to be number, but got "${typeof valueParagraphs1Index12Sentences3Index34Duration6}" instead`
        }
      }
    }
  }
  if(!('nextContent' in value)) {
    return {
      error: `Expected "value" to have a property named ${'nextContent'}, but only the following properties were found: ${Object.keys(value)}`
    }
  }
  const valueNextContent7 = value['nextContent'];
  if(!(typeof valueNextContent7 === 'object' && valueNextContent7 !== null)) {
    return {
      error: `Expected "valueNextContent7" to be an object, but got typeof ${typeof valueNextContent7} instead`
    }
  }
  if(!('condition' in valueNextContent7)) {
    return {
      error: `Expected "valueNextContent7" to have a property named ${'condition'}, but only the following properties were found: ${Object.keys(valueNextContent7)}`
    }
  }
  const valueNextContent7Condition8 = valueNextContent7['condition'];
  if(!(typeof valueNextContent7Condition8 === 'object' && valueNextContent7Condition8 !== null)) {
    return {
      error: `Expected "valueNextContent7Condition8" to be an object, but got typeof ${typeof valueNextContent7Condition8} instead`
    }
  }
  if(!('code' in valueNextContent7Condition8)) {
    return {
      error: `Expected "valueNextContent7Condition8" to have a property named ${'code'}, but only the following properties were found: ${Object.keys(valueNextContent7Condition8)}`
    }
  }
  const valueNextContent7Condition8Code9 = valueNextContent7Condition8['code'];
  if(!(typeof valueNextContent7Condition8Code9 === 'string')) {
    return {
      error: `Expected valueNextContent7Condition8.code to be a string, but got ${typeof valueNextContent7Condition8Code9} instead`
    }
  }
  if(!('value' in valueNextContent7)) {
    return {
      error: `Expected "valueNextContent7" to have a property named ${'value'}, but only the following properties were found: ${Object.keys(valueNextContent7)}`
    }
  }
  const valueNextContent7Value10 = valueNextContent7['value'];
  if(!(typeof valueNextContent7Value10 === 'object' && valueNextContent7Value10 !== null)) {
    return {
      error: `Expected valueNextContent7.value to be an object, but got "${typeof valueNextContent7Value10}" instead`
    }
  }
  if(!('id' in valueNextContent7Value10 && typeof valueNextContent7Value10.id === 'number')) {
    return {
      error: `Expected valueNextContent7.value to have a property named "id", but only the following properties were found: ${Object.keys(valueNextContent7Value10)}`
    }
  }
  switch(valueNextContent7Value10.id) {
    case ContentParagraphNextContentConditionalValueType.Paragraph:
      if(!('value' in valueNextContent7Value10)) {
        return {
          error: `Expected "valueNextContent7Value10" to have a property named ${'value'}, but only the following properties were found: ${Object.keys(valueNextContent7Value10)}`
        }
      }
      const valueNextContent7Value10Value11 = valueNextContent7Value10['value'];
      if(!(valueNextContent7Value10Value11 instanceof ObjectId)) {
        return {
          error: `Expected valueNextContent7Value10.value to be an instance of ObjectId, but got typeof valueNextContent7Value10Value11 instead`
        }
      }
      break;
    case ContentParagraphNextContentConditionalValueType.UI:
      if(!('value' in valueNextContent7Value10)) {
        return {
          error: `Expected "valueNextContent7Value10" to have a property named ${'value'}, but only the following properties were found: ${Object.keys(valueNextContent7Value10)}`
        }
      }
      const valueNextContent7Value10Value12 = valueNextContent7Value10['value'];
      if(!(valueNextContent7Value10Value12 instanceof ObjectId)) {
        return {
          error: `Expected valueNextContent7Value10.value to be an instance of ObjectId, but got typeof valueNextContent7Value10Value12 instead`
        }
      }
      break;
  }
  if(!('createdAt' in value)) {
    return {
      error: `Expected "value" to have a property named ${'createdAt'}, but only the following properties were found: ${Object.keys(value)}`
    }
  }
  const valueCreatedAt13 = value['createdAt'];
  if(!(valueCreatedAt13 instanceof Date)) {
    return {
      error: `Expected value.createdAt to be of type Date, but got "${typeof valueCreatedAt13}" instead`
    }
  }
  if(!('updatedAt' in value)) {
    return {
      error: `Expected "value" to have a property named ${'updatedAt'}, but only the following properties were found: ${Object.keys(value)}`
    }
  }
  const valueUpdatedAt14 = value['updatedAt'];
  if(!(valueUpdatedAt14 instanceof Date)) {
    return {
      error: `Expected value.updatedAt to be of type Date, but got "${typeof valueUpdatedAt14}" instead`
    }
  }
  return null;
}
export function partiallyValidateContentParagraph(value: unknown) {
  if(!(typeof value === 'object' && value !== null)) {
    return {
      error: `Expected "value" to be an object, but got typeof ${typeof value} instead`
    }
  }
  if('paragraphs' in value) {
    if(!('paragraphs' in value)) {
      return {
        error: `Expected "value" to have a property named ${'paragraphs'}, but only the following properties were found: ${Object.keys(value)}`
      }
    }
    const valueParagraphs15 = value['paragraphs'];
    if(!(Array.isArray(valueParagraphs15))) {
      return {
        error: `Expected value.paragraphs to be an array, but got "${typeof valueParagraphs15}" instead`
      }
    }
    for(let index15 = 0; index15 < valueParagraphs15.length; index15++) {
      if(!(index15 in valueParagraphs15)) {
        return {
          error: `Expected "valueParagraphs15" to have a property named ${index15}, but only the following properties were found: ${Object.keys(valueParagraphs15)}`
        }
      }
      const valueParagraphs15Index1516 = valueParagraphs15[index15];
      if(!(typeof valueParagraphs15Index1516 === 'object' && valueParagraphs15Index1516 !== null)) {
        return {
          error: `Expected "valueParagraphs15Index1516" to be an object, but got typeof ${typeof valueParagraphs15Index1516} instead`
        }
      }
      if('sentences' in valueParagraphs15Index1516) {
        if(!('sentences' in valueParagraphs15Index1516)) {
          return {
            error: `Expected "valueParagraphs15Index1516" to have a property named ${'sentences'}, but only the following properties were found: ${Object.keys(valueParagraphs15Index1516)}`
          }
        }
        const valueParagraphs15Index1516Sentences17 = valueParagraphs15Index1516['sentences'];
        if(!(Array.isArray(valueParagraphs15Index1516Sentences17))) {
          return {
            error: `Expected valueParagraphs15Index1516.sentences to be an array, but got "${typeof valueParagraphs15Index1516Sentences17}" instead`
          }
        }
        for(let index17 = 0; index17 < valueParagraphs15Index1516Sentences17.length; index17++) {
          if(!(index17 in valueParagraphs15Index1516Sentences17)) {
            return {
              error: `Expected "valueParagraphs15Index1516Sentences17" to have a property named ${index17}, but only the following properties were found: ${Object.keys(valueParagraphs15Index1516Sentences17)}`
            }
          }
          const valueParagraphs15Index1516Sentences17Index1718 = valueParagraphs15Index1516Sentences17[index17];
          if(!(typeof valueParagraphs15Index1516Sentences17Index1718 === 'object' && valueParagraphs15Index1516Sentences17Index1718 !== null)) {
            return {
              error: `Expected "valueParagraphs15Index1516Sentences17Index1718" to be an object, but got typeof ${typeof valueParagraphs15Index1516Sentences17Index1718} instead`
            }
          }
          if('value' in valueParagraphs15Index1516Sentences17Index1718) {
            if(!('value' in valueParagraphs15Index1516Sentences17Index1718)) {
              return {
                error: `Expected "valueParagraphs15Index1516Sentences17Index1718" to have a property named ${'value'}, but only the following properties were found: ${Object.keys(valueParagraphs15Index1516Sentences17Index1718)}`
              }
            }
            const valueParagraphs15Index1516Sentences17Index1718Value19 = valueParagraphs15Index1516Sentences17Index1718['value'];
            if(!(typeof valueParagraphs15Index1516Sentences17Index1718Value19 === 'string')) {
              return {
                error: `Expected valueParagraphs15Index1516Sentences17Index1718.value to be a string, but got ${typeof valueParagraphs15Index1516Sentences17Index1718Value19} instead`
              }
            }
          }
          if('duration' in valueParagraphs15Index1516Sentences17Index1718) {
            if(!('duration' in valueParagraphs15Index1516Sentences17Index1718)) {
              return {
                error: `Expected "valueParagraphs15Index1516Sentences17Index1718" to have a property named ${'duration'}, but only the following properties were found: ${Object.keys(valueParagraphs15Index1516Sentences17Index1718)}`
              }
            }
            const valueParagraphs15Index1516Sentences17Index1718Duration20 = valueParagraphs15Index1516Sentences17Index1718['duration'];
            if(!(typeof valueParagraphs15Index1516Sentences17Index1718Duration20 === 'number')) {
              return {
                error: `Expected valueParagraphs15Index1516Sentences17Index1718.duration to be number, but got "${typeof valueParagraphs15Index1516Sentences17Index1718Duration20}" instead`
              }
            }
          }
        }
      }
    }
  }
  if('nextContent' in value) {
    if(!('nextContent' in value)) {
      return {
        error: `Expected "value" to have a property named ${'nextContent'}, but only the following properties were found: ${Object.keys(value)}`
      }
    }
    const valueNextContent21 = value['nextContent'];
    if(!(typeof valueNextContent21 === 'object' && valueNextContent21 !== null)) {
      return {
        error: `Expected "valueNextContent21" to be an object, but got typeof ${typeof valueNextContent21} instead`
      }
    }
    if('condition' in valueNextContent21) {
      if(!('condition' in valueNextContent21)) {
        return {
          error: `Expected "valueNextContent21" to have a property named ${'condition'}, but only the following properties were found: ${Object.keys(valueNextContent21)}`
        }
      }
      const valueNextContent21Condition22 = valueNextContent21['condition'];
      if(!(typeof valueNextContent21Condition22 === 'object' && valueNextContent21Condition22 !== null)) {
        return {
          error: `Expected "valueNextContent21Condition22" to be an object, but got typeof ${typeof valueNextContent21Condition22} instead`
        }
      }
      if('code' in valueNextContent21Condition22) {
        if(!('code' in valueNextContent21Condition22)) {
          return {
            error: `Expected "valueNextContent21Condition22" to have a property named ${'code'}, but only the following properties were found: ${Object.keys(valueNextContent21Condition22)}`
          }
        }
        const valueNextContent21Condition22Code23 = valueNextContent21Condition22['code'];
        if(!(typeof valueNextContent21Condition22Code23 === 'string')) {
          return {
            error: `Expected valueNextContent21Condition22.code to be a string, but got ${typeof valueNextContent21Condition22Code23} instead`
          }
        }
      }
    }
    if('value' in valueNextContent21) {
      if(!('value' in valueNextContent21)) {
        return {
          error: `Expected "valueNextContent21" to have a property named ${'value'}, but only the following properties were found: ${Object.keys(valueNextContent21)}`
        }
      }
      const valueNextContent21Value24 = valueNextContent21['value'];
      if(!(typeof valueNextContent21Value24 === 'object' && valueNextContent21Value24 !== null)) {
        return {
          error: `Expected valueNextContent21.value to be an object, but got "${typeof valueNextContent21Value24}" instead`
        }
      }
      if(!('id' in valueNextContent21Value24 && typeof valueNextContent21Value24.id === 'number')) {
        return {
          error: `Expected valueNextContent21.value to have a property named "id", but only the following properties were found: ${Object.keys(valueNextContent21Value24)}`
        }
      }
      switch(valueNextContent21Value24.id) {
        case ContentParagraphNextContentConditionalValueType.Paragraph:
          if(!('value' in valueNextContent21Value24)) {
            return {
              error: `Expected "valueNextContent21Value24" to have a property named ${'value'}, but only the following properties were found: ${Object.keys(valueNextContent21Value24)}`
            }
          }
          const valueNextContent21Value24Value25 = valueNextContent21Value24['value'];
          if(!(valueNextContent21Value24Value25 instanceof ObjectId)) {
            return {
              error: `Expected valueNextContent21Value24.value to be an instance of ObjectId, but got typeof valueNextContent21Value24Value25 instead`
            }
          }
          break;
        case ContentParagraphNextContentConditionalValueType.UI:
          if(!('value' in valueNextContent21Value24)) {
            return {
              error: `Expected "valueNextContent21Value24" to have a property named ${'value'}, but only the following properties were found: ${Object.keys(valueNextContent21Value24)}`
            }
          }
          const valueNextContent21Value24Value26 = valueNextContent21Value24['value'];
          if(!(valueNextContent21Value24Value26 instanceof ObjectId)) {
            return {
              error: `Expected valueNextContent21Value24.value to be an instance of ObjectId, but got typeof valueNextContent21Value24Value26 instead`
            }
          }
          break;
      }
    }
  }
  if('createdAt' in value) {
    if(!('createdAt' in value)) {
      return {
        error: `Expected "value" to have a property named ${'createdAt'}, but only the following properties were found: ${Object.keys(value)}`
      }
    }
    const valueCreatedAt27 = value['createdAt'];
    if(!(valueCreatedAt27 instanceof Date)) {
      return {
        error: `Expected value.createdAt to be of type Date, but got "${typeof valueCreatedAt27}" instead`
      }
    }
  }
  if('updatedAt' in value) {
    if(!('updatedAt' in value)) {
      return {
        error: `Expected "value" to have a property named ${'updatedAt'}, but only the following properties were found: ${Object.keys(value)}`
      }
    }
    const valueUpdatedAt28 = value['updatedAt'];
    if(!(valueUpdatedAt28 instanceof Date)) {
      return {
        error: `Expected value.updatedAt to be of type Date, but got "${typeof valueUpdatedAt28}" instead`
      }
    }
  }
  return null;
}
