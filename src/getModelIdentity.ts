import { Model, ModelIdentity } from "./schema/Model";

export default function getModelIdentity(
  value: Readonly<ModelIdentity> | Readonly<Model>
) {
  switch (value._name) {
    case "model.ModelIdentity":
      return value;
    case "model.Model":
      return getModelIdentity(value.identity);
  }
}
