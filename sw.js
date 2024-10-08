self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll([
                ".",
                "./html/about", 
                "./html/materie", 
                "./html/orario", 
                "./html/classmap", 
                "./html/todo", 
                "./css/style.css", 
                "./css/desktop.css", 
                "./css/materia.css", 
                "./css/classmap.css", 
                "./css/todo.css", 
                "./js/script.js",
                "./js/width.js",
                "./js/service-worker.js",
                "./js/materie.js",
                "./js/classmap.js",
                "./js/todo.js",
                "./js/not.js",
                "./js/down.js",
                "./img/schoolsync_logo_500.png",
                "./img/classmap.png",
                "./img/c.1.png",
                "./img/c.2.png",
                "./img/c.3.png",
                "./img/o.1.png",
                "./img/o.2.png",
                "./img/b.1.png",
                "./img/p.1.png",
                "./img/e.1.png"
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