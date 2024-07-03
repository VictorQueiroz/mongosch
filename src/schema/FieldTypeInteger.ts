import { ISerializer } from "./__types__";
import { IDeserializer } from "./__types__";
import JSBI from "jsbi";
export type FieldTypeIntegerFlag =
  | Readonly<FieldTypeIntegerFlagOptional>
  | Readonly<FieldTypeIntegerFlagDefaultValueDouble>
  | Readonly<FieldTypeIntegerFlagDefaultValueInt64>
  | Readonly<FieldTypeIntegerFlagDefaultValueInt32>
  | Readonly<FieldTypeIntegerFlagMin>
  | Readonly<FieldTypeIntegerFlagMax>;
export function isFieldTypeIntegerFlagTrait(
  value: unknown
): value is FieldTypeIntegerFlag {
  if (isFieldTypeIntegerFlagOptional(value)) return true;
  if (isFieldTypeIntegerFlagDefaultValueDouble(value)) return true;
  if (isFieldTypeIntegerFlagDefaultValueInt64(value)) return true;
  if (isFieldTypeIntegerFlagDefaultValueInt32(value)) return true;
  if (isFieldTypeIntegerFlagMin(value)) return true;
  if (isFieldTypeIntegerFlagMax(value)) return true;
  return false;
}
export function encodeFieldTypeIntegerFlagTrait(
  __s: ISerializer,
  value: FieldTypeIntegerFlag
) {
  switch (value._name) {
    case "field-type-integer.FieldTypeIntegerFlagOptional":
      return encodeFieldTypeIntegerFlagOptional(__s, value);
    case "field-type-integer.FieldTypeIntegerFlagDefaultValueDouble":
      return encodeFieldTypeIntegerFlagDefaultValueDouble(__s, value);
    case "field-type-integer.FieldTypeIntegerFlagDefaultValueInt64":
      return encodeFieldTypeIntegerFlagDefaultValueInt64(__s, value);
    case "field-type-integer.FieldTypeIntegerFlagDefaultValueInt32":
      return encodeFieldTypeIntegerFlagDefaultValueInt32(__s, value);
    case "field-type-integer.FieldTypeIntegerFlagMin":
      return encodeFieldTypeIntegerFlagMin(__s, value);
    case "field-type-integer.FieldTypeIntegerFlagMax":
      return encodeFieldTypeIntegerFlagMax(__s, value);
  }
  throw new Error(
    `Failed to encode: Received invalid value on "_name" property. We got "${value["_name"]}" value, but this function was expecting to receive one of the following:\n\t- field-type-integer.FieldTypeIntegerFlagOptional\n\t- field-type-integer.FieldTypeIntegerFlagDefaultValueDouble\n\t- field-type-integer.FieldTypeIntegerFlagDefaultValueInt64\n\t- field-type-integer.FieldTypeIntegerFlagDefaultValueInt32\n\t- field-type-integer.FieldTypeIntegerFlagMin\n\t- field-type-integer.FieldTypeIntegerFlagMax\n\n\nPossible cause is that maybe this type simply does not extend this trait, and somehow the type-checking prevented you from calling this function wrongly.`
  );
}
export function decodeFieldTypeIntegerFlagTrait(__d: IDeserializer) {
  const __id = __d.readInt32();
  __d.rewind(4);
  let value:
    | FieldTypeIntegerFlagOptional
    | FieldTypeIntegerFlagDefaultValueDouble
    | FieldTypeIntegerFlagDefaultValueInt64
    | FieldTypeIntegerFlagDefaultValueInt32
    | FieldTypeIntegerFlagMin
    | FieldTypeIntegerFlagMax;
  switch (__id) {
    case -1409939587: {
      const tmp = decodeFieldTypeIntegerFlagOptional(__d);
      if (tmp === null) return null;
      value = tmp;
      break;
    }
    case 1991764510: {
      const tmp = decodeFieldTypeIntegerFlagDefaultValueDouble(__d);
      if (tmp === null) return null;
      value = tmp;
      break;
    }
    case 894668971: {
      const tmp = decodeFieldTypeIntegerFlagDefaultValueInt64(__d);
      if (tmp === null) return null;
      value = tmp;
      break;
    }
    case 1093984595: {
      const tmp = decodeFieldTypeIntegerFlagDefaultValueInt32(__d);
      if (tmp === null) return null;
      value = tmp;
      break;
    }
    case 715142335: {
      const tmp = decodeFieldTypeIntegerFlagMin(__d);
      if (tmp === null) return null;
      value = tmp;
      break;
    }
    case -1160567723: {
      const tmp = decodeFieldTypeIntegerFlagMax(__d);
      if (tmp === null) return null;
      value = tmp;
      break;
    }
    default:
      return null;
  }
  return value;
}
export function defaultFieldTypeIntegerFlagTrait() {
  return defaultFieldTypeIntegerFlagOptional();
}
export function compareFieldTypeIntegerFlagTrait(
  __a: FieldTypeIntegerFlag,
  __b: FieldTypeIntegerFlag
) {
  switch (__a._name) {
    case "field-type-integer.FieldTypeIntegerFlagOptional":
      if (__b._name !== "field-type-integer.FieldTypeIntegerFlagOptional")
        return false;
      return compareFieldTypeIntegerFlagOptional(__a, __b);
    case "field-type-integer.FieldTypeIntegerFlagDefaultValueDouble":
      if (
        __b._name !==
        "field-type-integer.FieldTypeIntegerFlagDefaultValueDouble"
      )
        return false;
      return compareFieldTypeIntegerFlagDefaultValueDouble(__a, __b);
    case "field-type-integer.FieldTypeIntegerFlagDefaultValueInt64":
      if (
        __b._name !== "field-type-integer.FieldTypeIntegerFlagDefaultValueInt64"
      )
        return false;
      return compareFieldTypeIntegerFlagDefaultValueInt64(__a, __b);
    case "field-type-integer.FieldTypeIntegerFlagDefaultValueInt32":
      if (
        __b._name !== "field-type-integer.FieldTypeIntegerFlagDefaultValueInt32"
      )
        return false;
      return compareFieldTypeIntegerFlagDefaultValueInt32(__a, __b);
    case "field-type-integer.FieldTypeIntegerFlagMin":
      if (__b._name !== "field-type-integer.FieldTypeIntegerFlagMin")
        return false;
      return compareFieldTypeIntegerFlagMin(__a, __b);
    case "field-type-integer.FieldTypeIntegerFlagMax":
      if (__b._name !== "field-type-integer.FieldTypeIntegerFlagMax")
        return false;
      return compareFieldTypeIntegerFlagMax(__a, __b);
  }
}
export interface FieldTypeIntegerFlagOptional {
  _name: "field-type-integer.FieldTypeIntegerFlagOptional";
}
export function isFieldTypeIntegerFlagOptional(
  value: unknown
): value is FieldTypeIntegerFlagOptional {
  if (
    !(
      typeof value === "object" &&
      value !== null &&
      "_name" in value &&
      typeof value["_name"] === "string" &&
      value["_name"] === "field-type-integer.FieldTypeIntegerFlagOptional"
    )
  )
    return false;
  return true;
}
export interface FieldTypeIntegerFlagOptionalInputParams {}
export function FieldTypeIntegerFlagOptional(
  _: FieldTypeIntegerFlagOptionalInputParams = {}
): FieldTypeIntegerFlagOptional {
  return {
    _name: "field-type-integer.FieldTypeIntegerFlagOptional"
  };
}
export function encodeFieldTypeIntegerFlagOptional(
  __s: ISerializer,
  _: FieldTypeIntegerFlagOptional
) {
  __s.writeInt32(-1409939587);
}
export function decodeFieldTypeIntegerFlagOptional(
  __d: IDeserializer
): FieldTypeIntegerFlagOptional | null {
  const __id = __d.readInt32();
  /**
   * decode header
   */
  if (__id !== -1409939587) return null;
  return {
    _name: "field-type-integer.FieldTypeIntegerFlagOptional"
  };
}
export function defaultFieldTypeIntegerFlagOptional(
  params: Partial<FieldTypeIntegerFlagOptionalInputParams> = {}
): FieldTypeIntegerFlagOptional {
  return FieldTypeIntegerFlagOptional({
    ...params
  });
}
export function compareFieldTypeIntegerFlagOptional(
  __a: FieldTypeIntegerFlagOptional,
  __b: FieldTypeIntegerFlagOptional
): boolean {
  return true;
}
export function updateFieldTypeIntegerFlagOptional(
  value: FieldTypeIntegerFlagOptional,
  _: Partial<FieldTypeIntegerFlagOptionalInputParams>
) {
  return value;
}
export interface FieldTypeIntegerFlagDefaultValueDouble {
  _name: "field-type-integer.FieldTypeIntegerFlagDefaultValueDouble";
  value: number;
}
export function isFieldTypeIntegerFlagDefaultValueDouble(
  value: unknown
): value is FieldTypeIntegerFlagDefaultValueDouble {
  if (
    !(
      typeof value === "object" &&
      value !== null &&
      "_name" in value &&
      typeof value["_name"] === "string" &&
      value["_name"] ===
        "field-type-integer.FieldTypeIntegerFlagDefaultValueDouble"
    )
  )
    return false;
  if (
    !("value" in value && ((__v0) => typeof __v0 === "number")(value["value"]))
  )
    return false;
  return true;
}
export interface FieldTypeIntegerFlagDefaultValueDoubleInputParams {
  value: number;
}
export function FieldTypeIntegerFlagDefaultValueDouble(
  params: FieldTypeIntegerFlagDefaultValueDoubleInputParams
): FieldTypeIntegerFlagDefaultValueDouble {
  return {
    _name: "field-type-integer.FieldTypeIntegerFlagDefaultValueDouble",
    value: params["value"]
  };
}
export function encodeFieldTypeIntegerFlagDefaultValueDouble(
  __s: ISerializer,
  value: FieldTypeIntegerFlagDefaultValueDouble
) {
  __s.writeInt32(1991764510);
  /**
   * encoding param: value
   */
  const __pv0 = value["value"];
  __s.writeDouble(__pv0);
}
export function decodeFieldTypeIntegerFlagDefaultValueDouble(
  __d: IDeserializer
): FieldTypeIntegerFlagDefaultValueDouble | null {
  const __id = __d.readInt32();
  /**
   * decode header
   */
  if (__id !== 1991764510) return null;
  let value: number;
  /**
   * decoding param: value
   */
  value = __d.readDouble();
  return {
    _name: "field-type-integer.FieldTypeIntegerFlagDefaultValueDouble",
    value
  };
}
export function defaultFieldTypeIntegerFlagDefaultValueDouble(
  params: Partial<FieldTypeIntegerFlagDefaultValueDoubleInputParams> = {}
): FieldTypeIntegerFlagDefaultValueDouble {
  return FieldTypeIntegerFlagDefaultValueDouble({
    value: 0.0,
    ...params
  });
}
export function compareFieldTypeIntegerFlagDefaultValueDouble(
  __a: FieldTypeIntegerFlagDefaultValueDouble,
  __b: FieldTypeIntegerFlagDefaultValueDouble
): boolean {
  return (
    /**
     * compare parameter value
     */
    __a["value"] === __b["value"]
  );
}
export function updateFieldTypeIntegerFlagDefaultValueDouble(
  value: FieldTypeIntegerFlagDefaultValueDouble,
  changes: Partial<FieldTypeIntegerFlagDefaultValueDoubleInputParams>
) {
  if (typeof changes["value"] !== "undefined") {
    if (!(changes["value"] === value["value"])) {
      value = FieldTypeIntegerFlagDefaultValueDouble({
        ...value,
        value: changes["value"]
      });
    }
  }
  return value;
}
export interface FieldTypeIntegerFlagDefaultValueInt64 {
  _name: "field-type-integer.FieldTypeIntegerFlagDefaultValueInt64";
  value: string;
}
export function isFieldTypeIntegerFlagDefaultValueInt64(
  value: unknown
): value is FieldTypeIntegerFlagDefaultValueInt64 {
  if (
    !(
      typeof value === "object" &&
      value !== null &&
      "_name" in value &&
      typeof value["_name"] === "string" &&
      value["_name"] ===
        "field-type-integer.FieldTypeIntegerFlagDefaultValueInt64"
    )
  )
    return false;
  if (
    !(
      "value" in value &&
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
        ))(value["value"])
    )
  )
    return false;
  return true;
}
export interface FieldTypeIntegerFlagDefaultValueInt64InputParams {
  value: string;
}
export function FieldTypeIntegerFlagDefaultValueInt64(
  params: FieldTypeIntegerFlagDefaultValueInt64InputParams
): FieldTypeIntegerFlagDefaultValueInt64 {
  return {
    _name: "field-type-integer.FieldTypeIntegerFlagDefaultValueInt64",
    value: params["value"]
  };
}
export function encodeFieldTypeIntegerFlagDefaultValueInt64(
  __s: ISerializer,
  value: FieldTypeIntegerFlagDefaultValueInt64
) {
  __s.writeInt32(894668971);
  /**
   * encoding param: value
   */
  const __pv0 = value["value"];
  __s.writeSignedLong(__pv0);
}
export function decodeFieldTypeIntegerFlagDefaultValueInt64(
  __d: IDeserializer
): FieldTypeIntegerFlagDefaultValueInt64 | null {
  const __id = __d.readInt32();
  /**
   * decode header
   */
  if (__id !== 894668971) return null;
  let value: string;
  /**
   * decoding param: value
   */
  value = __d.readSignedLong();
  return {
    _name: "field-type-integer.FieldTypeIntegerFlagDefaultValueInt64",
    value
  };
}
export function defaultFieldTypeIntegerFlagDefaultValueInt64(
  params: Partial<FieldTypeIntegerFlagDefaultValueInt64InputParams> = {}
): FieldTypeIntegerFlagDefaultValueInt64 {
  return FieldTypeIntegerFlagDefaultValueInt64({
    value: "0",
    ...params
  });
}
export function compareFieldTypeIntegerFlagDefaultValueInt64(
  __a: FieldTypeIntegerFlagDefaultValueInt64,
  __b: FieldTypeIntegerFlagDefaultValueInt64
): boolean {
  return (
    /**
     * compare parameter value
     */
    __a["value"] === __b["value"]
  );
}
export function updateFieldTypeIntegerFlagDefaultValueInt64(
  value: FieldTypeIntegerFlagDefaultValueInt64,
  changes: Partial<FieldTypeIntegerFlagDefaultValueInt64InputParams>
) {
  if (typeof changes["value"] !== "undefined") {
    if (!(changes["value"] === value["value"])) {
      value = FieldTypeIntegerFlagDefaultValueInt64({
        ...value,
        value: changes["value"]
      });
    }
  }
  return value;
}
export interface FieldTypeIntegerFlagDefaultValueInt32 {
  _name: "field-type-integer.FieldTypeIntegerFlagDefaultValueInt32";
  value: number;
}
export function isFieldTypeIntegerFlagDefaultValueInt32(
  value: unknown
): value is FieldTypeIntegerFlagDefaultValueInt32 {
  if (
    !(
      typeof value === "object" &&
      value !== null &&
      "_name" in value &&
      typeof value["_name"] === "string" &&
      value["_name"] ===
        "field-type-integer.FieldTypeIntegerFlagDefaultValueInt32"
    )
  )
    return false;
  if (
    !(
      "value" in value &&
      ((__v0) =>
        typeof __v0 === "number" &&
        JSBI.equal(JSBI.BigInt(__v0), JSBI.BigInt(__v0)) &&
        JSBI.greaterThanOrEqual(
          JSBI.BigInt(__v0),
          JSBI.BigInt("-2147483648")
        ) &&
        JSBI.lessThanOrEqual(JSBI.BigInt(__v0), JSBI.BigInt("2147483647")))(
        value["value"]
      )
    )
  )
    return false;
  return true;
}
export interface FieldTypeIntegerFlagDefaultValueInt32InputParams {
  value: number;
}
export function FieldTypeIntegerFlagDefaultValueInt32(
  params: FieldTypeIntegerFlagDefaultValueInt32InputParams
): FieldTypeIntegerFlagDefaultValueInt32 {
  return {
    _name: "field-type-integer.FieldTypeIntegerFlagDefaultValueInt32",
    value: params["value"]
  };
}
export function encodeFieldTypeIntegerFlagDefaultValueInt32(
  __s: ISerializer,
  value: FieldTypeIntegerFlagDefaultValueInt32
) {
  __s.writeInt32(1093984595);
  /**
   * encoding param: value
   */
  const __pv0 = value["value"];
  __s.writeInt32(__pv0);
}
export function decodeFieldTypeIntegerFlagDefaultValueInt32(
  __d: IDeserializer
): FieldTypeIntegerFlagDefaultValueInt32 | null {
  const __id = __d.readInt32();
  /**
   * decode header
   */
  if (__id !== 1093984595) return null;
  let value: number;
  /**
   * decoding param: value
   */
  value = __d.readInt32();
  return {
    _name: "field-type-integer.FieldTypeIntegerFlagDefaultValueInt32",
    value
  };
}
export function defaultFieldTypeIntegerFlagDefaultValueInt32(
  params: Partial<FieldTypeIntegerFlagDefaultValueInt32InputParams> = {}
): FieldTypeIntegerFlagDefaultValueInt32 {
  return FieldTypeIntegerFlagDefaultValueInt32({
    value: 0,
    ...params
  });
}
export function compareFieldTypeIntegerFlagDefaultValueInt32(
  __a: FieldTypeIntegerFlagDefaultValueInt32,
  __b: FieldTypeIntegerFlagDefaultValueInt32
): boolean {
  return (
    /**
     * compare parameter value
     */
    __a["value"] === __b["value"]
  );
}
export function updateFieldTypeIntegerFlagDefaultValueInt32(
  value: FieldTypeIntegerFlagDefaultValueInt32,
  changes: Partial<FieldTypeIntegerFlagDefaultValueInt32InputParams>
) {
  if (typeof changes["value"] !== "undefined") {
    if (!(changes["value"] === value["value"])) {
      value = FieldTypeIntegerFlagDefaultValueInt32({
        ...value,
        value: changes["value"]
      });
    }
  }
  return value;
}
export interface FieldTypeIntegerFlagMin {
  _name: "field-type-integer.FieldTypeIntegerFlagMin";
  value: number;
}
export function isFieldTypeIntegerFlagMin(
  value: unknown
): value is FieldTypeIntegerFlagMin {
  if (
    !(
      typeof value === "object" &&
      value !== null &&
      "_name" in value &&
      typeof value["_name"] === "string" &&
      value["_name"] === "field-type-integer.FieldTypeIntegerFlagMin"
    )
  )
    return false;
  if (
    !("value" in value && ((__v0) => typeof __v0 === "number")(value["value"]))
  )
    return false;
  return true;
}
export interface FieldTypeIntegerFlagMinInputParams {
  value: number;
}
export function FieldTypeIntegerFlagMin(
  params: FieldTypeIntegerFlagMinInputParams
): FieldTypeIntegerFlagMin {
  return {
    _name: "field-type-integer.FieldTypeIntegerFlagMin",
    value: params["value"]
  };
}
export function encodeFieldTypeIntegerFlagMin(
  __s: ISerializer,
  value: FieldTypeIntegerFlagMin
) {
  __s.writeInt32(715142335);
  /**
   * encoding param: value
   */
  const __pv0 = value["value"];
  __s.writeDouble(__pv0);
}
export function decodeFieldTypeIntegerFlagMin(
  __d: IDeserializer
): FieldTypeIntegerFlagMin | null {
  const __id = __d.readInt32();
  /**
   * decode header
   */
  if (__id !== 715142335) return null;
  let value: number;
  /**
   * decoding param: value
   */
  value = __d.readDouble();
  return {
    _name: "field-type-integer.FieldTypeIntegerFlagMin",
    value
  };
}
export function defaultFieldTypeIntegerFlagMin(
  params: Partial<FieldTypeIntegerFlagMinInputParams> = {}
): FieldTypeIntegerFlagMin {
  return FieldTypeIntegerFlagMin({
    value: 0.0,
    ...params
  });
}
export function compareFieldTypeIntegerFlagMin(
  __a: FieldTypeIntegerFlagMin,
  __b: FieldTypeIntegerFlagMin
): boolean {
  return (
    /**
     * compare parameter value
     */
    __a["value"] === __b["value"]
  );
}
export function updateFieldTypeIntegerFlagMin(
  value: FieldTypeIntegerFlagMin,
  changes: Partial<FieldTypeIntegerFlagMinInputParams>
) {
  if (typeof changes["value"] !== "undefined") {
    if (!(changes["value"] === value["value"])) {
      value = FieldTypeIntegerFlagMin({
        ...value,
        value: changes["value"]
      });
    }
  }
  return value;
}
export interface FieldTypeIntegerFlagMax {
  _name: "field-type-integer.FieldTypeIntegerFlagMax";
  value: number;
}
export function isFieldTypeIntegerFlagMax(
  value: unknown
): value is FieldTypeIntegerFlagMax {
  if (
    !(
      typeof value === "object" &&
      value !== null &&
      "_name" in value &&
      typeof value["_name"] === "string" &&
      value["_name"] === "field-type-integer.FieldTypeIntegerFlagMax"
    )
  )
    return false;
  if (
    !("value" in value && ((__v0) => typeof __v0 === "number")(value["value"]))
  )
    return false;
  return true;
}
export interface FieldTypeIntegerFlagMaxInputParams {
  value: number;
}
export function FieldTypeIntegerFlagMax(
  params: FieldTypeIntegerFlagMaxInputParams
): FieldTypeIntegerFlagMax {
  return {
    _name: "field-type-integer.FieldTypeIntegerFlagMax",
    value: params["value"]
  };
}
export function encodeFieldTypeIntegerFlagMax(
  __s: ISerializer,
  value: FieldTypeIntegerFlagMax
) {
  __s.writeInt32(-1160567723);
  /**
   * encoding param: value
   */
  const __pv0 = value["value"];
  __s.writeDouble(__pv0);
}
export function decodeFieldTypeIntegerFlagMax(
  __d: IDeserializer
): FieldTypeIntegerFlagMax | null {
  const __id = __d.readInt32();
  /**
   * decode header
   */
  if (__id !== -1160567723) return null;
  let value: number;
  /**
   * decoding param: value
   */
  value = __d.readDouble();
  return {
    _name: "field-type-integer.FieldTypeIntegerFlagMax",
    value
  };
}
export function defaultFieldTypeIntegerFlagMax(
  params: Partial<FieldTypeIntegerFlagMaxInputParams> = {}
): FieldTypeIntegerFlagMax {
  return FieldTypeIntegerFlagMax({
    value: 0.0,
    ...params
  });
}
export function compareFieldTypeIntegerFlagMax(
  __a: FieldTypeIntegerFlagMax,
  __b: FieldTypeIntegerFlagMax
): boolean {
  return (
    /**
     * compare parameter value
     */
    __a["value"] === __b["value"]
  );
}
export function updateFieldTypeIntegerFlagMax(
  value: FieldTypeIntegerFlagMax,
  changes: Partial<FieldTypeIntegerFlagMaxInputParams>
) {
  if (typeof changes["value"] !== "undefined") {
    if (!(changes["value"] === value["value"])) {
      value = FieldTypeIntegerFlagMax({
        ...value,
        value: changes["value"]
      });
    }
  }
  return value;
}
export interface FieldTypeDouble {
  _name: "field-type-integer.FieldTypeDouble";
  flags: ReadonlyArray<Readonly<FieldTypeIntegerFlag>>;
}
export function isFieldTypeDouble(value: unknown): value is FieldTypeDouble {
  if (
    !(
      typeof value === "object" &&
      value !== null &&
      "_name" in value &&
      typeof value["_name"] === "string" &&
      value["_name"] === "field-type-integer.FieldTypeDouble"
    )
  )
    return false;
  if (
    !(
      "flags" in value &&
      ((__v0) =>
        (Array.isArray(__v0) || __v0 instanceof Set) &&
        Array.from(__v0).every((p) => isFieldTypeIntegerFlagTrait(p)))(
        value["flags"]
      )
    )
  )
    return false;
  return true;
}
export interface FieldTypeDoubleInputParams {
  flags: ReadonlyArray<Readonly<FieldTypeIntegerFlag>>;
}
export function FieldTypeDouble(
  params: FieldTypeDoubleInputParams
): FieldTypeDouble {
  return {
    _name: "field-type-integer.FieldTypeDouble",
    flags: params["flags"]
  };
}
export function encodeFieldTypeDouble(
  __s: ISerializer,
  value: FieldTypeDouble
) {
  __s.writeInt32(-1526483373);
  /**
   * encoding param: flags
   */
  const __pv0 = value["flags"];
  const __l1 = __pv0.length;
  __s.writeUint32(__l1);
  for (const __item1 of __pv0) {
    encodeFieldTypeIntegerFlagTrait(__s, __item1);
  }
}
export function decodeFieldTypeDouble(
  __d: IDeserializer
): FieldTypeDouble | null {
  const __id = __d.readInt32();
  /**
   * decode header
   */
  if (__id !== -1526483373) return null;
  let flags: Array<FieldTypeIntegerFlag>;
  /**
   * decoding param: flags
   */
  const __l1 = __d.readUint32();
  const __o1 = new Array<FieldTypeIntegerFlag>(__l1);
  flags = __o1;
  for (let __i1 = 0; __i1 < __l1; __i1++) {
    const __tmp2 = decodeFieldTypeIntegerFlagTrait(__d);
    if (__tmp2 === null) return null;
    __o1[__i1] = __tmp2;
  }
  return {
    _name: "field-type-integer.FieldTypeDouble",
    flags
  };
}
export function defaultFieldTypeDouble(
  params: Partial<FieldTypeDoubleInputParams> = {}
): FieldTypeDouble {
  return FieldTypeDouble({
    flags: [],
    ...params
  });
}
export function compareFieldTypeDouble(
  __a: FieldTypeDouble,
  __b: FieldTypeDouble
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
              : compareFieldTypeIntegerFlagTrait(__originalItem0, __item0))(
            Array.from(__b["flags"])[__index0]
          )
    )
  );
}
export function updateFieldTypeDouble(
  value: FieldTypeDouble,
  changes: Partial<FieldTypeDoubleInputParams>
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
                  : compareFieldTypeIntegerFlagTrait(__originalItem1, __item1))(
                Array.from(value["flags"])[__index1]
              )
        )
      )
    ) {
      value = FieldTypeDouble({
        ...value,
        flags: changes["flags"]
      });
    }
  }
  return value;
}
export interface FieldTypeInt64 {
  _name: "field-type-integer.FieldTypeInt64";
  flags: ReadonlyArray<Readonly<FieldTypeIntegerFlag>>;
}
export function isFieldTypeInt64(value: unknown): value is FieldTypeInt64 {
  if (
    !(
      typeof value === "object" &&
      value !== null &&
      "_name" in value &&
      typeof value["_name"] === "string" &&
      value["_name"] === "field-type-integer.FieldTypeInt64"
    )
  )
    return false;
  if (
    !(
      "flags" in value &&
      ((__v0) =>
        (Array.isArray(__v0) || __v0 instanceof Set) &&
        Array.from(__v0).every((p) => isFieldTypeIntegerFlagTrait(p)))(
        value["flags"]
      )
    )
  )
    return false;
  return true;
}
export interface FieldTypeInt64InputParams {
  flags: ReadonlyArray<Readonly<FieldTypeIntegerFlag>>;
}
export function FieldTypeInt64(
  params: FieldTypeInt64InputParams
): FieldTypeInt64 {
  return {
    _name: "field-type-integer.FieldTypeInt64",
    flags: params["flags"]
  };
}
export function encodeFieldTypeInt64(__s: ISerializer, value: FieldTypeInt64) {
  __s.writeInt32(-296959413);
  /**
   * encoding param: flags
   */
  const __pv0 = value["flags"];
  const __l1 = __pv0.length;
  __s.writeUint32(__l1);
  for (const __item1 of __pv0) {
    encodeFieldTypeIntegerFlagTrait(__s, __item1);
  }
}
export function decodeFieldTypeInt64(
  __d: IDeserializer
): FieldTypeInt64 | null {
  const __id = __d.readInt32();
  /**
   * decode header
   */
  if (__id !== -296959413) return null;
  let flags: Array<FieldTypeIntegerFlag>;
  /**
   * decoding param: flags
   */
  const __l1 = __d.readUint32();
  const __o1 = new Array<FieldTypeIntegerFlag>(__l1);
  flags = __o1;
  for (let __i1 = 0; __i1 < __l1; __i1++) {
    const __tmp2 = decodeFieldTypeIntegerFlagTrait(__d);
    if (__tmp2 === null) return null;
    __o1[__i1] = __tmp2;
  }
  return {
    _name: "field-type-integer.FieldTypeInt64",
    flags
  };
}
export function defaultFieldTypeInt64(
  params: Partial<FieldTypeInt64InputParams> = {}
): FieldTypeInt64 {
  return FieldTypeInt64({
    flags: [],
    ...params
  });
}
export function compareFieldTypeInt64(
  __a: FieldTypeInt64,
  __b: FieldTypeInt64
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
              : compareFieldTypeIntegerFlagTrait(__originalItem0, __item0))(
            Array.from(__b["flags"])[__index0]
          )
    )
  );
}
export function updateFieldTypeInt64(
  value: FieldTypeInt64,
  changes: Partial<FieldTypeInt64InputParams>
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
                  : compareFieldTypeIntegerFlagTrait(__originalItem1, __item1))(
                Array.from(value["flags"])[__index1]
              )
        )
      )
    ) {
      value = FieldTypeInt64({
        ...value,
        flags: changes["flags"]
      });
    }
  }
  return value;
}
export interface FieldTypeInt32 {
  _name: "field-type-integer.FieldTypeInt32";
  flags: ReadonlyArray<Readonly<FieldTypeIntegerFlag>>;
}
export function isFieldTypeInt32(value: unknown): value is FieldTypeInt32 {
  if (
    !(
      typeof value === "object" &&
      value !== null &&
      "_name" in value &&
      typeof value["_name"] === "string" &&
      value["_name"] === "field-type-integer.FieldTypeInt32"
    )
  )
    return false;
  if (
    !(
      "flags" in value &&
      ((__v0) =>
        (Array.isArray(__v0) || __v0 instanceof Set) &&
        Array.from(__v0).every((p) => isFieldTypeIntegerFlagTrait(p)))(
        value["flags"]
      )
    )
  )
    return false;
  return true;
}
export interface FieldTypeInt32InputParams {
  flags: ReadonlyArray<Readonly<FieldTypeIntegerFlag>>;
}
export function FieldTypeInt32(
  params: FieldTypeInt32InputParams
): FieldTypeInt32 {
  return {
    _name: "field-type-integer.FieldTypeInt32",
    flags: params["flags"]
  };
}
export function encodeFieldTypeInt32(__s: ISerializer, value: FieldTypeInt32) {
  __s.writeInt32(1212985133);
  /**
   * encoding param: flags
   */
  const __pv0 = value["flags"];
  const __l1 = __pv0.length;
  __s.writeUint32(__l1);
  for (const __item1 of __pv0) {
    encodeFieldTypeIntegerFlagTrait(__s, __item1);
  }
}
export function decodeFieldTypeInt32(
  __d: IDeserializer
): FieldTypeInt32 | null {
  const __id = __d.readInt32();
  /**
   * decode header
   */
  if (__id !== 1212985133) return null;
  let flags: Array<FieldTypeIntegerFlag>;
  /**
   * decoding param: flags
   */
  const __l1 = __d.readUint32();
  const __o1 = new Array<FieldTypeIntegerFlag>(__l1);
  flags = __o1;
  for (let __i1 = 0; __i1 < __l1; __i1++) {
    const __tmp2 = decodeFieldTypeIntegerFlagTrait(__d);
    if (__tmp2 === null) return null;
    __o1[__i1] = __tmp2;
  }
  return {
    _name: "field-type-integer.FieldTypeInt32",
    flags
  };
}
export function defaultFieldTypeInt32(
  params: Partial<FieldTypeInt32InputParams> = {}
): FieldTypeInt32 {
  return FieldTypeInt32({
    flags: [],
    ...params
  });
}
export function compareFieldTypeInt32(
  __a: FieldTypeInt32,
  __b: FieldTypeInt32
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
              : compareFieldTypeIntegerFlagTrait(__originalItem0, __item0))(
            Array.from(__b["flags"])[__index0]
          )
    )
  );
}
export function updateFieldTypeInt32(
  value: FieldTypeInt32,
  changes: Partial<FieldTypeInt32InputParams>
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
                  : compareFieldTypeIntegerFlagTrait(__originalItem1, __item1))(
                Array.from(value["flags"])[__index1]
              )
        )
      )
    ) {
      value = FieldTypeInt32({
        ...value,
        flags: changes["flags"]
      });
    }
  }
  return value;
}
