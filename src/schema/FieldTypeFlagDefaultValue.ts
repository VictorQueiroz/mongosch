import { FieldTypeStringFlagDefaultValue } from "./FieldTypeString";
import { FieldTypeIntegerFlagDefaultValueDouble } from "./FieldTypeInteger";
import { FieldTypeIntegerFlagDefaultValueInt64 } from "./FieldTypeInteger";
import { FieldTypeIntegerFlagDefaultValueInt32 } from "./FieldTypeInteger";
import { isFieldTypeStringFlagDefaultValue } from "./FieldTypeString";
import { isFieldTypeIntegerFlagDefaultValueDouble } from "./FieldTypeInteger";
import { isFieldTypeIntegerFlagDefaultValueInt64 } from "./FieldTypeInteger";
import { isFieldTypeIntegerFlagDefaultValueInt32 } from "./FieldTypeInteger";
import { ISerializer } from "./__types__";
import { encodeFieldTypeStringFlagDefaultValue } from "./FieldTypeString";
import { encodeFieldTypeIntegerFlagDefaultValueDouble } from "./FieldTypeInteger";
import { encodeFieldTypeIntegerFlagDefaultValueInt64 } from "./FieldTypeInteger";
import { encodeFieldTypeIntegerFlagDefaultValueInt32 } from "./FieldTypeInteger";
import { IDeserializer } from "./__types__";
import { decodeFieldTypeStringFlagDefaultValue } from "./FieldTypeString";
import { decodeFieldTypeIntegerFlagDefaultValueDouble } from "./FieldTypeInteger";
import { decodeFieldTypeIntegerFlagDefaultValueInt64 } from "./FieldTypeInteger";
import { decodeFieldTypeIntegerFlagDefaultValueInt32 } from "./FieldTypeInteger";
import { defaultFieldTypeStringFlagDefaultValue } from "./FieldTypeString";
import { compareFieldTypeStringFlagDefaultValue } from "./FieldTypeString";
import { compareFieldTypeIntegerFlagDefaultValueDouble } from "./FieldTypeInteger";
import { compareFieldTypeIntegerFlagDefaultValueInt64 } from "./FieldTypeInteger";
import { compareFieldTypeIntegerFlagDefaultValueInt32 } from "./FieldTypeInteger";
export type FieldTypeFlagDefaultValue =
  | Readonly<FieldTypeStringFlagDefaultValue>
  | Readonly<FieldTypeIntegerFlagDefaultValueDouble>
  | Readonly<FieldTypeIntegerFlagDefaultValueInt64>
  | Readonly<FieldTypeIntegerFlagDefaultValueInt32>;
export function isFieldTypeFlagDefaultValueTrait(
  value: unknown
): value is FieldTypeFlagDefaultValue {
  if (isFieldTypeStringFlagDefaultValue(value)) return true;
  if (isFieldTypeIntegerFlagDefaultValueDouble(value)) return true;
  if (isFieldTypeIntegerFlagDefaultValueInt64(value)) return true;
  if (isFieldTypeIntegerFlagDefaultValueInt32(value)) return true;
  return false;
}
export function encodeFieldTypeFlagDefaultValueTrait(
  __s: ISerializer,
  value: FieldTypeFlagDefaultValue
) {
  switch (value._name) {
    case "fieldTypeString.FieldTypeStringFlagDefaultValue":
      return encodeFieldTypeStringFlagDefaultValue(__s, value);
    case "fieldTypeInteger.FieldTypeIntegerFlagDefaultValueDouble":
      return encodeFieldTypeIntegerFlagDefaultValueDouble(__s, value);
    case "fieldTypeInteger.FieldTypeIntegerFlagDefaultValueInt64":
      return encodeFieldTypeIntegerFlagDefaultValueInt64(__s, value);
    case "fieldTypeInteger.FieldTypeIntegerFlagDefaultValueInt32":
      return encodeFieldTypeIntegerFlagDefaultValueInt32(__s, value);
  }
  throw new Error(
    `Failed to encode: Received invalid value on "_name" property. We got "${value["_name"]}" value, but this function was expecting to receive one of the following:\n\t- fieldTypeString.FieldTypeStringFlagDefaultValue\n\t- fieldTypeInteger.FieldTypeIntegerFlagDefaultValueDouble\n\t- fieldTypeInteger.FieldTypeIntegerFlagDefaultValueInt64\n\t- fieldTypeInteger.FieldTypeIntegerFlagDefaultValueInt32\n\n\nPossible cause is that maybe this type simply does not extend this trait, and somehow the type-checking prevented you from calling this function wrongly.`
  );
}
export function decodeFieldTypeFlagDefaultValueTrait(__d: IDeserializer) {
  const __id = __d.readInt32();
  __d.rewind(4);
  let value:
    | FieldTypeStringFlagDefaultValue
    | FieldTypeIntegerFlagDefaultValueDouble
    | FieldTypeIntegerFlagDefaultValueInt64
    | FieldTypeIntegerFlagDefaultValueInt32;
  switch (__id) {
    case -200469876: {
      const tmp = decodeFieldTypeStringFlagDefaultValue(__d);
      if (tmp === null) return null;
      value = tmp;
      break;
    }
    case 1991764510: {
      const tmp = decodeFieldTypeIntegerFlagDefaultValueDouble(__d);
      if (tmp === null) return null;
      value = tmp;
      break;
    }
    case 894668971: {
      const tmp = decodeFieldTypeIntegerFlagDefaultValueInt64(__d);
      if (tmp === null) return null;
      value = tmp;
      break;
    }
    case 1093984595: {
      const tmp = decodeFieldTypeIntegerFlagDefaultValueInt32(__d);
      if (tmp === null) return null;
      value = tmp;
      break;
    }
    default:
      return null;
  }
  return value;
}
export function defaultFieldTypeFlagDefaultValueTrait() {
  return defaultFieldTypeStringFlagDefaultValue();
}
export function compareFieldTypeFlagDefaultValueTrait(
  __a: FieldTypeFlagDefaultValue,
  __b: FieldTypeFlagDefaultValue
) {
  switch (__a._name) {
    case "fieldTypeString.FieldTypeStringFlagDefaultValue":
      if (__b._name !== "fieldTypeString.FieldTypeStringFlagDefaultValue")
        return false;
      return compareFieldTypeStringFlagDefaultValue(__a, __b);
    case "fieldTypeInteger.FieldTypeIntegerFlagDefaultValueDouble":
      if (
        __b._name !== "fieldTypeInteger.FieldTypeIntegerFlagDefaultValueDouble"
      )
        return false;
      return compareFieldTypeIntegerFlagDefaultValueDouble(__a, __b);
    case "fieldTypeInteger.FieldTypeIntegerFlagDefaultValueInt64":
      if (
        __b._name !== "fieldTypeInteger.FieldTypeIntegerFlagDefaultValueInt64"
      )
        return false;
      return compareFieldTypeIntegerFlagDefaultValueInt64(__a, __b);
    case "fieldTypeInteger.FieldTypeIntegerFlagDefaultValueInt32":
      if (
        __b._name !== "fieldTypeInteger.FieldTypeIntegerFlagDefaultValueInt32"
      )
        return false;
      return compareFieldTypeIntegerFlagDefaultValueInt32(__a, __b);
  }
}
