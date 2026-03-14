// Service Worker - Simulasi Kredit Kendaraan PWA
const CACHE_NAME = 'simulasi-kredit-v1';
const ASSETS = [
  './Simulasi_TF.html',
  './manifest.json'
];

// Install: cache semua aset
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate: hapus cache lama
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Fetch: sajikan dari cache dulu (offline-first)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).catch(() => {
        // Jika offline dan tidak ada cache, kembalikan halaman utama
        return caches.match('./Simulasi_TF.html');
      });
    })
  );
});
