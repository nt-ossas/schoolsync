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
        votoText = Math.floor(voto) + 1 + "-";
    } else if (voto % 1 === 0.5) {
        votoText = Math.floor(voto) + "½";
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

    console.log(dayOfWeek);

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

//! materie
var j = 0;

function materia() {
    var container = document.getElementById('materia-container');

    // Create the materia div
    var materia = document.createElement("div");
    materia.classList.add("materia");
    materia.id = `materia-${j}`;

    // Add a title for the materia
    var title = document.createElement("input");
    title.setAttribute("placeholder", `Materia-${j}`);
    title.id = `materia-i-${j}`;
    materia.appendChild(title);

    // Create a container for voti and pesi
    var votiContainer = document.createElement("div");
    votiContainer.classList.add("voti-container");
    materia.appendChild(votiContainer);

    // Create the inner HTML content for the voti and pesi
    var addSection = document.createElement("div");
    addSection.classList.add("add");
    addSection.innerHTML = `
        <h5 class="avviso">Aggiungi valutazione</h5>
        <div class="grid-trio">
            <select id="voto-${j}">
                <option value="10">10</option>
                <option value="9.75">10-</option>
                <option value="9.5">9.5</option>
                <option value="9.25">9+</option>
                <option value="9">9</option>
                <option value="8.75">9-</option>
                <option value="8.5">8.5</option>
                <option value="8.25">8+</option>
                <option value="8">8</option>
                <option value="7.75">8-</option>
                <option value="7.5" selected>7.5</option>
                <option value="7.25">7+</option>
                <option value="7">7</option>
                <option value="6.75">7-</option>
                <option value="6.5">6.5</option>
                <option value="6.25">6+</option>
                <option value="6">6</option>
                <option value="5.75">6-</option>
                <option value="5.5">5.5</option>
                <option value="5.25">5+</option>
                <option value="5">5</option>
                <option value="4.75">5-</option>
                <option value="4.5">4.5</option>
                <option value="4.25">4+</option>
                <option value="4">4</option>
                <option value="3.75">4-</option>
                <option value="3.5">3.5</option>
                <option value="3.25">3+</option>
                <option value="3">3</option>
                <option value="2.75">3-</option>
                <option value="2.5">2.5</option>
                <option value="2.25">2+</option>
                <option value="2">2</option>
            </select>
            <input type="text" placeholder="Peso..." value="100" id="peso-${j}">
            <button type="submit" onclick="add(${j})" class="add"></button>
        </div>
    `;

    materia.appendChild(addSection);

    // Insert the new materia at the beginning of the container
    container.insertBefore(materia, container.firstChild);
    j++;
}