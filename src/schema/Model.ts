import { Field } from "./Field";
import { isField } from "./Field";
import { ISerializer } from "./__types__";
import { encodeField } from "./Field";
import { IDeserializer } from "./__types__";
import { decodeField } from "./Field";
import { compareField } from "./Field";
export interface Model  {
  _name: 'model.Model';
  className: string;
  collectionName: string;
  fields: ReadonlyArray<Readonly<Field>>;
}
export function isModel(value: unknown): value is Model {
  if(!(typeof value === 'object' && value !== null && '_name' in value && typeof value['_name'] === 'string' && value['_name'] === "model.Model")) return false;
  if(!(
    "className" in value && ((__v0) => (typeof __v0 === 'string'))(value['className'])
  )) return false;
  if(!(
    "collectionName" in value && ((__v1) => (typeof __v1 === 'string'))(value['collectionName'])
  )) return false;
  if(!(
    "fields" in value && ((__v2) => ((Array.isArray(__v2) || __v2 instanceof Set) && Array.from(__v2).every(p => (isField(p)))))(value['fields'])
  )) return false;
  return true;
}
export interface ModelInputParams {
  className: string;
  collectionName: string;
  fields: ReadonlyArray<Readonly<Field>>;
}
export function Model(params: ModelInputParams): Model {
  return {
    _name: 'model.Model',
    className: params['className'],
    collectionName: params['collectionName'],
    fields: params['fields']
  };
}
export function encodeModel(__s: ISerializer, value: Model) {
  __s.writeInt32(-747051574);
  /**
   * encoding param: className
   */
  const __pv0 = value['className'];
  __s.writeString(__pv0);
  /**
   * encoding param: collectionName
   */
  const __pv1 = value['collectionName'];
  __s.writeString(__pv1);
  /**
   * encoding param: fields
   */
  const __pv2 = value['fields'];
  const __l3 = __pv2.length;
  __s.writeUint32(__l3);
  for(const __item3 of __pv2) {
    encodeField(__s,__item3);
  }
}
export function decodeModel(__d: IDeserializer): Model | null {
  const __id = __d.readInt32();
  /**
   * decode header
   */
  if(__id !== -747051574) return null;
  let className: string;
  let collectionName: string;
  let fields: Array<Field>;
  /**
   * decoding param: className
   */
  className = __d.readString();
  /**
   * decoding param: collectionName
   */
  collectionName = __d.readString();
  /**
   * decoding param: fields
   */
  const __l3 = __d.readUint32();
  const __o3 = new Array<Field>(__l3);
  fields = __o3;
  for(let __i3 = 0; __i3 < __l3; __i3++) {
    const tmp5 = decodeField(__d);
    if(tmp5 === null) return null;
    __o3[__i3] = tmp5;
  }
  return {
    _name: 'model.Model',
    className,
    collectionName,
    fields
  };
}
export function defaultModel(params: Partial<ModelInputParams> = {}): Model {
  return Model({
    className: "",
    collectionName: "",
    fields: [],
    ...params
  });
}
export function compareModel(__a: Model, __b: Model): boolean {
  return (
    /**
     * compare parameter className
     */
    __a['className'] === __b['className'] &&
    /**
     * compare parameter collectionName
     */
    __a['collectionName'] === __b['collectionName'] &&
    /**
     * compare parameter fields
     */
    __a['fields'].length === __b['fields'].length && Array.from(__a['fields']).every((__originalItem2,__index2) => (typeof __originalItem2 === 'undefined' ? false : (__item2 => typeof __item2 === 'undefined' ? false : (compareField(__originalItem2,__item2)))(Array.from(__b['fields'])[__index2])))
  );
}
export function updateModel(value: Model, changes: Partial<ModelInputParams>) {
  if(typeof changes['className'] !== 'undefined') {
    if(!(changes['className'] === value['className'])) {
      value = Model({
        ...value,
        className: changes['className'],
      });
    }
  }
  if(typeof changes['collectionName'] !== 'undefined') {
    if(!(changes['collectionName'] === value['collectionName'])) {
      value = Model({
        ...value,
        collectionName: changes['collectionName'],
      });
    }
  }
  if(typeof changes['fields'] !== 'undefined') {
    if(!(changes['fields'].length === value['fields'].length && Array.from(changes['fields']).every((__originalItem3,__index3) => (typeof __originalItem3 === 'undefined' ? false : (__item3 => typeof __item3 === 'undefined' ? false : (compareField(__originalItem3,__item3)))(Array.from(value['fields'])[__index3]))))) {
      value = Model({
        ...value,
        fields: changes['fields'],
      });
    }
  }
  return value;
}
