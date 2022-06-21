var cacheName = 'horas-trabalhadas-cache-v3';
var urlsToCache = [
    '/',
    '/index.html',
    '/termos-de-uso.html',
    '/politica-de-privacidade.html',
    '/assets/js/code.js',
    '/assets/js/service-worker-registration.js',
    '/assets/css/document.css',
    '/assets/css/style.css',
    '/site.webmanifest',
    '/assets/fonts/Roboto/Roboto-Regular.ttf',
    '/assets/fonts/Roboto/Roboto-Bold.ttf',
    '/assets/fonts/Roboto/LICENSE.txt',
    '/assets/icons/add_black_24dp.svg',
    '/assets/icons/close_black_24dp.svg',
    '/assets/icons/home_black_24dp.svg',
    '/assets/icons/about.txt',
];

self.addEventListener('install', event => {
    // Perform install steps
    event.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                cache.addAll(urlsToCache);
            })
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    // Remove old caches
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    // Cache and network fallback
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    )
});
