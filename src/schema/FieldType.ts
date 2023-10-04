import { FieldTypeModelReference } from "./FieldTypeModelReference";
import { FieldTypeString } from "./FieldTypeString";
import { FieldTypeObject } from "./FieldTypeObject";
import { FieldTypeArray } from "./FieldTypeObject";
import { FieldTypeDouble } from "./FieldTypeInteger";
import { FieldTypeInt64 } from "./FieldTypeInteger";
import { FieldTypeInt32 } from "./FieldTypeInteger";
import { FieldTypeDate } from "./FieldTypeDate";
import { FieldTypeEnumString } from "./FieldTypeEnum";
import { FieldTypeEnumInt } from "./FieldTypeEnum";
import { FieldTypeUnion } from "./FieldTypeUnion";
import { FieldTypeBinary } from "./FieldTypeBinary";
import { FieldTypeBoolean } from "./FieldTypeBoolean";
import { isFieldTypeModelReference } from "./FieldTypeModelReference";
import { isFieldTypeString } from "./FieldTypeString";
import { isFieldTypeObject } from "./FieldTypeObject";
import { isFieldTypeArray } from "./FieldTypeObject";
import { isFieldTypeDouble } from "./FieldTypeInteger";
import { isFieldTypeInt64 } from "./FieldTypeInteger";
import { isFieldTypeInt32 } from "./FieldTypeInteger";
import { isFieldTypeDate } from "./FieldTypeDate";
import { isFieldTypeEnumString } from "./FieldTypeEnum";
import { isFieldTypeEnumInt } from "./FieldTypeEnum";
import { isFieldTypeUnion } from "./FieldTypeUnion";
import { isFieldTypeBinary } from "./FieldTypeBinary";
import { isFieldTypeBoolean } from "./FieldTypeBoolean";
import { ISerializer } from "./__types__";
import { encodeFieldTypeModelReference } from "./FieldTypeModelReference";
import { encodeFieldTypeString } from "./FieldTypeString";
import { encodeFieldTypeObject } from "./FieldTypeObject";
import { encodeFieldTypeArray } from "./FieldTypeObject";
import { encodeFieldTypeDouble } from "./FieldTypeInteger";
import { encodeFieldTypeInt64 } from "./FieldTypeInteger";
import { encodeFieldTypeInt32 } from "./FieldTypeInteger";
import { encodeFieldTypeDate } from "./FieldTypeDate";
import { encodeFieldTypeEnumString } from "./FieldTypeEnum";
import { encodeFieldTypeEnumInt } from "./FieldTypeEnum";
import { encodeFieldTypeUnion } from "./FieldTypeUnion";
import { encodeFieldTypeBinary } from "./FieldTypeBinary";
import { encodeFieldTypeBoolean } from "./FieldTypeBoolean";
import { IDeserializer } from "./__types__";
import { decodeFieldTypeModelReference } from "./FieldTypeModelReference";
import { decodeFieldTypeString } from "./FieldTypeString";
import { decodeFieldTypeObject } from "./FieldTypeObject";
import { decodeFieldTypeArray } from "./FieldTypeObject";
import { decodeFieldTypeDouble } from "./FieldTypeInteger";
import { decodeFieldTypeInt64 } from "./FieldTypeInteger";
import { decodeFieldTypeInt32 } from "./FieldTypeInteger";
import { decodeFieldTypeDate } from "./FieldTypeDate";
import { decodeFieldTypeEnumString } from "./FieldTypeEnum";
import { decodeFieldTypeEnumInt } from "./FieldTypeEnum";
import { decodeFieldTypeUnion } from "./FieldTypeUnion";
import { decodeFieldTypeBinary } from "./FieldTypeBinary";
import { decodeFieldTypeBoolean } from "./FieldTypeBoolean";
import { defaultFieldTypeModelReference } from "./FieldTypeModelReference";
import { compareFieldTypeModelReference } from "./FieldTypeModelReference";
import { compareFieldTypeString } from "./FieldTypeString";
import { compareFieldTypeObject } from "./FieldTypeObject";
import { compareFieldTypeArray } from "./FieldTypeObject";
import { compareFieldTypeDouble } from "./FieldTypeInteger";
import { compareFieldTypeInt64 } from "./FieldTypeInteger";
import { compareFieldTypeInt32 } from "./FieldTypeInteger";
import { compareFieldTypeDate } from "./FieldTypeDate";
import { compareFieldTypeEnumString } from "./FieldTypeEnum";
import { compareFieldTypeEnumInt } from "./FieldTypeEnum";
import { compareFieldTypeUnion } from "./FieldTypeUnion";
import { compareFieldTypeBinary } from "./FieldTypeBinary";
import { compareFieldTypeBoolean } from "./FieldTypeBoolean";
export type FieldType =
  | Readonly<FieldTypeModelReference>
  | Readonly<FieldTypeString>
  | Readonly<FieldTypeObject>
  | Readonly<FieldTypeArray>
  | Readonly<FieldTypeDouble>
  | Readonly<FieldTypeInt64>
  | Readonly<FieldTypeInt32>
  | Readonly<FieldTypeDate>
  | Readonly<FieldTypeEnumString>
  | Readonly<FieldTypeEnumInt>
  | Readonly<FieldTypeUnion>
  | Readonly<FieldTypeBinary>
  | Readonly<FieldTypeBoolean>;
export function isFieldTypeTrait(value: unknown): value is FieldType {
  if (isFieldTypeModelReference(value)) return true;
  if (isFieldTypeString(value)) return true;
  if (isFieldTypeObject(value)) return true;
  if (isFieldTypeArray(value)) return true;
  if (isFieldTypeDouble(value)) return true;
  if (isFieldTypeInt64(value)) return true;
  if (isFieldTypeInt32(value)) return true;
  if (isFieldTypeDate(value)) return true;
  if (isFieldTypeEnumString(value)) return true;
  if (isFieldTypeEnumInt(value)) return true;
  if (isFieldTypeUnion(value)) return true;
  if (isFieldTypeBinary(value)) return true;
  if (isFieldTypeBoolean(value)) return true;
  return false;
}
export function encodeFieldTypeTrait(__s: ISerializer, value: FieldType) {
  switch (value._name) {
    case "fieldTypeModelReference.FieldTypeModelReference":
      return encodeFieldTypeModelReference(__s, value);
    case "fieldTypeString.FieldTypeString":
      return encodeFieldTypeString(__s, value);
    case "fieldTypeObject.FieldTypeObject":
      return encodeFieldTypeObject(__s, value);
    case "fieldTypeObject.FieldTypeArray":
      return encodeFieldTypeArray(__s, value);
    case "fieldTypeInteger.FieldTypeDouble":
      return encodeFieldTypeDouble(__s, value);
    case "fieldTypeInteger.FieldTypeInt64":
      return encodeFieldTypeInt64(__s, value);
    case "fieldTypeInteger.FieldTypeInt32":
      return encodeFieldTypeInt32(__s, value);
    case "fieldTypeDate.FieldTypeDate":
      return encodeFieldTypeDate(__s, value);
    case "fieldTypeEnum.FieldTypeEnumString":
      return encodeFieldTypeEnumString(__s, value);
    case "fieldTypeEnum.FieldTypeEnumInt":
      return encodeFieldTypeEnumInt(__s, value);
    case "fieldTypeUnion.FieldTypeUnion":
      return encodeFieldTypeUnion(__s, value);
    case "fieldTypeBinary.FieldTypeBinary":
      return encodeFieldTypeBinary(__s, value);
    case "fieldTypeBoolean.FieldTypeBoolean":
      return encodeFieldTypeBoolean(__s, value);
  }
  throw new Error(
    `Failed to encode: Received invalid value on "_name" property. We got "${value["_name"]}" value, but this function was expecting to receive one of the following:\n\t- fieldTypeModelReference.FieldTypeModelReference\n\t- fieldTypeString.FieldTypeString\n\t- fieldTypeObject.FieldTypeObject\n\t- fieldTypeObject.FieldTypeArray\n\t- fieldTypeInteger.FieldTypeDouble\n\t- fieldTypeInteger.FieldTypeInt64\n\t- fieldTypeInteger.FieldTypeInt32\n\t- fieldTypeDate.FieldTypeDate\n\t- fieldTypeEnum.FieldTypeEnumString\n\t- fieldTypeEnum.FieldTypeEnumInt\n\t- fieldTypeUnion.FieldTypeUnion\n\t- fieldTypeBinary.FieldTypeBinary\n\t- fieldTypeBoolean.FieldTypeBoolean\n\n\nPossible cause is that maybe this type simply does not extend this trait, and somehow the type-checking prevented you from calling this function wrongly.`
  );
}
export function decodeFieldTypeTrait(__d: IDeserializer) {
  const __id = __d.readInt32();
  __d.rewind(4);
  let value:
    | FieldTypeModelReference
    | FieldTypeString
    | FieldTypeObject
    | FieldTypeArray
    | FieldTypeDouble
    | FieldTypeInt64
    | FieldTypeInt32
    | FieldTypeDate
    | FieldTypeEnumString
    | FieldTypeEnumInt
    | FieldTypeUnion
    | FieldTypeBinary
    | FieldTypeBoolean;
  switch (__id) {
    case -1200777270: {
      const tmp = decodeFieldTypeModelReference(__d);
      if (tmp === null) return null;
      value = tmp;
      break;
    }
    case -58794197: {
      const tmp = decodeFieldTypeString(__d);
      if (tmp === null) return null;
      value = tmp;
      break;
    }
    case 1901329349: {
      const tmp = decodeFieldTypeObject(__d);
      if (tmp === null) return null;
      value = tmp;
      break;
    }
    case -1484357677: {
      const tmp = decodeFieldTypeArray(__d);
      if (tmp === null) return null;
      value = tmp;
      break;
    }
    case -1526483373: {
      const tmp = decodeFieldTypeDouble(__d);
      if (tmp === null) return null;
      value = tmp;
      break;
    }
    case -296959413: {
      const tmp = decodeFieldTypeInt64(__d);
      if (tmp === null) return null;
      value = tmp;
      break;
    }
    case 1212985133: {
      const tmp = decodeFieldTypeInt32(__d);
      if (tmp === null) return null;
      value = tmp;
      break;
    }
    case -367427752: {
      const tmp = decodeFieldTypeDate(__d);
      if (tmp === null) return null;
      value = tmp;
      break;
    }
    case -1783599301: {
      const tmp = decodeFieldTypeEnumString(__d);
      if (tmp === null) return null;
      value = tmp;
      break;
    }
    case 1838761574: {
      const tmp = decodeFieldTypeEnumInt(__d);
      if (tmp === null) return null;
      value = tmp;
      break;
    }
    case 326543358: {
      const tmp = decodeFieldTypeUnion(__d);
      if (tmp === null) return null;
      value = tmp;
      break;
    }
    case -1706328239: {
      const tmp = decodeFieldTypeBinary(__d);
      if (tmp === null) return null;
      value = tmp;
      break;
    }
    case -1452915313: {
      const tmp = decodeFieldTypeBoolean(__d);
      if (tmp === null) return null;
      value = tmp;
      break;
    }
    default:
      return null;
  }
  return value;
}
export function defaultFieldTypeTrait() {
  return defaultFieldTypeModelReference();
}
export function compareFieldTypeTrait(__a: FieldType, __b: FieldType) {
  switch (__a._name) {
    case "fieldTypeModelReference.FieldTypeModelReference":
      if (__b._name !== "fieldTypeModelReference.FieldTypeModelReference")
        return false;
      return compareFieldTypeModelReference(__a, __b);
    case "fieldTypeString.FieldTypeString":
      if (__b._name !== "fieldTypeString.FieldTypeString") return false;
      return compareFieldTypeString(__a, __b);
    case "fieldTypeObject.FieldTypeObject":
      if (__b._name !== "fieldTypeObject.FieldTypeObject") return false;
      return compareFieldTypeObject(__a, __b);
    case "fieldTypeObject.FieldTypeArray":
      if (__b._name !== "fieldTypeObject.FieldTypeArray") return false;
      return compareFieldTypeArray(__a, __b);
    case "fieldTypeInteger.FieldTypeDouble":
      if (__b._name !== "fieldTypeInteger.FieldTypeDouble") return false;
      return compareFieldTypeDouble(__a, __b);
    case "fieldTypeInteger.FieldTypeInt64":
      if (__b._name !== "fieldTypeInteger.FieldTypeInt64") return false;
      return compareFieldTypeInt64(__a, __b);
    case "fieldTypeInteger.FieldTypeInt32":
      if (__b._name !== "fieldTypeInteger.FieldTypeInt32") return false;
      return compareFieldTypeInt32(__a, __b);
    case "fieldTypeDate.FieldTypeDate":
      if (__b._name !== "fieldTypeDate.FieldTypeDate") return false;
      return compareFieldTypeDate(__a, __b);
    case "fieldTypeEnum.FieldTypeEnumString":
      if (__b._name !== "fieldTypeEnum.FieldTypeEnumString") return false;
      return compareFieldTypeEnumString(__a, __b);
    case "fieldTypeEnum.FieldTypeEnumInt":
      if (__b._name !== "fieldTypeEnum.FieldTypeEnumInt") return false;
      return compareFieldTypeEnumInt(__a, __b);
    case "fieldTypeUnion.FieldTypeUnion":
      if (__b._name !== "fieldTypeUnion.FieldTypeUnion") return false;
      return compareFieldTypeUnion(__a, __b);
    case "fieldTypeBinary.FieldTypeBinary":
      if (__b._name !== "fieldTypeBinary.FieldTypeBinary") return false;
      return compareFieldTypeBinary(__a, __b);
    case "fieldTypeBoolean.FieldTypeBoolean":
      if (__b._name !== "fieldTypeBoolean.FieldTypeBoolean") return false;
      return compareFieldTypeBoolean(__a, __b);
  }
}
