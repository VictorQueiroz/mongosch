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
export interface IContentUserInterfacePopulation {
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
  public async updateOne(filter: Filter<IContentUserInterface>, update: UpdateFilter<IContentUserInterface> | Partial<IContentUserInterface>) {
    if("$set" in update) {
      const validation = partiallyValidateContentUserInterface(update['$set']);
      if(validation !== null) {
        return validation;
      }
    } else {
      const validation = partiallyValidateContentUserInterface(update);
      if(validation !== null) {
        return validation;
      }
    }
    const result = await this.contentUserInterfaces.updateOne(filter, update);
    if(!result.acknowledged) {
      return null;
    }
    return { success: result };
  }
  public async updateMany(filter: Filter<IContentUserInterface>, update: UpdateFilter<IContentUserInterface> | Partial<IContentUserInterface>) {
    if("$set" in update) {
      const validation = partiallyValidateContentUserInterface(update['$set']);
      if(validation !== null) {
        return validation;
      }
    } else {
      const validation = partiallyValidateContentUserInterface(update);
      if(validation !== null) {
        return validation;
      }
    }
    const result = await this.contentUserInterfaces.updateMany(filter, update);
    if(!result.acknowledged) {
      return null;
    }
    return { success: result };
  }
  public countDocuments() {
    return this.contentUserInterfaces.countDocuments();
  }
  public async populate(value: IContentUserInterface | ReadonlyArray<IContentUserInterface>, entities: ("ContentParagraph" | "ContentUserInterface")[] = ["ContentParagraph", "ContentUserInterface"]) {
    const population: IContentUserInterfacePopulation = {
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
  public async add(value: OptionalId<IContentUserInterface>) {
    const result = await this.insertOne(value);
    if('error' in result) {
      return result;
    }
    return this.findOne({_id: result});
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
export function validateContentUserInterface(value: unknown) {
  if(!(typeof value === 'object' && value !== null)) {
    return {
      error: `Expected "value" to be an object, but got typeof ${typeof value} instead`
    }
  }
  if(!('buttonRows' in value)) {
    return {
      error: `Expected "value" to have a property named ${'buttonRows'}, but only the following properties were found: ${Object.keys(value)}`
    }
  }
  const valueButtonRows1 = value['buttonRows'];
  if(!(Array.isArray(valueButtonRows1))) {
    return {
      error: `Expected value.buttonRows to be an array, but got "${typeof valueButtonRows1}" instead`
    }
  }
  for(let index1 = 0; index1 < valueButtonRows1.length; index1++) {
    if(!(index1 in valueButtonRows1)) {
      return {
        error: `Expected "valueButtonRows1" to have a property named ${index1}, but only the following properties were found: ${Object.keys(valueButtonRows1)}`
      }
    }
    const valueButtonRows1Index12 = valueButtonRows1[index1];
    if(!(typeof valueButtonRows1Index12 === 'object' && valueButtonRows1Index12 !== null)) {
      return {
        error: `Expected "valueButtonRows1Index12" to be an object, but got typeof ${typeof valueButtonRows1Index12} instead`
      }
    }
    if(!('buttons' in valueButtonRows1Index12)) {
      return {
        error: `Expected "valueButtonRows1Index12" to have a property named ${'buttons'}, but only the following properties were found: ${Object.keys(valueButtonRows1Index12)}`
      }
    }
    const valueButtonRows1Index12Buttons3 = valueButtonRows1Index12['buttons'];
    if(!(Array.isArray(valueButtonRows1Index12Buttons3))) {
      return {
        error: `Expected valueButtonRows1Index12.buttons to be an array, but got "${typeof valueButtonRows1Index12Buttons3}" instead`
      }
    }
    for(let index3 = 0; index3 < valueButtonRows1Index12Buttons3.length; index3++) {
      if(!(index3 in valueButtonRows1Index12Buttons3)) {
        return {
          error: `Expected "valueButtonRows1Index12Buttons3" to have a property named ${index3}, but only the following properties were found: ${Object.keys(valueButtonRows1Index12Buttons3)}`
        }
      }
      const valueButtonRows1Index12Buttons3Index34 = valueButtonRows1Index12Buttons3[index3];
      if(!(typeof valueButtonRows1Index12Buttons3Index34 === 'object' && valueButtonRows1Index12Buttons3Index34 !== null)) {
        return {
          error: `Expected "valueButtonRows1Index12Buttons3Index34" to be an object, but got typeof ${typeof valueButtonRows1Index12Buttons3Index34} instead`
        }
      }
      if(!('condition' in valueButtonRows1Index12Buttons3Index34)) {
        return {
          error: `Expected "valueButtonRows1Index12Buttons3Index34" to have a property named ${'condition'}, but only the following properties were found: ${Object.keys(valueButtonRows1Index12Buttons3Index34)}`
        }
      }
      const valueButtonRows1Index12Buttons3Index34Condition5 = valueButtonRows1Index12Buttons3Index34['condition'];
      if(!(typeof valueButtonRows1Index12Buttons3Index34Condition5 === 'object' && valueButtonRows1Index12Buttons3Index34Condition5 !== null)) {
        return {
          error: `Expected "valueButtonRows1Index12Buttons3Index34Condition5" to be an object, but got typeof ${typeof valueButtonRows1Index12Buttons3Index34Condition5} instead`
        }
      }
      if(!('code' in valueButtonRows1Index12Buttons3Index34Condition5)) {
        return {
          error: `Expected "valueButtonRows1Index12Buttons3Index34Condition5" to have a property named ${'code'}, but only the following properties were found: ${Object.keys(valueButtonRows1Index12Buttons3Index34Condition5)}`
        }
      }
      const valueButtonRows1Index12Buttons3Index34Condition5Code6 = valueButtonRows1Index12Buttons3Index34Condition5['code'];
      if(!(typeof valueButtonRows1Index12Buttons3Index34Condition5Code6 === 'string')) {
        return {
          error: `Expected valueButtonRows1Index12Buttons3Index34Condition5.code to be a string, but got ${typeof valueButtonRows1Index12Buttons3Index34Condition5Code6} instead`
        }
      }
      if(!('title' in valueButtonRows1Index12Buttons3Index34)) {
        return {
          error: `Expected "valueButtonRows1Index12Buttons3Index34" to have a property named ${'title'}, but only the following properties were found: ${Object.keys(valueButtonRows1Index12Buttons3Index34)}`
        }
      }
      const valueButtonRows1Index12Buttons3Index34Title7 = valueButtonRows1Index12Buttons3Index34['title'];
      if(!(typeof valueButtonRows1Index12Buttons3Index34Title7 === 'string')) {
        return {
          error: `Expected valueButtonRows1Index12Buttons3Index34.title to be a string, but got ${typeof valueButtonRows1Index12Buttons3Index34Title7} instead`
        }
      }
      if(!('onClick' in valueButtonRows1Index12Buttons3Index34)) {
        return {
          error: `Expected "valueButtonRows1Index12Buttons3Index34" to have a property named ${'onClick'}, but only the following properties were found: ${Object.keys(valueButtonRows1Index12Buttons3Index34)}`
        }
      }
      const valueButtonRows1Index12Buttons3Index34OnClick8 = valueButtonRows1Index12Buttons3Index34['onClick'];
      if(!(typeof valueButtonRows1Index12Buttons3Index34OnClick8 === 'object' && valueButtonRows1Index12Buttons3Index34OnClick8 !== null)) {
        return {
          error: `Expected "valueButtonRows1Index12Buttons3Index34OnClick8" to be an object, but got typeof ${typeof valueButtonRows1Index12Buttons3Index34OnClick8} instead`
        }
      }
      if(!('code' in valueButtonRows1Index12Buttons3Index34OnClick8)) {
        return {
          error: `Expected "valueButtonRows1Index12Buttons3Index34OnClick8" to have a property named ${'code'}, but only the following properties were found: ${Object.keys(valueButtonRows1Index12Buttons3Index34OnClick8)}`
        }
      }
      const valueButtonRows1Index12Buttons3Index34OnClick8Code9 = valueButtonRows1Index12Buttons3Index34OnClick8['code'];
      if(!(typeof valueButtonRows1Index12Buttons3Index34OnClick8Code9 === 'string')) {
        return {
          error: `Expected valueButtonRows1Index12Buttons3Index34OnClick8.code to be a string, but got ${typeof valueButtonRows1Index12Buttons3Index34OnClick8Code9} instead`
        }
      }
    }
  }
  if(!('nextContent' in value)) {
    return {
      error: `Expected "value" to have a property named ${'nextContent'}, but only the following properties were found: ${Object.keys(value)}`
    }
  }
  const valueNextContent10 = value['nextContent'];
  if(!(typeof valueNextContent10 === 'object' && valueNextContent10 !== null)) {
    return {
      error: `Expected "valueNextContent10" to be an object, but got typeof ${typeof valueNextContent10} instead`
    }
  }
  if(!('condition' in valueNextContent10)) {
    return {
      error: `Expected "valueNextContent10" to have a property named ${'condition'}, but only the following properties were found: ${Object.keys(valueNextContent10)}`
    }
  }
  const valueNextContent10Condition11 = valueNextContent10['condition'];
  if(!(typeof valueNextContent10Condition11 === 'object' && valueNextContent10Condition11 !== null)) {
    return {
      error: `Expected "valueNextContent10Condition11" to be an object, but got typeof ${typeof valueNextContent10Condition11} instead`
    }
  }
  if(!('code' in valueNextContent10Condition11)) {
    return {
      error: `Expected "valueNextContent10Condition11" to have a property named ${'code'}, but only the following properties were found: ${Object.keys(valueNextContent10Condition11)}`
    }
  }
  const valueNextContent10Condition11Code12 = valueNextContent10Condition11['code'];
  if(!(typeof valueNextContent10Condition11Code12 === 'string')) {
    return {
      error: `Expected valueNextContent10Condition11.code to be a string, but got ${typeof valueNextContent10Condition11Code12} instead`
    }
  }
  if(!('value' in valueNextContent10)) {
    return {
      error: `Expected "valueNextContent10" to have a property named ${'value'}, but only the following properties were found: ${Object.keys(valueNextContent10)}`
    }
  }
  const valueNextContent10Value13 = valueNextContent10['value'];
  if(!(typeof valueNextContent10Value13 === 'object' && valueNextContent10Value13 !== null)) {
    return {
      error: `Expected valueNextContent10.value to be an object, but got "${typeof valueNextContent10Value13}" instead`
    }
  }
  if(!('id' in valueNextContent10Value13 && typeof valueNextContent10Value13.id === 'number')) {
    return {
      error: `Expected valueNextContent10.value to have a property named "id", but only the following properties were found: ${Object.keys(valueNextContent10Value13)}`
    }
  }
  switch(valueNextContent10Value13.id) {
    case ContentUserInterfaceNextContentConditionalValueType.Paragraph:
      if(!('value' in valueNextContent10Value13)) {
        return {
          error: `Expected "valueNextContent10Value13" to have a property named ${'value'}, but only the following properties were found: ${Object.keys(valueNextContent10Value13)}`
        }
      }
      const valueNextContent10Value13Value14 = valueNextContent10Value13['value'];
      if(!(valueNextContent10Value13Value14 instanceof ObjectId)) {
        return {
          error: `Expected valueNextContent10Value13.value to be an instance of ObjectId, but got typeof valueNextContent10Value13Value14 instead`
        }
      }
      break;
    case ContentUserInterfaceNextContentConditionalValueType.UI:
      if(!('value' in valueNextContent10Value13)) {
        return {
          error: `Expected "valueNextContent10Value13" to have a property named ${'value'}, but only the following properties were found: ${Object.keys(valueNextContent10Value13)}`
        }
      }
      const valueNextContent10Value13Value15 = valueNextContent10Value13['value'];
      if(!(valueNextContent10Value13Value15 instanceof ObjectId)) {
        return {
          error: `Expected valueNextContent10Value13.value to be an instance of ObjectId, but got typeof valueNextContent10Value13Value15 instead`
        }
      }
      break;
  }
  if(!('createdAt' in value)) {
    return {
      error: `Expected "value" to have a property named ${'createdAt'}, but only the following properties were found: ${Object.keys(value)}`
    }
  }
  const valueCreatedAt16 = value['createdAt'];
  if(!(valueCreatedAt16 instanceof Date)) {
    return {
      error: `Expected value.createdAt to be of type Date, but got "${typeof valueCreatedAt16}" instead`
    }
  }
  if(!('updatedAt' in value)) {
    return {
      error: `Expected "value" to have a property named ${'updatedAt'}, but only the following properties were found: ${Object.keys(value)}`
    }
  }
  const valueUpdatedAt17 = value['updatedAt'];
  if(!(valueUpdatedAt17 instanceof Date)) {
    return {
      error: `Expected value.updatedAt to be of type Date, but got "${typeof valueUpdatedAt17}" instead`
    }
  }
  return null;
}
export function partiallyValidateContentUserInterface(value: unknown) {
  if(!(typeof value === 'object' && value !== null)) {
    return {
      error: `Expected "value" to be an object, but got typeof ${typeof value} instead`
    }
  }
  if('buttonRows' in value) {
    if(!('buttonRows' in value)) {
      return {
        error: `Expected "value" to have a property named ${'buttonRows'}, but only the following properties were found: ${Object.keys(value)}`
      }
    }
    const valueButtonRows18 = value['buttonRows'];
    if(!(Array.isArray(valueButtonRows18))) {
      return {
        error: `Expected value.buttonRows to be an array, but got "${typeof valueButtonRows18}" instead`
      }
    }
    for(let index18 = 0; index18 < valueButtonRows18.length; index18++) {
      if(!(index18 in valueButtonRows18)) {
        return {
          error: `Expected "valueButtonRows18" to have a property named ${index18}, but only the following properties were found: ${Object.keys(valueButtonRows18)}`
        }
      }
      const valueButtonRows18Index1819 = valueButtonRows18[index18];
      if(!(typeof valueButtonRows18Index1819 === 'object' && valueButtonRows18Index1819 !== null)) {
        return {
          error: `Expected "valueButtonRows18Index1819" to be an object, but got typeof ${typeof valueButtonRows18Index1819} instead`
        }
      }
      if('buttons' in valueButtonRows18Index1819) {
        if(!('buttons' in valueButtonRows18Index1819)) {
          return {
            error: `Expected "valueButtonRows18Index1819" to have a property named ${'buttons'}, but only the following properties were found: ${Object.keys(valueButtonRows18Index1819)}`
          }
        }
        const valueButtonRows18Index1819Buttons20 = valueButtonRows18Index1819['buttons'];
        if(!(Array.isArray(valueButtonRows18Index1819Buttons20))) {
          return {
            error: `Expected valueButtonRows18Index1819.buttons to be an array, but got "${typeof valueButtonRows18Index1819Buttons20}" instead`
          }
        }
        for(let index20 = 0; index20 < valueButtonRows18Index1819Buttons20.length; index20++) {
          if(!(index20 in valueButtonRows18Index1819Buttons20)) {
            return {
              error: `Expected "valueButtonRows18Index1819Buttons20" to have a property named ${index20}, but only the following properties were found: ${Object.keys(valueButtonRows18Index1819Buttons20)}`
            }
          }
          const valueButtonRows18Index1819Buttons20Index2021 = valueButtonRows18Index1819Buttons20[index20];
          if(!(typeof valueButtonRows18Index1819Buttons20Index2021 === 'object' && valueButtonRows18Index1819Buttons20Index2021 !== null)) {
            return {
              error: `Expected "valueButtonRows18Index1819Buttons20Index2021" to be an object, but got typeof ${typeof valueButtonRows18Index1819Buttons20Index2021} instead`
            }
          }
          if('condition' in valueButtonRows18Index1819Buttons20Index2021) {
            if(!('condition' in valueButtonRows18Index1819Buttons20Index2021)) {
              return {
                error: `Expected "valueButtonRows18Index1819Buttons20Index2021" to have a property named ${'condition'}, but only the following properties were found: ${Object.keys(valueButtonRows18Index1819Buttons20Index2021)}`
              }
            }
            const valueButtonRows18Index1819Buttons20Index2021Condition22 = valueButtonRows18Index1819Buttons20Index2021['condition'];
            if(!(typeof valueButtonRows18Index1819Buttons20Index2021Condition22 === 'object' && valueButtonRows18Index1819Buttons20Index2021Condition22 !== null)) {
              return {
                error: `Expected "valueButtonRows18Index1819Buttons20Index2021Condition22" to be an object, but got typeof ${typeof valueButtonRows18Index1819Buttons20Index2021Condition22} instead`
              }
            }
            if('code' in valueButtonRows18Index1819Buttons20Index2021Condition22) {
              if(!('code' in valueButtonRows18Index1819Buttons20Index2021Condition22)) {
                return {
                  error: `Expected "valueButtonRows18Index1819Buttons20Index2021Condition22" to have a property named ${'code'}, but only the following properties were found: ${Object.keys(valueButtonRows18Index1819Buttons20Index2021Condition22)}`
                }
              }
              const valueButtonRows18Index1819Buttons20Index2021Condition22Code23 = valueButtonRows18Index1819Buttons20Index2021Condition22['code'];
              if(!(typeof valueButtonRows18Index1819Buttons20Index2021Condition22Code23 === 'string')) {
                return {
                  error: `Expected valueButtonRows18Index1819Buttons20Index2021Condition22.code to be a string, but got ${typeof valueButtonRows18Index1819Buttons20Index2021Condition22Code23} instead`
                }
              }
            }
          }
          if('title' in valueButtonRows18Index1819Buttons20Index2021) {
            if(!('title' in valueButtonRows18Index1819Buttons20Index2021)) {
              return {
                error: `Expected "valueButtonRows18Index1819Buttons20Index2021" to have a property named ${'title'}, but only the following properties were found: ${Object.keys(valueButtonRows18Index1819Buttons20Index2021)}`
              }
            }
            const valueButtonRows18Index1819Buttons20Index2021Title24 = valueButtonRows18Index1819Buttons20Index2021['title'];
            if(!(typeof valueButtonRows18Index1819Buttons20Index2021Title24 === 'string')) {
              return {
                error: `Expected valueButtonRows18Index1819Buttons20Index2021.title to be a string, but got ${typeof valueButtonRows18Index1819Buttons20Index2021Title24} instead`
              }
            }
          }
          if('onClick' in valueButtonRows18Index1819Buttons20Index2021) {
            if(!('onClick' in valueButtonRows18Index1819Buttons20Index2021)) {
              return {
                error: `Expected "valueButtonRows18Index1819Buttons20Index2021" to have a property named ${'onClick'}, but only the following properties were found: ${Object.keys(valueButtonRows18Index1819Buttons20Index2021)}`
              }
            }
            const valueButtonRows18Index1819Buttons20Index2021OnClick25 = valueButtonRows18Index1819Buttons20Index2021['onClick'];
            if(!(typeof valueButtonRows18Index1819Buttons20Index2021OnClick25 === 'object' && valueButtonRows18Index1819Buttons20Index2021OnClick25 !== null)) {
              return {
                error: `Expected "valueButtonRows18Index1819Buttons20Index2021OnClick25" to be an object, but got typeof ${typeof valueButtonRows18Index1819Buttons20Index2021OnClick25} instead`
              }
            }
            if('code' in valueButtonRows18Index1819Buttons20Index2021OnClick25) {
              if(!('code' in valueButtonRows18Index1819Buttons20Index2021OnClick25)) {
                return {
                  error: `Expected "valueButtonRows18Index1819Buttons20Index2021OnClick25" to have a property named ${'code'}, but only the following properties were found: ${Object.keys(valueButtonRows18Index1819Buttons20Index2021OnClick25)}`
                }
              }
              const valueButtonRows18Index1819Buttons20Index2021OnClick25Code26 = valueButtonRows18Index1819Buttons20Index2021OnClick25['code'];
              if(!(typeof valueButtonRows18Index1819Buttons20Index2021OnClick25Code26 === 'string')) {
                return {
                  error: `Expected valueButtonRows18Index1819Buttons20Index2021OnClick25.code to be a string, but got ${typeof valueButtonRows18Index1819Buttons20Index2021OnClick25Code26} instead`
                }
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
    const valueNextContent27 = value['nextContent'];
    if(!(typeof valueNextContent27 === 'object' && valueNextContent27 !== null)) {
      return {
        error: `Expected "valueNextContent27" to be an object, but got typeof ${typeof valueNextContent27} instead`
      }
    }
    if('condition' in valueNextContent27) {
      if(!('condition' in valueNextContent27)) {
        return {
          error: `Expected "valueNextContent27" to have a property named ${'condition'}, but only the following properties were found: ${Object.keys(valueNextContent27)}`
        }
      }
      const valueNextContent27Condition28 = valueNextContent27['condition'];
      if(!(typeof valueNextContent27Condition28 === 'object' && valueNextContent27Condition28 !== null)) {
        return {
          error: `Expected "valueNextContent27Condition28" to be an object, but got typeof ${typeof valueNextContent27Condition28} instead`
        }
      }
      if('code' in valueNextContent27Condition28) {
        if(!('code' in valueNextContent27Condition28)) {
          return {
            error: `Expected "valueNextContent27Condition28" to have a property named ${'code'}, but only the following properties were found: ${Object.keys(valueNextContent27Condition28)}`
          }
        }
        const valueNextContent27Condition28Code29 = valueNextContent27Condition28['code'];
        if(!(typeof valueNextContent27Condition28Code29 === 'string')) {
          return {
            error: `Expected valueNextContent27Condition28.code to be a string, but got ${typeof valueNextContent27Condition28Code29} instead`
          }
        }
      }
    }
    if('value' in valueNextContent27) {
      if(!('value' in valueNextContent27)) {
        return {
          error: `Expected "valueNextContent27" to have a property named ${'value'}, but only the following properties were found: ${Object.keys(valueNextContent27)}`
        }
      }
      const valueNextContent27Value30 = valueNextContent27['value'];
      if(!(typeof valueNextContent27Value30 === 'object' && valueNextContent27Value30 !== null)) {
        return {
          error: `Expected valueNextContent27.value to be an object, but got "${typeof valueNextContent27Value30}" instead`
        }
      }
      if(!('id' in valueNextContent27Value30 && typeof valueNextContent27Value30.id === 'number')) {
        return {
          error: `Expected valueNextContent27.value to have a property named "id", but only the following properties were found: ${Object.keys(valueNextContent27Value30)}`
        }
      }
      switch(valueNextContent27Value30.id) {
        case ContentUserInterfaceNextContentConditionalValueType.Paragraph:
          if(!('value' in valueNextContent27Value30)) {
            return {
              error: `Expected "valueNextContent27Value30" to have a property named ${'value'}, but only the following properties were found: ${Object.keys(valueNextContent27Value30)}`
            }
          }
          const valueNextContent27Value30Value31 = valueNextContent27Value30['value'];
          if(!(valueNextContent27Value30Value31 instanceof ObjectId)) {
            return {
              error: `Expected valueNextContent27Value30.value to be an instance of ObjectId, but got typeof valueNextContent27Value30Value31 instead`
            }
          }
          break;
        case ContentUserInterfaceNextContentConditionalValueType.UI:
          if(!('value' in valueNextContent27Value30)) {
            return {
              error: `Expected "valueNextContent27Value30" to have a property named ${'value'}, but only the following properties were found: ${Object.keys(valueNextContent27Value30)}`
            }
          }
          const valueNextContent27Value30Value32 = valueNextContent27Value30['value'];
          if(!(valueNextContent27Value30Value32 instanceof ObjectId)) {
            return {
              error: `Expected valueNextContent27Value30.value to be an instance of ObjectId, but got typeof valueNextContent27Value30Value32 instead`
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
    const valueCreatedAt33 = value['createdAt'];
    if(!(valueCreatedAt33 instanceof Date)) {
      return {
        error: `Expected value.createdAt to be of type Date, but got "${typeof valueCreatedAt33}" instead`
      }
    }
  }
  if('updatedAt' in value) {
    if(!('updatedAt' in value)) {
      return {
        error: `Expected "value" to have a property named ${'updatedAt'}, but only the following properties were found: ${Object.keys(value)}`
      }
    }
    const valueUpdatedAt34 = value['updatedAt'];
    if(!(valueUpdatedAt34 instanceof Date)) {
      return {
        error: `Expected value.updatedAt to be of type Date, but got "${typeof valueUpdatedAt34}" instead`
      }
    }
  }
  return null;
}
