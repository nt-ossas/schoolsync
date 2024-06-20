self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll([
                ".", 
                "./about", 
                "./materie", 
                "./orario", 
                "./css/style.css", 
                "./css/desktop.css", 
                "./css/materia.css", 
                "./img/TECHZONE_logo.png",
                "./js/script.js",
                "./js/width.js",
                "./js/materie.js",
            ]);
        }
    ))
});

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(response =>{
            return response || fetch(e.request);
        })
    )
});