import * as ContentfulTypes from 'contentful';
import * as Contentful from './contentful';

export { Contentful };

// ---------------------------------------- | Meta Fields

type MetaFields = {
    _id: string;
};

// ---------------------------------------- | Global Objects

export type SiteConfig = Omit<Contentful.TypeSiteConfigFields, 'mainNavigation'> & MetaFields & { mainNavigation: NavLink[] };

export type NavLink = Omit<Contentful.TypeNavLinkFields, 'page' | 'children'> & MetaFields & { page: Page; children?: NavLink[] };

// ---------------------------------------- | Sections

export type SectionType = 'callout' | 'codeBlock' | 'heading' | 'image' | 'list' | 'paragraph';
export type ComposableSection = Callout | CodeBlock | Heading | Image | List | Paragraph;

export type Section<Fields, TypeValue extends SectionType> = Fields & MetaFields & { _type: TypeValue };

export type Callout = Section<Contentful.TypeCalloutFields, 'callout'>;
export type CodeBlock = Section<Contentful.TypeCodeBlockFields, 'codeBlock'> & { code: { html: string; language: 'js' | 'ts' | 'txt' } };
export type Heading = Section<Contentful.TypeHeadingFields, 'heading'>;
export type Image = Omit<Section<Contentful.TypeImageFields, 'image'>, 'image'> & { image: ContentfulTypes.Asset['fields'] };
export type List = Omit<Section<Contentful.TypeListFields, 'list'>, 'items'> & { items: Array<Paragraph> };
export type Paragraph = Section<Contentful.TypeParagraphFields, 'paragraph'>;

// ---------------------------------------- | Pages

export type Page = Omit<Contentful.TypePageFields, 'sections'> & MetaFields & { _type: 'page'; sections?: ComposableSection[] };
