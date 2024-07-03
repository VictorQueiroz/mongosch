import JSBI from "jsbi";
import { ISerializer } from "./__types__";
import { IDeserializer } from "./__types__";
export interface EnumFieldInt {
  _name: "field-type-enum.EnumFieldInt";
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
      value["_name"] === "field-type-enum.EnumFieldInt"
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
    _name: "field-type-enum.EnumFieldInt",
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
    _name: "field-type-enum.EnumFieldInt",
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
  _name: "field-type-enum.EnumFieldString";
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
      value["_name"] === "field-type-enum.EnumFieldString"
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
    _name: "field-type-enum.EnumFieldString",
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
    _name: "field-type-enum.EnumFieldString",
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
export interface FieldTypeEnumString {
  _name: "field-type-enum.FieldTypeEnumString";
  name: string;
  fields: ReadonlyArray<Readonly<EnumFieldString>>;
}
export function isFieldTypeEnumString(
  value: unknown
): value is FieldTypeEnumString {
  if (
    !(
      typeof value === "object" &&
      value !== null &&
      "_name" in value &&
      typeof value["_name"] === "string" &&
      value["_name"] === "field-type-enum.FieldTypeEnumString"
    )
  )
    return false;
  if (!("name" in value && ((__v0) => typeof __v0 === "string")(value["name"])))
    return false;
  if (
    !(
      "fields" in value &&
      ((__v1) =>
        (Array.isArray(__v1) || __v1 instanceof Set) &&
        Array.from(__v1).every((p) => isEnumFieldString(p)))(value["fields"])
    )
  )
    return false;
  return true;
}
export interface FieldTypeEnumStringInputParams {
  name: string;
  fields: ReadonlyArray<Readonly<EnumFieldString>>;
}
export function FieldTypeEnumString(
  params: FieldTypeEnumStringInputParams
): FieldTypeEnumString {
  return {
    _name: "field-type-enum.FieldTypeEnumString",
    name: params["name"],
    fields: params["fields"]
  };
}
export function encodeFieldTypeEnumString(
  __s: ISerializer,
  value: FieldTypeEnumString
) {
  __s.writeInt32(190447988);
  /**
   * encoding param: name
   */
  const __pv0 = value["name"];
  __s.writeString(__pv0);
  /**
   * encoding param: fields
   */
  const __pv1 = value["fields"];
  const __l2 = __pv1.length;
  __s.writeUint32(__l2);
  for (const __item2 of __pv1) {
    encodeEnumFieldString(__s, __item2);
  }
}
export function decodeFieldTypeEnumString(
  __d: IDeserializer
): FieldTypeEnumString | null {
  const __id = __d.readInt32();
  /**
   * decode header
   */
  if (__id !== 190447988) return null;
  let name: string;
  let fields: Array<EnumFieldString>;
  /**
   * decoding param: name
   */
  name = __d.readString();
  /**
   * decoding param: fields
   */
  const __l2 = __d.readUint32();
  const __o2 = new Array<EnumFieldString>(__l2);
  fields = __o2;
  for (let __i2 = 0; __i2 < __l2; __i2++) {
    const __tmp3 = decodeEnumFieldString(__d);
    if (__tmp3 === null) return null;
    __o2[__i2] = __tmp3;
  }
  return {
    _name: "field-type-enum.FieldTypeEnumString",
    name,
    fields
  };
}
export function defaultFieldTypeEnumString(
  params: Partial<FieldTypeEnumStringInputParams> = {}
): FieldTypeEnumString {
  return FieldTypeEnumString({
    name: "",
    fields: [],
    ...params
  });
}
export function compareFieldTypeEnumString(
  __a: FieldTypeEnumString,
  __b: FieldTypeEnumString
): boolean {
  return (
    /**
     * compare parameter name
     */
    __a["name"] === __b["name"] &&
    /**
     * compare parameter fields
     */
    __a["fields"].length === __b["fields"].length &&
    Array.from(__a["fields"]).every((__originalItem1, __index1) =>
      typeof __originalItem1 === "undefined"
        ? false
        : ((__item1) =>
            typeof __item1 === "undefined"
              ? false
              : compareEnumFieldString(__originalItem1, __item1))(
            Array.from(__b["fields"])[__index1]
          )
    )
  );
}
export function updateFieldTypeEnumString(
  value: FieldTypeEnumString,
  changes: Partial<FieldTypeEnumStringInputParams>
) {
  if (typeof changes["name"] !== "undefined") {
    if (!(changes["name"] === value["name"])) {
      value = FieldTypeEnumString({
        ...value,
        name: changes["name"]
      });
    }
  }
  if (typeof changes["fields"] !== "undefined") {
    if (
      !(
        changes["fields"].length === value["fields"].length &&
        Array.from(changes["fields"]).every((__originalItem2, __index2) =>
          typeof __originalItem2 === "undefined"
            ? false
            : ((__item2) =>
                typeof __item2 === "undefined"
                  ? false
                  : compareEnumFieldString(__originalItem2, __item2))(
                Array.from(value["fields"])[__index2]
              )
        )
      )
    ) {
      value = FieldTypeEnumString({
        ...value,
        fields: changes["fields"]
      });
    }
  }
  return value;
}
export interface FieldTypeEnumInt {
  _name: "field-type-enum.FieldTypeEnumInt";
  name: string;
  fields: ReadonlyArray<Readonly<EnumFieldInt>>;
}
export function isFieldTypeEnumInt(value: unknown): value is FieldTypeEnumInt {
  if (
    !(
      typeof value === "object" &&
      value !== null &&
      "_name" in value &&
      typeof value["_name"] === "string" &&
      value["_name"] === "field-type-enum.FieldTypeEnumInt"
    )
  )
    return false;
  if (!("name" in value && ((__v0) => typeof __v0 === "string")(value["name"])))
    return false;
  if (
    !(
      "fields" in value &&
      ((__v1) =>
        (Array.isArray(__v1) || __v1 instanceof Set) &&
        Array.from(__v1).every((p) => isEnumFieldInt(p)))(value["fields"])
    )
  )
    return false;
  return true;
}
export interface FieldTypeEnumIntInputParams {
  name: string;
  fields: ReadonlyArray<Readonly<EnumFieldInt>>;
}
export function FieldTypeEnumInt(
  params: FieldTypeEnumIntInputParams
): FieldTypeEnumInt {
  return {
    _name: "field-type-enum.FieldTypeEnumInt",
    name: params["name"],
    fields: params["fields"]
  };
}
export function encodeFieldTypeEnumInt(
  __s: ISerializer,
  value: FieldTypeEnumInt
) {
  __s.writeInt32(-1825507865);
  /**
   * encoding param: name
   */
  const __pv0 = value["name"];
  __s.writeString(__pv0);
  /**
   * encoding param: fields
   */
  const __pv1 = value["fields"];
  const __l2 = __pv1.length;
  __s.writeUint32(__l2);
  for (const __item2 of __pv1) {
    encodeEnumFieldInt(__s, __item2);
  }
}
export function decodeFieldTypeEnumInt(
  __d: IDeserializer
): FieldTypeEnumInt | null {
  const __id = __d.readInt32();
  /**
   * decode header
   */
  if (__id !== -1825507865) return null;
  let name: string;
  let fields: Array<EnumFieldInt>;
  /**
   * decoding param: name
   */
  name = __d.readString();
  /**
   * decoding param: fields
   */
  const __l2 = __d.readUint32();
  const __o2 = new Array<EnumFieldInt>(__l2);
  fields = __o2;
  for (let __i2 = 0; __i2 < __l2; __i2++) {
    const __tmp3 = decodeEnumFieldInt(__d);
    if (__tmp3 === null) return null;
    __o2[__i2] = __tmp3;
  }
  return {
    _name: "field-type-enum.FieldTypeEnumInt",
    name,
    fields
  };
}
export function defaultFieldTypeEnumInt(
  params: Partial<FieldTypeEnumIntInputParams> = {}
): FieldTypeEnumInt {
  return FieldTypeEnumInt({
    name: "",
    fields: [],
    ...params
  });
}
export function compareFieldTypeEnumInt(
  __a: FieldTypeEnumInt,
  __b: FieldTypeEnumInt
): boolean {
  return (
    /**
     * compare parameter name
     */
    __a["name"] === __b["name"] &&
    /**
     * compare parameter fields
     */
    __a["fields"].length === __b["fields"].length &&
    Array.from(__a["fields"]).every((__originalItem1, __index1) =>
      typeof __originalItem1 === "undefined"
        ? false
        : ((__item1) =>
            typeof __item1 === "undefined"
              ? false
              : compareEnumFieldInt(__originalItem1, __item1))(
            Array.from(__b["fields"])[__index1]
          )
    )
  );
}
export function updateFieldTypeEnumInt(
  value: FieldTypeEnumInt,
  changes: Partial<FieldTypeEnumIntInputParams>
) {
  if (typeof changes["name"] !== "undefined") {
    if (!(changes["name"] === value["name"])) {
      value = FieldTypeEnumInt({
        ...value,
        name: changes["name"]
      });
    }
  }
  if (typeof changes["fields"] !== "undefined") {
    if (
      !(
        changes["fields"].length === value["fields"].length &&
        Array.from(changes["fields"]).every((__originalItem2, __index2) =>
          typeof __originalItem2 === "undefined"
            ? false
            : ((__item2) =>
                typeof __item2 === "undefined"
                  ? false
                  : compareEnumFieldInt(__originalItem2, __item2))(
                Array.from(value["fields"])[__index2]
              )
        )
      )
    ) {
      value = FieldTypeEnumInt({
        ...value,
        fields: changes["fields"]
      });
    }
  }
  return value;
}
