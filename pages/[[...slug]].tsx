import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';

import { getPageBySlug, getPages, resolveFields } from '@utils/contentful-utils';
import { Page } from '@/types';
import { getComponent } from '@/utils/component-utils';

export const getStaticPaths: GetStaticPaths = async () => {
    const pages = await getPages();
    const paths = pages.map((page) => page.fields.slug).map((slug) => (slug.startsWith('/') ? slug : `/${slug}`));
    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const urlPath = ([params?.slug] || ['/']).flat().join('/') || '/';
    const pageEntry = await getPageBySlug(urlPath);
    const page: Page = resolveFields(pageEntry);
    return { props: { page } };
};

const ComposablePage = ({ page }: { page: Page }) => {
    if (!page) return null;

    return (
        <>
            <Head>
                <title>{page.title}</title>
            </Head>

            <main>
                <h1>{page.title}</h1>
            </main>
            <main>
                {page.sections?.map((section, index) => {
                    const Component = getComponent(section._type);
                    return <Component key={index} {...section} />;
                })}
            </main>
        </>
    );
};

export default ComposablePage;
