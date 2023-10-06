import { Model } from "./Model";
import { isModel } from "./Model";
import { ISerializer } from "./__types__";
import { encodeModel } from "./Model";
import { IDeserializer } from "./__types__";
import { decodeModel } from "./Model";
import { defaultModel } from "./Model";
import { compareModel } from "./Model";
export interface FieldTypeModelReference  {
  _name: 'fieldTypeModelReference.FieldTypeModelReference';
  model: Readonly<Model>;
}
export function isFieldTypeModelReference(value: unknown): value is FieldTypeModelReference {
  if(!(typeof value === 'object' && value !== null && '_name' in value && typeof value['_name'] === 'string' && value['_name'] === "fieldTypeModelReference.FieldTypeModelReference")) return false;
  if(!(
    "model" in value && ((__v0) => (isModel(__v0)))(value['model'])
  )) return false;
  return true;
}
export interface FieldTypeModelReferenceInputParams {
  model: Readonly<Model>;
}
export function FieldTypeModelReference(params: FieldTypeModelReferenceInputParams): FieldTypeModelReference {
  return {
    _name: 'fieldTypeModelReference.FieldTypeModelReference',
    model: params['model']
  };
}
export function encodeFieldTypeModelReference(__s: ISerializer, value: FieldTypeModelReference) {
  __s.writeInt32(-1200777270);
  /**
   * encoding param: model
   */
  const __pv0 = value['model'];
  encodeModel(__s,__pv0);
}
export function decodeFieldTypeModelReference(__d: IDeserializer): FieldTypeModelReference | null {
  const __id = __d.readInt32();
  /**
   * decode header
   */
  if(__id !== -1200777270) return null;
  let model: Model;
  /**
   * decoding param: model
   */
  const tmp2 = decodeModel(__d);
  if(tmp2 === null) return null;
  model = tmp2;
  return {
    _name: 'fieldTypeModelReference.FieldTypeModelReference',
    model
  };
}
export function defaultFieldTypeModelReference(params: Partial<FieldTypeModelReferenceInputParams> = {}): FieldTypeModelReference {
  return FieldTypeModelReference({
    model: defaultModel(),
    ...params
  });
}
export function compareFieldTypeModelReference(__a: FieldTypeModelReference, __b: FieldTypeModelReference): boolean {
  return (
    /**
     * compare parameter model
     */
    compareModel(__a['model'],__b['model'])
  );
}
export function updateFieldTypeModelReference(value: FieldTypeModelReference, changes: Partial<FieldTypeModelReferenceInputParams>) {
  if(typeof changes['model'] !== 'undefined') {
    if(!(compareModel(changes['model'],value['model']))) {
      value = FieldTypeModelReference({
        ...value,
        model: changes['model'],
      });
    }
  }
  return value;
}
