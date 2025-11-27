const CACHE_NAME = 'flash-pwa-v1';
const FILES = [
  './',
  './index.html',
  './manifest.json'
];

self.addEventListener('install', evt => {
  evt.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', evt => { evt.waitUntil(clients.claim()); });

self.addEventListener('fetch', evt => {
  if (evt.request.method !== 'GET') return;
  evt.respondWith(caches.match(evt.request).then(resp => resp || fetch(evt.request)));
});
