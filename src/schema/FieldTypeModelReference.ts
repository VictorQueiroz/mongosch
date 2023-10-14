import { ModelIdentity } from "./Model";
import { isModelIdentity } from "./Model";
import { ISerializer } from "./__types__";
import { encodeModelIdentity } from "./Model";
import { IDeserializer } from "./__types__";
import { decodeModelIdentity } from "./Model";
import { defaultModelIdentity } from "./Model";
import { compareModelIdentity } from "./Model";
export interface FieldTypeModelReference {
  _name: "fieldTypeModelReference.FieldTypeModelReference";
  model: Readonly<ModelIdentity>;
}
export function isFieldTypeModelReference(
  value: unknown
): value is FieldTypeModelReference {
  if (
    !(
      typeof value === "object" &&
      value !== null &&
      "_name" in value &&
      typeof value["_name"] === "string" &&
      value["_name"] === "fieldTypeModelReference.FieldTypeModelReference"
    )
  )
    return false;
  if (!("model" in value && ((__v0) => isModelIdentity(__v0))(value["model"])))
    return false;
  return true;
}
export interface FieldTypeModelReferenceInputParams {
  model: Readonly<ModelIdentity>;
}
export function FieldTypeModelReference(
  params: FieldTypeModelReferenceInputParams
): FieldTypeModelReference {
  return {
    _name: "fieldTypeModelReference.FieldTypeModelReference",
    model: params["model"]
  };
}
export function encodeFieldTypeModelReference(
  __s: ISerializer,
  value: FieldTypeModelReference
) {
  __s.writeInt32(-969422962);
  /**
   * encoding param: model
   */
  const __pv0 = value["model"];
  encodeModelIdentity(__s, __pv0);
}
export function decodeFieldTypeModelReference(
  __d: IDeserializer
): FieldTypeModelReference | null {
  const __id = __d.readInt32();
  /**
   * decode header
   */
  if (__id !== -969422962) return null;
  let model: ModelIdentity;
  /**
   * decoding param: model
   */
  const tmp2 = decodeModelIdentity(__d);
  if (tmp2 === null) return null;
  model = tmp2;
  return {
    _name: "fieldTypeModelReference.FieldTypeModelReference",
    model
  };
}
export function defaultFieldTypeModelReference(
  params: Partial<FieldTypeModelReferenceInputParams> = {}
): FieldTypeModelReference {
  return FieldTypeModelReference({
    model: defaultModelIdentity(),
    ...params
  });
}
export function compareFieldTypeModelReference(
  __a: FieldTypeModelReference,
  __b: FieldTypeModelReference
): boolean {
  return (
    /**
     * compare parameter model
     */
    compareModelIdentity(__a["model"], __b["model"])
  );
}
export function updateFieldTypeModelReference(
  value: FieldTypeModelReference,
  changes: Partial<FieldTypeModelReferenceInputParams>
) {
  if (typeof changes["model"] !== "undefined") {
    if (!compareModelIdentity(changes["model"], value["model"])) {
      value = FieldTypeModelReference({
        ...value,
        model: changes["model"]
      });
    }
  }
  return value;
}
