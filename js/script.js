window.onload = function(){
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

function saveEvents() {
    var eventElements = document.querySelectorAll(".event-element-2");
    var eventData = [];
    eventElements.forEach(element => {
        var content = {
            tipoProva: element.dataset.tipoProva,
            nomeProva: element.querySelector("h4").dataset.nomeProva,
            dataProva: element.querySelector("h4").dataset.dataProva
        };
        eventData.push(content);
    });
    console.log("Saving events: ", eventData); // Debug
    localStorage.setItem("events", JSON.stringify(eventData));
}

function verifica() {
    // Prendi i valori dal modulo
    const tipoProva = document.getElementById('verifica-interrogazione').value;
    const nomeProva = document.getElementById('nomeProva').value;
    let dataProva = document.getElementById('dataProva').value;
    const now = new Date();

    // Se la data è vuota, imposta quella di domani
    if (!dataProva) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        dataProva = tomorrow;
    } else {
        dataProva = new Date(dataProva);
    }

    // Controlla che i campi non siano vuoti
    if (nomeProva === "") {
        alert("Scrivi qualcosa, per favore!");
        return;
    }

    // Controlla che la data sia futura e nel range valido
    const today = new Date();
    const maxDate = new Date('2026-12-31');
    if (dataProva < today || dataProva > maxDate) {
        alert("La data deve essere compresa tra oggi e l'anno prossimo!");
        return;
    }

    // Calcola la data di notifica (un giorno prima alle 14:45)
    const notificaData = new Date(dataProva.getTime());
    notificaData.setDate(dataProva.getDate() - 1);
    notificaData.setHours(14, 45, 0, 0); // Assicuriamoci che l'orario sia esattamente 14:45:00

    // Verifica che il browser supporti le notifiche
    if (!('Notification' in window)) {
        alert('Il tuo browser non supporta le notifiche.');
        return;
    }

    // Chiede il permesso per le notifiche
    Notification.requestPermission().then(function(permission) {
        if (permission === 'granted') {
            // Imposta un timeout per inviare la notifica il giorno prima alle 14:45
            const timeout = notificaData.getTime() - now.getTime();
            setTimeout(function() {
                new Notification('Promemoria: ' + (tipoProva === 'ver' ? 'Verifica' : 'Interrogazione') + ' di ' + nomeProva, {
                    body: 'La tua ' + (tipoProva === 'ver' ? 'verifica' : 'interrogazione') + ' è domani!',
                    icon: './img/schoolsync_logo_500.png' // Opzionale: aggiorna con la tua icona
                });
            }, timeout);
        }
    });

    // Aggiungi la nuova prova all'elenco senza eliminare l'elemento esistente
    const evento = document.createElement("div");
    evento.classList.add("event-element-2", "event", "column", "small");
    evento.dataset.tipoProva = tipoProva;
    evento.innerHTML = `<h4 data-nome-prova="${nomeProva}" data-data-prova="${dataProva.toISOString()}">${tipoProva === 'ver' ? 'Verifica' : 'Interrogazione'}: ${nomeProva} <hr> ${dataProva.toLocaleDateString()}</h4>`;

    const deleteButton = document.createElement("button");
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

    const container = document.getElementById("scroll-2");
    container.appendChild(evento);

    const calendar = document.getElementById("element-2");
    if (calendar.classList.contains("first")) {
        evento.classList.add("hidden");
    }
    saveEvents();
}

function loadEvents() {
    var eventData = JSON.parse(localStorage.getItem("events"));
    if (eventData) {
        console.log("Loading events: ", eventData); // Debug
        eventData.forEach(event => {
            console.log("Loading event: ", event); // Debug
            var evento = document.createElement("div");
            evento.classList.add("event-element-2", "event", "column");
            evento.dataset.tipoProva = event.tipoProva;
            const dataProva = new Date(event.dataProva);
            evento.innerHTML = `<h4 data-nome-prova="${event.nomeProva}" data-data-prova="${dataProva.toISOString()}">${event.tipoProva === 'ver' ? 'Verifica' : 'Interrogazione'}: ${event.nomeProva} <hr> ${dataProva.toLocaleDateString()}</h4>`;

            const deleteButton = document.createElement("button");
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

            const container = document.getElementById("scroll-2");
            container.appendChild(evento);

            const calendar = document.getElementById("element-2");
            if (calendar.classList.contains("first")) {
                evento.classList.add("hidden");
            }
        });
    } else {
        console.log("No events found in localStorage."); // Debug
    }
}