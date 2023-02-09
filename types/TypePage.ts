import * as Contentful from "contentful";

export interface TypePageFields {
    title: Contentful.EntryFields.Symbol;
    slug: Contentful.EntryFields.Symbol;
}

export type TypePage = Contentful.Entry<TypePageFields>;
