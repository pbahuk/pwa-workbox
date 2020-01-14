# Working

* npm install workbox-cli —save-dev
* npx workbox wizard
    * 
* Creates a workbox-config.js file in the root folder.
* Create a service worker file from this config.
    * npx workbox generateSW workbox-config.js
    * Service worker is cerated, as per the path provided in the config. 
* Register the service worker to our index.html
            <script>
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js');
            });
        }
        </script>
* You will start seeing console.logs for workbox preaching, also Cache Storage will also have some data for you to see.
    * It is responding to css/js/html files.
    * It loads the html, but can’t load the API calls as we have not made any strategy for it.
* To define custom sw.js files:
    * Create a src-sw.js file.
    * Add the import for the workbox CDN file, and add workbox.precaching.precacheAndRoute([]);
    * Add the “swSrc”: “src-sw.js” to workbox-config.js
    * Nix workbox injectManifest
    * Write a console to verify that this file is being picked up. This should be included in the generated sw.js
    * File level caching is done at the workbox-config.js level, To cache specific APIs we should write the strategies in the src-sw.js file
* To Cache APIs:
        workbox.routing.registerRoute(
            new RegExp('https://jsonplaceholder.typicode.com/users'),
            workbox.strategies.cacheFirst()
        );
    * Define strategies for different APIs to cache them.
    * Similar can be done for the fonts as well.
        * <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet" />
        * https://developers.google.com/web/tools/workbox/guides/common-recipes : Paste for font specific files.
* Refreshing the service worker:
    * Once you make any changes to the service worker file, the main problem is updation.
    * The service worker gets downloaded but it needs to be activated and replace the already existing one.
    * For simple version, manually do skipWaiting to activate it and refresh.
    * Specific cache will be created with the name given in the src-sw.js file, cacheName: 'google-fonts-webfonts',
* To make the PWA installable:
    * Needs a Manifest file.
    * Workbox does not provide support for creating this file.
        * Try searching Web App Manifest generator: https://tomitm.github.io/appmanifest/
        * Create a Manifest by using any 512x512 images. 
        * Copy the images and manifest file into the build/ folder.
        * Include this in the index.html: <link rel="manifest" href="manifest.json" />
        * It will be working with the older version of index.html, clear storage and refresh, we got the manifest file in the Applications tab.
        * You will see a Add To HomeScreen button.
                



