import { FieldType } from "./FieldType";
import { isFieldTypeTrait } from "./FieldType";
import { ISerializer } from "./__types__";
import { encodeFieldTypeTrait } from "./FieldType";
import { IDeserializer } from "./__types__";
import { decodeFieldTypeTrait } from "./FieldType";
import { defaultFieldTypeTrait } from "./FieldType";
import { compareFieldTypeTrait } from "./FieldType";
export interface Field {
  _name: "field.Field";
  name: string;
  description: string | null;
  fieldType: Readonly<FieldType>;
}
export function isField(value: unknown): value is Field {
  if (
    !(
      typeof value === "object" &&
      value !== null &&
      "_name" in value &&
      typeof value["_name"] === "string" &&
      value["_name"] === "field.Field"
    )
  )
    return false;
  if (!("name" in value && ((__v0) => typeof __v0 === "string")(value["name"])))
    return false;
  if (
    !(
      "description" in value &&
      ((__v1) => (__v1 === null ? true : ((x) => typeof x === "string")(__v1)))(
        value["description"]
      )
    )
  )
    return false;
  if (
    !(
      "fieldType" in value &&
      ((__v3) => isFieldTypeTrait(__v3))(value["fieldType"])
    )
  )
    return false;
  return true;
}
export interface FieldInputParams {
  name: string;
  description: string | null;
  fieldType: Readonly<FieldType>;
}
export function Field(params: FieldInputParams): Field {
  return {
    _name: "field.Field",
    name: params["name"],
    description: params["description"],
    fieldType: params["fieldType"]
  };
}
export function encodeField(__s: ISerializer, value: Field) {
  __s.writeInt32(-106707621);
  /**
   * encoding param: name
   */
  const __pv0 = value["name"];
  __s.writeString(__pv0);
  /**
   * encoding param: description
   */
  const __pv1 = value["description"];
  if (__pv1 === null) {
    __s.writeUint8(0);
  } else {
    __s.writeUint8(1);
    __s.writeString(__pv1);
  }
  /**
   * encoding param: fieldType
   */
  const __pv3 = value["fieldType"];
  encodeFieldTypeTrait(__s, __pv3);
}
export function decodeField(__d: IDeserializer): Field | null {
  const __id = __d.readInt32();
  /**
   * decode header
   */
  if (__id !== -106707621) return null;
  let name: string;
  let description: string | null;
  let fieldType: FieldType;
  /**
   * decoding param: name
   */
  name = __d.readString();
  /**
   * decoding param: description
   */
  if (__d.readUint8() === 1) {
    description = __d.readString();
  } else {
    description = null;
  }
  /**
   * decoding param: fieldType
   */
  const tmp5 = decodeFieldTypeTrait(__d);
  if (tmp5 === null) return null;
  fieldType = tmp5;
  return {
    _name: "field.Field",
    name,
    description,
    fieldType
  };
}
export function defaultField(params: Partial<FieldInputParams> = {}): Field {
  return Field({
    name: "",
    description: null,
    fieldType: defaultFieldTypeTrait(),
    ...params
  });
}
export function compareField(__a: Field, __b: Field): boolean {
  return (
    /**
     * compare parameter name
     */
    __a["name"] === __b["name"] &&
    /**
     * compare parameter description
     */
    ((__dp11, __dp12) =>
      __dp11 !== null && __dp12 !== null
        ? __dp11 === __dp12
        : __dp11 === __dp12)(__a["description"], __b["description"]) &&
    /**
     * compare parameter fieldType
     */
    compareFieldTypeTrait(__a["fieldType"], __b["fieldType"])
  );
}
export function updateField(value: Field, changes: Partial<FieldInputParams>) {
  if (typeof changes["name"] !== "undefined") {
    if (!(changes["name"] === value["name"])) {
      value = Field({
        ...value,
        name: changes["name"]
      });
    }
  }
  if (typeof changes["description"] !== "undefined") {
    if (
      !((__dp21, __dp22) =>
        __dp21 !== null && __dp22 !== null
          ? __dp21 === __dp22
          : __dp21 === __dp22)(changes["description"], value["description"])
    ) {
      value = Field({
        ...value,
        description: changes["description"]
      });
    }
  }
  if (typeof changes["fieldType"] !== "undefined") {
    if (!compareFieldTypeTrait(changes["fieldType"], value["fieldType"])) {
      value = Field({
        ...value,
        fieldType: changes["fieldType"]
      });
    }
  }
  return value;
}
