import { ModelIdentity } from "./Model";
import { ISerializer } from "./__types__";
import { IDeserializer } from "./__types__";
import { isModelIdentity } from "./Model";
import { encodeModelIdentity } from "./Model";
import { decodeModelIdentity } from "./Model";
import { defaultModelIdentity } from "./Model";
import { compareModelIdentity } from "./Model";
export type FieldTypeModelReferenceFlag =
  Readonly<FieldTypeModelReferenceFlagOptional>;
export function isFieldTypeModelReferenceFlagTrait(
  value: unknown
): value is FieldTypeModelReferenceFlag {
  if (isFieldTypeModelReferenceFlagOptional(value)) return true;
  return false;
}
export function encodeFieldTypeModelReferenceFlagTrait(
  __s: ISerializer,
  value: FieldTypeModelReferenceFlag
) {
  switch (value._name) {
    case "field-type-model-reference.FieldTypeModelReferenceFlagOptional":
      return encodeFieldTypeModelReferenceFlagOptional(__s, value);
  }
  throw new Error(
    `Failed to encode: Received invalid value on "_name" property. We got "${value["_name"]}" value, but this function was expecting to receive one of the following:\n\t- field-type-model-reference.FieldTypeModelReferenceFlagOptional\n\n\nPossible cause is that maybe this type simply does not extend this trait, and somehow the type-checking prevented you from calling this function wrongly.`
  );
}
export function decodeFieldTypeModelReferenceFlagTrait(__d: IDeserializer) {
  const __id = __d.readInt32();
  __d.rewind(4);
  let value: FieldTypeModelReferenceFlagOptional;
  switch (__id) {
    case -2034463642: {
      const tmp = decodeFieldTypeModelReferenceFlagOptional(__d);
      if (tmp === null) return null;
      value = tmp;
      break;
    }
    default:
      return null;
  }
  return value;
}
export function defaultFieldTypeModelReferenceFlagTrait() {
  return defaultFieldTypeModelReferenceFlagOptional();
}
export function compareFieldTypeModelReferenceFlagTrait(
  __a: FieldTypeModelReferenceFlag,
  __b: FieldTypeModelReferenceFlag
) {
  return compareFieldTypeModelReferenceFlagOptional(__a, __b);
}
export interface FieldTypeModelReferenceFlagOptional {
  _name: "field-type-model-reference.FieldTypeModelReferenceFlagOptional";
}
export function isFieldTypeModelReferenceFlagOptional(
  value: unknown
): value is FieldTypeModelReferenceFlagOptional {
  if (
    !(
      typeof value === "object" &&
      value !== null &&
      "_name" in value &&
      typeof value["_name"] === "string" &&
      value["_name"] ===
        "field-type-model-reference.FieldTypeModelReferenceFlagOptional"
    )
  )
    return false;
  return true;
}
export interface FieldTypeModelReferenceFlagOptionalInputParams {}
export function FieldTypeModelReferenceFlagOptional(
  _: FieldTypeModelReferenceFlagOptionalInputParams = {}
): FieldTypeModelReferenceFlagOptional {
  return {
    _name: "field-type-model-reference.FieldTypeModelReferenceFlagOptional"
  };
}
export function encodeFieldTypeModelReferenceFlagOptional(
  __s: ISerializer,
  _: FieldTypeModelReferenceFlagOptional
) {
  __s.writeInt32(-2034463642);
}
export function decodeFieldTypeModelReferenceFlagOptional(
  __d: IDeserializer
): FieldTypeModelReferenceFlagOptional | null {
  const __id = __d.readInt32();
  /**
   * decode header
   */
  if (__id !== -2034463642) return null;
  return {
    _name: "field-type-model-reference.FieldTypeModelReferenceFlagOptional"
  };
}
export function defaultFieldTypeModelReferenceFlagOptional(
  params: Partial<FieldTypeModelReferenceFlagOptionalInputParams> = {}
): FieldTypeModelReferenceFlagOptional {
  return FieldTypeModelReferenceFlagOptional({
    ...params
  });
}
export function compareFieldTypeModelReferenceFlagOptional(
  __a: FieldTypeModelReferenceFlagOptional,
  __b: FieldTypeModelReferenceFlagOptional
): boolean {
  return true;
}
export function updateFieldTypeModelReferenceFlagOptional(
  value: FieldTypeModelReferenceFlagOptional,
  _: Partial<FieldTypeModelReferenceFlagOptionalInputParams>
) {
  return value;
}
export interface FieldTypeModelReference {
  _name: "field-type-model-reference.FieldTypeModelReference";
  model: Readonly<ModelIdentity>;
  flags: ReadonlyArray<Readonly<FieldTypeModelReferenceFlag>>;
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
      value["_name"] === "field-type-model-reference.FieldTypeModelReference"
    )
  )
    return false;
  if (!("model" in value && ((__v0) => isModelIdentity(__v0))(value["model"])))
    return false;
  if (
    !(
      "flags" in value &&
      ((__v1) =>
        (Array.isArray(__v1) || __v1 instanceof Set) &&
        Array.from(__v1).every((p) => isFieldTypeModelReferenceFlagTrait(p)))(
        value["flags"]
      )
    )
  )
    return false;
  return true;
}
export interface FieldTypeModelReferenceInputParams {
  model: Readonly<ModelIdentity>;
  flags: ReadonlyArray<Readonly<FieldTypeModelReferenceFlag>>;
}
export function FieldTypeModelReference(
  params: FieldTypeModelReferenceInputParams
): FieldTypeModelReference {
  return {
    _name: "field-type-model-reference.FieldTypeModelReference",
    model: params["model"],
    flags: params["flags"]
  };
}
export function encodeFieldTypeModelReference(
  __s: ISerializer,
  value: FieldTypeModelReference
) {
  __s.writeInt32(1901102098);
  /**
   * encoding param: model
   */
  const __pv0 = value["model"];
  encodeModelIdentity(__s, __pv0);
  /**
   * encoding param: flags
   */
  const __pv1 = value["flags"];
  const __l2 = __pv1.length;
  __s.writeUint32(__l2);
  for (const __item2 of __pv1) {
    encodeFieldTypeModelReferenceFlagTrait(__s, __item2);
  }
}
export function decodeFieldTypeModelReference(
  __d: IDeserializer
): FieldTypeModelReference | null {
  const __id = __d.readInt32();
  /**
   * decode header
   */
  if (__id !== 1901102098) return null;
  let model: ModelIdentity;
  let flags: Array<FieldTypeModelReferenceFlag>;
  /**
   * decoding param: model
   */
  const tmp2 = decodeModelIdentity(__d);
  if (tmp2 === null) return null;
  model = tmp2;
  /**
   * decoding param: flags
   */
  const __l3 = __d.readUint32();
  const __o3 = new Array<FieldTypeModelReferenceFlag>(__l3);
  flags = __o3;
  for (let __i3 = 0; __i3 < __l3; __i3++) {
    const __tmp4 = decodeFieldTypeModelReferenceFlagTrait(__d);
    if (__tmp4 === null) return null;
    __o3[__i3] = __tmp4;
  }
  return {
    _name: "field-type-model-reference.FieldTypeModelReference",
    model,
    flags
  };
}
export function defaultFieldTypeModelReference(
  params: Partial<FieldTypeModelReferenceInputParams> = {}
): FieldTypeModelReference {
  return FieldTypeModelReference({
    model: defaultModelIdentity(),
    flags: [],
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
    compareModelIdentity(__a["model"], __b["model"]) &&
    /**
     * compare parameter flags
     */
    __a["flags"].length === __b["flags"].length &&
    Array.from(__a["flags"]).every((__originalItem1, __index1) =>
      typeof __originalItem1 === "undefined"
        ? false
        : ((__item1) =>
            typeof __item1 === "undefined"
              ? false
              : compareFieldTypeModelReferenceFlagTrait(
                  __originalItem1,
                  __item1
                ))(Array.from(__b["flags"])[__index1])
    )
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
  if (typeof changes["flags"] !== "undefined") {
    if (
      !(
        changes["flags"].length === value["flags"].length &&
        Array.from(changes["flags"]).every((__originalItem2, __index2) =>
          typeof __originalItem2 === "undefined"
            ? false
            : ((__item2) =>
                typeof __item2 === "undefined"
                  ? false
                  : compareFieldTypeModelReferenceFlagTrait(
                      __originalItem2,
                      __item2
                    ))(Array.from(value["flags"])[__index2])
        )
      )
    ) {
      value = FieldTypeModelReference({
        ...value,
        flags: changes["flags"]
      });
    }
  }
  return value;
}
