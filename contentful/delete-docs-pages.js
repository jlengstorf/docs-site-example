#!/usr/bin/env node

const contentful = require('contentful-management');

const LOCALE = 'en-US';
const PRESERVE_PAGES = ['/', '__template__'];

const client = contentful.createClient({
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
});

async function run() {
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
    const env = await space.getEnvironment('master');

    const { items: pages } = await env.getEntries({ content_type: 'page', include: 10 });

    const pagesToDelete = pages.filter((entry) => !PRESERVE_PAGES.includes(entry.fields.slug[LOCALE]));

    for (const page of pagesToDelete) {
        await page.unpublish();
        await page.delete();
    }
}

run();
