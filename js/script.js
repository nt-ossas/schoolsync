window.onload = function(){
    orario();
    loadNews();
    loadEvents();
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

function news() {
    var nomeNews = document.getElementById("nomeNews").value;
    var colorNews = document.getElementById("colorNews").value;

    if (nomeNews === "") {
        alert("Inserisci un titolo per la news.");
        return;
    }

    var newsElement = document.createElement("div");
    newsElement.classList.add("news", "column", "event-element-1", "small");
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
            saveNews();
        }, 280);
    });

    var container = document.getElementById("scroll-1");
    container.appendChild(newsElement);
    
    var newsSection = document.getElementById("element-1");
    if(newsSection.classList.contains("first")){
        newsElement.classList.add("hidden");
    }

    saveNews();
}

function saveNews() {
    var newsElements = document.querySelectorAll(".event-element-1");
    var newsData = [];

    newsElements.forEach(element => {
        var title = element.querySelector("h4").innerText;
        var color = element.querySelector(".head").style.backgroundColor;
        newsData.push({ title: title, color: color });
    });

    localStorage.setItem("news", JSON.stringify(newsData));
}

function loadNews() {
    var newsData = JSON.parse(localStorage.getItem("news"));
    if (newsData) {
        newsData.forEach(news => {
            var newsElement = document.createElement("div");
            newsElement.classList.add("news", "column", "event-element-1", "hidden");
            newsElement.innerHTML = `<i class="fa-solid fa-file-invoice head" style="background-color:${news.color};"></i><h4>${news.title}</h4>`;

            var deleteButton = document.createElement("button");
            deleteButton.innerHTML = `<i class="fa-solid fa-trash mini"></i>`;
            deleteButton.classList.add("delete-button_news");

            newsElement.appendChild(deleteButton);

            deleteButton.addEventListener("click", function() {
                newsElement.classList.add("remove");
                setTimeout(function() {
                    newsElement.remove();
                    saveNews();
                }, 280);
            });

            var container = document.getElementById("scroll-1");
            container.appendChild(newsElement);
        });
    }
}

function saveEvents() {
    var eventElements = document.querySelectorAll(".event-element-2");
    var eventData = [];

    eventElements.forEach(element => {
        var content = element.querySelector("h4").innerText;
        eventData.push(content);
    });

    localStorage.setItem("events", JSON.stringify(eventData));
}

// Funzione per caricare l'orario del giorno selezionato
function orarioSelect() {
    var orarioSelectElement = document.getElementById("orario-select");
    var orarioValue = orarioSelectElement.value;
    var orario = document.getElementById(`modulo-${orarioValue}`);
    var moduloElements = document.querySelectorAll(".modulo");

    moduloElements.forEach(element => {
        element.classList.add("hidden");
    });

    if (orario) {
        orario.classList.remove("hidden");
        fillInputs(`modulo-${orarioValue}`);
    }

    // Salva il giorno selezionato nel localStorage
    localStorage.setItem("selectedDay", orarioValue);
}

// Funzione per mostrare/nascondere i campi di input per la modifica
function toggleEdit(moduloId) {
    var modulo = document.getElementById(moduloId);
    var inputs = modulo.querySelector('.inputs');
    var isHidden = inputs.classList.contains('hidden');
    
    inputs.classList.toggle('hidden', !isHidden);
    if (!isHidden) {
        fillInputs(moduloId);
    }
}

// Funzione per riempire i campi di input con i dati salvati
function fillInputs(moduloId) {
    var savedData = JSON.parse(localStorage.getItem(moduloId)) || {};
    var inputs = document.querySelectorAll(`#${moduloId} .inputs input`);
    
    inputs.forEach(input => {
        var index = input.id.split('-')[1];
        input.value = savedData[index] || '';
    });
}

// Funzione per salvare gli orari nel localStorage
function saveOrari(moduloId) {
    var inputs = document.querySelectorAll(`#${moduloId} .inputs input`);
    var savedData = {};

    inputs.forEach(input => {
        var index = input.id.split('-')[1];
        savedData[index] = input.value;
    });

    localStorage.setItem(moduloId, JSON.stringify(savedData));
    toggleEdit(moduloId); // Nascondi i campi di input dopo aver salvato
}

// Funzione per caricare l'orario salvato all'apertura della pagina
function loadSavedOrario() {
    var savedDay = localStorage.getItem("selectedDay");
    var today = new Date();
    var dayOfWeek = today.getDay() + 1; // Modifica per far partire da 1 (Lunedì) a 6 (Sabato)

    if (savedDay !== null) {
        var orarioSelect = document.getElementById("orario-select");
        if (orarioSelect) {
            orarioSelect.value = savedDay;
        }

        orarioSelect(); // Chiama la funzione orarioSelect per mostrare l'orario salvato
    } else {
        orarioSelect(); // Chiama la funzione orarioSelect per mostrare l'orario del giorno corrente
    }
}

// Chiama loadSavedOrario all'apertura della pagina
window.onload = loadSavedOrario;

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

function verifica() {
    var nomeProva = document.getElementById("nomeProva").value;
    var dataProva = document.getElementById("dataProva").value;

    if (nomeProva === "" || dataProva === "") {
        alert("Scrivi qualcosa disabile");
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
    evento.classList.add("event-element-2", "event", "column", "small");
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
            saveEvents();
        }, 280);
    });

    var container = document.getElementById("scroll-2");
    container.appendChild(evento);
    
    var calendar = document.getElementById("element-2");
    if(calendar.classList.contains("first")){
        evento.classList.add("hidden");
    }

    saveEvents();
}

function loadEvents() {
    var eventData = JSON.parse(localStorage.getItem("events"));
    if (eventData) {
        eventData.forEach(event => {
            var evento = document.createElement("div");
            evento.classList.add("event-element-2", "event", "column", "hidden");
            evento.innerHTML = `<h4>${event}</h4>`;

            var deleteButton = document.createElement("button");
            deleteButton.innerHTML = `<i class="fa-solid fa-trash mini"></i>`;
            deleteButton.classList.add("delete-button");

            evento.appendChild(deleteButton);

            deleteButton.addEventListener("click", function() {
                evento.classList.add("remove");
                setTimeout(function() {
                    evento.remove();
                    saveEvents();
                }, 280);
            });

            var container = document.getElementById("scroll-2");
            container.appendChild(evento);
        });
    }
}