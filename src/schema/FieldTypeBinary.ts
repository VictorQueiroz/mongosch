import { ISerializer } from "./__types__";
import { IDeserializer } from "./__types__";
export interface FieldTypeBinary {
  _name: "field-type-binary.FieldTypeBinary";
}
export function isFieldTypeBinary(value: unknown): value is FieldTypeBinary {
  if (
    !(
      typeof value === "object" &&
      value !== null &&
      "_name" in value &&
      typeof value["_name"] === "string" &&
      value["_name"] === "field-type-binary.FieldTypeBinary"
    )
  )
    return false;
  return true;
}
export interface FieldTypeBinaryInputParams {}
export function FieldTypeBinary(
  _: FieldTypeBinaryInputParams = {}
): FieldTypeBinary {
  return {
    _name: "field-type-binary.FieldTypeBinary"
  };
}
export function encodeFieldTypeBinary(__s: ISerializer, _: FieldTypeBinary) {
  __s.writeInt32(-1706328239);
}
export function decodeFieldTypeBinary(
  __d: IDeserializer
): FieldTypeBinary | null {
  const __id = __d.readInt32();
  /**
   * decode header
   */
  if (__id !== -1706328239) return null;
  return {
    _name: "field-type-binary.FieldTypeBinary"
  };
}
export function defaultFieldTypeBinary(
  params: Partial<FieldTypeBinaryInputParams> = {}
): FieldTypeBinary {
  return FieldTypeBinary({
    ...params
  });
}
export function compareFieldTypeBinary(
  __a: FieldTypeBinary,
  __b: FieldTypeBinary
): boolean {
  return true;
}
export function updateFieldTypeBinary(
  value: FieldTypeBinary,
  _: Partial<FieldTypeBinaryInputParams>
) {
  return value;
}
