// the cache version gets updated every time there is a new deployment
const CACHE_VERSION = '2.0.1';
const CURRENT_CACHE = `main-${CACHE_VERSION}`;

// these are the routes we are going to cache for offline support
const cacheFiles = [
  '/',
  '/app.js',
  '/index.html',
  '/favicon.ico',
  '/icons/icon-192x192.png',
  '/icons/icon-256x256.png',
  '/icons/icon-384x384.png',
  '/icons/icon-512x512.png',
  '/style/main.css',
  'https://fonts.gstatic.com/s/tajawal/v3/Iurf6YBj_oCad4k1l5qjHrRpiYlJ.woff2',
  'https://fonts.gstatic.com/s/tajawal/v3/Iurf6YBj_oCad4k1l5qjHrFpiQ.woff2',
  'https://fonts.gstatic.com/s/tajawal/v3/Iura6YBj_oCad4k1nzSBC45I.woff2',
  'https://fonts.gstatic.com/s/tajawal/v3/Iura6YBj_oCad4k1nzGBCw.woff2',
  'https://fonts.gstatic.com/s/tajawal/v3/Iurf6YBj_oCad4k1l8KiHrFpiQ.woff2',
  'https://fonts.gstatic.com/s/tajawal/v3/Iurf6YBj_oCad4k1l5anHrRpiYlJ.woff2',
  'https://fonts.gstatic.com/s/tajawal/v3/Iurf6YBj_oCad4k1l5anHrFpiQ.woff2',
  'https://fonts.gstatic.com/s/tajawal/v3/Iurf6YBj_oCad4k1l7KmHrRpiYlJ.woff2',
  'https://fonts.gstatic.com/s/tajawal/v3/Iurf6YBj_oCad4k1l7KmHrFpiQ.woff2',
];

// on activation we clean up the previously registered service workers
self.addEventListener('activate', (evt) =>
  evt.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CURRENT_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  )
);

// on install we download the routes we want to cache for offline
self.addEventListener('install', (evt) =>
  evt.waitUntil(
    caches.open(CURRENT_CACHE).then((cache) => {
      return cache.addAll(cacheFiles);
    })
  )
);

// fetch the resource from the network
const fromNetwork = (request, timeout) =>
  new Promise((fulfill, reject) => {
    const timeoutId = setTimeout(reject, timeout);
    fetch(request).then((response) => {
      clearTimeout(timeoutId);
      fulfill(response);
      update(request);
    }, reject);
  });

// fetch the resource from the browser cache
const fromCache = (request) =>
  caches
    .open(CURRENT_CACHE)
    .then((cache) =>
      cache
        .match(request)
        .then((matching) => matching || cache.match('/offline/'))
    );

// cache the current page to make it available for offline
const update = (request) =>
  caches
    .open(CURRENT_CACHE)
    .then((cache) =>
      fetch(request).then((response) => cache.put(request, response))
    );

// general strategy when making a request (eg if online try to fetch it
// from the network with a timeout, if something fails serve from cache)
self.addEventListener('fetch', (evt) => {
  evt.respondWith(
    fromNetwork(evt.request, 10000).catch(() => fromCache(evt.request))
  );
  evt.waitUntil(update(evt.request));
});
