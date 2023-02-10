import { createClient } from 'contentful';
import { unified } from 'unified';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';

import { Contentful, SectionType } from '@/types';
import { IS_DEV, PAGE_CONTENT_TYPE } from '@/utils/constants';

const client = createClient({
    accessToken: IS_DEV ? process.env.CONTENTFUL_PREVIEW_TOKEN! : process.env.CONTENTFUL_DELIVERY_TOKEN!,
    space: process.env.CONTENTFUL_SPACE_ID!,
    host: IS_DEV ? 'preview.contentful.com' : 'cdn.contentful.com'
});

/**
 * Return an array of raw pages from Contentful.
 */
export async function getPages(): Promise<Contentful.TypePage[]> {
    const entries = await client.getEntries<Contentful.TypePageFields>({ content_type: PAGE_CONTENT_TYPE, include: 10 });
    return entries.items;
}

/**
 * Finds the entry in Contentful from a slug string provided by getStaticPaths()
 *
 * @param slug String used to match the path in contentful
 * @returns An entry, if it could be found
 */
export async function getPageBySlug(slug: string): Promise<Contentful.TypePage | undefined> {
    const pages = await getPages();
    return pages.find((page) => page.fields.slug === slug);
}

// ---------------------------------------- | Field Resolvers

const markdownFieldMap: { [K in SectionType]?: string[] } = {
    paragraph: ['body']
};

/**
 * Resolves field values for a Contentful object, including nested references.
 *
 * @param entry Entry object from Contentful
 * @returns An object of resolved values for the entry
 */
export async function resolveFields(entry: any): Promise<any> {
    // Meta attributes
    const _id = entry.sys?.id;
    const _type = entry.sys?.contentType?.sys.id || entry.sys?.type;
    // Process fields
    let fields: { [key: string]: any } = {};
    for (const [key, value] of Object.entries(entry.fields)) {
        const processedValue = await parseField(value, _type, key);
        fields[key] = processedValue;
    }

    return { ...fields, _id, _type };
}

/**
 * Resolves a value for a field in an entry.
 *
 * @param value Value stored for a particular field in a Contentful object
 * @returns Resolved values for the field
 */
async function parseField(value: any, contentType: SectionType, fieldName: string) {
    // Individual reference value
    if (typeof value === 'object' && value.sys) {
        return await resolveFields(value);
    }
    // Array of references
    if (Array.isArray(value)) {
        let result = [];
        for (const item of value) result.push(await resolveFields(item));
        return result;
    }
    // Process markdown
    if ((markdownFieldMap[contentType] || []).includes(fieldName)) {
        return await parseMarkdown(value);
    }
    // Everything else passes through.
    return value;
}

async function parseMarkdown(rawMarkdown: string): Promise<string> {
    const output = await unified().use(remarkParse).use(remarkRehype).use(rehypeSanitize).use(rehypeStringify).process(rawMarkdown);
    return String(output);
}
