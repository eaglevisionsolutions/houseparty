if("serviceWorker" in navigator){
    navigator.serviceWorker.register("/sw.js").then(function(registration){
        console.log("Service Worker Registered with scope:", registration.scope);
    }).catch(function(err){
        console.log("Service worker registration Failed:", err);
    });
}