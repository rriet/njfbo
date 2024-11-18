const OFFLINE_VERSION = 1;
const CACHE_NAME = "FboNotifier";
var urlsToCache = [
    "/fbo/",
    "/fbo/flutter_bootstrap.js",
    "/fbo/version.json",
    "/fbo/index.html",
    "/fbo/main.dart.js",
    "/fbo/flutter.js",
    "/fbo/favicon.png",
    "/fbo/icons/Icon-192.png",
    "/fbo/icons/Icon-maskable-192.png",
    "/fbo/icons/Icon-maskable-512.png",
    "/fbo/icons/Icon-512.png",
    "/fbo/manifest.json",
    "/fbo/assets/AssetManifest.json",
    "/fbo/assets/NOTICES",
    "/fbo/assets/FontManifest.json",
    "/fbo/assets/AssetManifest.bin.json",
    "/fbo/assets/packages/cupertino_icons/assets/CupertinoIcons.ttf",
    "/fbo/assets/shaders/ink_sparkle.frag",
    "/fbo/assets/AssetManifest.bin",
    "/fbo/assets/fonts/MaterialIcons-Regular.otf",
    "/fbo/canvaskit/skwasm.js",
    "/fbo/canvaskit/skwasm.js.symbols",
    "/fbo/canvaskit/canvaskit.js.symbols",
    "/fbo/canvaskit/skwasm.wasm",
    "/fbo/canvaskit/chromium/canvaskit.js.symbols",
    "/fbo/canvaskit/chromium/canvaskit.js",
    "/fbo/canvaskit/chromium/canvaskit.wasm",
    "/fbo/canvaskit/canvaskit.js",
    "/fbo/canvaskit/canvaskit.wasm",
    "/fbo/canvaskit/skwasm.worker.js"
];

self.addEventListener("install", function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(async function() {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(event.request);
    const networkResponsePromise = fetch(event.request);

    event.waitUntil(async function() {
      const networkResponse = await networkResponsePromise;
      await cache.put(event.request, networkResponse.clone());
    }());

    // Returned the cached response if we have one, otherwise return the network response.
    return cachedResponse || networkResponsePromise;
  }());
});
