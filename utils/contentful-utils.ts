import { createClient, Entry } from 'contentful';
import { TypePage, TypePageFields } from '@/types';
import { IS_DEV, PAGE_CONTENT_TYPE } from '@utils/constants';

const client = createClient({
    accessToken: IS_DEV ? process.env.CONTENTFUL_PREVIEW_TOKEN! : process.env.CONTENTFUL_DELIVERY_TOKEN!,
    space: process.env.CONTENTFUL_SPACE_ID!,
    host: IS_DEV ? 'preview.contentful.com' : 'cdn.contentful.com'
});

/**
 * Return an array of raw pages from Contentful.
 */
export async function getPages(): Promise<TypePage[]> {
    const entries = await client.getEntries<TypePageFields>({ content_type: PAGE_CONTENT_TYPE, include: 10 });
    return entries.items;
}

/**
 * Finds the entry in Contentful from a slug string provided by getStaticPaths()
 *
 * @param slug String used to match the path in contentful
 * @returns An entry, if it could be found
 */
export async function getPageBySlug(slug: string): Promise<TypePage | undefined> {
    const pages = await getPages();
    return pages.find((page) => page.fields.slug === slug);
}

/**
 * Resolves field values for a Contentful object, including nested references.
 *
 * @param entry Entry object from Contentful
 * @returns An object of resolved values for the entry
 */
export function resolveFields(entry: any): { _id: string; _type: string; fields: { [key: string]: any } } | null {
    return {
        _id: entry.sys?.id,
        _type: entry.sys?.contentType?.sys.id || entry.sys?.type,
        fields: Object.entries(entry.fields).reduce((acc: any, [key, value]) => {
            acc[key] = parseField(value);
            return acc;
        }, {})
    };
}

/**
 * Resolves a value for a field in an entry.
 *
 * @param value Value stored for a particular field in a Contentful object
 * @returns Resolved values for the field
 */
function parseField(value: any) {
    // Individual reference value
    if (typeof value === 'object' && value.sys) return resolveFields(value);
    // Array of references
    if (Array.isArray(value)) return value.map(resolveFields);
    // Everything else passes through.
    return value;
}
