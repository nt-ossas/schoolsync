var totalWeight = 0;
var media = 0;

function add() {
    var voto = parseFloat(document.getElementById("voto").value);
    var peso = parseFloat(document.getElementById("peso").value);

    if (isNaN(voto) || isNaN(peso) || voto < 2 || voto > 10 || peso <= 0) {
        alert("Inserisci un voto valido (compreso tra 2 e 10) e un peso maggiore di zero.");
        return;
    }

    totalWeight += peso;
    media = ((media * (totalWeight - peso)) + (voto * peso)) / totalWeight;

    var mediaTot = document.getElementById("media-tot");
    mediaTot.textContent = media.toFixed(2);

    var mediaColor;
    if (media < 5) {
        mediaColor = "rgba(238, 75, 43, .8)";
    } else if (media < 6) {
        mediaColor = "rgba(255, 165, 0, .8)";
    } else {
        mediaColor = "rgba(0, 128, 0, .8)";
    }
    mediaTot.style.backgroundColor = mediaColor;
    mediaTot.style.boxShadow = `0 0 10px ${mediaColor}`;

    var votoText = voto;
    if (voto % 1 === 0.25) {
        votoText = Math.floor(voto) + "+";
    } else if (voto % 1 === 0.75) {
        votoText = Math.floor(voto) + "-";
    } else if (voto % 1 === 0.5) {
        votoText = (Math.floor(voto)+1) + "½";
    }

    var votoElement = document.createElement("div");
    votoElement.textContent = votoText;
    votoElement.classList.add("grade");
    votoElement.dataset.voto = voto;
    votoElement.dataset.peso = peso;

    var container = document.getElementById("grade-container");
    container.insertBefore(votoElement, container.firstChild);

    if (voto < 5) {
        votoElement.style.backgroundColor = "rgba(238, 75, 43, .8)";
    } else if (voto < 6) {
        votoElement.style.backgroundColor = "rgba(255, 165, 0, .8)";
    } else {
        votoElement.style.backgroundColor = "rgba(0, 128, 0, .8)";
    }
    var avviso = document.getElementById("avviso");
    avviso.style.display = "none";
}

function show(n) {
    var scroll = document.getElementById(`element-${n}`);
    var scrollElements = document.querySelectorAll(`.event-element-${n}`);

    scroll.classList.toggle("first");
    scrollElements.forEach(element => {
        element.classList.toggle("hidden");
    });

    if (scroll.classList.contains("first")) {
        scroll.innerHTML = `<h4>${n === 2 ? 'Calendar' : 'News'}</h4><i class="fa-solid fa-circle-chevron-right" onclick="show(${n})"></i>`;
    } else {
        scroll.innerHTML = `<h4>${n === 2 ? 'Calendar' : 'News'}</h4><i class="fa-solid fa-circle-chevron-left" onclick="show(${n})"></i>`;
    }
}

function verifica() {
    var nomeProva = document.getElementById("nomeProva").value;
    var dataProva = document.getElementById("dataProva").value;

    if (nomeProva === "" || dataProva === "") {
        alert("Scrivi qualcosa porco dio");
        return;
    }

    var evento = document.createElement("div");
    evento.classList.add("event-element-2", "event", "column");
    evento.innerHTML = `<h4>${nomeProva} <hr> ${dataProva}</h4>`;

    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = `<i class="fa-solid fa-trash mini"></i>`;
    deleteButton.classList.add("delete-button");

    evento.appendChild(deleteButton);

    deleteButton.addEventListener("click", function() {
        evento.remove();
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
    newsElement.classList.add("news", "column", "event-element-1");
    newsElement.innerHTML = `<i class="fa-solid fa-file-invoice head" style="background-color:${colorNews};"></i><h4>${nomeNews}</h4>`;

    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = `<i class="fa-solid fa-trash mini"></i>`;
    deleteButton.classList.add("delete-button_news");

    newsElement.appendChild(deleteButton);

    deleteButton.addEventListener("click", function() {
        newsElement.remove();
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

    moduloElements.forEach(element => {
        element.classList.add("hidden");
    });

    if (orario) {
        orario.classList.toggle("hidden");
    }
}

function close() {
    var moduloElements = document.querySelectorAll(".modulo"); 
    console.log("Closing...");

    moduloElements.forEach(element => {
        element.classList.add("hidden");
    });
}