import { ISerializer } from "./__types__";
import { IDeserializer } from "./__types__";
import JSBI from "jsbi";
export type FieldTypeDateFlag =
  | Readonly<FieldTypeFlagDefaultValueDate>
  | Readonly<FieldTypeDateFlagOptional>;
export function isFieldTypeDateFlagTrait(
  value: unknown
): value is FieldTypeDateFlag {
  if (isFieldTypeFlagDefaultValueDate(value)) return true;
  if (isFieldTypeDateFlagOptional(value)) return true;
  return false;
}
export function encodeFieldTypeDateFlagTrait(
  __s: ISerializer,
  value: FieldTypeDateFlag
) {
  switch (value._name) {
    case "fieldTypeDate.FieldTypeFlagDefaultValueDate":
      return encodeFieldTypeFlagDefaultValueDate(__s, value);
    case "fieldTypeDate.FieldTypeDateFlagOptional":
      return encodeFieldTypeDateFlagOptional(__s, value);
  }
  throw new Error(
    `Failed to encode: Received invalid value on "_name" property. We got "${value["_name"]}" value, but this function was expecting to receive one of the following:\n\t- fieldTypeDate.FieldTypeFlagDefaultValueDate\n\t- fieldTypeDate.FieldTypeDateFlagOptional\n\n\nPossible cause is that maybe this type simply does not extend this trait, and somehow the type-checking prevented you from calling this function wrongly.`
  );
}
export function decodeFieldTypeDateFlagTrait(__d: IDeserializer) {
  const __id = __d.readInt32();
  __d.rewind(4);
  let value: FieldTypeFlagDefaultValueDate | FieldTypeDateFlagOptional;
  switch (__id) {
    case 2134163905: {
      const tmp = decodeFieldTypeFlagDefaultValueDate(__d);
      if (tmp === null) return null;
      value = tmp;
      break;
    }
    case -1064021995: {
      const tmp = decodeFieldTypeDateFlagOptional(__d);
      if (tmp === null) return null;
      value = tmp;
      break;
    }
    default:
      return null;
  }
  return value;
}
export function defaultFieldTypeDateFlagTrait() {
  return defaultFieldTypeFlagDefaultValueDate();
}
export function compareFieldTypeDateFlagTrait(
  __a: FieldTypeDateFlag,
  __b: FieldTypeDateFlag
) {
  switch (__a._name) {
    case "fieldTypeDate.FieldTypeFlagDefaultValueDate":
      if (__b._name !== "fieldTypeDate.FieldTypeFlagDefaultValueDate")
        return false;
      return compareFieldTypeFlagDefaultValueDate(__a, __b);
    case "fieldTypeDate.FieldTypeDateFlagOptional":
      if (__b._name !== "fieldTypeDate.FieldTypeDateFlagOptional") return false;
      return compareFieldTypeDateFlagOptional(__a, __b);
  }
}
export interface FieldTypeFlagDefaultValueDate {
  _name: "fieldTypeDate.FieldTypeFlagDefaultValueDate";
  date: string;
}
export function isFieldTypeFlagDefaultValueDate(
  value: unknown
): value is FieldTypeFlagDefaultValueDate {
  if (
    !(
      typeof value === "object" &&
      value !== null &&
      "_name" in value &&
      typeof value["_name"] === "string" &&
      value["_name"] === "fieldTypeDate.FieldTypeFlagDefaultValueDate"
    )
  )
    return false;
  if (
    !(
      "date" in value &&
      ((__v0) =>
        typeof __v0 === "string" &&
        JSBI.equal(JSBI.BigInt(__v0), JSBI.BigInt(__v0)) &&
        JSBI.greaterThanOrEqual(
          JSBI.BigInt(__v0),
          JSBI.BigInt("-9223372036854775808")
        ) &&
        JSBI.lessThanOrEqual(
          JSBI.BigInt(__v0),
          JSBI.BigInt("9223372036854775807")
        ))(value["date"])
    )
  )
    return false;
  return true;
}
export interface FieldTypeFlagDefaultValueDateInputParams {
  date: string;
}
export function FieldTypeFlagDefaultValueDate(
  params: FieldTypeFlagDefaultValueDateInputParams
): FieldTypeFlagDefaultValueDate {
  return {
    _name: "fieldTypeDate.FieldTypeFlagDefaultValueDate",
    date: params["date"]
  };
}
export function encodeFieldTypeFlagDefaultValueDate(
  __s: ISerializer,
  value: FieldTypeFlagDefaultValueDate
) {
  __s.writeInt32(2134163905);
  /**
   * encoding param: date
   */
  const __pv0 = value["date"];
  __s.writeSignedLong(__pv0);
}
export function decodeFieldTypeFlagDefaultValueDate(
  __d: IDeserializer
): FieldTypeFlagDefaultValueDate | null {
  const __id = __d.readInt32();
  /**
   * decode header
   */
  if (__id !== 2134163905) return null;
  let date: string;
  /**
   * decoding param: date
   */
  date = __d.readSignedLong();
  return {
    _name: "fieldTypeDate.FieldTypeFlagDefaultValueDate",
    date
  };
}
export function defaultFieldTypeFlagDefaultValueDate(
  params: Partial<FieldTypeFlagDefaultValueDateInputParams> = {}
): FieldTypeFlagDefaultValueDate {
  return FieldTypeFlagDefaultValueDate({
    date: "0",
    ...params
  });
}
export function compareFieldTypeFlagDefaultValueDate(
  __a: FieldTypeFlagDefaultValueDate,
  __b: FieldTypeFlagDefaultValueDate
): boolean {
  return (
    /**
     * compare parameter date
     */
    __a["date"] === __b["date"]
  );
}
export function updateFieldTypeFlagDefaultValueDate(
  value: FieldTypeFlagDefaultValueDate,
  changes: Partial<FieldTypeFlagDefaultValueDateInputParams>
) {
  if (typeof changes["date"] !== "undefined") {
    if (!(changes["date"] === value["date"])) {
      value = FieldTypeFlagDefaultValueDate({
        ...value,
        date: changes["date"]
      });
    }
  }
  return value;
}
export interface FieldTypeDateFlagOptional {
  _name: "fieldTypeDate.FieldTypeDateFlagOptional";
}
export function isFieldTypeDateFlagOptional(
  value: unknown
): value is FieldTypeDateFlagOptional {
  if (
    !(
      typeof value === "object" &&
      value !== null &&
      "_name" in value &&
      typeof value["_name"] === "string" &&
      value["_name"] === "fieldTypeDate.FieldTypeDateFlagOptional"
    )
  )
    return false;
  return true;
}
export interface FieldTypeDateFlagOptionalInputParams {}
export function FieldTypeDateFlagOptional(
  _: FieldTypeDateFlagOptionalInputParams = {}
): FieldTypeDateFlagOptional {
  return {
    _name: "fieldTypeDate.FieldTypeDateFlagOptional"
  };
}
export function encodeFieldTypeDateFlagOptional(
  __s: ISerializer,
  _: FieldTypeDateFlagOptional
) {
  __s.writeInt32(-1064021995);
}
export function decodeFieldTypeDateFlagOptional(
  __d: IDeserializer
): FieldTypeDateFlagOptional | null {
  const __id = __d.readInt32();
  /**
   * decode header
   */
  if (__id !== -1064021995) return null;
  return {
    _name: "fieldTypeDate.FieldTypeDateFlagOptional"
  };
}
export function defaultFieldTypeDateFlagOptional(
  params: Partial<FieldTypeDateFlagOptionalInputParams> = {}
): FieldTypeDateFlagOptional {
  return FieldTypeDateFlagOptional({
    ...params
  });
}
export function compareFieldTypeDateFlagOptional(
  __a: FieldTypeDateFlagOptional,
  __b: FieldTypeDateFlagOptional
): boolean {
  return true;
}
export function updateFieldTypeDateFlagOptional(
  value: FieldTypeDateFlagOptional,
  _: Partial<FieldTypeDateFlagOptionalInputParams>
) {
  return value;
}
export interface FieldTypeDate {
  _name: "fieldTypeDate.FieldTypeDate";
  flags: ReadonlyArray<Readonly<FieldTypeDateFlag>>;
}
export function isFieldTypeDate(value: unknown): value is FieldTypeDate {
  if (
    !(
      typeof value === "object" &&
      value !== null &&
      "_name" in value &&
      typeof value["_name"] === "string" &&
      value["_name"] === "fieldTypeDate.FieldTypeDate"
    )
  )
    return false;
  if (
    !(
      "flags" in value &&
      ((__v0) =>
        (Array.isArray(__v0) || __v0 instanceof Set) &&
        Array.from(__v0).every((p) => isFieldTypeDateFlagTrait(p)))(
        value["flags"]
      )
    )
  )
    return false;
  return true;
}
export interface FieldTypeDateInputParams {
  flags: ReadonlyArray<Readonly<FieldTypeDateFlag>>;
}
export function FieldTypeDate(params: FieldTypeDateInputParams): FieldTypeDate {
  return {
    _name: "fieldTypeDate.FieldTypeDate",
    flags: params["flags"]
  };
}
export function encodeFieldTypeDate(__s: ISerializer, value: FieldTypeDate) {
  __s.writeInt32(-367427752);
  /**
   * encoding param: flags
   */
  const __pv0 = value["flags"];
  const __l1 = __pv0.length;
  __s.writeUint32(__l1);
  for (const __item1 of __pv0) {
    encodeFieldTypeDateFlagTrait(__s, __item1);
  }
}
export function decodeFieldTypeDate(__d: IDeserializer): FieldTypeDate | null {
  const __id = __d.readInt32();
  /**
   * decode header
   */
  if (__id !== -367427752) return null;
  let flags: Array<FieldTypeDateFlag>;
  /**
   * decoding param: flags
   */
  const __l1 = __d.readUint32();
  const __o1 = new Array<FieldTypeDateFlag>(__l1);
  flags = __o1;
  for (let __i1 = 0; __i1 < __l1; __i1++) {
    const __tmp2 = decodeFieldTypeDateFlagTrait(__d);
    if (__tmp2 === null) return null;
    __o1[__i1] = __tmp2;
  }
  return {
    _name: "fieldTypeDate.FieldTypeDate",
    flags
  };
}
export function defaultFieldTypeDate(
  params: Partial<FieldTypeDateInputParams> = {}
): FieldTypeDate {
  return FieldTypeDate({
    flags: [],
    ...params
  });
}
export function compareFieldTypeDate(
  __a: FieldTypeDate,
  __b: FieldTypeDate
): boolean {
  return (
    /**
     * compare parameter flags
     */
    __a["flags"].length === __b["flags"].length &&
    Array.from(__a["flags"]).every((__originalItem0, __index0) =>
      typeof __originalItem0 === "undefined"
        ? false
        : ((__item0) =>
            typeof __item0 === "undefined"
              ? false
              : compareFieldTypeDateFlagTrait(__originalItem0, __item0))(
            Array.from(__b["flags"])[__index0]
          )
    )
  );
}
export function updateFieldTypeDate(
  value: FieldTypeDate,
  changes: Partial<FieldTypeDateInputParams>
) {
  if (typeof changes["flags"] !== "undefined") {
    if (
      !(
        changes["flags"].length === value["flags"].length &&
        Array.from(changes["flags"]).every((__originalItem1, __index1) =>
          typeof __originalItem1 === "undefined"
            ? false
            : ((__item1) =>
                typeof __item1 === "undefined"
                  ? false
                  : compareFieldTypeDateFlagTrait(__originalItem1, __item1))(
                Array.from(value["flags"])[__index1]
              )
        )
      )
    ) {
      value = FieldTypeDate({
        ...value,
        flags: changes["flags"]
      });
    }
  }
  return value;
}
