import { Field } from "./Field";
import { isField } from "./Field";
import { ISerializer } from "./__types__";
import { encodeField } from "./Field";
import { IDeserializer } from "./__types__";
import { decodeField } from "./Field";
import { compareField } from "./Field";
export interface FieldTypeObject {
  _name: "fieldTypeObject.FieldTypeObject";
  name: string;
  properties: ReadonlyArray<Readonly<Field>>;
}
export function isFieldTypeObject(value: unknown): value is FieldTypeObject {
  if (
    !(
      typeof value === "object" &&
      value !== null &&
      "_name" in value &&
      typeof value["_name"] === "string" &&
      value["_name"] === "fieldTypeObject.FieldTypeObject"
    )
  )
    return false;
  if (!("name" in value && ((__v0) => typeof __v0 === "string")(value["name"])))
    return false;
  if (
    !(
      "properties" in value &&
      ((__v1) =>
        (Array.isArray(__v1) || __v1 instanceof Set) &&
        Array.from(__v1).every((p) => isField(p)))(value["properties"])
    )
  )
    return false;
  return true;
}
export interface FieldTypeObjectInputParams {
  name: string;
  properties: ReadonlyArray<Readonly<Field>>;
}
export function FieldTypeObject(
  params: FieldTypeObjectInputParams
): FieldTypeObject {
  return {
    _name: "fieldTypeObject.FieldTypeObject",
    name: params["name"],
    properties: params["properties"]
  };
}
export function encodeFieldTypeObject(
  __s: ISerializer,
  value: FieldTypeObject
) {
  __s.writeInt32(1729791785);
  /**
   * encoding param: name
   */
  const __pv0 = value["name"];
  __s.writeString(__pv0);
  /**
   * encoding param: properties
   */
  const __pv1 = value["properties"];
  const __l2 = __pv1.length;
  __s.writeUint32(__l2);
  for (const __item2 of __pv1) {
    encodeField(__s, __item2);
  }
}
export function decodeFieldTypeObject(
  __d: IDeserializer
): FieldTypeObject | null {
  const __id = __d.readInt32();
  /**
   * decode header
   */
  if (__id !== 1729791785) return null;
  let name: string;
  let properties: Array<Field>;
  /**
   * decoding param: name
   */
  name = __d.readString();
  /**
   * decoding param: properties
   */
  const __l2 = __d.readUint32();
  const __o2 = new Array<Field>(__l2);
  properties = __o2;
  for (let __i2 = 0; __i2 < __l2; __i2++) {
    const tmp4 = decodeField(__d);
    if (tmp4 === null) return null;
    __o2[__i2] = tmp4;
  }
  return {
    _name: "fieldTypeObject.FieldTypeObject",
    name,
    properties
  };
}
export function defaultFieldTypeObject(
  params: Partial<FieldTypeObjectInputParams> = {}
): FieldTypeObject {
  return FieldTypeObject({
    name: "",
    properties: [],
    ...params
  });
}
export function compareFieldTypeObject(
  __a: FieldTypeObject,
  __b: FieldTypeObject
): boolean {
  return (
    /**
     * compare parameter name
     */
    __a["name"] === __b["name"] &&
    /**
     * compare parameter properties
     */
    __a["properties"].length === __b["properties"].length &&
    Array.from(__a["properties"]).every((__originalItem1, __index1) =>
      typeof __originalItem1 === "undefined"
        ? false
        : ((__item1) =>
            typeof __item1 === "undefined"
              ? false
              : compareField(__originalItem1, __item1))(
            Array.from(__b["properties"])[__index1]
          )
    )
  );
}
export function updateFieldTypeObject(
  value: FieldTypeObject,
  changes: Partial<FieldTypeObjectInputParams>
) {
  if (typeof changes["name"] !== "undefined") {
    if (!(changes["name"] === value["name"])) {
      value = FieldTypeObject({
        ...value,
        name: changes["name"]
      });
    }
  }
  if (typeof changes["properties"] !== "undefined") {
    if (
      !(
        changes["properties"].length === value["properties"].length &&
        Array.from(changes["properties"]).every((__originalItem2, __index2) =>
          typeof __originalItem2 === "undefined"
            ? false
            : ((__item2) =>
                typeof __item2 === "undefined"
                  ? false
                  : compareField(__originalItem2, __item2))(
                Array.from(value["properties"])[__index2]
              )
        )
      )
    ) {
      value = FieldTypeObject({
        ...value,
        properties: changes["properties"]
      });
    }
  }
  return value;
}
