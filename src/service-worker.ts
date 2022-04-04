/// <reference lib="webworker" />

// needed for ServiceWorkerGlobalScope
import { } from "workbox-precaching"

declare const self: ServiceWorkerGlobalScope
const workboxManifest = self.__WB_MANIFEST

console.log("service worker has loaded...", workboxManifest)
