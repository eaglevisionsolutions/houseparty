self.addEventListener("fetch", function(event){
    event.respondWith(fetch(event.request).catch(function(){
        return new Response(
            "<h2>Welcome To Houseparty</h2>" + "<p>There Seems to be a problem with your connection.</p>" + "<p>We look forward to serving you when you are online again.</p>",{
                headers: {
                    "Content-Type" : "text/html"
                }
            }
        )
    }))
});