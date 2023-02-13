import { GetStaticPaths, GetStaticProps } from 'next';
import { useRef } from 'react';
import Head from 'next/head';

import { Page, PageHeading, SiteConfig } from '@/types';

import { DynamicComponent } from '@/components/DynamicComponent';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Navigation } from '@/components/Navigation';
import { TableOfContents } from '@/components/TableOfContents';

import { getPageBySlug, getPages, getSiteConfig, resolveFields } from '@/utils/contentful';
import { getTableOfContents } from '@/utils/page';

import { useScrollOffset } from '@/hooks/useScrollOffset';
import { useSiteTheme } from '@/hooks/useSiteTheme';

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
    // Resolve table of contents for page
    const tableOfContents = await getTableOfContents(page);
    // Get siteConfig object from Contentful and convert to SiteConfig object
    const siteConfigEntry = await getSiteConfig();
    const siteConfig = await resolveFields(siteConfigEntry);
    return { props: { page, siteConfig, tableOfContents } };
};

const ComposablePage = ({ page, siteConfig, tableOfContents }: { page: Page; siteConfig: SiteConfig; tableOfContents: PageHeading[] }) => {
    const scrollableRef = useRef<HTMLDivElement>(null);
    const scrollOffset = useScrollOffset(scrollableRef);
    const [theme, toggleTheme] = useSiteTheme();

    if (!page) return null;

    return (
        <>
            <Head>
                <title>{page.title}</title>
            </Head>

            <Header {...siteConfig} theme={theme} toggleTheme={toggleTheme} />

            <main className="flex overflow-y-hidden h-[calc(100vh-58px)]">
                <div className="w-[20rem] h-full bg-slate-50">
                    <Navigation items={siteConfig.mainNavigation} />
                </div>

                <div className="w-full h-full overflow-y-scroll" ref={scrollableRef}>
                    <div className="flex max-w-4xl pt-12 mx-auto">
                        <div className="px-6">
                            <div className="mb-6">
                                <h1 className="mb-2">{page.title}</h1>
                                <p className="text-2xl font-normal text-slate-700">{page.description}</p>
                            </div>

                            {page.sections?.map((section, index) => (
                                <DynamicComponent key={index} {...section} />
                            ))}

                            <Footer />
                        </div>

                        <div className="flex-shrink-0 w-72 pl-10 max-h-[calc(100vh-8rem)] sticky top-12">
                            <TableOfContents items={tableOfContents} scrollTop={scrollOffset} bodyRef={scrollableRef} scrollOffset={64} />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default ComposablePage;
