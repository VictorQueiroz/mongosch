import { Event } from "./Event";
import { ISerializer } from "./__types__";
import { IDeserializer } from "./__types__";
import { isEventTrait } from "./Event";
import { encodeEventTrait } from "./Event";
import { decodeEventTrait } from "./Event";
import { defaultEventTrait } from "./Event";
import { compareEventTrait } from "./Event";
export type FieldTypeDateFlag =
  | Readonly<FieldTypeDateFlagFuture>
  | Readonly<FieldTypeDateFlagPast>
  | Readonly<FieldTypeDateFlagDefaultValueCurrentDate>
  | Readonly<FieldTypeDateFlagUpdateOnEvent>;
export function isFieldTypeDateFlagTrait(
  value: unknown
): value is FieldTypeDateFlag {
  if (isFieldTypeDateFlagFuture(value)) return true;
  if (isFieldTypeDateFlagPast(value)) return true;
  if (isFieldTypeDateFlagDefaultValueCurrentDate(value)) return true;
  if (isFieldTypeDateFlagUpdateOnEvent(value)) return true;
  return false;
}
export function encodeFieldTypeDateFlagTrait(
  __s: ISerializer,
  value: FieldTypeDateFlag
) {
  switch (value._name) {
    case "fieldTypeDate.FieldTypeDateFlagFuture":
      return encodeFieldTypeDateFlagFuture(__s, value);
    case "fieldTypeDate.FieldTypeDateFlagPast":
      return encodeFieldTypeDateFlagPast(__s, value);
    case "fieldTypeDate.FieldTypeDateFlagDefaultValueCurrentDate":
      return encodeFieldTypeDateFlagDefaultValueCurrentDate(__s, value);
    case "fieldTypeDate.FieldTypeDateFlagUpdateOnEvent":
      return encodeFieldTypeDateFlagUpdateOnEvent(__s, value);
  }
  throw new Error(
    `Failed to encode: Received invalid value on "_name" property. We got "${value["_name"]}" value, but this function was expecting to receive one of the following:\n\t- fieldTypeDate.FieldTypeDateFlagFuture\n\t- fieldTypeDate.FieldTypeDateFlagPast\n\t- fieldTypeDate.FieldTypeDateFlagDefaultValueCurrentDate\n\t- fieldTypeDate.FieldTypeDateFlagUpdateOnEvent\n\n\nPossible cause is that maybe this type simply does not extend this trait, and somehow the type-checking prevented you from calling this function wrongly.`
  );
}
export function decodeFieldTypeDateFlagTrait(__d: IDeserializer) {
  const __id = __d.readInt32();
  __d.rewind(4);
  let value:
    | FieldTypeDateFlagFuture
    | FieldTypeDateFlagPast
    | FieldTypeDateFlagDefaultValueCurrentDate
    | FieldTypeDateFlagUpdateOnEvent;
  switch (__id) {
    case -1345777696: {
      const tmp = decodeFieldTypeDateFlagFuture(__d);
      if (tmp === null) return null;
      value = tmp;
      break;
    }
    case -1190157343: {
      const tmp = decodeFieldTypeDateFlagPast(__d);
      if (tmp === null) return null;
      value = tmp;
      break;
    }
    case 210004158: {
      const tmp = decodeFieldTypeDateFlagDefaultValueCurrentDate(__d);
      if (tmp === null) return null;
      value = tmp;
      break;
    }
    case -388087272: {
      const tmp = decodeFieldTypeDateFlagUpdateOnEvent(__d);
      if (tmp === null) return null;
      value = tmp;
      break;
    }
    default:
      return null;
  }
  return value;
}
export function defaultFieldTypeDateFlagTrait() {
  return defaultFieldTypeDateFlagFuture();
}
export function compareFieldTypeDateFlagTrait(
  __a: FieldTypeDateFlag,
  __b: FieldTypeDateFlag
) {
  switch (__a._name) {
    case "fieldTypeDate.FieldTypeDateFlagFuture":
      if (__b._name !== "fieldTypeDate.FieldTypeDateFlagFuture") return false;
      return compareFieldTypeDateFlagFuture(__a, __b);
    case "fieldTypeDate.FieldTypeDateFlagPast":
      if (__b._name !== "fieldTypeDate.FieldTypeDateFlagPast") return false;
      return compareFieldTypeDateFlagPast(__a, __b);
    case "fieldTypeDate.FieldTypeDateFlagDefaultValueCurrentDate":
      if (
        __b._name !== "fieldTypeDate.FieldTypeDateFlagDefaultValueCurrentDate"
      )
        return false;
      return compareFieldTypeDateFlagDefaultValueCurrentDate(__a, __b);
    case "fieldTypeDate.FieldTypeDateFlagUpdateOnEvent":
      if (__b._name !== "fieldTypeDate.FieldTypeDateFlagUpdateOnEvent")
        return false;
      return compareFieldTypeDateFlagUpdateOnEvent(__a, __b);
  }
}
export interface FieldTypeDateFlagFuture {
  _name: "fieldTypeDate.FieldTypeDateFlagFuture";
}
export function isFieldTypeDateFlagFuture(
  value: unknown
): value is FieldTypeDateFlagFuture {
  if (
    !(
      typeof value === "object" &&
      value !== null &&
      "_name" in value &&
      typeof value["_name"] === "string" &&
      value["_name"] === "fieldTypeDate.FieldTypeDateFlagFuture"
    )
  )
    return false;
  return true;
}
export interface FieldTypeDateFlagFutureInputParams {}
export function FieldTypeDateFlagFuture(
  _: FieldTypeDateFlagFutureInputParams = {}
): FieldTypeDateFlagFuture {
  return {
    _name: "fieldTypeDate.FieldTypeDateFlagFuture"
  };
}
export function encodeFieldTypeDateFlagFuture(
  __s: ISerializer,
  _: FieldTypeDateFlagFuture
) {
  __s.writeInt32(-1345777696);
}
export function decodeFieldTypeDateFlagFuture(
  __d: IDeserializer
): FieldTypeDateFlagFuture | null {
  const __id = __d.readInt32();
  /**
   * decode header
   */
  if (__id !== -1345777696) return null;
  return {
    _name: "fieldTypeDate.FieldTypeDateFlagFuture"
  };
}
export function defaultFieldTypeDateFlagFuture(
  params: Partial<FieldTypeDateFlagFutureInputParams> = {}
): FieldTypeDateFlagFuture {
  return FieldTypeDateFlagFuture({
    ...params
  });
}
export function compareFieldTypeDateFlagFuture(
  __a: FieldTypeDateFlagFuture,
  __b: FieldTypeDateFlagFuture
): boolean {
  return true;
}
export function updateFieldTypeDateFlagFuture(
  value: FieldTypeDateFlagFuture,
  _: Partial<FieldTypeDateFlagFutureInputParams>
) {
  return value;
}
export interface FieldTypeDateFlagPast {
  _name: "fieldTypeDate.FieldTypeDateFlagPast";
}
export function isFieldTypeDateFlagPast(
  value: unknown
): value is FieldTypeDateFlagPast {
  if (
    !(
      typeof value === "object" &&
      value !== null &&
      "_name" in value &&
      typeof value["_name"] === "string" &&
      value["_name"] === "fieldTypeDate.FieldTypeDateFlagPast"
    )
  )
    return false;
  return true;
}
export interface FieldTypeDateFlagPastInputParams {}
export function FieldTypeDateFlagPast(
  _: FieldTypeDateFlagPastInputParams = {}
): FieldTypeDateFlagPast {
  return {
    _name: "fieldTypeDate.FieldTypeDateFlagPast"
  };
}
export function encodeFieldTypeDateFlagPast(
  __s: ISerializer,
  _: FieldTypeDateFlagPast
) {
  __s.writeInt32(-1190157343);
}
export function decodeFieldTypeDateFlagPast(
  __d: IDeserializer
): FieldTypeDateFlagPast | null {
  const __id = __d.readInt32();
  /**
   * decode header
   */
  if (__id !== -1190157343) return null;
  return {
    _name: "fieldTypeDate.FieldTypeDateFlagPast"
  };
}
export function defaultFieldTypeDateFlagPast(
  params: Partial<FieldTypeDateFlagPastInputParams> = {}
): FieldTypeDateFlagPast {
  return FieldTypeDateFlagPast({
    ...params
  });
}
export function compareFieldTypeDateFlagPast(
  __a: FieldTypeDateFlagPast,
  __b: FieldTypeDateFlagPast
): boolean {
  return true;
}
export function updateFieldTypeDateFlagPast(
  value: FieldTypeDateFlagPast,
  _: Partial<FieldTypeDateFlagPastInputParams>
) {
  return value;
}
export interface FieldTypeDateFlagDefaultValueCurrentDate {
  _name: "fieldTypeDate.FieldTypeDateFlagDefaultValueCurrentDate";
}
export function isFieldTypeDateFlagDefaultValueCurrentDate(
  value: unknown
): value is FieldTypeDateFlagDefaultValueCurrentDate {
  if (
    !(
      typeof value === "object" &&
      value !== null &&
      "_name" in value &&
      typeof value["_name"] === "string" &&
      value["_name"] ===
        "fieldTypeDate.FieldTypeDateFlagDefaultValueCurrentDate"
    )
  )
    return false;
  return true;
}
export interface FieldTypeDateFlagDefaultValueCurrentDateInputParams {}
export function FieldTypeDateFlagDefaultValueCurrentDate(
  _: FieldTypeDateFlagDefaultValueCurrentDateInputParams = {}
): FieldTypeDateFlagDefaultValueCurrentDate {
  return {
    _name: "fieldTypeDate.FieldTypeDateFlagDefaultValueCurrentDate"
  };
}
export function encodeFieldTypeDateFlagDefaultValueCurrentDate(
  __s: ISerializer,
  _: FieldTypeDateFlagDefaultValueCurrentDate
) {
  __s.writeInt32(210004158);
}
export function decodeFieldTypeDateFlagDefaultValueCurrentDate(
  __d: IDeserializer
): FieldTypeDateFlagDefaultValueCurrentDate | null {
  const __id = __d.readInt32();
  /**
   * decode header
   */
  if (__id !== 210004158) return null;
  return {
    _name: "fieldTypeDate.FieldTypeDateFlagDefaultValueCurrentDate"
  };
}
export function defaultFieldTypeDateFlagDefaultValueCurrentDate(
  params: Partial<FieldTypeDateFlagDefaultValueCurrentDateInputParams> = {}
): FieldTypeDateFlagDefaultValueCurrentDate {
  return FieldTypeDateFlagDefaultValueCurrentDate({
    ...params
  });
}
export function compareFieldTypeDateFlagDefaultValueCurrentDate(
  __a: FieldTypeDateFlagDefaultValueCurrentDate,
  __b: FieldTypeDateFlagDefaultValueCurrentDate
): boolean {
  return true;
}
export function updateFieldTypeDateFlagDefaultValueCurrentDate(
  value: FieldTypeDateFlagDefaultValueCurrentDate,
  _: Partial<FieldTypeDateFlagDefaultValueCurrentDateInputParams>
) {
  return value;
}
export interface FieldTypeDateFlagUpdateOnEvent {
  _name: "fieldTypeDate.FieldTypeDateFlagUpdateOnEvent";
  event: Readonly<Event>;
}
export function isFieldTypeDateFlagUpdateOnEvent(
  value: unknown
): value is FieldTypeDateFlagUpdateOnEvent {
  if (
    !(
      typeof value === "object" &&
      value !== null &&
      "_name" in value &&
      typeof value["_name"] === "string" &&
      value["_name"] === "fieldTypeDate.FieldTypeDateFlagUpdateOnEvent"
    )
  )
    return false;
  if (!("event" in value && ((__v0) => isEventTrait(__v0))(value["event"])))
    return false;
  return true;
}
export interface FieldTypeDateFlagUpdateOnEventInputParams {
  event: Readonly<Event>;
}
export function FieldTypeDateFlagUpdateOnEvent(
  params: FieldTypeDateFlagUpdateOnEventInputParams
): FieldTypeDateFlagUpdateOnEvent {
  return {
    _name: "fieldTypeDate.FieldTypeDateFlagUpdateOnEvent",
    event: params["event"]
  };
}
export function encodeFieldTypeDateFlagUpdateOnEvent(
  __s: ISerializer,
  value: FieldTypeDateFlagUpdateOnEvent
) {
  __s.writeInt32(-388087272);
  /**
   * encoding param: event
   */
  const __pv0 = value["event"];
  encodeEventTrait(__s, __pv0);
}
export function decodeFieldTypeDateFlagUpdateOnEvent(
  __d: IDeserializer
): FieldTypeDateFlagUpdateOnEvent | null {
  const __id = __d.readInt32();
  /**
   * decode header
   */
  if (__id !== -388087272) return null;
  let event: Event;
  /**
   * decoding param: event
   */
  const tmp2 = decodeEventTrait(__d);
  if (tmp2 === null) return null;
  event = tmp2;
  return {
    _name: "fieldTypeDate.FieldTypeDateFlagUpdateOnEvent",
    event
  };
}
export function defaultFieldTypeDateFlagUpdateOnEvent(
  params: Partial<FieldTypeDateFlagUpdateOnEventInputParams> = {}
): FieldTypeDateFlagUpdateOnEvent {
  return FieldTypeDateFlagUpdateOnEvent({
    event: defaultEventTrait(),
    ...params
  });
}
export function compareFieldTypeDateFlagUpdateOnEvent(
  __a: FieldTypeDateFlagUpdateOnEvent,
  __b: FieldTypeDateFlagUpdateOnEvent
): boolean {
  return (
    /**
     * compare parameter event
     */
    compareEventTrait(__a["event"], __b["event"])
  );
}
export function updateFieldTypeDateFlagUpdateOnEvent(
  value: FieldTypeDateFlagUpdateOnEvent,
  changes: Partial<FieldTypeDateFlagUpdateOnEventInputParams>
) {
  if (typeof changes["event"] !== "undefined") {
    if (!compareEventTrait(changes["event"], value["event"])) {
      value = FieldTypeDateFlagUpdateOnEvent({
        ...value,
        event: changes["event"]
      });
    }
  }
  return value;
}
export interface FieldTypeDate {
  _name: "fieldTypeDate.FieldTypeDate";
  flags: ReadonlyArray<Readonly<FieldTypeDateFlag>>;
}
export function isFieldTypeDate(value: unknown): value is FieldTypeDate {
  if (
    !(
      typeof value === "object" &&
      value !== null &&
      "_name" in value &&
      typeof value["_name"] === "string" &&
      value["_name"] === "fieldTypeDate.FieldTypeDate"
    )
  )
    return false;
  if (
    !(
      "flags" in value &&
      ((__v0) =>
        (Array.isArray(__v0) || __v0 instanceof Set) &&
        Array.from(__v0).every((p) => isFieldTypeDateFlagTrait(p)))(
        value["flags"]
      )
    )
  )
    return false;
  return true;
}
export interface FieldTypeDateInputParams {
  flags: ReadonlyArray<Readonly<FieldTypeDateFlag>>;
}
export function FieldTypeDate(params: FieldTypeDateInputParams): FieldTypeDate {
  return {
    _name: "fieldTypeDate.FieldTypeDate",
    flags: params["flags"]
  };
}
export function encodeFieldTypeDate(__s: ISerializer, value: FieldTypeDate) {
  __s.writeInt32(-367427752);
  /**
   * encoding param: flags
   */
  const __pv0 = value["flags"];
  const __l1 = __pv0.length;
  __s.writeUint32(__l1);
  for (const __item1 of __pv0) {
    encodeFieldTypeDateFlagTrait(__s, __item1);
  }
}
export function decodeFieldTypeDate(__d: IDeserializer): FieldTypeDate | null {
  const __id = __d.readInt32();
  /**
   * decode header
   */
  if (__id !== -367427752) return null;
  let flags: Array<FieldTypeDateFlag>;
  /**
   * decoding param: flags
   */
  const __l1 = __d.readUint32();
  const __o1 = new Array<FieldTypeDateFlag>(__l1);
  flags = __o1;
  for (let __i1 = 0; __i1 < __l1; __i1++) {
    const __tmp2 = decodeFieldTypeDateFlagTrait(__d);
    if (__tmp2 === null) return null;
    __o1[__i1] = __tmp2;
  }
  return {
    _name: "fieldTypeDate.FieldTypeDate",
    flags
  };
}
export function defaultFieldTypeDate(
  params: Partial<FieldTypeDateInputParams> = {}
): FieldTypeDate {
  return FieldTypeDate({
    flags: [],
    ...params
  });
}
export function compareFieldTypeDate(
  __a: FieldTypeDate,
  __b: FieldTypeDate
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
              : compareFieldTypeDateFlagTrait(__originalItem0, __item0))(
            Array.from(__b["flags"])[__index0]
          )
    )
  );
}
export function updateFieldTypeDate(
  value: FieldTypeDate,
  changes: Partial<FieldTypeDateInputParams>
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
                  : compareFieldTypeDateFlagTrait(__originalItem1, __item1))(
                Array.from(value["flags"])[__index1]
              )
        )
      )
    ) {
      value = FieldTypeDate({
        ...value,
        flags: changes["flags"]
      });
    }
  }
  return value;
}
