import { Field } from "./Field";
import { ISerializer } from "./__types__";
import { IDeserializer } from "./__types__";
import { isField } from "./Field";
import { encodeField } from "./Field";
import { decodeField } from "./Field";
import { compareField } from "./Field";
export interface ModelIdentity {
  _name: "model.ModelIdentity";
  className: string;
  collectionName: string;
}
export function isModelIdentity(value: unknown): value is ModelIdentity {
  if (
    !(
      typeof value === "object" &&
      value !== null &&
      "_name" in value &&
      typeof value["_name"] === "string" &&
      value["_name"] === "model.ModelIdentity"
    )
  )
    return false;
  if (
    !(
      "className" in value &&
      ((__v0) => typeof __v0 === "string")(value["className"])
    )
  )
    return false;
  if (
    !(
      "collectionName" in value &&
      ((__v1) => typeof __v1 === "string")(value["collectionName"])
    )
  )
    return false;
  return true;
}
export interface ModelIdentityInputParams {
  className: string;
  collectionName: string;
}
export function ModelIdentity(params: ModelIdentityInputParams): ModelIdentity {
  return {
    _name: "model.ModelIdentity",
    className: params["className"],
    collectionName: params["collectionName"]
  };
}
export function encodeModelIdentity(__s: ISerializer, value: ModelIdentity) {
  __s.writeInt32(253500267);
  /**
   * encoding param: className
   */
  const __pv0 = value["className"];
  __s.writeString(__pv0);
  /**
   * encoding param: collectionName
   */
  const __pv1 = value["collectionName"];
  __s.writeString(__pv1);
}
export function decodeModelIdentity(__d: IDeserializer): ModelIdentity | null {
  const __id = __d.readInt32();
  /**
   * decode header
   */
  if (__id !== 253500267) return null;
  let className: string;
  let collectionName: string;
  /**
   * decoding param: className
   */
  className = __d.readString();
  /**
   * decoding param: collectionName
   */
  collectionName = __d.readString();
  return {
    _name: "model.ModelIdentity",
    className,
    collectionName
  };
}
export function defaultModelIdentity(
  params: Partial<ModelIdentityInputParams> = {}
): ModelIdentity {
  return ModelIdentity({
    className: "",
    collectionName: "",
    ...params
  });
}
export function compareModelIdentity(
  __a: ModelIdentity,
  __b: ModelIdentity
): boolean {
  return (
    /**
     * compare parameter className
     */
    __a["className"] === __b["className"] &&
    /**
     * compare parameter collectionName
     */
    __a["collectionName"] === __b["collectionName"]
  );
}
export function updateModelIdentity(
  value: ModelIdentity,
  changes: Partial<ModelIdentityInputParams>
) {
  if (typeof changes["className"] !== "undefined") {
    if (!(changes["className"] === value["className"])) {
      value = ModelIdentity({
        ...value,
        className: changes["className"]
      });
    }
  }
  if (typeof changes["collectionName"] !== "undefined") {
    if (!(changes["collectionName"] === value["collectionName"])) {
      value = ModelIdentity({
        ...value,
        collectionName: changes["collectionName"]
      });
    }
  }
  return value;
}
export interface Model {
  _name: "model.Model";
  identity: Readonly<ModelIdentity>;
  fields: ReadonlyArray<Readonly<Field>>;
}
export function isModel(value: unknown): value is Model {
  if (
    !(
      typeof value === "object" &&
      value !== null &&
      "_name" in value &&
      typeof value["_name"] === "string" &&
      value["_name"] === "model.Model"
    )
  )
    return false;
  if (
    !(
      "identity" in value &&
      ((__v0) => isModelIdentity(__v0))(value["identity"])
    )
  )
    return false;
  if (
    !(
      "fields" in value &&
      ((__v1) =>
        (Array.isArray(__v1) || __v1 instanceof Set) &&
        Array.from(__v1).every((p) => isField(p)))(value["fields"])
    )
  )
    return false;
  return true;
}
export interface ModelInputParams {
  identity: Readonly<ModelIdentity>;
  fields: ReadonlyArray<Readonly<Field>>;
}
export function Model(params: ModelInputParams): Model {
  return {
    _name: "model.Model",
    identity: params["identity"],
    fields: params["fields"]
  };
}
export function encodeModel(__s: ISerializer, value: Model) {
  __s.writeInt32(983355634);
  /**
   * encoding param: identity
   */
  const __pv0 = value["identity"];
  encodeModelIdentity(__s, __pv0);
  /**
   * encoding param: fields
   */
  const __pv1 = value["fields"];
  const __l2 = __pv1.length;
  __s.writeUint32(__l2);
  for (const __item2 of __pv1) {
    encodeField(__s, __item2);
  }
}
export function decodeModel(__d: IDeserializer): Model | null {
  const __id = __d.readInt32();
  /**
   * decode header
   */
  if (__id !== 983355634) return null;
  let identity: ModelIdentity;
  let fields: Array<Field>;
  /**
   * decoding param: identity
   */
  const __tmp1 = decodeModelIdentity(__d);
  if (__tmp1 === null) return null;
  identity = __tmp1;
  /**
   * decoding param: fields
   */
  const __l2 = __d.readUint32();
  const __o2 = new Array<Field>(__l2);
  fields = __o2;
  for (let __i2 = 0; __i2 < __l2; __i2++) {
    const tmp4 = decodeField(__d);
    if (tmp4 === null) return null;
    __o2[__i2] = tmp4;
  }
  return {
    _name: "model.Model",
    identity,
    fields
  };
}
export function defaultModel(params: Partial<ModelInputParams> = {}): Model {
  return Model({
    identity: defaultModelIdentity(),
    fields: [],
    ...params
  });
}
export function compareModel(__a: Model, __b: Model): boolean {
  return (
    /**
     * compare parameter identity
     */
    compareModelIdentity(__a["identity"], __b["identity"]) &&
    /**
     * compare parameter fields
     */
    __a["fields"].length === __b["fields"].length &&
    Array.from(__a["fields"]).every((__originalItem1, __index1) =>
      typeof __originalItem1 === "undefined"
        ? false
        : ((__item1) =>
            typeof __item1 === "undefined"
              ? false
              : compareField(__originalItem1, __item1))(
            Array.from(__b["fields"])[__index1]
          )
    )
  );
}
export function updateModel(value: Model, changes: Partial<ModelInputParams>) {
  if (typeof changes["identity"] !== "undefined") {
    if (!compareModelIdentity(changes["identity"], value["identity"])) {
      value = Model({
        ...value,
        identity: changes["identity"]
      });
    }
  }
  if (typeof changes["fields"] !== "undefined") {
    if (
      !(
        changes["fields"].length === value["fields"].length &&
        Array.from(changes["fields"]).every((__originalItem2, __index2) =>
          typeof __originalItem2 === "undefined"
            ? false
            : ((__item2) =>
                typeof __item2 === "undefined"
                  ? false
                  : compareField(__originalItem2, __item2))(
                Array.from(value["fields"])[__index2]
              )
        )
      )
    ) {
      value = Model({
        ...value,
        fields: changes["fields"]
      });
    }
  }
  return value;
}
