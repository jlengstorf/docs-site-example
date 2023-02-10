#!/usr/bin/env node

const contentful = require('contentful-management');

const LOCALE = 'en-US';

const SITEMAP = {
    'getting-started': 'Getting Started',
    concepts: 'Concepts',
    'concepts/the-stack': 'Understanding the Stack',
    'concepts/how-it-works': 'How it Works',
    guides: 'Developer Guides',
    'guides/add-component': 'Adding Section Components',
    'guides/exporting': 'Exporting from Contentful'
};

const client = contentful.createClient({
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
});

async function run() {
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
    const env = await space.getEnvironment('master');

    const { items: pages } = await env.getEntries({ content_type: 'page', include: 10 });

    const templatePage = pages.find((entry) => entry.fields.slug[LOCALE] === '__template__');

    for (const [slug, title] of Object.entries(SITEMAP)) {
        let newPageFields = { ...templatePage.fields, title: { [LOCALE]: title }, slug: { [LOCALE]: slug } };
        const newPage = await env.createEntry('page', { fields: newPageFields });
        await newPage.publish();
    }
}

run();
