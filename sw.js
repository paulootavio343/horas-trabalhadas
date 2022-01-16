var CACHE_NAME = 'horas-trabalhadas-cache-v2';
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

self.addEventListener('install', function (event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
            )
    );
});

self.addEventListener('activate', function (event) {

    var cacheAllowlist = ['horas-trabalhadas-cache-v2'];

    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheAllowlist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
