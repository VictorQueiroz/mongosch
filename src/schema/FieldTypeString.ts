import { ISerializer } from "./__types__";
import { IDeserializer } from "./__types__";
import JSBI from "jsbi";
export type FieldTypeStringFlag = Readonly<FieldTypeStringFlagOptional> | Readonly<FieldTypeStringFlagMinLength> | Readonly<FieldTypeStringFlagMaxLength>;
export function isFieldTypeStringFlagTrait(value: unknown): value is FieldTypeStringFlag {
  if(isFieldTypeStringFlagOptional(value)) return true;
  if(isFieldTypeStringFlagMinLength(value)) return true;
  if(isFieldTypeStringFlagMaxLength(value)) return true;
  return false;
}
export function encodeFieldTypeStringFlagTrait(__s: ISerializer,value: FieldTypeStringFlag) {
  switch(value._name) {
    case 'fieldTypeString.FieldTypeStringFlagOptional':
      return encodeFieldTypeStringFlagOptional(__s,value);
    case 'fieldTypeString.FieldTypeStringFlagMinLength':
      return encodeFieldTypeStringFlagMinLength(__s,value);
    case 'fieldTypeString.FieldTypeStringFlagMaxLength':
      return encodeFieldTypeStringFlagMaxLength(__s,value);
  }
  throw new Error(`Failed to encode: Received invalid value on "_name" property. We got "${value['_name']}" value, but this function was expecting to receive one of the following:\n\t- fieldTypeString.FieldTypeStringFlagOptional\n\t- fieldTypeString.FieldTypeStringFlagMinLength\n\t- fieldTypeString.FieldTypeStringFlagMaxLength\n\n\nPossible cause is that maybe this type simply does not extend this trait, and somehow the type-checking prevented you from calling this function wrongly.`);
}
export function decodeFieldTypeStringFlagTrait(__d: IDeserializer) {
  const __id = __d.readInt32();
  __d.rewind(4);
  let value: FieldTypeStringFlagOptional | FieldTypeStringFlagMinLength | FieldTypeStringFlagMaxLength;
  switch(__id) {
    case -1310457092: {
      const tmp = decodeFieldTypeStringFlagOptional(__d);
      if(tmp === null) return null;
      value = tmp;
      break;
    }
    case 1227713402: {
      const tmp = decodeFieldTypeStringFlagMinLength(__d);
      if(tmp === null) return null;
      value = tmp;
      break;
    }
    case 445346718: {
      const tmp = decodeFieldTypeStringFlagMaxLength(__d);
      if(tmp === null) return null;
      value = tmp;
      break;
    }
    default: return null;
  }
  return value;
}
export function defaultFieldTypeStringFlagTrait() {
  return defaultFieldTypeStringFlagOptional();
}
export function compareFieldTypeStringFlagTrait(__a: FieldTypeStringFlag, __b: FieldTypeStringFlag) {
  switch(__a._name) {
    case 'fieldTypeString.FieldTypeStringFlagOptional':
      if(__b._name !== "fieldTypeString.FieldTypeStringFlagOptional") return false;
      return compareFieldTypeStringFlagOptional(__a,__b);
    case 'fieldTypeString.FieldTypeStringFlagMinLength':
      if(__b._name !== "fieldTypeString.FieldTypeStringFlagMinLength") return false;
      return compareFieldTypeStringFlagMinLength(__a,__b);
    case 'fieldTypeString.FieldTypeStringFlagMaxLength':
      if(__b._name !== "fieldTypeString.FieldTypeStringFlagMaxLength") return false;
      return compareFieldTypeStringFlagMaxLength(__a,__b);
  }
}
export interface FieldTypeStringFlagDefaultValue  {
  _name: 'fieldTypeString.FieldTypeStringFlagDefaultValue';
  value: string;
}
export function isFieldTypeStringFlagDefaultValue(value: unknown): value is FieldTypeStringFlagDefaultValue {
  if(!(typeof value === 'object' && value !== null && '_name' in value && typeof value['_name'] === 'string' && value['_name'] === "fieldTypeString.FieldTypeStringFlagDefaultValue")) return false;
  if(!(
    "value" in value && ((__v0) => (typeof __v0 === 'string'))(value['value'])
  )) return false;
  return true;
}
export interface FieldTypeStringFlagDefaultValueInputParams {
  value: string;
}
export function FieldTypeStringFlagDefaultValue(params: FieldTypeStringFlagDefaultValueInputParams): FieldTypeStringFlagDefaultValue {
  return {
    _name: 'fieldTypeString.FieldTypeStringFlagDefaultValue',
    value: params['value']
  };
}
export function encodeFieldTypeStringFlagDefaultValue(__s: ISerializer, value: FieldTypeStringFlagDefaultValue) {
  __s.writeInt32(-200469876);
  /**
   * encoding param: value
   */
  const __pv0 = value['value'];
  __s.writeString(__pv0);
}
export function decodeFieldTypeStringFlagDefaultValue(__d: IDeserializer): FieldTypeStringFlagDefaultValue | null {
  const __id = __d.readInt32();
  /**
   * decode header
   */
  if(__id !== -200469876) return null;
  let value: string;
  /**
   * decoding param: value
   */
  value = __d.readString();
  return {
    _name: 'fieldTypeString.FieldTypeStringFlagDefaultValue',
    value
  };
}
export function defaultFieldTypeStringFlagDefaultValue(params: Partial<FieldTypeStringFlagDefaultValueInputParams> = {}): FieldTypeStringFlagDefaultValue {
  return FieldTypeStringFlagDefaultValue({
    value: "",
    ...params
  });
}
export function compareFieldTypeStringFlagDefaultValue(__a: FieldTypeStringFlagDefaultValue, __b: FieldTypeStringFlagDefaultValue): boolean {
  return (
    /**
     * compare parameter value
     */
    __a['value'] === __b['value']
  );
}
export function updateFieldTypeStringFlagDefaultValue(value: FieldTypeStringFlagDefaultValue, changes: Partial<FieldTypeStringFlagDefaultValueInputParams>) {
  if(typeof changes['value'] !== 'undefined') {
    if(!(changes['value'] === value['value'])) {
      value = FieldTypeStringFlagDefaultValue({
        ...value,
        value: changes['value'],
      });
    }
  }
  return value;
}
export interface FieldTypeStringFlagOptional  {
  _name: 'fieldTypeString.FieldTypeStringFlagOptional';
}
export function isFieldTypeStringFlagOptional(value: unknown): value is FieldTypeStringFlagOptional {
  if(!(typeof value === 'object' && value !== null && '_name' in value && typeof value['_name'] === 'string' && value['_name'] === "fieldTypeString.FieldTypeStringFlagOptional")) return false;
  return true;
}
export interface FieldTypeStringFlagOptionalInputParams {
}
export function FieldTypeStringFlagOptional(_: FieldTypeStringFlagOptionalInputParams = {}): FieldTypeStringFlagOptional {
  return {
    _name: 'fieldTypeString.FieldTypeStringFlagOptional'
  };
}
export function encodeFieldTypeStringFlagOptional(__s: ISerializer, _: FieldTypeStringFlagOptional) {
  __s.writeInt32(-1310457092);
}
export function decodeFieldTypeStringFlagOptional(__d: IDeserializer): FieldTypeStringFlagOptional | null {
  const __id = __d.readInt32();
  /**
   * decode header
   */
  if(__id !== -1310457092) return null;
  return {
    _name: 'fieldTypeString.FieldTypeStringFlagOptional',
  };
}
export function defaultFieldTypeStringFlagOptional(params: Partial<FieldTypeStringFlagOptionalInputParams> = {}): FieldTypeStringFlagOptional {
  return FieldTypeStringFlagOptional({
    ...params
  });
}
export function compareFieldTypeStringFlagOptional(__a: FieldTypeStringFlagOptional, __b: FieldTypeStringFlagOptional): boolean {
  return true;
}
export function updateFieldTypeStringFlagOptional(value: FieldTypeStringFlagOptional, _: Partial<FieldTypeStringFlagOptionalInputParams>) {
  return value;
}
export interface FieldTypeStringFlagMinLength  {
  _name: 'fieldTypeString.FieldTypeStringFlagMinLength';
  value: number;
}
export function isFieldTypeStringFlagMinLength(value: unknown): value is FieldTypeStringFlagMinLength {
  if(!(typeof value === 'object' && value !== null && '_name' in value && typeof value['_name'] === 'string' && value['_name'] === "fieldTypeString.FieldTypeStringFlagMinLength")) return false;
  if(!(
    "value" in value && ((__v0) => (typeof __v0 === 'number' && JSBI.equal(JSBI.BigInt(__v0),JSBI.BigInt(__v0)) && JSBI.greaterThanOrEqual(JSBI.BigInt(__v0),JSBI.BigInt("-2147483648")) && JSBI.lessThanOrEqual(JSBI.BigInt(__v0),JSBI.BigInt("2147483647"))))(value['value'])
  )) return false;
  return true;
}
export interface FieldTypeStringFlagMinLengthInputParams {
  value: number;
}
export function FieldTypeStringFlagMinLength(params: FieldTypeStringFlagMinLengthInputParams): FieldTypeStringFlagMinLength {
  return {
    _name: 'fieldTypeString.FieldTypeStringFlagMinLength',
    value: params['value']
  };
}
export function encodeFieldTypeStringFlagMinLength(__s: ISerializer, value: FieldTypeStringFlagMinLength) {
  __s.writeInt32(1227713402);
  /**
   * encoding param: value
   */
  const __pv0 = value['value'];
  __s.writeInt32(__pv0);
}
export function decodeFieldTypeStringFlagMinLength(__d: IDeserializer): FieldTypeStringFlagMinLength | null {
  const __id = __d.readInt32();
  /**
   * decode header
   */
  if(__id !== 1227713402) return null;
  let value: number;
  /**
   * decoding param: value
   */
  value = __d.readInt32();
  return {
    _name: 'fieldTypeString.FieldTypeStringFlagMinLength',
    value
  };
}
export function defaultFieldTypeStringFlagMinLength(params: Partial<FieldTypeStringFlagMinLengthInputParams> = {}): FieldTypeStringFlagMinLength {
  return FieldTypeStringFlagMinLength({
    value: 0,
    ...params
  });
}
export function compareFieldTypeStringFlagMinLength(__a: FieldTypeStringFlagMinLength, __b: FieldTypeStringFlagMinLength): boolean {
  return (
    /**
     * compare parameter value
     */
    __a['value'] === __b['value']
  );
}
export function updateFieldTypeStringFlagMinLength(value: FieldTypeStringFlagMinLength, changes: Partial<FieldTypeStringFlagMinLengthInputParams>) {
  if(typeof changes['value'] !== 'undefined') {
    if(!(changes['value'] === value['value'])) {
      value = FieldTypeStringFlagMinLength({
        ...value,
        value: changes['value'],
      });
    }
  }
  return value;
}
export interface FieldTypeStringFlagMaxLength  {
  _name: 'fieldTypeString.FieldTypeStringFlagMaxLength';
  value: number;
}
export function isFieldTypeStringFlagMaxLength(value: unknown): value is FieldTypeStringFlagMaxLength {
  if(!(typeof value === 'object' && value !== null && '_name' in value && typeof value['_name'] === 'string' && value['_name'] === "fieldTypeString.FieldTypeStringFlagMaxLength")) return false;
  if(!(
    "value" in value && ((__v0) => (typeof __v0 === 'number' && JSBI.equal(JSBI.BigInt(__v0),JSBI.BigInt(__v0)) && JSBI.greaterThanOrEqual(JSBI.BigInt(__v0),JSBI.BigInt("-2147483648")) && JSBI.lessThanOrEqual(JSBI.BigInt(__v0),JSBI.BigInt("2147483647"))))(value['value'])
  )) return false;
  return true;
}
export interface FieldTypeStringFlagMaxLengthInputParams {
  value: number;
}
export function FieldTypeStringFlagMaxLength(params: FieldTypeStringFlagMaxLengthInputParams): FieldTypeStringFlagMaxLength {
  return {
    _name: 'fieldTypeString.FieldTypeStringFlagMaxLength',
    value: params['value']
  };
}
export function encodeFieldTypeStringFlagMaxLength(__s: ISerializer, value: FieldTypeStringFlagMaxLength) {
  __s.writeInt32(445346718);
  /**
   * encoding param: value
   */
  const __pv0 = value['value'];
  __s.writeInt32(__pv0);
}
export function decodeFieldTypeStringFlagMaxLength(__d: IDeserializer): FieldTypeStringFlagMaxLength | null {
  const __id = __d.readInt32();
  /**
   * decode header
   */
  if(__id !== 445346718) return null;
  let value: number;
  /**
   * decoding param: value
   */
  value = __d.readInt32();
  return {
    _name: 'fieldTypeString.FieldTypeStringFlagMaxLength',
    value
  };
}
export function defaultFieldTypeStringFlagMaxLength(params: Partial<FieldTypeStringFlagMaxLengthInputParams> = {}): FieldTypeStringFlagMaxLength {
  return FieldTypeStringFlagMaxLength({
    value: 0,
    ...params
  });
}
export function compareFieldTypeStringFlagMaxLength(__a: FieldTypeStringFlagMaxLength, __b: FieldTypeStringFlagMaxLength): boolean {
  return (
    /**
     * compare parameter value
     */
    __a['value'] === __b['value']
  );
}
export function updateFieldTypeStringFlagMaxLength(value: FieldTypeStringFlagMaxLength, changes: Partial<FieldTypeStringFlagMaxLengthInputParams>) {
  if(typeof changes['value'] !== 'undefined') {
    if(!(changes['value'] === value['value'])) {
      value = FieldTypeStringFlagMaxLength({
        ...value,
        value: changes['value'],
      });
    }
  }
  return value;
}
export interface FieldTypeString  {
  _name: 'fieldTypeString.FieldTypeString';
  flags: ReadonlyArray<Readonly<FieldTypeStringFlag>>;
}
export function isFieldTypeString(value: unknown): value is FieldTypeString {
  if(!(typeof value === 'object' && value !== null && '_name' in value && typeof value['_name'] === 'string' && value['_name'] === "fieldTypeString.FieldTypeString")) return false;
  if(!(
    "flags" in value && ((__v0) => ((Array.isArray(__v0) || __v0 instanceof Set) && Array.from(__v0).every(p => (isFieldTypeStringFlagTrait(p)))))(value['flags'])
  )) return false;
  return true;
}
export interface FieldTypeStringInputParams {
  flags: ReadonlyArray<Readonly<FieldTypeStringFlag>>;
}
export function FieldTypeString(params: FieldTypeStringInputParams): FieldTypeString {
  return {
    _name: 'fieldTypeString.FieldTypeString',
    flags: params['flags']
  };
}
export function encodeFieldTypeString(__s: ISerializer, value: FieldTypeString) {
  __s.writeInt32(-58794197);
  /**
   * encoding param: flags
   */
  const __pv0 = value['flags'];
  const __l1 = __pv0.length;
  __s.writeUint32(__l1);
  for(const __item1 of __pv0) {
    encodeFieldTypeStringFlagTrait(__s,__item1);
  }
}
export function decodeFieldTypeString(__d: IDeserializer): FieldTypeString | null {
  const __id = __d.readInt32();
  /**
   * decode header
   */
  if(__id !== -58794197) return null;
  let flags: Array<FieldTypeStringFlag>;
  /**
   * decoding param: flags
   */
  const __l1 = __d.readUint32();
  const __o1 = new Array<FieldTypeStringFlag>(__l1);
  flags = __o1;
  for(let __i1 = 0; __i1 < __l1; __i1++) {
    const __tmp2 = decodeFieldTypeStringFlagTrait(__d);
    if(__tmp2 === null) return null;
    __o1[__i1] = __tmp2;
  }
  return {
    _name: 'fieldTypeString.FieldTypeString',
    flags
  };
}
export function defaultFieldTypeString(params: Partial<FieldTypeStringInputParams> = {}): FieldTypeString {
  return FieldTypeString({
    flags: [],
    ...params
  });
}
export function compareFieldTypeString(__a: FieldTypeString, __b: FieldTypeString): boolean {
  return (
    /**
     * compare parameter flags
     */
    __a['flags'].length === __b['flags'].length && Array.from(__a['flags']).every((__originalItem0,__index0) => (typeof __originalItem0 === 'undefined' ? false : (__item0 => typeof __item0 === 'undefined' ? false : (compareFieldTypeStringFlagTrait(__originalItem0,__item0)))(Array.from(__b['flags'])[__index0])))
  );
}
export function updateFieldTypeString(value: FieldTypeString, changes: Partial<FieldTypeStringInputParams>) {
  if(typeof changes['flags'] !== 'undefined') {
    if(!(changes['flags'].length === value['flags'].length && Array.from(changes['flags']).every((__originalItem1,__index1) => (typeof __originalItem1 === 'undefined' ? false : (__item1 => typeof __item1 === 'undefined' ? false : (compareFieldTypeStringFlagTrait(__originalItem1,__item1)))(Array.from(value['flags'])[__index1]))))) {
      value = FieldTypeString({
        ...value,
        flags: changes['flags'],
      });
    }
  }
  return value;
}
