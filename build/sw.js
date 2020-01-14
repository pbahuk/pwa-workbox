importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

/**
 * Custom sw.js configuration.
 */
workbox.routing.registerRoute(
  new RegExp('https://jsonplaceholder.typicode.com/users'),
  workbox.strategies.cacheFirst()
);

// Font files:
// Cache the underlying font files with a cache-first strategy for 1 year.
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new workbox.strategies.CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

workbox.precaching.precacheAndRoute([
  {
    "url": "css/main.css",
    "revision": "0d26d5ca00ab348e87ee88844db9394d"
  },
  {
    "url": "index.html",
    "revision": "9cd482e793e1b459a1724295fb1abf87"
  },
  {
    "url": "js/app.js",
    "revision": "d3d806b9967dcf4193ca50a04f0404ae"
  }
]);