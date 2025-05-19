const version = "4.0",
CACHE_NAME = "hp-cache-" + version,
CACHED_LIST = [
    "/",
    "/local/css/style.css",
    "/local/js/init.js",
    "/includes/header.html",
    "/includes/footer.html",
    "/index-offline.html",
    "/local/js/app.js",
    "/local/js/app-offline.js",
];

self.addEventListener("install", function(event){
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache){
            return cache.addAll(CACHED_LIST);
        })
    );
});
self.addEventListener("update", function(event){
    event.waitUntil(
        caches.keys().then(function(cacheNames){
            return Promise.all(
                cacheNames.map(function(cacheName){
                    if(CACHE_NAME !== cacheName && cacheName.startsWith("h-cache")){
                        return caches.delete(cacheName);
                    }
                })
            )
        }
        )
    )
});

self.addEventListener("fetch", function(event){
    event.respondWith(
        fetch(event.request).catch(function(){
            return caches.match(event.request, {ignoreSearch: true}).then(function(response){
                if(response){
                    return response;
                }else if (event.request.headers.get("accept").includes("text/html")){
                    return caches.match("index-offline.html");
                }
            });
        })
    );
});