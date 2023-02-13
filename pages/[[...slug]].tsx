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
import { useThemeSwitcher } from '@/hooks/useThemeSwitcher';
import { DocLayout } from '@/layouts/Doc';
import { LandingLayout } from '@/layouts/Landing';

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

const layoutMap: {
    [K in Page['layout']]: React.ElementType;
} = {
    doc: DocLayout,
    landing: LandingLayout
};

export type LayoutProps = {
    page: Page;
    tableOfContents: PageHeading[];
    scrollOffset: number;
    scrollableRef: React.RefObject<HTMLDivElement>;
};

const ComposablePage = ({ page, siteConfig, tableOfContents }: { page: Page; siteConfig: SiteConfig; tableOfContents: PageHeading[] }) => {
    const scrollableRef = useRef<HTMLDivElement>(null);
    const scrollOffset = useScrollOffset(scrollableRef);
    const [theme, toggleTheme] = useThemeSwitcher();

    if (!page) return null;

    const LayoutTagName = layoutMap[page.layout];

    return (
        <>
            <Head>
                <title>{page.title}</title>
            </Head>

            <Header {...siteConfig} theme={theme} toggleTheme={toggleTheme} />

            <main className="flex overflow-y-hidden h-[calc(100vh-58px)]">
                <div className="w-[20rem] h-full bg-slate-50 dark:bg-slate-700">
                    <Navigation items={siteConfig.mainNavigation} />
                </div>

                <div className="w-full h-full overflow-y-scroll" ref={scrollableRef}>
                    <LayoutTagName page={page} tableOfContents={tableOfContents} scrollOffset={scrollOffset} scrollableRef={scrollableRef} />
                </div>
            </main>
        </>
    );
};

export default ComposablePage;
