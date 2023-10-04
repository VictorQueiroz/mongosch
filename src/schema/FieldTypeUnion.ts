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
  if (
    !(
      "fieldType" in value &&
      ((__v1) => isFieldTypeTrait(__v1))(value["fieldType"])
    )
  )
    return false;
  return true;
}
export interface UnionItemInputParams {
  id: number;
  fieldType: Readonly<FieldType>;
}
export function UnionItem(params: UnionItemInputParams): UnionItem {
  return {
    _name: "fieldTypeUnion.UnionItem",
    id: params["id"],
    fieldType: params["fieldType"]
  };
}
export function encodeUnionItem(__s: ISerializer, value: UnionItem) {
  __s.writeInt32(-478070559);
  /**
   * encoding param: id
   */
  const __pv0 = value["id"];
  __s.writeInt32(__pv0);
  /**
   * encoding param: fieldType
   */
  const __pv1 = value["fieldType"];
  encodeFieldTypeTrait(__s, __pv1);
}
export function decodeUnionItem(__d: IDeserializer): UnionItem | null {
  const __id = __d.readInt32();
  /**
   * decode header
   */
  if (__id !== -478070559) return null;
  let id: number;
  let fieldType: FieldType;
  /**
   * decoding param: id
   */
  id = __d.readInt32();
  /**
   * decoding param: fieldType
   */
  const tmp3 = decodeFieldTypeTrait(__d);
  if (tmp3 === null) return null;
  fieldType = tmp3;
  return {
    _name: "fieldTypeUnion.UnionItem",
    id,
    fieldType
  };
}
export function defaultUnionItem(
  params: Partial<UnionItemInputParams> = {}
): UnionItem {
  return UnionItem({
    id: 0,
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
  if (
    !(
      "items" in value &&
      ((__v0) =>
        (Array.isArray(__v0) || __v0 instanceof Set) &&
        Array.from(__v0).every((p) => isUnionItem(p)))(value["items"])
    )
  )
    return false;
  return true;
}
export interface FieldTypeUnionInputParams {
  items: ReadonlyArray<Readonly<UnionItem>>;
}
export function FieldTypeUnion(
  params: FieldTypeUnionInputParams
): FieldTypeUnion {
  return {
    _name: "fieldTypeUnion.FieldTypeUnion",
    items: params["items"]
  };
}
export function encodeFieldTypeUnion(__s: ISerializer, value: FieldTypeUnion) {
  __s.writeInt32(-1602080957);
  /**
   * encoding param: items
   */
  const __pv0 = value["items"];
  const __l1 = __pv0.length;
  __s.writeUint32(__l1);
  for (const __item1 of __pv0) {
    encodeUnionItem(__s, __item1);
  }
}
export function decodeFieldTypeUnion(
  __d: IDeserializer
): FieldTypeUnion | null {
  const __id = __d.readInt32();
  /**
   * decode header
   */
  if (__id !== -1602080957) return null;
  let items: Array<UnionItem>;
  /**
   * decoding param: items
   */
  const __l1 = __d.readUint32();
  const __o1 = new Array<UnionItem>(__l1);
  items = __o1;
  for (let __i1 = 0; __i1 < __l1; __i1++) {
    const __tmp2 = decodeUnionItem(__d);
    if (__tmp2 === null) return null;
    __o1[__i1] = __tmp2;
  }
  return {
    _name: "fieldTypeUnion.FieldTypeUnion",
    items
  };
}
export function defaultFieldTypeUnion(
  params: Partial<FieldTypeUnionInputParams> = {}
): FieldTypeUnion {
  return FieldTypeUnion({
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
     * compare parameter items
     */
    __a["items"].length === __b["items"].length &&
    Array.from(__a["items"]).every((__originalItem0, __index0) =>
      typeof __originalItem0 === "undefined"
        ? false
        : ((__item0) =>
            typeof __item0 === "undefined"
              ? false
              : compareUnionItem(__originalItem0, __item0))(
            Array.from(__b["items"])[__index0]
          )
    )
  );
}
export function updateFieldTypeUnion(
  value: FieldTypeUnion,
  changes: Partial<FieldTypeUnionInputParams>
) {
  if (typeof changes["items"] !== "undefined") {
    if (
      !(
        changes["items"].length === value["items"].length &&
        Array.from(changes["items"]).every((__originalItem1, __index1) =>
          typeof __originalItem1 === "undefined"
            ? false
            : ((__item1) =>
                typeof __item1 === "undefined"
                  ? false
                  : compareUnionItem(__originalItem1, __item1))(
                Array.from(value["items"])[__index1]
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
