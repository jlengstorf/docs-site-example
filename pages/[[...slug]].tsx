import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';

import { getPageBySlug, getPages, getSiteConfig, resolveFields } from '@/utils/contentful';
import { Page, SiteConfig } from '@/types';
import { DynamicComponent } from '@/components/DynamicComponent';
import { Navigation } from '@/components/Navigation';

export const getStaticPaths: GetStaticPaths = async () => {
    const pages = await getPages();
    const paths = pages.map((page) => page.fields.slug).map((slug) => (slug.startsWith('/') ? slug : `/${slug}`));
    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    // Find current page from Contentful and convert to Page object
    const urlPath = ([params?.slug] || ['/']).flat().join('/') || '/';
    const pageEntry = await getPageBySlug(urlPath);
    const page: Page = await resolveFields(pageEntry);
    // Get siteConfig object from Contentful and convert to SiteConfig object
    const siteConfigEntry = await getSiteConfig();
    const siteConfig = await resolveFields(siteConfigEntry);
    return { props: { page, siteConfig } };
};

const ComposablePage = ({ page, siteConfig }: { page: Page; siteConfig: SiteConfig }) => {
    if (!page) return null;

    return (
        <>
            <Head>
                <title>{page.title}</title>
            </Head>

            <main className="flex">
                <div className="w-[20rem] h-screen">
                    <Navigation items={siteConfig.mainNavigation} />
                </div>

                <div className="max-w-3xl py-12 mx-auto">
                    <div className="mb-6">
                        <h1 className="mb-2">{page.title}</h1>
                        <p className="text-2xl font-normal text-slate-700">{page.description}</p>
                    </div>

                    {page.sections?.map((section, index) => (
                        <DynamicComponent key={index} {...section} />
                    ))}
                </div>
            </main>
        </>
    );
};

export default ComposablePage;
