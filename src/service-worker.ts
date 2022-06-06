/// <reference lib="webworker" />

// needed for ServiceWorkerGlobalScope
import { getCacheKeyForURL, precacheAndRoute } from "workbox-precaching";
import { NavigationRoute, registerRoute } from "workbox-routing";
import { NetworkFirst } from "workbox-strategies";

declare const self: ServiceWorkerGlobalScope;
const workboxManifest = self.__WB_MANIFEST;

console.log("service worker has loaded...", workboxManifest);

precacheAndRoute([
    ...workboxManifest,
    {
        url: "/favicon.ico",
        revision: "1",
    },
    {
        url: "/favicon-32x32.png",
        revision: "1",
    },
    {
        url: "/favicon-16x16.png",
        revision: "1",
    },
    {
        url: "/apple-touch-icon.png",
        revision: "1",
    },
    {
        url: "/android-chrome-512x512.png",
        revision: "1",
    },
    {
        url: "/android-chrome-192x192.png",
        revision: "1",
    },
]);

registerRoute(new NavigationRoute(async (
    args
) => {
    try {
        return await new NetworkFirst().handle(args)
    } catch (e) {
        console.warn("Failed to fulfill the route request via the network: ", e)
    }
    const indexPageFallbackResponse = await getIndexPageFromPreCache()
    if (indexPageFallbackResponse !== undefined) {
        return indexPageFallbackResponse
    }
    return new Response(undefined, { status: 404 })
}))

async function getIndexPageFromPreCache(): Promise<Response | undefined> {
    const indexPagePreCacheKey = getIndexPagePreCacheKey()
    if (indexPagePreCacheKey === undefined) {
        console.warn("failed to find fallback index page pre-cache key")
        return
    }
    const indexPageResponse = await caches.match(indexPagePreCacheKey)
    if (indexPageResponse === undefined) {
        console.warn("failed to find fallback index page in pre-cache")
        return
    }
    return indexPageResponse
}

export function getIndexPagePreCacheKey(): string | undefined {
    const possibleIndexPageUrls = ["/", "/index.html"]
    return possibleIndexPageUrls.reduce<string | undefined>(
        (firstIndexPagePreCacheKey, possibleIndexPageUrl) => {
            if (firstIndexPagePreCacheKey) {
                return firstIndexPagePreCacheKey
            } else {
                return getCacheKeyForURL(possibleIndexPageUrl)
            }
        },
        undefined
    )
}