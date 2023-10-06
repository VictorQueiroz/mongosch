import { EventOnCreate, EventOnUpdate } from "../src/schema/Event";
import { Field } from "../src/schema/Field";
import {
  FieldTypeDateFlagDefaultValueCurrentDate,
  FieldTypeDateFlagUpdateOnEvent,
  defaultFieldTypeDate
} from "../src/schema/FieldTypeDate";
import { FieldTypeModelReference } from "../src/schema/FieldTypeModelReference";
import { FieldTypeUnion, UnionItem } from "../src/schema/FieldTypeUnion";
import { Model } from "../src/schema/Model";
import { Conditional } from "./Conditional";
import { ContentParagraphBase } from "./ContentParagraph";
import { ContentUserInterfaceBase } from "./ContentUserInterface";

export enum ContentType {
  Paragraph,
  UserInterface
}

export function ContentRef() {
  return FieldTypeUnion({
    name: "Reference",
    items: [
      UnionItem({
        name: "Paragraph",
        id: ContentType.Paragraph,
        fieldType: FieldTypeModelReference({
          model: ContentParagraphBase()
        })
      }),
      UnionItem({
        id: ContentType.UserInterface,
        name: "UI",
        fieldType: FieldTypeModelReference({
          model: ContentUserInterfaceBase()
        })
      })
    ]
  });
}

export default function ContentBase() {
  return Model({
    collectionName: "contents",
    className: "contents",
    fields: [
      Field({
        name: "nextContent",
        description:
          "Next content after the content is fully processed by the client.",
        fieldType: Conditional(ContentRef())
      }),
      Field({
        name: "createdAt",
        description: "Content creation date.",
        fieldType: defaultFieldTypeDate({
          flags: [FieldTypeDateFlagDefaultValueCurrentDate()]
        })
      }),
      Field({
        name: "updatedAt",
        description: "Content creation date.",
        fieldType: defaultFieldTypeDate({
          flags: [
            FieldTypeDateFlagDefaultValueCurrentDate(),
            FieldTypeDateFlagUpdateOnEvent({
              event: EventOnUpdate()
            })
          ]
        })
      })
    ]
  });
}
