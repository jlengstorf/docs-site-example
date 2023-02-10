import * as Contentful from './contentful';

export { Contentful };

type MetaFields = {
    _id: string;
};

export type Section<Fields, TypeValue> = Fields & MetaFields & { _type: TypeValue };

export type Heading = Section<Contentful.TypeHeadingFields, 'heading'>;
export type Paragraph = Section<Contentful.TypeParagraphFields, 'paragraph'>;

export type Page = Omit<Contentful.TypePageFields, 'sections'> & MetaFields & { _type: 'page'; sections?: Array<Heading | Paragraph> };
