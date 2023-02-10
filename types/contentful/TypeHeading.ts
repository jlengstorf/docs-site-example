import * as Contentful from "contentful";

export interface TypeHeadingFields {
    body: Contentful.EntryFields.Symbol;
    level: "1" | "2" | "3" | "4" | "5" | "6";
}

export type TypeHeading = Contentful.Entry<TypeHeadingFields>;
