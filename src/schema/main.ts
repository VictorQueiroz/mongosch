import { ISerializer } from "./__types__";
import { IDeserializer } from "./__types__";
export type Event = Readonly<EventUpdated> | Readonly<EventCreated>;
export function isEventTrait(value: unknown): value is Event {
  if (isEventUpdated(value)) return true;
  if (isEventCreated(value)) return true;
  return false;
}
export function encodeEventTrait(__s: ISerializer, value: Event) {
  switch (value._name) {
    case "main.EventUpdated":
      return encodeEventUpdated(__s, value);
    case "main.EventCreated":
      return encodeEventCreated(__s, value);
  }
  throw new Error(
    `Failed to encode: Received invalid value on "_name" property. We got "${value["_name"]}" value, but this function was expecting to receive one of the following:\n\t- main.EventUpdated\n\t- main.EventCreated\n\n\nPossible cause is that maybe this type simply does not extend this trait, and somehow the type-checking prevented you from calling this function wrongly.`
  );
}
export function decodeEventTrait(__d: IDeserializer) {
  const __id = __d.readInt32();
  __d.rewind(4);
  let value: EventUpdated | EventCreated;
  switch (__id) {
    case 1828116018: {
      const tmp = decodeEventUpdated(__d);
      if (tmp === null) return null;
      value = tmp;
      break;
    }
    case -1541795963: {
      const tmp = decodeEventCreated(__d);
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
  return defaultEventUpdated();
}
export function compareEventTrait(__a: Event, __b: Event) {
  switch (__a._name) {
    case "main.EventUpdated":
      if (__b._name !== "main.EventUpdated") return false;
      return compareEventUpdated(__a, __b);
    case "main.EventCreated":
      if (__b._name !== "main.EventCreated") return false;
      return compareEventCreated(__a, __b);
  }
}
export interface EventUpdated {
  _name: "main.EventUpdated";
}
export function isEventUpdated(value: unknown): value is EventUpdated {
  if (
    !(
      typeof value === "object" &&
      value !== null &&
      "_name" in value &&
      typeof value["_name"] === "string" &&
      value["_name"] === "main.EventUpdated"
    )
  )
    return false;
  return true;
}
export interface EventUpdatedInputParams {}
export function EventUpdated(_: EventUpdatedInputParams = {}): EventUpdated {
  return {
    _name: "main.EventUpdated"
  };
}
export function encodeEventUpdated(__s: ISerializer, _: EventUpdated) {
  __s.writeInt32(1828116018);
}
export function decodeEventUpdated(__d: IDeserializer): EventUpdated | null {
  const __id = __d.readInt32();
  /**
   * decode header
   */
  if (__id !== 1828116018) return null;
  return {
    _name: "main.EventUpdated"
  };
}
export function defaultEventUpdated(
  params: Partial<EventUpdatedInputParams> = {}
): EventUpdated {
  return EventUpdated({
    ...params
  });
}
export function compareEventUpdated(
  __a: EventUpdated,
  __b: EventUpdated
): boolean {
  return true;
}
export function updateEventUpdated(
  value: EventUpdated,
  _: Partial<EventUpdatedInputParams>
) {
  return value;
}
export interface EventCreated {
  _name: "main.EventCreated";
}
export function isEventCreated(value: unknown): value is EventCreated {
  if (
    !(
      typeof value === "object" &&
      value !== null &&
      "_name" in value &&
      typeof value["_name"] === "string" &&
      value["_name"] === "main.EventCreated"
    )
  )
    return false;
  return true;
}
export interface EventCreatedInputParams {}
export function EventCreated(_: EventCreatedInputParams = {}): EventCreated {
  return {
    _name: "main.EventCreated"
  };
}
export function encodeEventCreated(__s: ISerializer, _: EventCreated) {
  __s.writeInt32(-1541795963);
}
export function decodeEventCreated(__d: IDeserializer): EventCreated | null {
  const __id = __d.readInt32();
  /**
   * decode header
   */
  if (__id !== -1541795963) return null;
  return {
    _name: "main.EventCreated"
  };
}
export function defaultEventCreated(
  params: Partial<EventCreatedInputParams> = {}
): EventCreated {
  return EventCreated({
    ...params
  });
}
export function compareEventCreated(
  __a: EventCreated,
  __b: EventCreated
): boolean {
  return true;
}
export function updateEventCreated(
  value: EventCreated,
  _: Partial<EventCreatedInputParams>
) {
  return value;
}
