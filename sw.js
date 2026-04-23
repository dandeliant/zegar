/* Mówiący Zegar — Service Worker */
const CACHE = 'mowiacy-zegar-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-64.png',
  './icon-180.png',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,700;0,9..144,900;1,9..144,500&family=JetBrains+Mono:wght@300;500;700&display=swap'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) =>
      // addAll can fail if any one resource fails; use individual put instead to be resilient
      Promise.all(ASSETS.map((url) =>
        fetch(url, { mode: 'no-cors' })
          .then((res) => cache.put(url, res))
          .catch(() => {})
      ))
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Only handle GET
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request)
        .then((response) => {
          // Cache same-origin responses opportunistically
          const url = new URL(event.request.url);
          if (url.origin === location.origin && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE).then((c) => c.put(event.request, clone));
          }
          return response;
        })
        .catch(() => {
          // Offline fallback: return a minimal HTML page
          if (event.request.destination === 'document') {
            return caches.match('./index.html');
          }
          return new Response('', { status: 504, statusText: 'offline' });
        });
    })
  );
});
