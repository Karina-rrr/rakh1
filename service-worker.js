const CACHE_NAME = 'chelyabinsk-oblast-v1';
const ASSETS = [
  '/',
  '/a.html',
  '/h.html',
  '/p.html',
  '/n.html',
  '/g.html',
  '/style.css',
  '/manifest.json'
];

// Установка и кэширование ресурсов
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
  );
});

// Стратегия: сначала кэш, потом сеть
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// Очистка старых кэшей
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => key !== CACHE_NAME && caches.delete(key))
    ))
  );
});