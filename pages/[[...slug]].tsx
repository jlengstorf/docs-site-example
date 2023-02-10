import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';

import { getPageBySlug, getPages, resolveFields } from '@/utils/contentful';
import { Page } from '@/types';
import { DynamicComponent } from '@/components/DynamicComponent';

export const getStaticPaths: GetStaticPaths = async () => {
    const pages = await getPages();
    const paths = pages.map((page) => page.fields.slug).map((slug) => (slug.startsWith('/') ? slug : `/${slug}`));
    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const urlPath = ([params?.slug] || ['/']).flat().join('/') || '/';
    const pageEntry = await getPageBySlug(urlPath);
    const page: Page = await resolveFields(pageEntry);
    return { props: { page } };
};

const ComposablePage = ({ page }: { page: Page }) => {
    if (!page) return null;

    return (
        <>
            <Head>
                <title>{page.title}</title>
            </Head>

            <main className="max-w-4xl mx-auto py-12">
                <div className="mb-6">
                    <h1 className="mb-2">{page.title}</h1>
                    <p className="text-2xl text-slate-700 font-normal">{page.description}</p>
                </div>

                {page.sections?.map((section, index) => (
                    <DynamicComponent key={index} {...section} />
                ))}
            </main>
        </>
    );
};

export default ComposablePage;
