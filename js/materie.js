var i = 0;
var subjects = [];

window.onload = function(){
    calculateTotalAverage();
}

function materia() {
    var newSubject = {
        voti: [],
        pesi: [],
        name: `Materia ${subjects.length + 1}`
    };
    subjects.push(newSubject);
    saveSubjects();

    createSubject(subjects.length - 1);
    i++;
}

//rimuovi ultima materia
function mat() {
    if (subjects.length === 0) {
        return;
    }

    var subjectIndex = subjects.length - 1;

    // Controlla se la materia ha dei voti
    if (subjects[subjectIndex].voti.length > 0) {
        alert("Rimuovi tutti i voti dalla materia prima di eliminarla!");
    } else {
        // Se la materia non ha voti, procedi con l'eliminazione senza avviso
        subjects.pop();
        saveSubjects(subjectIndex);

        // Rimuovi l'elemento visuale della materia
        var materia = document.getElementById("materia");
        var lastMateriaElement = materia.lastElementChild;
        if (lastMateriaElement) {
            lastMateriaElement.classList.add("remove");
            setTimeout(function() {
                materia.removeChild(lastMateriaElement);
            }, 280);
        }

        // Calcola nuovamente la media totale
        calculateTotalAverage();
    }
}

function createSubject(index) {
    var materia = document.getElementById("materia");
    var materia2 = document.createElement("li");
    materia.appendChild(materia2);
    materia2.classList.add("sub", "small");

    setTimeout(function() {
        materia2.classList.remove("small");
    }, 1);

    materia2.innerHTML = `<button onclick="cambio(${index})" class="scegli">N.D.</button><input type="text" placeholder="Materia ${index+1}" id="i${index + 1}" onblur="updateSubjectName(${index})">`;

    var nuovaMateria = document.createElement("main");
    nuovaMateria.classList.add("materia");
    nuovaMateria.classList.add("translate");
    nuovaMateria.id = "materia-" + (index + 1);

    nuovaMateria.innerHTML = `
        <div class="main">
            <div class="linea" onclick="cambio(${index})">
                <h3 id="nomeMateria"></h3>
            </div>
            <div class="grid">
                <label>Scegli il voto</label>
                <label>Scegli il peso</label>
                <select id="voto-${index}">
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
                <input type="text" placeholder="100%" value="100" id="peso-${index}">
                <label class="piccolo" style="margin-right:10px;">Tipologia</label>
                <label class="piccolo">Data</label>
                <select id="type-${index}" class="piccolo">
                    <option value="Scritto" selected>Scritto</option>
                    <option value="Orale">Orale</option>
                    <option value="Pratico">Pratico</option>
                </select>
                <input type="date" id="date-grade-${index}" class="piccolo" placeholder="Data">
            </div>
            <div class="grid-trio">
                <button onclick="add(${index})" class="add add-voto" id="add-${index}" title="Aggiungi un voto"></button>
                <button onclick="calculateNeededGrade(${index})" class="calc-needed" id="calc-needed-${index}" title="Calcola che voti devi prendere per avere  la media del 6"></button>
                <button onclick="removeLastVote(${index})" class="remove-all" id="remove-all-${index}" title="Rimuovi l'ultimo voto di questa materia"></button>
            </div>
            <table class="media">
                <thead>
                    <tr>
                        <th>Voti</th>
                        <th>Pesi</th>
                    </tr>
                </thead>
                <tbody id="media-${index}">
                </tbody>
            </table>
            <h1 class="mediaf" id="mediaf-${index}">N.D.</h1>
            <h5 class="comment" id="comment-${index}"></h5>
            <h5 id="to6-${index}" style="text-align:center;"></h5>
            <div class="spessore"></div>
        </div>
    `;

    document.body.appendChild(nuovaMateria);
}

//switch to set grades 
function cambio(subjectIndex) {
    var materias = document.querySelectorAll(".materia");
    var footer = document.querySelector("footer");
    materias.forEach(element => {
        element.classList.add("off");
    });
    footer.classList.toggle("off");
    var materiaSelezionata = document.querySelector("#materia-" + (subjectIndex + 1));
    materiaSelezionata.classList.toggle("off");
    materiaSelezionata.classList.toggle("translate");
    console.log("cambio " + (subjectIndex + 1));
    
    var aside = document.getElementById("aside");
    if(aside.classList.contains("translate")){
        setTimeout(() => {
            aside.classList.remove("noDisplay");
        }, 150);
        aside.classList.remove('translate');
    }else{
        setTimeout(() => {
            aside.classList.add("noDisplay");
        }, 300);
        aside.classList.add('translate');
    }
        
    
}

function add(subjectIndex) {
    var voto = parseFloat(document.getElementById("voto-" + subjectIndex).value);
    var peso = parseFloat(document.getElementById("peso-" + subjectIndex).value);
    peso = Number(peso);
    var type = document.getElementById("type-" + subjectIndex).value;
    var date = document.getElementById("date-grade-" + subjectIndex).value;
    var to6 = document.getElementById("to6-" + subjectIndex);
    if (!date) {
        var today = new Date();
        var day = ("0" + today.getDate()).slice(-2);
        var month = ("0" + (today.getMonth() + 1)).slice(-2);
        date = today.getFullYear() + "-" + month + "-" + day;
    }
    if (peso < 1 || peso > 100) {
        alert("L'intervallo deve andare da 1 a 100!");
        return;
    }
    if (isNaN(peso)) {
        alert("Il peso deve essere un numero!");
        return;
    }
    if (!subjects[subjectIndex].voti) subjects[subjectIndex].voti = [];
    if (!subjects[subjectIndex].pesi) subjects[subjectIndex].pesi = [];
    if (!subjects[subjectIndex].tipologie) subjects[subjectIndex].tipologie = [];
    if (!subjects[subjectIndex].date) subjects[subjectIndex].date = [];
    
    subjects[subjectIndex].voti.push(voto);
    subjects[subjectIndex].pesi.push(peso);
    subjects[subjectIndex].tipologie.push(type);
    subjects[subjectIndex].date.push(date);
    
    saveSubjects();
    saveTotalVotes();  // Salva i voti totali
    
    // Salva i pesi totali in localStorage
    var totalPesi = JSON.parse(localStorage.getItem('totalPesi')) || [];
    totalPesi.push(peso);
    localStorage.setItem('totalPesi', JSON.stringify(totalPesi));
    
    to6.textContent = '';
    addVoteToUI(subjectIndex, voto, peso, type, date);
    calc(subjectIndex);
    addVotesToGradeContainer(voto);
    calculateTotalAverage();
}

function removeLastVote(subjectIndex) {
    if (!subjects[subjectIndex] || subjects[subjectIndex].voti.length === 0) {
        return;
    }

    // Rimuovi l'ultimo voto
    subjects[subjectIndex].voti.pop();
    subjects[subjectIndex].pesi.pop();
    subjects[subjectIndex].tipologie.pop();
    subjects[subjectIndex].date.pop();

    // Salva i soggetti aggiornati
    saveSubjects();
    saveTotalVotes();  // Salva i voti totali aggiornati

    // Rimuovi l'ultima riga della tabella dei voti
    var tbody = document.getElementById("media-" + subjectIndex);
    if (tbody.lastChild) {
        tbody.removeChild(tbody.lastChild);
    }

    var to6 = document.getElementById("to6-" + subjectIndex);
    to6.textContent = '';

    // Calcola nuovamente la media per la materia
    calc(subjectIndex);

    // Calcola nuovamente la media totale
    calculateTotalAverage();
}

function addVoteToUI(subjectIndex, voto, peso, type, date) {
    var tbody = document.getElementById("media-" + subjectIndex);
    var tr = document.createElement("tr");
    var tdVoto = document.createElement("td");
    var tdPeso = document.createElement("td");
    var tdType = document.createElement("td");
    var tdDate = document.createElement("td");

    tdVoto.textContent = voto;
    tdPeso.textContent = peso + "%";
    tdType.textContent = type;
    tdDate.textContent = date;

    tr.appendChild(tdVoto);
    tr.appendChild(tdPeso);

    tbody.appendChild(tr);

    tr.dataset.subjectIndex = subjectIndex;
    tr.dataset.votoIndex = tbody.childElementCount - 1;
    tr.dataset.type = type;
    tr.dataset.date = date;
    tr.addEventListener('click', showPopup);

    if (voto < 5) {
        tdVoto.style.backgroundColor = "var(--bg-red)";
        tdPeso.style.backgroundColor = "var(--bg-red)";
        tdVoto.style.color = "var(--color-red)";
        tdPeso.style.color = "var(--color-red)";
    } else if (voto < 6) {
        tdVoto.style.backgroundColor = "var(--bg-orange)";
        tdPeso.style.backgroundColor = "var(--bg-orange)";
        tdVoto.style.color = "var(--color-orange)";
        tdPeso.style.color = "var(--color-orange)";
    } else {
        tdVoto.style.backgroundColor = "var(--bg-green)";
        tdPeso.style.backgroundColor = "var(--bg-green)";
        tdVoto.style.color = "var(--color-green)";
        tdPeso.style.color = "var(--color-green)";
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const votes = JSON.parse(localStorage.getItem('totalVotes')) || [];
    const pesi = JSON.parse(localStorage.getItem('totalPesi')) || []; // Assicurati di avere i pesi salvati in localStorage
    addVotesToGradeContainer(votes);
});

function addVotesToGradeContainer(votes) {
    const gradeContainer = document.getElementById("grade-container-index");
    if (!gradeContainer) {
        console.error("Grade container element not found!");
        return;
    }
    while (gradeContainer.firstChild) {
        gradeContainer.removeChild(gradeContainer.firstChild);
    }
    if (votes.length === 0) {
        const avviso = document.createElement('h4');
        avviso.textContent = "Ancora nessuna valutazione...";
        avviso.classList.add('avviso');
        avviso.id = 'avviso';
        gradeContainer.appendChild(avviso);
    } else {
        votes.reverse().forEach((vote) => {
            const gradeElement = document.createElement('div');
            gradeElement.classList.add('grade');
            let displayText = vote.toFixed(2);
            if (displayText.endsWith('.50')) {
                displayText = displayText.replace('.50', '½');
            } else if (displayText.endsWith('.25')) {
                displayText = displayText.replace('.25', '+');
            } else if (displayText.endsWith('.75')) {
                displayText = (vote + 1).toFixed(2);
                displayText = displayText.replace('.75', '−');
            } else if (displayText.endsWith('.00')) {
                displayText = displayText.replace('.00', '');
            }
            gradeElement.textContent = displayText;
            if (vote < 5) {
                gradeElement.style.backgroundColor = "var(--bg-red)";
                gradeElement.style.color = "var(--color-red)";
            } else if (vote < 6) {
                gradeElement.style.backgroundColor = "var(--bg-orange)";
                gradeElement.style.color = "var(--color-orange)";
            } else {
                gradeElement.style.backgroundColor = "var(--bg-green)";
                gradeElement.style.color = "var(--color-green)";
            }
            gradeContainer.appendChild(gradeElement);
        });
    }
}

function clearLocalStorageExceptSchedule() {
    if(confirm(`Sei sicuro di volere eliminare TUTTE le materie, TUTTI i voti e TUTTI i dati (tranne l'orario)? Questa è un'azione irriversibile`)){
        const keysToKeep = ['daySelect', 'selectedDay', 'scheduleList'];

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (!key.includes('orario') && !keysToKeep.includes(key)) {
                localStorage.removeItem(key);
            }
        }

        // Notifica per l'utente
        const notification = document.getElementById('notification');
        notification.textContent = 'Local storage pulito, ma i dati dell\'orario sono stati conservati!';
        notification.classList.remove('hide');
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
            notification.classList.add('hide');
        }, 1000);
        location.reload();
    }
}

function showPopup(event) {
    var subjectIndex = event.currentTarget.dataset.subjectIndex;
    var votoIndex = event.currentTarget.dataset.votoIndex;

    var voto = subjects[subjectIndex].voti[votoIndex];
    var peso = subjects[subjectIndex].pesi[votoIndex];
    var type = subjects[subjectIndex].tipologie[votoIndex];
    var date = subjects[subjectIndex].date[votoIndex];

    var popup = document.getElementById("popup");
    var overlay = document.getElementById("overlay");

    document.getElementById("popup-voto").textContent = "Voto: " + voto;
    document.getElementById("popup-peso").textContent = "Peso: " + peso + "%";
    document.getElementById("popup-tipologia").textContent = "Tipologia: " + type;
    document.getElementById("popup-data").textContent = "Data: " + date;

    popup.style.display = "block";
    overlay.style.display = "block";
}

function closePopup() {
    var popup = document.getElementById("popup");
    var overlay = document.getElementById("overlay");

    popup.style.display = "none";
    overlay.style.display = "none";
}

function calc(subjectIndex) {
    var somma_voti = 0;
    var somma_pesi = 0;
    const mediaf = document.getElementById("mediaf-" + subjectIndex);
    const comment = document.getElementById("comment-" + subjectIndex);
    var button = document.querySelector("#materia button[onclick='cambio(" + subjectIndex + ")']");

    for (let j = 0; j < subjects[subjectIndex].voti.length; j++) {
        somma_voti += subjects[subjectIndex].voti[j] * subjects[subjectIndex].pesi[j];
        somma_pesi += subjects[subjectIndex].pesi[j];
    }

    if (somma_pesi === 0) {
        mediaf.textContent = "N.D.";
        mediaf.style.backgroundColor = "";
        mediaf.style.color = "";
        comment.textContent = "";
        button.textContent = "N.D.";
        button.style.backgroundColor = "";
        button.style.color = "";
        return 0;
    }

    var media = somma_voti / somma_pesi;

    if (media >= 6) {
        mediaf.style.backgroundColor = "var(--bg-green)";
        mediaf.style.color = "var(--color-green)";
    } else if (media < 5) {
        mediaf.style.backgroundColor = "var(--bg-red)";
        mediaf.style.color = "var(--color-red)";
    } else if (media < 6) {
        mediaf.style.backgroundColor = "var(--bg-orange)";
        mediaf.style.color = "var(--color-orange)";
    }

    button.textContent = media.toFixed(2);
    button.style.backgroundColor = `${mediaf.style.backgroundColor}`;
    button.style.color = `${mediaf.style.color}`;
    comment.style.color = `${mediaf.style.backgroundColor}`;
    mediaf.textContent = media.toFixed(2);

    calculateTotalAverage();

    return media;
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
        mediaTotElement.textContent = "N.D.";
        mediaTotElement.style.backgroundColor = "";
        mediaTotElement.style.color = "";
        return;
    }

    var mediaTotale = totalSommaVoti / totalSommaPesi;
    mediaTotElement.textContent = mediaTotale.toFixed(2);

    if (mediaTotale >= 6) {
        mediaTotElement.style.backgroundColor = "var(--bg-green)";
        mediaTotElement.style.color = "var(--color-green)";
    } else if (mediaTotale < 5) {
        mediaTotElement.style.backgroundColor = "var(--bg-red)";
        mediaTotElement.style.color = "var(--color-red)";
    } else if (mediaTotale < 6) {
        mediaTotElement.style.backgroundColor = "var(--bg-orange)";
        mediaTotElement.style.color = "var(--color-orange)";
    }

    saveTotalAverage();
}

//! LOCAL STORAGE
function saveSubjects() {
    localStorage.setItem('subjects', JSON.stringify(subjects)); // Salva anche il nome della materia
    saveTotalAverage();
}

function saveTotalVotes() {
    const totalVotes = subjects.flatMap(subject => subject.voti);
    localStorage.setItem('totalVotes', JSON.stringify(totalVotes));
}

function saveTotalAverage() {
    const totalSommaVoti = subjects.reduce((sum, subject) => {
        return sum + subject.voti.reduce((sumVoti, voto, index) => sumVoti + voto * subject.pesi[index], 0);
    }, 0);

    const totalSommaPesi = subjects.reduce((sum, subject) => {
        return sum + subject.pesi.reduce((sumPesi, peso) => sumPesi + peso, 0);
    }, 0);

    const mediaTotale = totalSommaPesi ? totalSommaVoti / totalSommaPesi : 0;
    localStorage.setItem('mediaTot', mediaTotale.toFixed(2));
}

function loadTotalAverage() {
    var mediaTotale = parseFloat(localStorage.getItem('mediaTot'));
    var mediaF = document.getElementById('media-tot-index');

    if (!mediaTotale || mediaTotale === 0) {
        mediaF.textContent = "N.D.";
        mediaF.style.backgroundColor = "";
        mediaF.style.color = "";
        return;
    }

    mediaF.textContent = mediaTotale.toFixed(2);

    if (mediaTotale >= 6) {
        mediaF.style.backgroundColor = "var(--bg-green)";
        mediaF.style.color = "var(--color-green)";
    } else if (mediaTotale < 5) {
        mediaF.style.backgroundColor = "var(--bg-red)";
        mediaF.style.color = "var(--color-red)";
    } else if (mediaTotale < 6) {
        mediaF.style.backgroundColor = "var(--bg-orange)";
        mediaF.style.color = "var(--color-orange)";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    loadTotalAverage();
});

function loadSubjects() {
    const storedSubjects = localStorage.getItem('subjects');
    if (storedSubjects) {
        subjects = JSON.parse(storedSubjects);
        subjects.forEach((subject, index) => {
            createSubject(index);
            document.getElementById(`i${index + 1}`).value = subject.name || `Materia ${index + 1}`;
            document.getElementById('nomeMateria').innerText = subjects[0].name || `Materia ${index + 1}`;
            subject.voti.forEach((voto, votoIndex) => {
                const peso = subject.pesi[votoIndex];
                const type = subject.tipologie[votoIndex];
                const date = subject.date[votoIndex];
                addVoteToUI(index, voto, peso, type, date);
            });
            calc(index);
        });
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    loadSubjects(); // Carica le materie dal localStorage
});

function updateSubjectName(subjectIndex) {
    var newName = document.getElementById(`i${subjectIndex + 1}`).value;
    subjects[subjectIndex].name = newName;
    document.getElementById('nomeMateria').innerText = newName;
    saveSubjects();
}