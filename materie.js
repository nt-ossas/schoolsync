var i = 0;
var subjects = [];

function add(subjectIndex) {
    var voto = parseFloat(document.getElementById("voto-" + subjectIndex).value);
    var peso = parseFloat(document.getElementById("peso-" + subjectIndex).value);
    peso = Number(peso);

    if (peso < 1 || peso > 100) {
        alert("L'intervallo deve andare da 1 a 100 coglione!");
        return;
    }

    if (isNaN(peso)) {
        alert("Ma che cazzo metti delle lettere nel peso");
        return;
    }

    subjects[subjectIndex].voti.push(voto);
    subjects[subjectIndex].pesi.push(peso);

    var tbody = document.getElementById("media-" + subjectIndex);
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    var td2 = document.createElement("td");
    td.textContent = voto;
    td2.textContent = peso + "%";

    tbody.appendChild(tr);
    tr.appendChild(td);
    tr.appendChild(td2);

    if (voto < 5) {
        td.style.backgroundColor = "rgba(238, 75, 43, .7)";
        td2.style.backgroundColor = "rgba(238, 75, 43, .7)";
    } 
    else if (voto < 6) {
        td.style.backgroundColor = "rgba(255, 165, 0, .7)";
        td2.style.backgroundColor = "rgba(255, 165, 0, .7)";
    } 
    else {
        td.style.backgroundColor = "rgba(34,139,34,.7)";
        td2.style.backgroundColor = "rgba(34,139,34,.7)";
    }

    var to6 = document.getElementById("to6-" + subjectIndex);
    to6.innerHTML = "";

    calc(subjectIndex);
    calculateTotalAverage();
}

function calc(subjectIndex) {
    var somma_voti = 0;
    var somma_pesi = 0;
    const mediaf = document.getElementById("mediaf-" + subjectIndex);
    const comment = document.getElementById("comment-" + subjectIndex);

    for (let j = 0; j < subjects[subjectIndex].voti.length; j++) {
        somma_voti += subjects[subjectIndex].voti[j] * subjects[subjectIndex].pesi[j];
        somma_pesi += subjects[subjectIndex].pesi[j];
    }

    if (somma_pesi === 0) {
        alert("Devi inserire almeno un voto!");
        mediaf.textContent = "";
        comment.textContent = "";
        return;
    }

    var media = somma_voti / somma_pesi;

    if (media >= 6) {
        mediaf.style.backgroundColor = "green";
    } else if (media < 5) {
        mediaf.style.backgroundColor = "red";
    } else if (media < 6) {
        mediaf.style.backgroundColor = "orange";
    }

    var button = document.querySelector("#materia button[onclick='cambio(" + subjectIndex + ")']");
    button.textContent = media.toFixed(2);
    button.style.backgroundColor = `${mediaf.style.backgroundColor}`;
    button.style.boxShadow = `0 0 10px 0 ${mediaf.style.backgroundColor}`;
    mediaf.style.boxShadow = `0 0 25px 0 ${mediaf.style.backgroundColor}`;
    comment.style.color = `${mediaf.style.backgroundColor}`;
    mediaf.textContent = media.toFixed(2);

    calculateTotalAverage();
}

function calculateNeededGrade(subjectIndex) {
    var somma_voti = 0;
    var somma_pesi = 0;
    var to6 = document.getElementById("to6-" + subjectIndex);

    for (let j = 0; j < subjects[subjectIndex].voti.length; j++) {
        somma_voti += subjects[subjectIndex].voti[j] * subjects[subjectIndex].pesi[j];
        somma_pesi += subjects[subjectIndex].pesi[j];
    }

    if (somma_pesi === 0) {
        alert("Devi inserire almeno un voto!");
        return;
    }

    var media = somma_voti / somma_pesi;

    if (media >= 6) {
        to6.textContent = "Hai già una media di 6 o superiore!";
        return;
    }

    var neededGrade = (6 * (somma_pesi + 100) - somma_voti) / 100;

    if (neededGrade > 9) {
        var remainingSommaPesi = 200;
        var requiredSum = 6 * (somma_pesi + remainingSommaPesi) - somma_voti;

        var grade1 = requiredSum / 2 / 100;
        var grade2 = requiredSum / 2 / 100;

        to6.textContent = "Per raggiungere una media di 6, devi prendere almeno " + grade1.toFixed(2) + " e " + grade2.toFixed(2) + " nei prossimi due esami col peso al 100%.";
    } else {
        to6.textContent = "Per raggiungere una media di 6, devi prendere almeno " + neededGrade.toFixed(2) + " al prossimo esame col peso al 100%.";
    }
}

function materia() {
    var newSubject = {
        voti: [],
        pesi: []
    };
    subjects.push(newSubject);

    var materia = document.getElementById("materia");
    var materia2 = document.createElement("li");
    materia.appendChild(materia2);
    materia2.classList.add("sub");
    materia2.innerHTML = `<button onclick="cambio(${i})" class="scegli">-</button><input type="text" placeholder="Materia..." id="i${i + 1}">`;

    var nuovaMateria = document.createElement("main");
    nuovaMateria.classList.add("materia");
    nuovaMateria.classList.add("translate-off");
    nuovaMateria.id = "materia-" + (i + 1);

    nuovaMateria.innerHTML = `
        <div class="main">
            <i class="fa-solid fa-arrow-left back" onclick="cambio(${i})"></i>
            <div class="grid">
                <label>Scegli il voto</label>
                <label>Scegli il peso</label>
                <select id="voto-${i}">
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
                <input type="text" placeholder="100%" value="100" id="peso-${i}">
            </div>
            <div class="flex-3">
                <button onclick="add(${i})" class="add" id="add-${i}" title="Aggiungi un voto"></button>
                <button onclick="calculateNeededGrade(${i})" class="calc-needed" id="calc-needed-${i}" title="Calcola che voti devi prendere per avere  la media del 6">6</button>
                <button onclick="removeAllVotes(${i})" class="remove-all" id="remove-all-${i}" title="Rimuovi tutti i voti di questa materia">-</button>
            </div>
            <table class="media">
                <thead>
                    <tr>
                        <th>Voti</th>
                        <th>Pesi</th>
                    </tr>
                </thead>
                <tbody id="media-${i}">
                </tbody>
            </table>
            <h1 class="mediaf" id="mediaf-${i}">-</h1>
            <h5 class="comment" id="comment-${i}"></h5>
            <h5 id="to6-${i}" style="text-align:center;"></h5>
        </div>
    `;

    document.body.appendChild(nuovaMateria);
    i++;
}

function removeAllVotes(subjectIndex) {
    subjects[subjectIndex].voti = [];
    subjects[subjectIndex].pesi = [];
    const mediaf = document.getElementById("mediaf-" + subjectIndex);
    var to6 = document.getElementById("to6-" + subjectIndex);
    var button = document.querySelector("#materia button[onclick='cambio(" + subjectIndex + ")']");
    var tbody = document.getElementById("media-" + subjectIndex);
    tbody.innerHTML = '';
    mediaf.style.backgroundColor = "#4A90E2";
    mediaf.style.boxShadow = `0 0 25px 0 ${mediaf.style.backgroundColor}`;
    mediaf.textContent = "-";
    button.textContent = "-";
    button.style.backgroundColor = `${mediaf.style.backgroundColor}`;
    button.style.boxShadow = `0 0 10px 0 ${mediaf.style.backgroundColor}`;
    to6.textContent = "Nessuna media calcolata";
    to6.style.color = `${mediaf.style.backgroundColor}`;
    to6.style.marginInline = "25%";

    calculateTotalAverage();
}

function cambio(subjectIndex) {
    var materias = document.querySelectorAll(".materia");
    materias.forEach(element => {
        element.classList.add("off");
    });
    var materiaSelezionata = document.querySelector("#materia-" + (subjectIndex + 1));
    materiaSelezionata.classList.toggle("off");
    materiaSelezionata.classList.toggle("translate-off");
    console.log("cambio " + (subjectIndex + 1));
    menu();
}

function calculateTotalAverage() {
    var totalSommaVoti = 0;
    var totalSommaPesi = 0;

    for (let subject of subjects) {
        for (let j = 0; j < subject.voti.length; j++) {
            totalSommaVoti += subject.voti[j] * subject.pesi[j];
            totalSommaPesi += subject.pesi[j];
        }
    }

    const mediaTotElement = document.getElementById("media-tot");
    if (totalSommaPesi === 0) {
        mediaTotElement.textContent = "-";
        mediaTotElement.style.backgroundColor = "#4A90E2";
        mediaTotElement.style.boxShadow = `0 0 25px 0 #4A90E2`;
        return;
    }

    var mediaTotale = totalSommaVoti / totalSommaPesi;
    mediaTotElement.textContent = mediaTotale.toFixed(2);

    if (mediaTotale >= 6) {
        mediaTotElement.style.backgroundColor = "green";
    } else if (mediaTotale < 5) {
        mediaTotElement.style.backgroundColor = "red";
    } else if (mediaTotale < 6) {
        mediaTotElement.style.backgroundColor = "orange";
    }

    mediaTotElement.style.boxShadow = `0 0 25px 0 ${mediaTotElement.style.backgroundColor}`;
}

function mat() {
    if (subjects.length === 0) {
        alert("Non ci sono materie da rimuovere!");
        return;
    }

    var subjectIndex = subjects.length - 1;
    subjects.pop();

    var materia = document.getElementById("materia");
    var lastMateriaElement = materia.lastElementChild;
    if (lastMateriaElement) {
        materia.removeChild(lastMateriaElement);
    }

    var lastMainElement = document.getElementById("materia-" + (subjectIndex + 1));
    if (lastMainElement) {
        document.body.removeChild(lastMainElement);
    }

    i--;

    calculateTotalAverage();
}

function menu() {
    var aside = document.getElementById("aside");
    aside.classList.toggle("translate");
}

//!aggiungi materia al caricamento della pagina
window.onload = function(){
    materia();
}