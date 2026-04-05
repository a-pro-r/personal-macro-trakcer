const CACHE = 'apro-v1';

const FILES = [
  '/personal-macro-trakcer/',
  '/personal-macro-trakcer/index.html',
  '/personal-macro-trakcer/manifest.json',
  '/personal-macro-trakcer/icon-192.png',
  '/personal-macro-trakcer/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(FILES).catch(() => {}))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => 
      r || fetch(e.request).catch(() => caches.match('/personal-macro-trakcer/index.html'))
    )
  );
});
