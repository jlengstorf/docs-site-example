import * as Contentful from './contentful';

export { Contentful };

type MetaFields = {
    _id: string;
};

export type SectionType = 'callout' | 'codeBlock' | 'heading' | 'image' | 'list' | 'paragraph';
export type ComposableSection = Callout | CodeBlock | Heading | Image | List | Paragraph;

export type Section<Fields, TypeValue extends SectionType> = Fields & MetaFields & { _type: TypeValue };

export type Callout = Section<Contentful.TypeCalloutFields, 'callout'>;
export type CodeBlock = Section<Contentful.TypeCodeBlockFields, 'codeBlock'>;
export type Heading = Section<Contentful.TypeHeadingFields, 'heading'>;
export type Image = Section<Contentful.TypeImageFields, 'image'>;
export type List = Section<Contentful.TypeListFields, 'list'>;
export type Paragraph = Section<Contentful.TypeParagraphFields, 'paragraph'>;

export type Page = Omit<Contentful.TypePageFields, 'sections'> & MetaFields & { _type: 'page'; sections?: ComposableSection[] };
