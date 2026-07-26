/* Hanzi — service worker.
   Bump CACHE when any shell file changes so clients pick up the new build. */

const CACHE = 'hanzi-v5';

const SHELL = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './data/vocab.js',
  './data/lessons.js',
  './data/exercises.js',
  './manifest.json',
  './favicon.svg',
  './icon-192.png',
  './icon-512.png',
];

self.addEventListener('install', ev => {
  ev.waitUntil(
    caches.open(CACHE)
      // Individual puts so one 404 can't fail the whole install.
      .then(c => Promise.all(SHELL.map(url =>
        c.add(url).catch(e => console.warn('Hanzi SW: skipped', url, e)))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', ev => {
  ev.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Network-first, falling back to cache when offline.
   Cache-first would serve stale code for a whole extra reload after every
   edit to app.js or the data files — painful when you are adding a week's
   vocabulary. This way you always get the current build when online and
   the app still runs with no connection. Cross-origin requests (Google
   Fonts) are left to the browser. */
self.addEventListener('fetch', ev => {
  const req = ev.request;
  if (req.method !== 'GET') return;
  if (new URL(req.url).origin !== self.location.origin) return;

  ev.respondWith(
    fetch(req)
      .then(res => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
        return res;
      })
      .catch(() => caches.match(req).then(hit =>
        hit || caches.match('./index.html')))
  );
});
