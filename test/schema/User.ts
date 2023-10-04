import {Collection, Filter} from 'mongodb';
export interface IUser {
  name: string;
}
export interface IUserPopulated {
}
export class UserModel {
  public constructor(
    private readonly users: Collection<IUser>,
  ) {}
  public async find(value: Filter<IUser>) {
    return this.users.find(value);
  }
  public async findOne(value: Filter<IUser>) {
    return this.users.findOne(value);
  }
  public async populate(value: IUser) {
    const populated: IUserPopulated = {
    }
    const ids = {
    }
    return populated;
  }
  public async insert(value: IUser) {
    const validationErr = validateUser(value);
    if(validationErr !== null) {
      return validationErr;
    }
    const result = await this.users.insertOne(value, { forceServerObjectId: false });
    if(!result.acknowledged) {
      return null;
    }
    return result.insertedId;
  }
}
export class UserFilter {
  readonly #filter: Filter<UserModel> = {};
  /**
    * Matches name with all exact parameters
    */
  public name(value: string) {
    this.#filter['name'] = value;
  }
}
export function validateUser(value: IUser) {
  const value0 = value['name'];
  if(!(typeof value0 === 'string')) {
    return {
      error: `Expected value0 to be a string, but got ${typeof value0} instead`
    }
  }
  return null;
}
