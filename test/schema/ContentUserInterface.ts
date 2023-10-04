import {IContentParagraph} from './ContentParagraph';
import {ObjectId, Filter, Collection} from 'mongodb';
export interface IContentUserInterface {
  buttonRows: ReadonlyArray<{
    buttons: ReadonlyArray<{
      condition: {
        code: string;
      };
      title: string;
      onClick: {
        code: string;
      };
    }>;
  }>;
  nextContent: {
    condition: {
      code: string;
    };
    value: {
      id: 0;
      value: ObjectId;
    } | {
      id: 1;
      value: ObjectId;
    };
  };
}
export interface IContentUserInterfacePopulated {
  contentParagraphs: IContentParagraph[];
  contentUserInterfaces: IContentUserInterface[];
}
export class ContentUserInterfaceModel {
  public constructor(
    private readonly contentUserInterfaces: Collection<IContentUserInterface>,
    private readonly contentParagraphs: Collection<IContentParagraph>,
  ) {}
  public async find(value: Filter<IContentUserInterface>) {
    return this.contentUserInterfaces.find(value);
  }
  public async findOne(value: Filter<IContentUserInterface>) {
    return this.contentUserInterfaces.findOne(value);
  }
  public async populate(value: IContentUserInterface, entities: ("ContentParagraph" | "ContentUserInterface")[] = ["ContentParagraph", "ContentUserInterface"]) {
    const populated: IContentUserInterfacePopulated = {
      contentParagraphs: [],
      contentUserInterfaces: [],
    };
    const ids = {
      contentParagraphs: new Array<ObjectId>(),
      contentUserInterfaces: new Array<ObjectId>(),
    };
    for(const arrayElement_1 of value.buttonRows) {
      for(const arrayElement_3 of arrayElement_1.buttons) {
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
  public async insert(value: IContentUserInterface) {
    const validationErr = validateContentUserInterface(value);
    if(validationErr !== null) {
      return validationErr;
    }
    const result = await this.contentUserInterfaces.insertOne(value, { forceServerObjectId: false });
    if(!result.acknowledged) {
      return null;
    }
    return result.insertedId;
  }
}
export class ContentUserInterfaceFilter {
  readonly #filter: Filter<ContentUserInterfaceModel> = {};
  /**
    * Matches buttonRows with all exact parameters
    */
  public buttonRows(value: ReadonlyArray<{
    buttons: ReadonlyArray<{
      condition: {
        code: string;
      };
      title: string;
      onClick: {
        code: string;
      };
    }>;
  }>) {
    this.#filter['buttonRows'] = value;
  }
  /**
    * Matches nextContent with all exact parameters
    */
  public nextContent(value: {
    condition: {
      code: string;
    };
    value: {
      id: 0;
      value: ObjectId;
    } | {
      id: 1;
      value: ObjectId;
    };
  }) {
    this.#filter['nextContent'] = value;
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
  return null;
}
