import { ISerializer } from "./__types__";
import { IDeserializer } from "./__types__";
import JSBI from "jsbi";
export type EnumField = Readonly<EnumFieldInt> | Readonly<EnumFieldString>;
export function isEnumFieldTrait(value: unknown): value is EnumField {
  if (isEnumFieldInt(value)) return true;
  if (isEnumFieldString(value)) return true;
  return false;
}
export function encodeEnumFieldTrait(__s: ISerializer, value: EnumField) {
  switch (value._name) {
    case "fieldTypeEnum.EnumFieldInt":
      return encodeEnumFieldInt(__s, value);
    case "fieldTypeEnum.EnumFieldString":
      return encodeEnumFieldString(__s, value);
  }
  throw new Error(
    `Failed to encode: Received invalid value on "_name" property. We got "${value["_name"]}" value, but this function was expecting to receive one of the following:\n\t- fieldTypeEnum.EnumFieldInt\n\t- fieldTypeEnum.EnumFieldString\n\n\nPossible cause is that maybe this type simply does not extend this trait, and somehow the type-checking prevented you from calling this function wrongly.`
  );
}
export function decodeEnumFieldTrait(__d: IDeserializer) {
  const __id = __d.readInt32();
  __d.rewind(4);
  let value: EnumFieldInt | EnumFieldString;
  switch (__id) {
    case 904993756: {
      const tmp = decodeEnumFieldInt(__d);
      if (tmp === null) return null;
      value = tmp;
      break;
    }
    case -1664488423: {
      const tmp = decodeEnumFieldString(__d);
      if (tmp === null) return null;
      value = tmp;
      break;
    }
    default:
      return null;
  }
  return value;
}
export function defaultEnumFieldTrait() {
  return defaultEnumFieldInt();
}
export function compareEnumFieldTrait(__a: EnumField, __b: EnumField) {
  switch (__a._name) {
    case "fieldTypeEnum.EnumFieldInt":
      if (__b._name !== "fieldTypeEnum.EnumFieldInt") return false;
      return compareEnumFieldInt(__a, __b);
    case "fieldTypeEnum.EnumFieldString":
      if (__b._name !== "fieldTypeEnum.EnumFieldString") return false;
      return compareEnumFieldString(__a, __b);
  }
}
export interface EnumFieldInt {
  _name: "fieldTypeEnum.EnumFieldInt";
  name: string;
  value: number;
}
export function isEnumFieldInt(value: unknown): value is EnumFieldInt {
  if (
    !(
      typeof value === "object" &&
      value !== null &&
      "_name" in value &&
      typeof value["_name"] === "string" &&
      value["_name"] === "fieldTypeEnum.EnumFieldInt"
    )
  )
    return false;
  if (!("name" in value && ((__v0) => typeof __v0 === "string")(value["name"])))
    return false;
  if (
    !(
      "value" in value &&
      ((__v1) =>
        typeof __v1 === "number" &&
        JSBI.equal(JSBI.BigInt(__v1), JSBI.BigInt(__v1)) &&
        JSBI.greaterThanOrEqual(
          JSBI.BigInt(__v1),
          JSBI.BigInt("-2147483648")
        ) &&
        JSBI.lessThanOrEqual(JSBI.BigInt(__v1), JSBI.BigInt("2147483647")))(
        value["value"]
      )
    )
  )
    return false;
  return true;
}
export interface EnumFieldIntInputParams {
  name: string;
  value: number;
}
export function EnumFieldInt(params: EnumFieldIntInputParams): EnumFieldInt {
  return {
    _name: "fieldTypeEnum.EnumFieldInt",
    name: params["name"],
    value: params["value"]
  };
}
export function encodeEnumFieldInt(__s: ISerializer, value: EnumFieldInt) {
  __s.writeInt32(904993756);
  /**
   * encoding param: name
   */
  const __pv0 = value["name"];
  __s.writeString(__pv0);
  /**
   * encoding param: value
   */
  const __pv1 = value["value"];
  __s.writeInt32(__pv1);
}
export function decodeEnumFieldInt(__d: IDeserializer): EnumFieldInt | null {
  const __id = __d.readInt32();
  /**
   * decode header
   */
  if (__id !== 904993756) return null;
  let name: string;
  let value: number;
  /**
   * decoding param: name
   */
  name = __d.readString();
  /**
   * decoding param: value
   */
  value = __d.readInt32();
  return {
    _name: "fieldTypeEnum.EnumFieldInt",
    name,
    value
  };
}
export function defaultEnumFieldInt(
  params: Partial<EnumFieldIntInputParams> = {}
): EnumFieldInt {
  return EnumFieldInt({
    name: "",
    value: 0,
    ...params
  });
}
export function compareEnumFieldInt(
  __a: EnumFieldInt,
  __b: EnumFieldInt
): boolean {
  return (
    /**
     * compare parameter name
     */
    __a["name"] === __b["name"] &&
    /**
     * compare parameter value
     */
    __a["value"] === __b["value"]
  );
}
export function updateEnumFieldInt(
  value: EnumFieldInt,
  changes: Partial<EnumFieldIntInputParams>
) {
  if (typeof changes["name"] !== "undefined") {
    if (!(changes["name"] === value["name"])) {
      value = EnumFieldInt({
        ...value,
        name: changes["name"]
      });
    }
  }
  if (typeof changes["value"] !== "undefined") {
    if (!(changes["value"] === value["value"])) {
      value = EnumFieldInt({
        ...value,
        value: changes["value"]
      });
    }
  }
  return value;
}
export interface EnumFieldString {
  _name: "fieldTypeEnum.EnumFieldString";
  name: string;
  value: string;
}
export function isEnumFieldString(value: unknown): value is EnumFieldString {
  if (
    !(
      typeof value === "object" &&
      value !== null &&
      "_name" in value &&
      typeof value["_name"] === "string" &&
      value["_name"] === "fieldTypeEnum.EnumFieldString"
    )
  )
    return false;
  if (!("name" in value && ((__v0) => typeof __v0 === "string")(value["name"])))
    return false;
  if (
    !("value" in value && ((__v1) => typeof __v1 === "string")(value["value"]))
  )
    return false;
  return true;
}
export interface EnumFieldStringInputParams {
  name: string;
  value: string;
}
export function EnumFieldString(
  params: EnumFieldStringInputParams
): EnumFieldString {
  return {
    _name: "fieldTypeEnum.EnumFieldString",
    name: params["name"],
    value: params["value"]
  };
}
export function encodeEnumFieldString(
  __s: ISerializer,
  value: EnumFieldString
) {
  __s.writeInt32(-1664488423);
  /**
   * encoding param: name
   */
  const __pv0 = value["name"];
  __s.writeString(__pv0);
  /**
   * encoding param: value
   */
  const __pv1 = value["value"];
  __s.writeString(__pv1);
}
export function decodeEnumFieldString(
  __d: IDeserializer
): EnumFieldString | null {
  const __id = __d.readInt32();
  /**
   * decode header
   */
  if (__id !== -1664488423) return null;
  let name: string;
  let value: string;
  /**
   * decoding param: name
   */
  name = __d.readString();
  /**
   * decoding param: value
   */
  value = __d.readString();
  return {
    _name: "fieldTypeEnum.EnumFieldString",
    name,
    value
  };
}
export function defaultEnumFieldString(
  params: Partial<EnumFieldStringInputParams> = {}
): EnumFieldString {
  return EnumFieldString({
    name: "",
    value: "",
    ...params
  });
}
export function compareEnumFieldString(
  __a: EnumFieldString,
  __b: EnumFieldString
): boolean {
  return (
    /**
     * compare parameter name
     */
    __a["name"] === __b["name"] &&
    /**
     * compare parameter value
     */
    __a["value"] === __b["value"]
  );
}
export function updateEnumFieldString(
  value: EnumFieldString,
  changes: Partial<EnumFieldStringInputParams>
) {
  if (typeof changes["name"] !== "undefined") {
    if (!(changes["name"] === value["name"])) {
      value = EnumFieldString({
        ...value,
        name: changes["name"]
      });
    }
  }
  if (typeof changes["value"] !== "undefined") {
    if (!(changes["value"] === value["value"])) {
      value = EnumFieldString({
        ...value,
        value: changes["value"]
      });
    }
  }
  return value;
}
export interface FieldTypeEnum {
  _name: "fieldTypeEnum.FieldTypeEnum";
  fields: ReadonlyArray<Readonly<EnumField>>;
}
export function isFieldTypeEnum(value: unknown): value is FieldTypeEnum {
  if (
    !(
      typeof value === "object" &&
      value !== null &&
      "_name" in value &&
      typeof value["_name"] === "string" &&
      value["_name"] === "fieldTypeEnum.FieldTypeEnum"
    )
  )
    return false;
  if (
    !(
      "fields" in value &&
      ((__v0) =>
        (Array.isArray(__v0) || __v0 instanceof Set) &&
        Array.from(__v0).every((p) => isEnumFieldTrait(p)))(value["fields"])
    )
  )
    return false;
  return true;
}
export interface FieldTypeEnumInputParams {
  fields: ReadonlyArray<Readonly<EnumField>>;
}
export function FieldTypeEnum(params: FieldTypeEnumInputParams): FieldTypeEnum {
  return {
    _name: "fieldTypeEnum.FieldTypeEnum",
    fields: params["fields"]
  };
}
export function encodeFieldTypeEnum(__s: ISerializer, value: FieldTypeEnum) {
  __s.writeInt32(-1869680550);
  /**
   * encoding param: fields
   */
  const __pv0 = value["fields"];
  const __l1 = __pv0.length;
  __s.writeUint32(__l1);
  for (const __item1 of __pv0) {
    encodeEnumFieldTrait(__s, __item1);
  }
}
export function decodeFieldTypeEnum(__d: IDeserializer): FieldTypeEnum | null {
  const __id = __d.readInt32();
  /**
   * decode header
   */
  if (__id !== -1869680550) return null;
  let fields: Array<EnumField>;
  /**
   * decoding param: fields
   */
  const __l1 = __d.readUint32();
  const __o1 = new Array<EnumField>(__l1);
  fields = __o1;
  for (let __i1 = 0; __i1 < __l1; __i1++) {
    const __tmp2 = decodeEnumFieldTrait(__d);
    if (__tmp2 === null) return null;
    __o1[__i1] = __tmp2;
  }
  return {
    _name: "fieldTypeEnum.FieldTypeEnum",
    fields
  };
}
export function defaultFieldTypeEnum(
  params: Partial<FieldTypeEnumInputParams> = {}
): FieldTypeEnum {
  return FieldTypeEnum({
    fields: [],
    ...params
  });
}
export function compareFieldTypeEnum(
  __a: FieldTypeEnum,
  __b: FieldTypeEnum
): boolean {
  return (
    /**
     * compare parameter fields
     */
    __a["fields"].length === __b["fields"].length &&
    Array.from(__a["fields"]).every((__originalItem0, __index0) =>
      typeof __originalItem0 === "undefined"
        ? false
        : ((__item0) =>
            typeof __item0 === "undefined"
              ? false
              : compareEnumFieldTrait(__originalItem0, __item0))(
            Array.from(__b["fields"])[__index0]
          )
    )
  );
}
export function updateFieldTypeEnum(
  value: FieldTypeEnum,
  changes: Partial<FieldTypeEnumInputParams>
) {
  if (typeof changes["fields"] !== "undefined") {
    if (
      !(
        changes["fields"].length === value["fields"].length &&
        Array.from(changes["fields"]).every((__originalItem1, __index1) =>
          typeof __originalItem1 === "undefined"
            ? false
            : ((__item1) =>
                typeof __item1 === "undefined"
                  ? false
                  : compareEnumFieldTrait(__originalItem1, __item1))(
                Array.from(value["fields"])[__index1]
              )
        )
      )
    ) {
      value = FieldTypeEnum({
        ...value,
        fields: changes["fields"]
      });
    }
  }
  return value;
}
