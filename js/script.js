window.onload = function(){
    orario();
}

function show(n) {
    var scroll = document.getElementById(`element-${n}`);
    var scrollElements = document.querySelectorAll(`.event-element-${n}`);

    scroll.classList.toggle("first");
    scroll.classList.toggle(`animation-${n}`);
    scrollElements.forEach(element => {
        element.classList.toggle("hidden");
    });

    if (scroll.classList.contains("first")) {
        scroll.innerHTML = `<h4>${n === 2 ? 'Calendar' : 'News'}</h4><i class="fa-solid fa-circle-chevron-right" onclick="show(${n})"></i>`;
    } else {
        scroll.innerHTML = `<h4>${n === 2 ? 'Calendar' : 'News'}</h4><i class="fa-solid fa-circle-chevron-right" onclick="show(${n})"></i>`;
    }
}

function verifica() {
    var nomeProva = document.getElementById("nomeProva").value;
    var dataProva = document.getElementById("dataProva").value;

    if (nomeProva === "" || dataProva === "") {
        alert("Scrivi qualcosa porco dio");
        return;
    }

    var today = new Date();
    var provaDate = new Date(dataProva);
    var maxDate = new Date('2026-12-31');

    if (provaDate < today || provaDate > maxDate) {
        alert("La data deve essere compresa tra oggi e l'anno prossimo!");
        return;
    }

    var evento = document.createElement("div");
    evento.classList.add("event-element-2", "event", "column","small");
    evento.innerHTML = `<h4>${nomeProva} <hr> ${dataProva}</h4>`;

    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = `<i class="fa-solid fa-trash mini"></i>`;
    deleteButton.classList.add("delete-button");

    setTimeout(function() {
        evento.classList.remove("small");
    }, 1);

    evento.appendChild(deleteButton);

    deleteButton.addEventListener("click", function() {
        evento.classList.add("remove");
        setTimeout(function() {
            evento.remove();
        }, 280);
    });

    var container = document.getElementById("scroll-2");
    container.insertBefore(evento, container.firstChild);
    
    var calendar = document.getElementById("element-2");
    if(calendar.classList.contains("first")){
        evento.classList.add("hidden");
    }
}

function news() {
    var nomeNews = document.getElementById("nomeNews").value;
    var colorNews = document.getElementById("colorNews").value;

    if (nomeNews === "") {
        alert("Inserisci un titolo per la news.");
        return;
    }

    var newsElement = document.createElement("div");
    newsElement.classList.add("news", "column", "event-element-1","small");
    newsElement.innerHTML = `<i class="fa-solid fa-file-invoice head" style="background-color:${colorNews};"></i><h4>${nomeNews}</h4>`;

    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = `<i class="fa-solid fa-trash mini"></i>`;
    deleteButton.classList.add("delete-button_news");

    setTimeout(function() {
        newsElement.classList.remove("small");
    }, 1);

    newsElement.appendChild(deleteButton);

    deleteButton.addEventListener("click", function() {
        newsElement.classList.add("remove");
        setTimeout(function() {
            newsElement.remove();
        }, 280);
    });

    var container = document.getElementById("scroll-1");
    container.insertBefore(newsElement, container.firstChild);
    
    var newsSection = document.getElementById("element-1");
    if(newsSection.classList.contains("first")){
        newsElement.classList.add("hidden");
    }
}

function orario() {
    var today = new Date();
    var dayOfWeek = today.getDay(); 
    var moduloElements = document.querySelectorAll(".modulo"); 
    var orario = document.getElementById(`modulo-${dayOfWeek}`); 

    console.log(dayOfWeek);

    moduloElements.forEach(element => {
        element.classList.add("hidden");
    });

    if (orario) {
        orario.classList.toggle("hidden");
    }
}

function close() {
    var today = new Date();
    var dayOfWeek = today.getDay(); 
    var modulo = document.getElementById(`modulo-${dayOfWeek}`); 
    console.log("Closing...");
    modulo.classList.add("hidden");
}

function saveModuli() {
    var today = new Date();
    var n = today.getDay();
    var moduliData = {};

    for (let i = 0; i < 6; i++) {
        var moduli = document.querySelector(`#modulo-${n} #i-${i+1}`);
        if (moduli) {
            moduliData[`i-${i+1}`] = moduli.value;
        }
    }

    localStorage.setItem(`moduli-${n}`, JSON.stringify(moduliData));
    console.log("Saving...");
}

function loadModuli() {
    var today = new Date();
    var n = today.getDay();
    var moduliData = JSON.parse(localStorage.getItem(`moduli-${n}`));

    if (moduliData) {
        for (let i = 0; i < 6; i++) {
            var moduli = document.querySelector(`#modulo-${n} #i-${i+1}`);
            if (moduli && moduliData[`i-${i+1}`] !== undefined) {
                moduli.value = moduliData[`i-${i+1}`];
            }
        }
    }
}

document.addEventListener('change', function(event) {
    if (event.target && event.target.id.startsWith('i-')) {
        saveModuli();
    }
});

document.addEventListener('DOMContentLoaded', loadModuli);