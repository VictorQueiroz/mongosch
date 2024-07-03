import {Collection, Filter, UpdateFilter, OptionalId, Document, CountDocumentsOptions} from 'mongodb';
export interface IInputUser {
  /**
   * Phone number
   */
  phone: {
    /**
     * Country code of the phone
     */
    countryCode: UserPhonePhoneCountryCodeType;
    /**
     * National number
     */
    nationalNumber: string;
  };
  /**
   * User email address
   */
  email: string;
  /**
   * Date when the user was created
   */
  createdAt: Date;
}
export interface IUser {
  /**
   * Phone number
   */
  phone: {
    /**
     * Country code of the phone
     */
    countryCode: UserPhonePhoneCountryCodeType;
    /**
     * National number
     */
    nationalNumber: string;
  };
  /**
   * User email address
   */
  email: string;
  /**
   * Date when the user was created
   */
  createdAt: Date;
}
export const UserPhonePhoneCountryCodeValues = [
  "AC",
  "AD",
  "AE",
  "AF",
  "AG",
  "AI",
  "AL",
  "AM",
  "AO",
  "AR",
  "AS",
  "AT",
  "AU",
  "AW",
  "AX",
  "AZ",
  "BA",
  "BB",
  "BD",
  "BE",
  "BF",
  "BG",
  "BH",
  "BI",
  "BJ",
  "BL",
  "BM",
  "BN",
  "BO",
  "BQ",
  "BR",
  "BS",
  "BT",
  "BW",
  "BY",
  "BZ",
  "CA",
  "CC",
  "CD",
  "CF",
  "CG",
  "CH",
  "CI",
  "CK",
  "CL",
  "CM",
  "CN",
  "CO",
  "CR",
  "CU",
  "CV",
  "CW",
  "CX",
  "CY",
  "CZ",
  "DE",
  "DJ",
  "DK",
  "DM",
  "DO",
  "DZ",
  "EC",
  "EE",
  "EG",
  "EH",
  "ER",
  "ES",
  "ET",
  "FI",
  "FJ",
  "FK",
  "FM",
  "FO",
  "FR",
  "GA",
  "GB",
  "GD",
  "GE",
  "GF",
  "GG",
  "GH",
  "GI",
  "GL",
  "GM",
  "GN",
  "GP",
  "GQ",
  "GR",
  "GT",
  "GU",
  "GW",
  "GY",
  "HK",
  "HN",
  "HR",
  "HT",
  "HU",
  "ID",
  "IE",
  "IL",
  "IM",
  "IN",
  "IO",
  "IQ",
  "IR",
  "IS",
  "IT",
  "JE",
  "JM",
  "JO",
  "JP",
  "KE",
  "KG",
  "KH",
  "KI",
  "KM",
  "KN",
  "KP",
  "KR",
  "KW",
  "KY",
  "KZ",
  "LA",
  "LB",
  "LC",
  "LI",
  "LK",
  "LR",
  "LS",
  "LT",
  "LU",
  "LV",
  "LY",
  "MA",
  "MC",
  "MD",
  "ME",
  "MF",
  "MG",
  "MH",
  "MK",
  "ML",
  "MM",
  "MN",
  "MO",
  "MP",
  "MQ",
  "MR",
  "MS",
  "MT",
  "MU",
  "MV",
  "MW",
  "MX",
  "MY",
  "MZ",
  "NA",
  "NC",
  "NE",
  "NF",
  "NG",
  "NI",
  "NL",
  "NO",
  "NP",
  "NR",
  "NU",
  "NZ",
  "OM",
  "PA",
  "PE",
  "PF",
  "PG",
  "PH",
  "PK",
  "PL",
  "PM",
  "PR",
  "PS",
  "PT",
  "PW",
  "PY",
  "QA",
  "RE",
  "RO",
  "RS",
  "RU",
  "RW",
  "SA",
  "SB",
  "SC",
  "SD",
  "SE",
  "SG",
  "SH",
  "SI",
  "SJ",
  "SK",
  "SL",
  "SM",
  "SN",
  "SO",
  "SR",
  "SS",
  "ST",
  "SV",
  "SX",
  "SY",
  "SZ",
  "TA",
  "TC",
  "TD",
  "TG",
  "TH",
  "TJ",
  "TK",
  "TL",
  "TM",
  "TN",
  "TO",
  "TR",
  "TT",
  "TV",
  "TW",
  "TZ",
  "UA",
  "UG",
  "US",
  "UY",
  "UZ",
  "VA",
  "VC",
  "VE",
  "VG",
  "VI",
  "VN",
  "VU",
  "WF",
  "WS",
  "XK",
  "YE",
  "YT",
  "ZA",
  "ZM",
  "ZW",
];
export enum UserPhonePhoneCountryCodeType {
  AC = "AC",
  AD = "AD",
  AE = "AE",
  AF = "AF",
  AG = "AG",
  AI = "AI",
  AL = "AL",
  AM = "AM",
  AO = "AO",
  AR = "AR",
  AS = "AS",
  AT = "AT",
  AU = "AU",
  AW = "AW",
  AX = "AX",
  AZ = "AZ",
  BA = "BA",
  BB = "BB",
  BD = "BD",
  BE = "BE",
  BF = "BF",
  BG = "BG",
  BH = "BH",
  BI = "BI",
  BJ = "BJ",
  BL = "BL",
  BM = "BM",
  BN = "BN",
  BO = "BO",
  BQ = "BQ",
  BR = "BR",
  BS = "BS",
  BT = "BT",
  BW = "BW",
  BY = "BY",
  BZ = "BZ",
  CA = "CA",
  CC = "CC",
  CD = "CD",
  CF = "CF",
  CG = "CG",
  CH = "CH",
  CI = "CI",
  CK = "CK",
  CL = "CL",
  CM = "CM",
  CN = "CN",
  CO = "CO",
  CR = "CR",
  CU = "CU",
  CV = "CV",
  CW = "CW",
  CX = "CX",
  CY = "CY",
  CZ = "CZ",
  DE = "DE",
  DJ = "DJ",
  DK = "DK",
  DM = "DM",
  DO = "DO",
  DZ = "DZ",
  EC = "EC",
  EE = "EE",
  EG = "EG",
  EH = "EH",
  ER = "ER",
  ES = "ES",
  ET = "ET",
  FI = "FI",
  FJ = "FJ",
  FK = "FK",
  FM = "FM",
  FO = "FO",
  FR = "FR",
  GA = "GA",
  GB = "GB",
  GD = "GD",
  GE = "GE",
  GF = "GF",
  GG = "GG",
  GH = "GH",
  GI = "GI",
  GL = "GL",
  GM = "GM",
  GN = "GN",
  GP = "GP",
  GQ = "GQ",
  GR = "GR",
  GT = "GT",
  GU = "GU",
  GW = "GW",
  GY = "GY",
  HK = "HK",
  HN = "HN",
  HR = "HR",
  HT = "HT",
  HU = "HU",
  ID = "ID",
  IE = "IE",
  IL = "IL",
  IM = "IM",
  IN = "IN",
  IO = "IO",
  IQ = "IQ",
  IR = "IR",
  IS = "IS",
  IT = "IT",
  JE = "JE",
  JM = "JM",
  JO = "JO",
  JP = "JP",
  KE = "KE",
  KG = "KG",
  KH = "KH",
  KI = "KI",
  KM = "KM",
  KN = "KN",
  KP = "KP",
  KR = "KR",
  KW = "KW",
  KY = "KY",
  KZ = "KZ",
  LA = "LA",
  LB = "LB",
  LC = "LC",
  LI = "LI",
  LK = "LK",
  LR = "LR",
  LS = "LS",
  LT = "LT",
  LU = "LU",
  LV = "LV",
  LY = "LY",
  MA = "MA",
  MC = "MC",
  MD = "MD",
  ME = "ME",
  MF = "MF",
  MG = "MG",
  MH = "MH",
  MK = "MK",
  ML = "ML",
  MM = "MM",
  MN = "MN",
  MO = "MO",
  MP = "MP",
  MQ = "MQ",
  MR = "MR",
  MS = "MS",
  MT = "MT",
  MU = "MU",
  MV = "MV",
  MW = "MW",
  MX = "MX",
  MY = "MY",
  MZ = "MZ",
  NA = "NA",
  NC = "NC",
  NE = "NE",
  NF = "NF",
  NG = "NG",
  NI = "NI",
  NL = "NL",
  NO = "NO",
  NP = "NP",
  NR = "NR",
  NU = "NU",
  NZ = "NZ",
  OM = "OM",
  PA = "PA",
  PE = "PE",
  PF = "PF",
  PG = "PG",
  PH = "PH",
  PK = "PK",
  PL = "PL",
  PM = "PM",
  PR = "PR",
  PS = "PS",
  PT = "PT",
  PW = "PW",
  PY = "PY",
  QA = "QA",
  RE = "RE",
  RO = "RO",
  RS = "RS",
  RU = "RU",
  RW = "RW",
  SA = "SA",
  SB = "SB",
  SC = "SC",
  SD = "SD",
  SE = "SE",
  SG = "SG",
  SH = "SH",
  SI = "SI",
  SJ = "SJ",
  SK = "SK",
  SL = "SL",
  SM = "SM",
  SN = "SN",
  SO = "SO",
  SR = "SR",
  SS = "SS",
  ST = "ST",
  SV = "SV",
  SX = "SX",
  SY = "SY",
  SZ = "SZ",
  TA = "TA",
  TC = "TC",
  TD = "TD",
  TG = "TG",
  TH = "TH",
  TJ = "TJ",
  TK = "TK",
  TL = "TL",
  TM = "TM",
  TN = "TN",
  TO = "TO",
  TR = "TR",
  TT = "TT",
  TV = "TV",
  TW = "TW",
  TZ = "TZ",
  UA = "UA",
  UG = "UG",
  US = "US",
  UY = "UY",
  UZ = "UZ",
  VA = "VA",
  VC = "VC",
  VE = "VE",
  VG = "VG",
  VI = "VI",
  VN = "VN",
  VU = "VU",
  WF = "WF",
  WS = "WS",
  XK = "XK",
  YE = "YE",
  YT = "YT",
  ZA = "ZA",
  ZM = "ZM",
  ZW = "ZW",
}
export interface IUserPopulation {
}
export class UserModel {
  public constructor(
    private readonly users: Collection<IUser>,
  ) {}
  public find(value: Filter<IUser>) {
    return this.users.find(value);
  }
  public findOne(value: Filter<IUser>) {
    return this.users.findOne(value);
  }
  public deleteOne(value: Filter<IUser>) {
    return this.users.deleteOne(value);
  }
  public deleteMany(value: Filter<IUser>) {
    return this.users.deleteMany(value);
  }
  public async updateOne(filter: Filter<IUser>, update: UpdateFilter<IUser> | Partial<IUser>) {
    if("$set" in update) {
      if(!update['$set']) {
        update['$set'] = {};
      }
      let changes = {...update['$set']};
      update['$set'] = changes;
      const validation = partiallyValidateUser(update['$set']);
      if(validation !== null) {
        return validation;
      }
    } else {
      const validation = partiallyValidateUser(update);
      if(validation !== null) {
        return validation;
      }
    }
    const result = await this.users.updateOne(filter, update);
    if(!result.acknowledged) {
      return null;
    }
    return { success: result };
  }
  public async updateMany(filter: Filter<IUser>, update: UpdateFilter<IUser> | Partial<IUser>) {
    if("$set" in update) {
      if(!update['$set']) {
        update['$set'] = {};
      }
      let changes = {...update['$set']};
      update['$set'] = changes;
      const validation = partiallyValidateUser(update['$set']);
      if(validation !== null) {
        return validation;
      }
    } else {
      const validation = partiallyValidateUser(update);
      if(validation !== null) {
        return validation;
      }
    }
    const result = await this.users.updateMany(filter, update);
    if(!result.acknowledged) {
      return null;
    }
    return { success: result };
  }
  public countDocuments(filter?: Document, options?: CountDocumentsOptions) {
    return this.users.countDocuments(filter, options);
  }
  public async add(value: OptionalId<IUser>) {
    const result = await this.insertOne(value);
    if('error' in result) {
      return result;
    }
    return this.findOne({_id: result});
  }
  public async insertOne(value: OptionalId<IUser>) {
    const validationErr = validateUser(value);
    if(validationErr !== null) {
      return validationErr;
    }
    const result = await this.users.insertOne(value, { forceServerObjectId: false });
    if(!result.acknowledged) {
      return { error: 'Record creation not acknowledged' };
    }
    return result.insertedId;
  }
}
export function validateUser(value: unknown) {
  if(!(typeof value === 'object' && value !== null)) {
    return {
      error: `Expected "value" to be an object, but got typeof ${typeof value} instead`
    }
  }
  if(!('phone' in value)) {
    return {
      error: `Expected "value" to have a property named ${'phone'}, but only the following properties were found: ${Object.keys(value)}`
    }
  }
  const valuePhone1 = value['phone'];
  if(!(typeof valuePhone1 === 'object' && valuePhone1 !== null)) {
    return {
      error: `Expected "valuePhone1" to be an object, but got typeof ${typeof valuePhone1} instead`
    }
  }
  if(!('countryCode' in valuePhone1)) {
    return {
      error: `Expected "valuePhone1" to have a property named ${'countryCode'}, but only the following properties were found: ${Object.keys(valuePhone1)}`
    }
  }
  const valuePhone1CountryCode2 = valuePhone1['countryCode'];
  if(!(typeof valuePhone1CountryCode2 === 'string')) {
    return {
      error: `Expected valuePhone1.countryCode to be an array, but got "${typeof valuePhone1CountryCode2}" instead`
    }
  }
  if(!UserPhonePhoneCountryCodeValues.includes(valuePhone1CountryCode2)) {
    return {
      error: `Expected valuePhone1.countryCode to be one of "AC", "AD", "AE", "AF", "AG", "AI", "AL", "AM", "AO", "AR", "..."`
    };
  }
  if(!('nationalNumber' in valuePhone1)) {
    return {
      error: `Expected "valuePhone1" to have a property named ${'nationalNumber'}, but only the following properties were found: ${Object.keys(valuePhone1)}`
    }
  }
  const valuePhone1NationalNumber3 = valuePhone1['nationalNumber'];
  if(!(typeof valuePhone1NationalNumber3 === 'string')) {
    return {
      error: `Expected valuePhone1.nationalNumber to be a string, but got ${typeof valuePhone1NationalNumber3} instead`
    }
  }
  if(!('email' in value)) {
    return {
      error: `Expected "value" to have a property named ${'email'}, but only the following properties were found: ${Object.keys(value)}`
    }
  }
  const valueEmail4 = value['email'];
  if(!(typeof valueEmail4 === 'string')) {
    return {
      error: `Expected value.email to be a string, but got ${typeof valueEmail4} instead`
    }
  }
  if(valueEmail4 !== null) {
    if(!(/^[a-zA-Z0-9._%+-]+@(gmail.com|hotmail.com)$/.test(valueEmail4))) {
      return {
        error: `Expected value.email to match /^[a-zA-Z0-9._%+-]+@(gmail.com|hotmail.com)$/, but it didn't`
      }
    }
  }
  if(!('createdAt' in value)) {
    return {
      error: `Expected "value" to have a property named ${'createdAt'}, but only the following properties were found: ${Object.keys(value)}`
    }
  }
  const valueCreatedAt5 = value['createdAt'];
  if(!(valueCreatedAt5 instanceof Date)) {
    return {
      error: `Expected value.createdAt to be of type Date, but got "${typeof valueCreatedAt5}" instead`
    }
  }
  return null;
}
export function partiallyValidateUser(value: unknown) {
  if(!(typeof value === 'object' && value !== null)) {
    return {
      error: `Expected "value" to be an object, but got typeof ${typeof value} instead`
    }
  }
  if('phone' in value) {
    if(!('phone' in value)) {
      return {
        error: `Expected "value" to have a property named ${'phone'}, but only the following properties were found: ${Object.keys(value)}`
      }
    }
    const valuePhone6 = value['phone'];
    if(!(typeof valuePhone6 === 'object' && valuePhone6 !== null)) {
      return {
        error: `Expected "valuePhone6" to be an object, but got typeof ${typeof valuePhone6} instead`
      }
    }
    if('countryCode' in valuePhone6) {
      if(!('countryCode' in valuePhone6)) {
        return {
          error: `Expected "valuePhone6" to have a property named ${'countryCode'}, but only the following properties were found: ${Object.keys(valuePhone6)}`
        }
      }
      const valuePhone6CountryCode7 = valuePhone6['countryCode'];
      if(!(typeof valuePhone6CountryCode7 === 'string')) {
        return {
          error: `Expected valuePhone6.countryCode to be an array, but got "${typeof valuePhone6CountryCode7}" instead`
        }
      }
      if(!UserPhonePhoneCountryCodeValues.includes(valuePhone6CountryCode7)) {
        return {
          error: `Expected valuePhone6.countryCode to be one of "AC", "AD", "AE", "AF", "AG", "AI", "AL", "AM", "AO", "AR", "..."`
        };
      }
    }
    if('nationalNumber' in valuePhone6) {
      if(!('nationalNumber' in valuePhone6)) {
        return {
          error: `Expected "valuePhone6" to have a property named ${'nationalNumber'}, but only the following properties were found: ${Object.keys(valuePhone6)}`
        }
      }
      const valuePhone6NationalNumber8 = valuePhone6['nationalNumber'];
      if(!(typeof valuePhone6NationalNumber8 === 'string')) {
        return {
          error: `Expected valuePhone6.nationalNumber to be a string, but got ${typeof valuePhone6NationalNumber8} instead`
        }
      }
    }
  }
  if('email' in value) {
    if(!('email' in value)) {
      return {
        error: `Expected "value" to have a property named ${'email'}, but only the following properties were found: ${Object.keys(value)}`
      }
    }
    const valueEmail9 = value['email'];
    if(!(typeof valueEmail9 === 'string')) {
      return {
        error: `Expected value.email to be a string, but got ${typeof valueEmail9} instead`
      }
    }
    if(valueEmail9 !== null) {
      if(!(/^[a-zA-Z0-9._%+-]+@(gmail.com|hotmail.com)$/.test(valueEmail9))) {
        return {
          error: `Expected value.email to match /^[a-zA-Z0-9._%+-]+@(gmail.com|hotmail.com)$/, but it didn't`
        }
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
  return null;
}
