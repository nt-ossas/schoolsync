self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll([
                ".",
                "./html/about.html", 
                "./html/materie.html", 
                "./html/orario.html", 
                "./html/classmap.html", 
                "./html/todo.html", 
                "./html/tepsit.html", 
                "./html/others.html", 
                "./html/voto.html", 
                "./css/style.css", 
                "./css/desktop.css", 
                "./css/materia.css", 
                "./css/orario.css", 
                "./css/tepsit.css", 
                "./css/classmap.css", 
                "./css/others.css", 
                "./css/todo.css", 
                "./css/voto.css", 
                "./js/auth.js",
                "./js/classmap.js",
                "./js/down.js",
                "./js/info.js",
                "./js/main.js",
                "./js/materie.js",
                "./js/not.js",
                "./js/orario.js",
                "./js/script.js",
                "./js/tepsit.js",
                "./js/todo.js",
                "./js/voto.js",
                "./img/schoolsync_logo_500.png",
                "./img/classmap.png",
                "./img/bus.png",
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