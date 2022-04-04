import { Workbox } from 'workbox-window';

export async function registerServiceWorker(serviceWorkerUrl: string) {
    if ('serviceWorker' in navigator) {
        const wb = new Workbox(serviceWorkerUrl);
        return wb.register();
    }
}