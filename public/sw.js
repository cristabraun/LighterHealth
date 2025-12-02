// Service Worker for Lighter™
// Version 2: Force cache clear and self-unregister in development
const CACHE_NAME = 'lighter-v2';
const IS_PRODUCTION = self.location.hostname === 'getlighterapp.com' || 
                       self.location.hostname.endsWith('.replit.app');

// In development, immediately unregister this service worker
if (!IS_PRODUCTION) {
  self.addEventListener('install', () => {
    self.skipWaiting();
  });
  
  self.addEventListener('activate', (event) => {
    event.waitUntil(
      Promise.all([
        // Clear ALL caches
        caches.keys().then((cacheNames) => {
          return Promise.all(cacheNames.map((name) => caches.delete(name)));
        }),
        // Unregister this service worker
        self.registration.unregister()
      ]).then(() => {
        // Force all clients to reload
        self.clients.matchAll().then((clients) => {
          clients.forEach((client) => client.navigate(client.url));
        });
      })
    );
  });
  
  // Don't intercept any requests in development
  self.addEventListener('fetch', () => {});
} else {
  // Production: Normal PWA caching behavior
  const urlsToCache = [
    '/',
    '/index.html',
  ];

  self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(urlsToCache).catch((err) => {
          console.log('Cache add error:', err);
        });
      })
    );
    self.skipWaiting();
  });

  self.addEventListener('activate', (event) => {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
    self.clients.claim();
  });

  self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') {
      return;
    }

    // Network-first strategy for HTML pages
    if (event.request.headers.get('accept')?.includes('text/html')) {
      event.respondWith(
        fetch(event.request)
          .then((response) => {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
            return response;
          })
          .catch(() => caches.match(event.request))
      );
      return;
    }

    // Cache-first for other assets
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response;
        }

        return fetch(event.request).then((response) => {
          if (!response || response.status !== 200) {
            return response;
          }

          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        }).catch(() => {
          return new Response('Offline - please check your connection');
        });
      })
    );
  });
}
