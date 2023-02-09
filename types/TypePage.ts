import * as Contentful from "contentful";
import { TypeHeadingFields } from "./TypeHeading";
import { TypeParagraphFields } from "./TypeParagraph";

export interface TypePageFields {
    title: Contentful.EntryFields.Symbol;
    slug: Contentful.EntryFields.Symbol;
    sections?: Contentful.Entry<TypeHeadingFields | TypeParagraphFields>[];
}

export type TypePage = Contentful.Entry<TypePageFields>;
