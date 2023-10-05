import {Collection, Filter, UpdateFilter} from 'mongodb';
export interface IUser {
  phone: {
    countryCode: "AC" | "AD" | "AE" | "AF" | "AG" | "AI" | "AL" | "AM" | "AO" | "AR" | "AS" | "AT" | "AU" | "AW" | "AX" | "AZ" | "BA" | "BB" | "BD" | "BE" | "BF" | "BG" | "BH" | "BI" | "BJ" | "BL" | "BM" | "BN" | "BO" | "BQ" | "BR" | "BS" | "BT" | "BW" | "BY" | "BZ" | "CA" | "CC" | "CD" | "CF" | "CG" | "CH" | "CI" | "CK" | "CL" | "CM" | "CN" | "CO" | "CR" | "CU" | "CV" | "CW" | "CX" | "CY" | "CZ" | "DE" | "DJ" | "DK" | "DM" | "DO" | "DZ" | "EC" | "EE" | "EG" | "EH" | "ER" | "ES" | "ET" | "FI" | "FJ" | "FK" | "FM" | "FO" | "FR" | "GA" | "GB" | "GD" | "GE" | "GF" | "GG" | "GH" | "GI" | "GL" | "GM" | "GN" | "GP" | "GQ" | "GR" | "GT" | "GU" | "GW" | "GY" | "HK" | "HN" | "HR" | "HT" | "HU" | "ID" | "IE" | "IL" | "IM" | "IN" | "IO" | "IQ" | "IR" | "IS" | "IT" | "JE" | "JM" | "JO" | "JP" | "KE" | "KG" | "KH" | "KI" | "KM" | "KN" | "KP" | "KR" | "KW" | "KY" | "KZ" | "LA" | "LB" | "LC" | "LI" | "LK" | "LR" | "LS" | "LT" | "LU" | "LV" | "LY" | "MA" | "MC" | "MD" | "ME" | "MF" | "MG" | "MH" | "MK" | "ML" | "MM" | "MN" | "MO" | "MP" | "MQ" | "MR" | "MS" | "MT" | "MU" | "MV" | "MW" | "MX" | "MY" | "MZ" | "NA" | "NC" | "NE" | "NF" | "NG" | "NI" | "NL" | "NO" | "NP" | "NR" | "NU" | "NZ" | "OM" | "PA" | "PE" | "PF" | "PG" | "PH" | "PK" | "PL" | "PM" | "PR" | "PS" | "PT" | "PW" | "PY" | "QA" | "RE" | "RO" | "RS" | "RU" | "RW" | "SA" | "SB" | "SC" | "SD" | "SE" | "SG" | "SH" | "SI" | "SJ" | "SK" | "SL" | "SM" | "SN" | "SO" | "SR" | "SS" | "ST" | "SV" | "SX" | "SY" | "SZ" | "TA" | "TC" | "TD" | "TG" | "TH" | "TJ" | "TK" | "TL" | "TM" | "TN" | "TO" | "TR" | "TT" | "TV" | "TW" | "TZ" | "UA" | "UG" | "US" | "UY" | "UZ" | "VA" | "VC" | "VE" | "VG" | "VI" | "VN" | "VU" | "WF" | "WS" | "XK" | "YE" | "YT" | "ZA" | "ZM" | "ZW";
    nationalNumber: string;
  };
  createdAt: Date;
}
export enum UserPhoneCountryCodeType {
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
export interface IUserPopulated {
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
  public updateOne(filter: Filter<IUser>, update: UpdateFilter<IUser> | Partial<IUser>) {
    return this.users.updateOne(filter, update);
  }
  public updateMany(filter: Filter<IUser>, update: UpdateFilter<IUser> | Partial<IUser>) {
    return this.users.updateMany(filter, update);
  }
  public countDocuments() {
    return this.users.countDocuments();
  }
  public async insertOne(value: IUser) {
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
export class UserFilter {
  readonly #filter: Filter<UserModel> = {};
  /**
    * Matches phone with all exact parameters
    */
  public phone(value: {
    countryCode: "AC" | "AD" | "AE" | "AF" | "AG" | "AI" | "AL" | "AM" | "AO" | "AR" | "AS" | "AT" | "AU" | "AW" | "AX" | "AZ" | "BA" | "BB" | "BD" | "BE" | "BF" | "BG" | "BH" | "BI" | "BJ" | "BL" | "BM" | "BN" | "BO" | "BQ" | "BR" | "BS" | "BT" | "BW" | "BY" | "BZ" | "CA" | "CC" | "CD" | "CF" | "CG" | "CH" | "CI" | "CK" | "CL" | "CM" | "CN" | "CO" | "CR" | "CU" | "CV" | "CW" | "CX" | "CY" | "CZ" | "DE" | "DJ" | "DK" | "DM" | "DO" | "DZ" | "EC" | "EE" | "EG" | "EH" | "ER" | "ES" | "ET" | "FI" | "FJ" | "FK" | "FM" | "FO" | "FR" | "GA" | "GB" | "GD" | "GE" | "GF" | "GG" | "GH" | "GI" | "GL" | "GM" | "GN" | "GP" | "GQ" | "GR" | "GT" | "GU" | "GW" | "GY" | "HK" | "HN" | "HR" | "HT" | "HU" | "ID" | "IE" | "IL" | "IM" | "IN" | "IO" | "IQ" | "IR" | "IS" | "IT" | "JE" | "JM" | "JO" | "JP" | "KE" | "KG" | "KH" | "KI" | "KM" | "KN" | "KP" | "KR" | "KW" | "KY" | "KZ" | "LA" | "LB" | "LC" | "LI" | "LK" | "LR" | "LS" | "LT" | "LU" | "LV" | "LY" | "MA" | "MC" | "MD" | "ME" | "MF" | "MG" | "MH" | "MK" | "ML" | "MM" | "MN" | "MO" | "MP" | "MQ" | "MR" | "MS" | "MT" | "MU" | "MV" | "MW" | "MX" | "MY" | "MZ" | "NA" | "NC" | "NE" | "NF" | "NG" | "NI" | "NL" | "NO" | "NP" | "NR" | "NU" | "NZ" | "OM" | "PA" | "PE" | "PF" | "PG" | "PH" | "PK" | "PL" | "PM" | "PR" | "PS" | "PT" | "PW" | "PY" | "QA" | "RE" | "RO" | "RS" | "RU" | "RW" | "SA" | "SB" | "SC" | "SD" | "SE" | "SG" | "SH" | "SI" | "SJ" | "SK" | "SL" | "SM" | "SN" | "SO" | "SR" | "SS" | "ST" | "SV" | "SX" | "SY" | "SZ" | "TA" | "TC" | "TD" | "TG" | "TH" | "TJ" | "TK" | "TL" | "TM" | "TN" | "TO" | "TR" | "TT" | "TV" | "TW" | "TZ" | "UA" | "UG" | "US" | "UY" | "UZ" | "VA" | "VC" | "VE" | "VG" | "VI" | "VN" | "VU" | "WF" | "WS" | "XK" | "YE" | "YT" | "ZA" | "ZM" | "ZW";
    nationalNumber: string;
  }) {
    this.#filter['phone'] = value;
  }
  /**
    * Matches createdAt with all exact parameters
    */
  public createdAt(value: Date) {
    this.#filter['createdAt'] = value;
  }
}
export function validateUser(value: IUser) {
  const value0 = value['phone'];
  if(
    value0['countryCode'] === "AC" || 
    value0['countryCode'] === "AD" || 
    value0['countryCode'] === "AE" || 
    value0['countryCode'] === "AF" || 
    value0['countryCode'] === "AG" || 
    value0['countryCode'] === "AI" || 
    value0['countryCode'] === "AL" || 
    value0['countryCode'] === "AM" || 
    value0['countryCode'] === "AO" || 
    value0['countryCode'] === "AR" || 
    value0['countryCode'] === "AS" || 
    value0['countryCode'] === "AT" || 
    value0['countryCode'] === "AU" || 
    value0['countryCode'] === "AW" || 
    value0['countryCode'] === "AX" || 
    value0['countryCode'] === "AZ" || 
    value0['countryCode'] === "BA" || 
    value0['countryCode'] === "BB" || 
    value0['countryCode'] === "BD" || 
    value0['countryCode'] === "BE" || 
    value0['countryCode'] === "BF" || 
    value0['countryCode'] === "BG" || 
    value0['countryCode'] === "BH" || 
    value0['countryCode'] === "BI" || 
    value0['countryCode'] === "BJ" || 
    value0['countryCode'] === "BL" || 
    value0['countryCode'] === "BM" || 
    value0['countryCode'] === "BN" || 
    value0['countryCode'] === "BO" || 
    value0['countryCode'] === "BQ" || 
    value0['countryCode'] === "BR" || 
    value0['countryCode'] === "BS" || 
    value0['countryCode'] === "BT" || 
    value0['countryCode'] === "BW" || 
    value0['countryCode'] === "BY" || 
    value0['countryCode'] === "BZ" || 
    value0['countryCode'] === "CA" || 
    value0['countryCode'] === "CC" || 
    value0['countryCode'] === "CD" || 
    value0['countryCode'] === "CF" || 
    value0['countryCode'] === "CG" || 
    value0['countryCode'] === "CH" || 
    value0['countryCode'] === "CI" || 
    value0['countryCode'] === "CK" || 
    value0['countryCode'] === "CL" || 
    value0['countryCode'] === "CM" || 
    value0['countryCode'] === "CN" || 
    value0['countryCode'] === "CO" || 
    value0['countryCode'] === "CR" || 
    value0['countryCode'] === "CU" || 
    value0['countryCode'] === "CV" || 
    value0['countryCode'] === "CW" || 
    value0['countryCode'] === "CX" || 
    value0['countryCode'] === "CY" || 
    value0['countryCode'] === "CZ" || 
    value0['countryCode'] === "DE" || 
    value0['countryCode'] === "DJ" || 
    value0['countryCode'] === "DK" || 
    value0['countryCode'] === "DM" || 
    value0['countryCode'] === "DO" || 
    value0['countryCode'] === "DZ" || 
    value0['countryCode'] === "EC" || 
    value0['countryCode'] === "EE" || 
    value0['countryCode'] === "EG" || 
    value0['countryCode'] === "EH" || 
    value0['countryCode'] === "ER" || 
    value0['countryCode'] === "ES" || 
    value0['countryCode'] === "ET" || 
    value0['countryCode'] === "FI" || 
    value0['countryCode'] === "FJ" || 
    value0['countryCode'] === "FK" || 
    value0['countryCode'] === "FM" || 
    value0['countryCode'] === "FO" || 
    value0['countryCode'] === "FR" || 
    value0['countryCode'] === "GA" || 
    value0['countryCode'] === "GB" || 
    value0['countryCode'] === "GD" || 
    value0['countryCode'] === "GE" || 
    value0['countryCode'] === "GF" || 
    value0['countryCode'] === "GG" || 
    value0['countryCode'] === "GH" || 
    value0['countryCode'] === "GI" || 
    value0['countryCode'] === "GL" || 
    value0['countryCode'] === "GM" || 
    value0['countryCode'] === "GN" || 
    value0['countryCode'] === "GP" || 
    value0['countryCode'] === "GQ" || 
    value0['countryCode'] === "GR" || 
    value0['countryCode'] === "GT" || 
    value0['countryCode'] === "GU" || 
    value0['countryCode'] === "GW" || 
    value0['countryCode'] === "GY" || 
    value0['countryCode'] === "HK" || 
    value0['countryCode'] === "HN" || 
    value0['countryCode'] === "HR" || 
    value0['countryCode'] === "HT" || 
    value0['countryCode'] === "HU" || 
    value0['countryCode'] === "ID" || 
    value0['countryCode'] === "IE" || 
    value0['countryCode'] === "IL" || 
    value0['countryCode'] === "IM" || 
    value0['countryCode'] === "IN" || 
    value0['countryCode'] === "IO" || 
    value0['countryCode'] === "IQ" || 
    value0['countryCode'] === "IR" || 
    value0['countryCode'] === "IS" || 
    value0['countryCode'] === "IT" || 
    value0['countryCode'] === "JE" || 
    value0['countryCode'] === "JM" || 
    value0['countryCode'] === "JO" || 
    value0['countryCode'] === "JP" || 
    value0['countryCode'] === "KE" || 
    value0['countryCode'] === "KG" || 
    value0['countryCode'] === "KH" || 
    value0['countryCode'] === "KI" || 
    value0['countryCode'] === "KM" || 
    value0['countryCode'] === "KN" || 
    value0['countryCode'] === "KP" || 
    value0['countryCode'] === "KR" || 
    value0['countryCode'] === "KW" || 
    value0['countryCode'] === "KY" || 
    value0['countryCode'] === "KZ" || 
    value0['countryCode'] === "LA" || 
    value0['countryCode'] === "LB" || 
    value0['countryCode'] === "LC" || 
    value0['countryCode'] === "LI" || 
    value0['countryCode'] === "LK" || 
    value0['countryCode'] === "LR" || 
    value0['countryCode'] === "LS" || 
    value0['countryCode'] === "LT" || 
    value0['countryCode'] === "LU" || 
    value0['countryCode'] === "LV" || 
    value0['countryCode'] === "LY" || 
    value0['countryCode'] === "MA" || 
    value0['countryCode'] === "MC" || 
    value0['countryCode'] === "MD" || 
    value0['countryCode'] === "ME" || 
    value0['countryCode'] === "MF" || 
    value0['countryCode'] === "MG" || 
    value0['countryCode'] === "MH" || 
    value0['countryCode'] === "MK" || 
    value0['countryCode'] === "ML" || 
    value0['countryCode'] === "MM" || 
    value0['countryCode'] === "MN" || 
    value0['countryCode'] === "MO" || 
    value0['countryCode'] === "MP" || 
    value0['countryCode'] === "MQ" || 
    value0['countryCode'] === "MR" || 
    value0['countryCode'] === "MS" || 
    value0['countryCode'] === "MT" || 
    value0['countryCode'] === "MU" || 
    value0['countryCode'] === "MV" || 
    value0['countryCode'] === "MW" || 
    value0['countryCode'] === "MX" || 
    value0['countryCode'] === "MY" || 
    value0['countryCode'] === "MZ" || 
    value0['countryCode'] === "NA" || 
    value0['countryCode'] === "NC" || 
    value0['countryCode'] === "NE" || 
    value0['countryCode'] === "NF" || 
    value0['countryCode'] === "NG" || 
    value0['countryCode'] === "NI" || 
    value0['countryCode'] === "NL" || 
    value0['countryCode'] === "NO" || 
    value0['countryCode'] === "NP" || 
    value0['countryCode'] === "NR" || 
    value0['countryCode'] === "NU" || 
    value0['countryCode'] === "NZ" || 
    value0['countryCode'] === "OM" || 
    value0['countryCode'] === "PA" || 
    value0['countryCode'] === "PE" || 
    value0['countryCode'] === "PF" || 
    value0['countryCode'] === "PG" || 
    value0['countryCode'] === "PH" || 
    value0['countryCode'] === "PK" || 
    value0['countryCode'] === "PL" || 
    value0['countryCode'] === "PM" || 
    value0['countryCode'] === "PR" || 
    value0['countryCode'] === "PS" || 
    value0['countryCode'] === "PT" || 
    value0['countryCode'] === "PW" || 
    value0['countryCode'] === "PY" || 
    value0['countryCode'] === "QA" || 
    value0['countryCode'] === "RE" || 
    value0['countryCode'] === "RO" || 
    value0['countryCode'] === "RS" || 
    value0['countryCode'] === "RU" || 
    value0['countryCode'] === "RW" || 
    value0['countryCode'] === "SA" || 
    value0['countryCode'] === "SB" || 
    value0['countryCode'] === "SC" || 
    value0['countryCode'] === "SD" || 
    value0['countryCode'] === "SE" || 
    value0['countryCode'] === "SG" || 
    value0['countryCode'] === "SH" || 
    value0['countryCode'] === "SI" || 
    value0['countryCode'] === "SJ" || 
    value0['countryCode'] === "SK" || 
    value0['countryCode'] === "SL" || 
    value0['countryCode'] === "SM" || 
    value0['countryCode'] === "SN" || 
    value0['countryCode'] === "SO" || 
    value0['countryCode'] === "SR" || 
    value0['countryCode'] === "SS" || 
    value0['countryCode'] === "ST" || 
    value0['countryCode'] === "SV" || 
    value0['countryCode'] === "SX" || 
    value0['countryCode'] === "SY" || 
    value0['countryCode'] === "SZ" || 
    value0['countryCode'] === "TA" || 
    value0['countryCode'] === "TC" || 
    value0['countryCode'] === "TD" || 
    value0['countryCode'] === "TG" || 
    value0['countryCode'] === "TH" || 
    value0['countryCode'] === "TJ" || 
    value0['countryCode'] === "TK" || 
    value0['countryCode'] === "TL" || 
    value0['countryCode'] === "TM" || 
    value0['countryCode'] === "TN" || 
    value0['countryCode'] === "TO" || 
    value0['countryCode'] === "TR" || 
    value0['countryCode'] === "TT" || 
    value0['countryCode'] === "TV" || 
    value0['countryCode'] === "TW" || 
    value0['countryCode'] === "TZ" || 
    value0['countryCode'] === "UA" || 
    value0['countryCode'] === "UG" || 
    value0['countryCode'] === "US" || 
    value0['countryCode'] === "UY" || 
    value0['countryCode'] === "UZ" || 
    value0['countryCode'] === "VA" || 
    value0['countryCode'] === "VC" || 
    value0['countryCode'] === "VE" || 
    value0['countryCode'] === "VG" || 
    value0['countryCode'] === "VI" || 
    value0['countryCode'] === "VN" || 
    value0['countryCode'] === "VU" || 
    value0['countryCode'] === "WF" || 
    value0['countryCode'] === "WS" || 
    value0['countryCode'] === "XK" || 
    value0['countryCode'] === "YE" || 
    value0['countryCode'] === "YT" || 
    value0['countryCode'] === "ZA" || 
    value0['countryCode'] === "ZM" || 
    value0['countryCode'] === "ZW" || 
    false
  ) {
    return {
      error: `Expected value0['countryCode'] to be one of "AC", "AD", "AE", "AF", "AG", "AI", "AL", "AM", "AO", "AR", "..."`
    }
  }
  if(!(typeof value0['nationalNumber'] === 'string')) {
    return {
      error: `Expected value0['nationalNumber'] to be a string, but got ${typeof value0['nationalNumber']} instead`
    }
  }
  const value3 = value['createdAt'];
  if(!(value3 instanceof Date)) {
    return {
      error: `Expected value3 to be of type Date, but got "${typeof value3}" instead`
    }
  }
  return null;
}
