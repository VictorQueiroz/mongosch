import { FieldType } from "./FieldType";
import JSBI from "jsbi";
import { isFieldTypeTrait } from "./FieldType";
import { ISerializer } from "./__types__";
import { encodeFieldTypeTrait } from "./FieldType";
import { IDeserializer } from "./__types__";
import { decodeFieldTypeTrait } from "./FieldType";
import { defaultFieldTypeTrait } from "./FieldType";
import { compareFieldTypeTrait } from "./FieldType";
export interface UnionItem {
  _name: "fieldTypeUnion.UnionItem";
  id: number;
  name: string;
  fieldType: Readonly<FieldType>;
}
export function isUnionItem(value: unknown): value is UnionItem {
  if (
    !(
      typeof value === "object" &&
      value !== null &&
      "_name" in value &&
      typeof value["_name"] === "string" &&
      value["_name"] === "fieldTypeUnion.UnionItem"
    )
  )
    return false;
  if (
    !(
      "id" in value &&
      ((__v0) =>
        typeof __v0 === "number" &&
        JSBI.equal(JSBI.BigInt(__v0), JSBI.BigInt(__v0)) &&
        JSBI.greaterThanOrEqual(
          JSBI.BigInt(__v0),
          JSBI.BigInt("-2147483648")
        ) &&
        JSBI.lessThanOrEqual(JSBI.BigInt(__v0), JSBI.BigInt("2147483647")))(
        value["id"]
      )
    )
  )
    return false;
  if (!("name" in value && ((__v1) => typeof __v1 === "string")(value["name"])))
    return false;
  if (
    !(
      "fieldType" in value &&
      ((__v2) => isFieldTypeTrait(__v2))(value["fieldType"])
    )
  )
    return false;
  return true;
}
export interface UnionItemInputParams {
  id: number;
  name: string;
  fieldType: Readonly<FieldType>;
}
export function UnionItem(params: UnionItemInputParams): UnionItem {
  return {
    _name: "fieldTypeUnion.UnionItem",
    id: params["id"],
    name: params["name"],
    fieldType: params["fieldType"]
  };
}
export function encodeUnionItem(__s: ISerializer, value: UnionItem) {
  __s.writeInt32(684885194);
  /**
   * encoding param: id
   */
  const __pv0 = value["id"];
  __s.writeInt32(__pv0);
  /**
   * encoding param: name
   */
  const __pv1 = value["name"];
  __s.writeString(__pv1);
  /**
   * encoding param: fieldType
   */
  const __pv2 = value["fieldType"];
  encodeFieldTypeTrait(__s, __pv2);
}
export function decodeUnionItem(__d: IDeserializer): UnionItem | null {
  const __id = __d.readInt32();
  /**
   * decode header
   */
  if (__id !== 684885194) return null;
  let id: number;
  let name: string;
  let fieldType: FieldType;
  /**
   * decoding param: id
   */
  id = __d.readInt32();
  /**
   * decoding param: name
   */
  name = __d.readString();
  /**
   * decoding param: fieldType
   */
  const tmp4 = decodeFieldTypeTrait(__d);
  if (tmp4 === null) return null;
  fieldType = tmp4;
  return {
    _name: "fieldTypeUnion.UnionItem",
    id,
    name,
    fieldType
  };
}
export function defaultUnionItem(
  params: Partial<UnionItemInputParams> = {}
): UnionItem {
  return UnionItem({
    id: 0,
    name: "",
    fieldType: defaultFieldTypeTrait(),
    ...params
  });
}
export function compareUnionItem(__a: UnionItem, __b: UnionItem): boolean {
  return (
    /**
     * compare parameter id
     */
    __a["id"] === __b["id"] &&
    /**
     * compare parameter name
     */
    __a["name"] === __b["name"] &&
    /**
     * compare parameter fieldType
     */
    compareFieldTypeTrait(__a["fieldType"], __b["fieldType"])
  );
}
export function updateUnionItem(
  value: UnionItem,
  changes: Partial<UnionItemInputParams>
) {
  if (typeof changes["id"] !== "undefined") {
    if (!(changes["id"] === value["id"])) {
      value = UnionItem({
        ...value,
        id: changes["id"]
      });
    }
  }
  if (typeof changes["name"] !== "undefined") {
    if (!(changes["name"] === value["name"])) {
      value = UnionItem({
        ...value,
        name: changes["name"]
      });
    }
  }
  if (typeof changes["fieldType"] !== "undefined") {
    if (!compareFieldTypeTrait(changes["fieldType"], value["fieldType"])) {
      value = UnionItem({
        ...value,
        fieldType: changes["fieldType"]
      });
    }
  }
  return value;
}
export interface FieldTypeUnion {
  _name: "fieldTypeUnion.FieldTypeUnion";
  name: string;
  items: ReadonlyArray<Readonly<UnionItem>>;
}
export function isFieldTypeUnion(value: unknown): value is FieldTypeUnion {
  if (
    !(
      typeof value === "object" &&
      value !== null &&
      "_name" in value &&
      typeof value["_name"] === "string" &&
      value["_name"] === "fieldTypeUnion.FieldTypeUnion"
    )
  )
    return false;
  if (!("name" in value && ((__v0) => typeof __v0 === "string")(value["name"])))
    return false;
  if (
    !(
      "items" in value &&
      ((__v1) =>
        (Array.isArray(__v1) || __v1 instanceof Set) &&
        Array.from(__v1).every((p) => isUnionItem(p)))(value["items"])
    )
  )
    return false;
  return true;
}
export interface FieldTypeUnionInputParams {
  name: string;
  items: ReadonlyArray<Readonly<UnionItem>>;
}
export function FieldTypeUnion(
  params: FieldTypeUnionInputParams
): FieldTypeUnion {
  return {
    _name: "fieldTypeUnion.FieldTypeUnion",
    name: params["name"],
    items: params["items"]
  };
}
export function encodeFieldTypeUnion(__s: ISerializer, value: FieldTypeUnion) {
  __s.writeInt32(326543358);
  /**
   * encoding param: name
   */
  const __pv0 = value["name"];
  __s.writeString(__pv0);
  /**
   * encoding param: items
   */
  const __pv1 = value["items"];
  const __l2 = __pv1.length;
  __s.writeUint32(__l2);
  for (const __item2 of __pv1) {
    encodeUnionItem(__s, __item2);
  }
}
export function decodeFieldTypeUnion(
  __d: IDeserializer
): FieldTypeUnion | null {
  const __id = __d.readInt32();
  /**
   * decode header
   */
  if (__id !== 326543358) return null;
  let name: string;
  let items: Array<UnionItem>;
  /**
   * decoding param: name
   */
  name = __d.readString();
  /**
   * decoding param: items
   */
  const __l2 = __d.readUint32();
  const __o2 = new Array<UnionItem>(__l2);
  items = __o2;
  for (let __i2 = 0; __i2 < __l2; __i2++) {
    const __tmp3 = decodeUnionItem(__d);
    if (__tmp3 === null) return null;
    __o2[__i2] = __tmp3;
  }
  return {
    _name: "fieldTypeUnion.FieldTypeUnion",
    name,
    items
  };
}
export function defaultFieldTypeUnion(
  params: Partial<FieldTypeUnionInputParams> = {}
): FieldTypeUnion {
  return FieldTypeUnion({
    name: "",
    items: [],
    ...params
  });
}
export function compareFieldTypeUnion(
  __a: FieldTypeUnion,
  __b: FieldTypeUnion
): boolean {
  return (
    /**
     * compare parameter name
     */
    __a["name"] === __b["name"] &&
    /**
     * compare parameter items
     */
    __a["items"].length === __b["items"].length &&
    Array.from(__a["items"]).every((__originalItem1, __index1) =>
      typeof __originalItem1 === "undefined"
        ? false
        : ((__item1) =>
            typeof __item1 === "undefined"
              ? false
              : compareUnionItem(__originalItem1, __item1))(
            Array.from(__b["items"])[__index1]
          )
    )
  );
}
export function updateFieldTypeUnion(
  value: FieldTypeUnion,
  changes: Partial<FieldTypeUnionInputParams>
) {
  if (typeof changes["name"] !== "undefined") {
    if (!(changes["name"] === value["name"])) {
      value = FieldTypeUnion({
        ...value,
        name: changes["name"]
      });
    }
  }
  if (typeof changes["items"] !== "undefined") {
    if (
      !(
        changes["items"].length === value["items"].length &&
        Array.from(changes["items"]).every((__originalItem2, __index2) =>
          typeof __originalItem2 === "undefined"
            ? false
            : ((__item2) =>
                typeof __item2 === "undefined"
                  ? false
                  : compareUnionItem(__originalItem2, __item2))(
                Array.from(value["items"])[__index2]
              )
        )
      )
    ) {
      value = FieldTypeUnion({
        ...value,
        items: changes["items"]
      });
    }
  }
  return value;
}
