var CACHE_NAME = "hp-cache";
var CACHED_LIBRARY = [
    '/includes/header.html',
    '/includes/footer.html',
    '/offline-index.html'
];

self.addEventListener("install", function(event){
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache){
            return cache.addAll(CACHED_LIBRARY);
        })
    );
});
self.addEventListener("fetch", function(event){
    event.respondWith(
        fetch(event.request).catch(function(){
            return caches.match(event.request, {ignoreSearch: true}).then(function(response){
                if(response){
                    return response;
                }else if (event.request.headers.get("accept").inlcudes("text/html")){
                    return caches.match("offline-index.html");
                }
            });
        })
    );
});