import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';

import { getPageBySlug, getPages, resolveFields } from '@utils/contentful-utils';
import { TypePage } from '@/types';

export const getStaticPaths: GetStaticPaths = async () => {
    const pages = await getPages();
    const paths = pages.map((page) => page.fields.slug).map((slug) => (slug.startsWith('/') ? slug : `/${slug}`));
    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const urlPath = ([params?.slug] || ['/']).flat().join('/') || '/';
    const pageEntry = await getPageBySlug(urlPath);
    return { props: { page: resolveFields(pageEntry) } };
};

const ComposablePage = ({ page }: { page: TypePage }) => {
    if (!page) return null;

    return (
        <>
            <Head>
                <title>{page.fields.title}</title>
            </Head>

            <main>
                <h1>{page.fields.title}</h1>
            </main>
            {/* <main data-sb-object-id={_id}>
                {fields.sections?.map((section, index) => {
                    const Component = getComponent(section._type);

                    return <Component path={`sections.${index}`} key={`${section.type}-${index}`} {...section} />;
                })}
            </main> */}
        </>
    );
};

export default ComposablePage;
