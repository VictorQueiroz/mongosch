import { ISerializer } from "./__types__";
import { IDeserializer } from "./__types__";
export type Event = Readonly<EventOnCreate> | Readonly<EventOnUpdate>;
export function isEventTrait(value: unknown): value is Event {
  if (isEventOnCreate(value)) return true;
  if (isEventOnUpdate(value)) return true;
  return false;
}
export function encodeEventTrait(__s: ISerializer, value: Event) {
  switch (value._name) {
    case "event.EventOnCreate":
      return encodeEventOnCreate(__s, value);
    case "event.EventOnUpdate":
      return encodeEventOnUpdate(__s, value);
  }
  throw new Error(
    `Failed to encode: Received invalid value on "_name" property. We got "${value["_name"]}" value, but this function was expecting to receive one of the following:\n\t- event.EventOnCreate\n\t- event.EventOnUpdate\n\n\nPossible cause is that maybe this type simply does not extend this trait, and somehow the type-checking prevented you from calling this function wrongly.`
  );
}
export function decodeEventTrait(__d: IDeserializer) {
  const __id = __d.readInt32();
  __d.rewind(4);
  let value: EventOnCreate | EventOnUpdate;
  switch (__id) {
    case 852781737: {
      const tmp = decodeEventOnCreate(__d);
      if (tmp === null) return null;
      value = tmp;
      break;
    }
    case 157048219: {
      const tmp = decodeEventOnUpdate(__d);
      if (tmp === null) return null;
      value = tmp;
      break;
    }
    default:
      return null;
  }
  return value;
}
export function defaultEventTrait() {
  return defaultEventOnCreate();
}
export function compareEventTrait(__a: Event, __b: Event) {
  switch (__a._name) {
    case "event.EventOnCreate":
      if (__b._name !== "event.EventOnCreate") return false;
      return compareEventOnCreate(__a, __b);
    case "event.EventOnUpdate":
      if (__b._name !== "event.EventOnUpdate") return false;
      return compareEventOnUpdate(__a, __b);
  }
}
export interface EventOnCreate {
  _name: "event.EventOnCreate";
}
export function isEventOnCreate(value: unknown): value is EventOnCreate {
  if (
    !(
      typeof value === "object" &&
      value !== null &&
      "_name" in value &&
      typeof value["_name"] === "string" &&
      value["_name"] === "event.EventOnCreate"
    )
  )
    return false;
  return true;
}
export interface EventOnCreateInputParams {}
export function EventOnCreate(_: EventOnCreateInputParams = {}): EventOnCreate {
  return {
    _name: "event.EventOnCreate"
  };
}
export function encodeEventOnCreate(__s: ISerializer, _: EventOnCreate) {
  __s.writeInt32(852781737);
}
export function decodeEventOnCreate(__d: IDeserializer): EventOnCreate | null {
  const __id = __d.readInt32();
  /**
   * decode header
   */
  if (__id !== 852781737) return null;
  return {
    _name: "event.EventOnCreate"
  };
}
export function defaultEventOnCreate(
  params: Partial<EventOnCreateInputParams> = {}
): EventOnCreate {
  return EventOnCreate({
    ...params
  });
}
export function compareEventOnCreate(
  __a: EventOnCreate,
  __b: EventOnCreate
): boolean {
  return true;
}
export function updateEventOnCreate(
  value: EventOnCreate,
  _: Partial<EventOnCreateInputParams>
) {
  return value;
}
export interface EventOnUpdate {
  _name: "event.EventOnUpdate";
}
export function isEventOnUpdate(value: unknown): value is EventOnUpdate {
  if (
    !(
      typeof value === "object" &&
      value !== null &&
      "_name" in value &&
      typeof value["_name"] === "string" &&
      value["_name"] === "event.EventOnUpdate"
    )
  )
    return false;
  return true;
}
export interface EventOnUpdateInputParams {}
export function EventOnUpdate(_: EventOnUpdateInputParams = {}): EventOnUpdate {
  return {
    _name: "event.EventOnUpdate"
  };
}
export function encodeEventOnUpdate(__s: ISerializer, _: EventOnUpdate) {
  __s.writeInt32(157048219);
}
export function decodeEventOnUpdate(__d: IDeserializer): EventOnUpdate | null {
  const __id = __d.readInt32();
  /**
   * decode header
   */
  if (__id !== 157048219) return null;
  return {
    _name: "event.EventOnUpdate"
  };
}
export function defaultEventOnUpdate(
  params: Partial<EventOnUpdateInputParams> = {}
): EventOnUpdate {
  return EventOnUpdate({
    ...params
  });
}
export function compareEventOnUpdate(
  __a: EventOnUpdate,
  __b: EventOnUpdate
): boolean {
  return true;
}
export function updateEventOnUpdate(
  value: EventOnUpdate,
  _: Partial<EventOnUpdateInputParams>
) {
  return value;
}
