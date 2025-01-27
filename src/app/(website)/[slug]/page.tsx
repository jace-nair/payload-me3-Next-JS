import type { Metadata } from "next";

import config from "@payload-config";
import { getPayload } from "payload";
import React, { cache } from "react";

import type { Page as PageType } from "@/payload-types";


import { notFound } from "next/navigation";
import { RenderBlocks } from "@/utils/RenderBlocks";


/* Helper function to query a page by a slug. Returns page document that matches the query.  */
const queryPageBySlug = cache(async({slug}: {slug: string}) => {

    const parsedSlug = decodeURIComponent(slug);

    const payload = await getPayload({config});

    const result = await payload.find({
        collection: 'pages',
        limit: 1,
        where: {
            slug: {
                equals: parsedSlug,
            },
        },
    });

    return result.docs?.[0] || null
});

/* This is a replacement for getStaticPaths from pages router but does the exact same thing.
It fetches all the pages that were created with a limit of 1000. It will return all the pages
and the slug except the index page*/
export async function generateStaticParams() {
    const payload = await getPayload({config});
    const pages = await payload.find({
        collection: 'pages',
        draft: false,
        limit: 1000,
    });

/* This returns an array of objects rather than just strings, which NextJS is expecting */
    return pages.docs?.filter((doc) => {
            return doc.slug !== 'index'
        }).map((doc) => ({
            slug:doc.slug,
        }))
}


/* Default page function that accepts a params */
export default async function Page({params: {slug = 'index'}}) {
    let page: PageType | null

    page = await queryPageBySlug({
        slug,
    })

    if(!page) {
        return notFound()
    }

    return(
        <article className="pt-16 pb-24">
            <RenderBlocks blocks={page.layout} />
        </article>
    );
}