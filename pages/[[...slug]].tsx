import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';

import { getPageBySlug, getPages, MetaFields, ResolvedPage, resolveFields } from '@utils/contentful-utils';
import { TypePage } from '@/types';
import { getComponent } from '@/utils/component-utils';

export const getStaticPaths: GetStaticPaths = async () => {
    const pages = await getPages();
    const paths = pages.map((page) => page.fields.slug).map((slug) => (slug.startsWith('/') ? slug : `/${slug}`));
    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const urlPath = ([params?.slug] || ['/']).flat().join('/') || '/';
    const pageEntry = await getPageBySlug(urlPath);
    return { props: { page: resolveFields<TypePage>(pageEntry) } };
};

const ComposablePage = ({ page }: { page: ResolvedPage }) => {
    if (!page) return null;

    return (
        <>
            <Head>
                <title>{page.fields.title}</title>
            </Head>

            <main>
                <h1>{page.fields.title}</h1>
            </main>
            <main>
                {page.fields.sections?.map((section, index) => {
                    const type = (section as any)._type as MetaFields['_type'];
                    const Component = getComponent(type);
                    return <Component key={index} {...section.fields} />;
                })}
            </main>
        </>
    );
};

export default ComposablePage;
