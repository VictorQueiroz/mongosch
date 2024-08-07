import { FieldType } from "./FieldType";
import { ISerializer } from "./__types__";
import { IDeserializer } from "./__types__";
import JSBI from "jsbi";
import { isFieldTypeTrait } from "./FieldType";
import { encodeFieldTypeTrait } from "./FieldType";
import { decodeFieldTypeTrait } from "./FieldType";
import { defaultFieldTypeTrait } from "./FieldType";
import { compareFieldTypeTrait } from "./FieldType";
export type FieldTypeArrayFlag =
  | Readonly<FieldTypeArrayFlagMinLength>
  | Readonly<FieldTypeArrayFlagMaxLength>
  | Readonly<FieldTypeArrayFlagOptional>;
export function isFieldTypeArrayFlagTrait(
  value: unknown
): value is FieldTypeArrayFlag {
  if (isFieldTypeArrayFlagMinLength(value)) return true;
  if (isFieldTypeArrayFlagMaxLength(value)) return true;
  if (isFieldTypeArrayFlagOptional(value)) return true;
  return false;
}
export function encodeFieldTypeArrayFlagTrait(
  __s: ISerializer,
  value: FieldTypeArrayFlag
) {
  switch (value._name) {
    case "field-type-array.FieldTypeArrayFlagMinLength":
      return encodeFieldTypeArrayFlagMinLength(__s, value);
    case "field-type-array.FieldTypeArrayFlagMaxLength":
      return encodeFieldTypeArrayFlagMaxLength(__s, value);
    case "field-type-array.FieldTypeArrayFlagOptional":
      return encodeFieldTypeArrayFlagOptional(__s, value);
  }
  throw new Error(
    `Failed to encode: Received invalid value on "_name" property. We got "${value["_name"]}" value, but this function was expecting to receive one of the following:\n\t- field-type-array.FieldTypeArrayFlagMinLength\n\t- field-type-array.FieldTypeArrayFlagMaxLength\n\t- field-type-array.FieldTypeArrayFlagOptional\n\n\nPossible cause is that maybe this type simply does not extend this trait, and somehow the type-checking prevented you from calling this function wrongly.`
  );
}
export function decodeFieldTypeArrayFlagTrait(__d: IDeserializer) {
  const __id = __d.readInt32();
  __d.rewind(4);
  let value:
    | FieldTypeArrayFlagMinLength
    | FieldTypeArrayFlagMaxLength
    | FieldTypeArrayFlagOptional;
  switch (__id) {
    case -2125914307: {
      const tmp = decodeFieldTypeArrayFlagMinLength(__d);
      if (tmp === null) return null;
      value = tmp;
      break;
    }
    case -756086823: {
      const tmp = decodeFieldTypeArrayFlagMaxLength(__d);
      if (tmp === null) return null;
      value = tmp;
      break;
    }
    case 28218945: {
      const tmp = decodeFieldTypeArrayFlagOptional(__d);
      if (tmp === null) return null;
      value = tmp;
      break;
    }
    default:
      return null;
  }
  return value;
}
export function defaultFieldTypeArrayFlagTrait() {
  return defaultFieldTypeArrayFlagMinLength();
}
export function compareFieldTypeArrayFlagTrait(
  __a: FieldTypeArrayFlag,
  __b: FieldTypeArrayFlag
) {
  switch (__a._name) {
    case "field-type-array.FieldTypeArrayFlagMinLength":
      if (__b._name !== "field-type-array.FieldTypeArrayFlagMinLength")
        return false;
      return compareFieldTypeArrayFlagMinLength(__a, __b);
    case "field-type-array.FieldTypeArrayFlagMaxLength":
      if (__b._name !== "field-type-array.FieldTypeArrayFlagMaxLength")
        return false;
      return compareFieldTypeArrayFlagMaxLength(__a, __b);
    case "field-type-array.FieldTypeArrayFlagOptional":
      if (__b._name !== "field-type-array.FieldTypeArrayFlagOptional")
        return false;
      return compareFieldTypeArrayFlagOptional(__a, __b);
  }
}
export interface FieldTypeArrayFlagMinLength {
  _name: "field-type-array.FieldTypeArrayFlagMinLength";
  value: number;
}
export function isFieldTypeArrayFlagMinLength(
  value: unknown
): value is FieldTypeArrayFlagMinLength {
  if (
    !(
      typeof value === "object" &&
      value !== null &&
      "_name" in value &&
      typeof value["_name"] === "string" &&
      value["_name"] === "field-type-array.FieldTypeArrayFlagMinLength"
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
export interface FieldTypeArrayFlagMinLengthInputParams {
  value: number;
}
export function FieldTypeArrayFlagMinLength(
  params: FieldTypeArrayFlagMinLengthInputParams
): FieldTypeArrayFlagMinLength {
  return {
    _name: "field-type-array.FieldTypeArrayFlagMinLength",
    value: params["value"]
  };
}
export function encodeFieldTypeArrayFlagMinLength(
  __s: ISerializer,
  value: FieldTypeArrayFlagMinLength
) {
  __s.writeInt32(-2125914307);
  /**
   * encoding param: value
   */
  const __pv0 = value["value"];
  __s.writeInt32(__pv0);
}
export function decodeFieldTypeArrayFlagMinLength(
  __d: IDeserializer
): FieldTypeArrayFlagMinLength | null {
  const __id = __d.readInt32();
  /**
   * decode header
   */
  if (__id !== -2125914307) return null;
  let value: number;
  /**
   * decoding param: value
   */
  value = __d.readInt32();
  return {
    _name: "field-type-array.FieldTypeArrayFlagMinLength",
    value
  };
}
export function defaultFieldTypeArrayFlagMinLength(
  params: Partial<FieldTypeArrayFlagMinLengthInputParams> = {}
): FieldTypeArrayFlagMinLength {
  return FieldTypeArrayFlagMinLength({
    value: 0,
    ...params
  });
}
export function compareFieldTypeArrayFlagMinLength(
  __a: FieldTypeArrayFlagMinLength,
  __b: FieldTypeArrayFlagMinLength
): boolean {
  return (
    /**
     * compare parameter value
     */
    __a["value"] === __b["value"]
  );
}
export function updateFieldTypeArrayFlagMinLength(
  value: FieldTypeArrayFlagMinLength,
  changes: Partial<FieldTypeArrayFlagMinLengthInputParams>
) {
  if (typeof changes["value"] !== "undefined") {
    if (!(changes["value"] === value["value"])) {
      value = FieldTypeArrayFlagMinLength({
        ...value,
        value: changes["value"]
      });
    }
  }
  return value;
}
export interface FieldTypeArrayFlagMaxLength {
  _name: "field-type-array.FieldTypeArrayFlagMaxLength";
  value: number;
}
export function isFieldTypeArrayFlagMaxLength(
  value: unknown
): value is FieldTypeArrayFlagMaxLength {
  if (
    !(
      typeof value === "object" &&
      value !== null &&
      "_name" in value &&
      typeof value["_name"] === "string" &&
      value["_name"] === "field-type-array.FieldTypeArrayFlagMaxLength"
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
export interface FieldTypeArrayFlagMaxLengthInputParams {
  value: number;
}
export function FieldTypeArrayFlagMaxLength(
  params: FieldTypeArrayFlagMaxLengthInputParams
): FieldTypeArrayFlagMaxLength {
  return {
    _name: "field-type-array.FieldTypeArrayFlagMaxLength",
    value: params["value"]
  };
}
export function encodeFieldTypeArrayFlagMaxLength(
  __s: ISerializer,
  value: FieldTypeArrayFlagMaxLength
) {
  __s.writeInt32(-756086823);
  /**
   * encoding param: value
   */
  const __pv0 = value["value"];
  __s.writeInt32(__pv0);
}
export function decodeFieldTypeArrayFlagMaxLength(
  __d: IDeserializer
): FieldTypeArrayFlagMaxLength | null {
  const __id = __d.readInt32();
  /**
   * decode header
   */
  if (__id !== -756086823) return null;
  let value: number;
  /**
   * decoding param: value
   */
  value = __d.readInt32();
  return {
    _name: "field-type-array.FieldTypeArrayFlagMaxLength",
    value
  };
}
export function defaultFieldTypeArrayFlagMaxLength(
  params: Partial<FieldTypeArrayFlagMaxLengthInputParams> = {}
): FieldTypeArrayFlagMaxLength {
  return FieldTypeArrayFlagMaxLength({
    value: 0,
    ...params
  });
}
export function compareFieldTypeArrayFlagMaxLength(
  __a: FieldTypeArrayFlagMaxLength,
  __b: FieldTypeArrayFlagMaxLength
): boolean {
  return (
    /**
     * compare parameter value
     */
    __a["value"] === __b["value"]
  );
}
export function updateFieldTypeArrayFlagMaxLength(
  value: FieldTypeArrayFlagMaxLength,
  changes: Partial<FieldTypeArrayFlagMaxLengthInputParams>
) {
  if (typeof changes["value"] !== "undefined") {
    if (!(changes["value"] === value["value"])) {
      value = FieldTypeArrayFlagMaxLength({
        ...value,
        value: changes["value"]
      });
    }
  }
  return value;
}
export interface FieldTypeArrayFlagOptional {
  _name: "field-type-array.FieldTypeArrayFlagOptional";
}
export function isFieldTypeArrayFlagOptional(
  value: unknown
): value is FieldTypeArrayFlagOptional {
  if (
    !(
      typeof value === "object" &&
      value !== null &&
      "_name" in value &&
      typeof value["_name"] === "string" &&
      value["_name"] === "field-type-array.FieldTypeArrayFlagOptional"
    )
  )
    return false;
  return true;
}
export interface FieldTypeArrayFlagOptionalInputParams {}
export function FieldTypeArrayFlagOptional(
  _: FieldTypeArrayFlagOptionalInputParams = {}
): FieldTypeArrayFlagOptional {
  return {
    _name: "field-type-array.FieldTypeArrayFlagOptional"
  };
}
export function encodeFieldTypeArrayFlagOptional(
  __s: ISerializer,
  _: FieldTypeArrayFlagOptional
) {
  __s.writeInt32(28218945);
}
export function decodeFieldTypeArrayFlagOptional(
  __d: IDeserializer
): FieldTypeArrayFlagOptional | null {
  const __id = __d.readInt32();
  /**
   * decode header
   */
  if (__id !== 28218945) return null;
  return {
    _name: "field-type-array.FieldTypeArrayFlagOptional"
  };
}
export function defaultFieldTypeArrayFlagOptional(
  params: Partial<FieldTypeArrayFlagOptionalInputParams> = {}
): FieldTypeArrayFlagOptional {
  return FieldTypeArrayFlagOptional({
    ...params
  });
}
export function compareFieldTypeArrayFlagOptional(
  __a: FieldTypeArrayFlagOptional,
  __b: FieldTypeArrayFlagOptional
): boolean {
  return true;
}
export function updateFieldTypeArrayFlagOptional(
  value: FieldTypeArrayFlagOptional,
  _: Partial<FieldTypeArrayFlagOptionalInputParams>
) {
  return value;
}
export interface FieldTypeArray {
  _name: "field-type-array.FieldTypeArray";
  name: string;
  flags: ReadonlyArray<Readonly<FieldTypeArrayFlag>>;
  arrayType: Readonly<FieldType>;
}
export function isFieldTypeArray(value: unknown): value is FieldTypeArray {
  if (
    !(
      typeof value === "object" &&
      value !== null &&
      "_name" in value &&
      typeof value["_name"] === "string" &&
      value["_name"] === "field-type-array.FieldTypeArray"
    )
  )
    return false;
  if (!("name" in value && ((__v0) => typeof __v0 === "string")(value["name"])))
    return false;
  if (
    !(
      "flags" in value &&
      ((__v1) =>
        (Array.isArray(__v1) || __v1 instanceof Set) &&
        Array.from(__v1).every((p) => isFieldTypeArrayFlagTrait(p)))(
        value["flags"]
      )
    )
  )
    return false;
  if (
    !(
      "arrayType" in value &&
      ((__v2) => isFieldTypeTrait(__v2))(value["arrayType"])
    )
  )
    return false;
  return true;
}
export interface FieldTypeArrayInputParams {
  name: string;
  flags: ReadonlyArray<Readonly<FieldTypeArrayFlag>>;
  arrayType: Readonly<FieldType>;
}
export function FieldTypeArray(
  params: FieldTypeArrayInputParams
): FieldTypeArray {
  return {
    _name: "field-type-array.FieldTypeArray",
    name: params["name"],
    flags: params["flags"],
    arrayType: params["arrayType"]
  };
}
export function encodeFieldTypeArray(__s: ISerializer, value: FieldTypeArray) {
  __s.writeInt32(-1280597715);
  /**
   * encoding param: name
   */
  const __pv0 = value["name"];
  __s.writeString(__pv0);
  /**
   * encoding param: flags
   */
  const __pv1 = value["flags"];
  const __l2 = __pv1.length;
  __s.writeUint32(__l2);
  for (const __item2 of __pv1) {
    encodeFieldTypeArrayFlagTrait(__s, __item2);
  }
  /**
   * encoding param: arrayType
   */
  const __pv3 = value["arrayType"];
  encodeFieldTypeTrait(__s, __pv3);
}
export function decodeFieldTypeArray(
  __d: IDeserializer
): FieldTypeArray | null {
  const __id = __d.readInt32();
  /**
   * decode header
   */
  if (__id !== -1280597715) return null;
  let name: string;
  let flags: Array<FieldTypeArrayFlag>;
  let arrayType: FieldType;
  /**
   * decoding param: name
   */
  name = __d.readString();
  /**
   * decoding param: flags
   */
  const __l2 = __d.readUint32();
  const __o2 = new Array<FieldTypeArrayFlag>(__l2);
  flags = __o2;
  for (let __i2 = 0; __i2 < __l2; __i2++) {
    const __tmp3 = decodeFieldTypeArrayFlagTrait(__d);
    if (__tmp3 === null) return null;
    __o2[__i2] = __tmp3;
  }
  /**
   * decoding param: arrayType
   */
  const tmp5 = decodeFieldTypeTrait(__d);
  if (tmp5 === null) return null;
  arrayType = tmp5;
  return {
    _name: "field-type-array.FieldTypeArray",
    name,
    flags,
    arrayType
  };
}
export function defaultFieldTypeArray(
  params: Partial<FieldTypeArrayInputParams> = {}
): FieldTypeArray {
  return FieldTypeArray({
    name: "",
    flags: [],
    arrayType: defaultFieldTypeTrait(),
    ...params
  });
}
export function compareFieldTypeArray(
  __a: FieldTypeArray,
  __b: FieldTypeArray
): boolean {
  return (
    /**
     * compare parameter name
     */
    __a["name"] === __b["name"] &&
    /**
     * compare parameter flags
     */
    __a["flags"].length === __b["flags"].length &&
    Array.from(__a["flags"]).every((__originalItem1, __index1) =>
      typeof __originalItem1 === "undefined"
        ? false
        : ((__item1) =>
            typeof __item1 === "undefined"
              ? false
              : compareFieldTypeArrayFlagTrait(__originalItem1, __item1))(
            Array.from(__b["flags"])[__index1]
          )
    ) &&
    /**
     * compare parameter arrayType
     */
    compareFieldTypeTrait(__a["arrayType"], __b["arrayType"])
  );
}
export function updateFieldTypeArray(
  value: FieldTypeArray,
  changes: Partial<FieldTypeArrayInputParams>
) {
  if (typeof changes["name"] !== "undefined") {
    if (!(changes["name"] === value["name"])) {
      value = FieldTypeArray({
        ...value,
        name: changes["name"]
      });
    }
  }
  if (typeof changes["flags"] !== "undefined") {
    if (
      !(
        changes["flags"].length === value["flags"].length &&
        Array.from(changes["flags"]).every((__originalItem2, __index2) =>
          typeof __originalItem2 === "undefined"
            ? false
            : ((__item2) =>
                typeof __item2 === "undefined"
                  ? false
                  : compareFieldTypeArrayFlagTrait(__originalItem2, __item2))(
                Array.from(value["flags"])[__index2]
              )
        )
      )
    ) {
      value = FieldTypeArray({
        ...value,
        flags: changes["flags"]
      });
    }
  }
  if (typeof changes["arrayType"] !== "undefined") {
    if (!compareFieldTypeTrait(changes["arrayType"], value["arrayType"])) {
      value = FieldTypeArray({
        ...value,
        arrayType: changes["arrayType"]
      });
    }
  }
  return value;
}
