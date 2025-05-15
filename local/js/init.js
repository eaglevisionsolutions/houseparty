if("serviceWorker" in navigator){
    navigator.serviceWorker.register("/sw.js").then(function(registration){
        console.log("Service Worker Registered with scope:", registration.scope);
    }).catch(function(err){
        console.log("Service worker registration Failed:", err);
    });
}

function loadScript(url, callback, async) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.onload = function() {
      callback();
    };
    script.onerror = function() {
      console.error('Failed to load script: ' + url);
      if (url.startsWith('https://')) {
        loadScript(url.replace('https://', 'http://'), callback);
      } else if (!url.startsWith('file://')) {
        loadScript('file://' + url, callback);
      } else {
        console.error('Failed to load local fallback.');
      }
    };
    script.src = url;
    if(async === true){
        document.body.appendChild(script);
    }else{
        document.head.appendChild(script);
    }
    
  }


document.onload = function(){
    // load jquery from google hosted libary if can't get fallback to local version
    loadScript("https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js", function(){
        if(window.jQuery){
            initializeApp();
        }else{
            loadScript("vendor/Jquery/jquery-3.7.1.js", function(){
                if(window.jQuery){
                    initialzeApp();
                }else{
                    console.log("Unable to Load Jquery");
                }
            }, true);
        }
    }, true);
}