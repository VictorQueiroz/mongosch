import { ISerializer } from "./__types__";
import { IDeserializer } from "./__types__";
export type FieldTypeBooleanFlags = Readonly<FieldTypeBooleanFlagsOptional>;
export function isFieldTypeBooleanFlagsTrait(
  value: unknown
): value is FieldTypeBooleanFlags {
  if (isFieldTypeBooleanFlagsOptional(value)) return true;
  return false;
}
export function encodeFieldTypeBooleanFlagsTrait(
  __s: ISerializer,
  value: FieldTypeBooleanFlags
) {
  switch (value._name) {
    case "fieldTypeBoolean.FieldTypeBooleanFlagsOptional":
      return encodeFieldTypeBooleanFlagsOptional(__s, value);
  }
  throw new Error(
    `Failed to encode: Received invalid value on "_name" property. We got "${value["_name"]}" value, but this function was expecting to receive one of the following:\n\t- fieldTypeBoolean.FieldTypeBooleanFlagsOptional\n\n\nPossible cause is that maybe this type simply does not extend this trait, and somehow the type-checking prevented you from calling this function wrongly.`
  );
}
export function decodeFieldTypeBooleanFlagsTrait(__d: IDeserializer) {
  const __id = __d.readInt32();
  __d.rewind(4);
  let value: FieldTypeBooleanFlagsOptional;
  switch (__id) {
    case 1833850754: {
      const tmp = decodeFieldTypeBooleanFlagsOptional(__d);
      if (tmp === null) return null;
      value = tmp;
      break;
    }
    default:
      return null;
  }
  return value;
}
export function defaultFieldTypeBooleanFlagsTrait() {
  return defaultFieldTypeBooleanFlagsOptional();
}
export function compareFieldTypeBooleanFlagsTrait(
  __a: FieldTypeBooleanFlags,
  __b: FieldTypeBooleanFlags
) {
  return compareFieldTypeBooleanFlagsOptional(__a, __b);
}
export interface FieldTypeBooleanFlagsOptional {
  _name: "fieldTypeBoolean.FieldTypeBooleanFlagsOptional";
}
export function isFieldTypeBooleanFlagsOptional(
  value: unknown
): value is FieldTypeBooleanFlagsOptional {
  if (
    !(
      typeof value === "object" &&
      value !== null &&
      "_name" in value &&
      typeof value["_name"] === "string" &&
      value["_name"] === "fieldTypeBoolean.FieldTypeBooleanFlagsOptional"
    )
  )
    return false;
  return true;
}
export interface FieldTypeBooleanFlagsOptionalInputParams {}
export function FieldTypeBooleanFlagsOptional(
  _: FieldTypeBooleanFlagsOptionalInputParams = {}
): FieldTypeBooleanFlagsOptional {
  return {
    _name: "fieldTypeBoolean.FieldTypeBooleanFlagsOptional"
  };
}
export function encodeFieldTypeBooleanFlagsOptional(
  __s: ISerializer,
  _: FieldTypeBooleanFlagsOptional
) {
  __s.writeInt32(1833850754);
}
export function decodeFieldTypeBooleanFlagsOptional(
  __d: IDeserializer
): FieldTypeBooleanFlagsOptional | null {
  const __id = __d.readInt32();
  /**
   * decode header
   */
  if (__id !== 1833850754) return null;
  return {
    _name: "fieldTypeBoolean.FieldTypeBooleanFlagsOptional"
  };
}
export function defaultFieldTypeBooleanFlagsOptional(
  params: Partial<FieldTypeBooleanFlagsOptionalInputParams> = {}
): FieldTypeBooleanFlagsOptional {
  return FieldTypeBooleanFlagsOptional({
    ...params
  });
}
export function compareFieldTypeBooleanFlagsOptional(
  __a: FieldTypeBooleanFlagsOptional,
  __b: FieldTypeBooleanFlagsOptional
): boolean {
  return true;
}
export function updateFieldTypeBooleanFlagsOptional(
  value: FieldTypeBooleanFlagsOptional,
  _: Partial<FieldTypeBooleanFlagsOptionalInputParams>
) {
  return value;
}
export interface FieldTypeBoolean {
  _name: "fieldTypeBoolean.FieldTypeBoolean";
  flags: ReadonlyArray<Readonly<FieldTypeBooleanFlags>>;
}
export function isFieldTypeBoolean(value: unknown): value is FieldTypeBoolean {
  if (
    !(
      typeof value === "object" &&
      value !== null &&
      "_name" in value &&
      typeof value["_name"] === "string" &&
      value["_name"] === "fieldTypeBoolean.FieldTypeBoolean"
    )
  )
    return false;
  if (
    !(
      "flags" in value &&
      ((__v0) =>
        (Array.isArray(__v0) || __v0 instanceof Set) &&
        Array.from(__v0).every((p) => isFieldTypeBooleanFlagsTrait(p)))(
        value["flags"]
      )
    )
  )
    return false;
  return true;
}
export interface FieldTypeBooleanInputParams {
  flags: ReadonlyArray<Readonly<FieldTypeBooleanFlags>>;
}
export function FieldTypeBoolean(
  params: FieldTypeBooleanInputParams
): FieldTypeBoolean {
  return {
    _name: "fieldTypeBoolean.FieldTypeBoolean",
    flags: params["flags"]
  };
}
export function encodeFieldTypeBoolean(
  __s: ISerializer,
  value: FieldTypeBoolean
) {
  __s.writeInt32(-1452915313);
  /**
   * encoding param: flags
   */
  const __pv0 = value["flags"];
  const __l1 = __pv0.length;
  __s.writeUint32(__l1);
  for (const __item1 of __pv0) {
    encodeFieldTypeBooleanFlagsTrait(__s, __item1);
  }
}
export function decodeFieldTypeBoolean(
  __d: IDeserializer
): FieldTypeBoolean | null {
  const __id = __d.readInt32();
  /**
   * decode header
   */
  if (__id !== -1452915313) return null;
  let flags: Array<FieldTypeBooleanFlags>;
  /**
   * decoding param: flags
   */
  const __l1 = __d.readUint32();
  const __o1 = new Array<FieldTypeBooleanFlags>(__l1);
  flags = __o1;
  for (let __i1 = 0; __i1 < __l1; __i1++) {
    const __tmp2 = decodeFieldTypeBooleanFlagsTrait(__d);
    if (__tmp2 === null) return null;
    __o1[__i1] = __tmp2;
  }
  return {
    _name: "fieldTypeBoolean.FieldTypeBoolean",
    flags
  };
}
export function defaultFieldTypeBoolean(
  params: Partial<FieldTypeBooleanInputParams> = {}
): FieldTypeBoolean {
  return FieldTypeBoolean({
    flags: [],
    ...params
  });
}
export function compareFieldTypeBoolean(
  __a: FieldTypeBoolean,
  __b: FieldTypeBoolean
): boolean {
  return (
    /**
     * compare parameter flags
     */
    __a["flags"].length === __b["flags"].length &&
    Array.from(__a["flags"]).every((__originalItem0, __index0) =>
      typeof __originalItem0 === "undefined"
        ? false
        : ((__item0) =>
            typeof __item0 === "undefined"
              ? false
              : compareFieldTypeBooleanFlagsTrait(__originalItem0, __item0))(
            Array.from(__b["flags"])[__index0]
          )
    )
  );
}
export function updateFieldTypeBoolean(
  value: FieldTypeBoolean,
  changes: Partial<FieldTypeBooleanInputParams>
) {
  if (typeof changes["flags"] !== "undefined") {
    if (
      !(
        changes["flags"].length === value["flags"].length &&
        Array.from(changes["flags"]).every((__originalItem1, __index1) =>
          typeof __originalItem1 === "undefined"
            ? false
            : ((__item1) =>
                typeof __item1 === "undefined"
                  ? false
                  : compareFieldTypeBooleanFlagsTrait(
                      __originalItem1,
                      __item1
                    ))(Array.from(value["flags"])[__index1])
        )
      )
    ) {
      value = FieldTypeBoolean({
        ...value,
        flags: changes["flags"]
      });
    }
  }
  return value;
}
