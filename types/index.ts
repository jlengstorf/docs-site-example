import * as Contentful from './contentful';

export { Contentful };

type MetaFields = {
    _id: string;
};

export type SectionType = 'heading' | 'paragraph';
export type ComposableSection = Heading | Paragraph;

export type Section<Fields, TypeValue extends SectionType> = Fields & MetaFields & { _type: TypeValue };

export type Heading = Section<Contentful.TypeHeadingFields, 'heading'>;
export type Paragraph = Section<Contentful.TypeParagraphFields, 'paragraph'>;

export type Page = Omit<Contentful.TypePageFields, 'sections'> & MetaFields & { _type: 'page'; sections?: ComposableSection[] };
