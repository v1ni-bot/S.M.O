const  cacheName = 'SMO'

console.log("service worker rodou");

self.addEventListener('install', function(event) {
    console.log("install event detected");
    event.waitUntil(
        caches.open(cacheName).then(function(cache){
            cache.addAll([
                
            ])
        })
    )
    return self.skipWaiting()
});

self.addEventListener('activate', e =>{
    self.clients.claim()
})

self.addEventListener('fetch', async e =>{
    const req = e.request
    const url = new URL(req.url)
})
