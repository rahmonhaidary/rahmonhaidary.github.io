const CACHE_NAME = 'unitracker-v5';
const ASSETS = ['./index.html', './manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
  // Don't skipWaiting — wait for user to confirm update
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Network first, cache fallback.
// For page loads, bypass the browser HTTP cache (cache:'no-cache' forces
// revalidation with the server) so new deploys show up on the next reload
// instead of after the 10-minute GitHub Pages max-age expires.
self.addEventListener('fetch', e => {
  if(e.request.method !== 'GET') return;
  const req = e.request.mode === 'navigate'
    ? new Request(e.request.url, {cache: 'no-cache'})
    : e.request;
  e.respondWith(
    fetch(req)
      .then(res => {
        const clone = res.clone();
        caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});

// Listen for skip waiting message from app
self.addEventListener('message', e => {
  if(e.data === 'skipWaiting') self.skipWaiting();
});
