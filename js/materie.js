var i = 0;
var subjects = [];

window.onload = function() {
    loadSubjects();
}

function saveSubjects() {
    localStorage.setItem('subjects', JSON.stringify(subjects));
    saveTotalAverage();
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
    const mediaTot = localStorage.getItem('mediaTot');
    const mediaTotElement = document.getElementById('media-tot-index');

    mediaTotElement.textContent = mediaTot;
    setTotalAverageStyle(mediaTot);
    if (mediaTot === null || mediaTot === "0.00" || mediaTot === 0.00 || isNaN(mediaTot)){
        mediaTotElement.textContent = "N.D.";
        mediaTotElement.style.backgroundColor = "";
    }
}

document.addEventListener("DOMContentLoaded", function() {
    loadTotalAverage();
});

function loadSubjects() {
    const storedSubjects = localStorage.getItem('subjects');
    if (storedSubjects) {
        subjects = JSON.parse(storedSubjects);
        subjects.forEach((subject, index) => {
            createSubject(index);
            subject.voti.forEach((voto, votoIndex) => {
                const peso = subject.pesi[votoIndex];
                const type = subject.tipologie[votoIndex];
                const date = subject.date[votoIndex];
                addVoteToUI(index, voto, peso, type, date);
            });
            document.getElementById(`i${index + 1}`).value = subject.name || `Materia ${index + 1}`;
            calc(index);
        });
    }

    const mediaTot = localStorage.getItem('mediaTot');
    if (mediaTot !== null && mediaTot !== 0.00) {
        document.getElementById('media-tot-index').textContent = mediaTot;
        setTotalAverageStyle(mediaTot);
    }
}

function setTotalAverageStyle(mediaTot) {
    const mediaTotElement = document.getElementById("media-tot-index");
    if (mediaTot >= 6) {
        mediaTotElement.style.backgroundColor = "var(--bg-green)";
    } else if (mediaTot < 5) {
        mediaTotElement.style.backgroundColor = "var(--bg-red)";
    } else {
        mediaTotElement.style.backgroundColor = "var(--bg-orange)";
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

    to6.textContent = '';

    addVoteToUI(subjectIndex, voto, peso, type, date);
    calc(subjectIndex);
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
    tdType.textContent = type === '1' ? "Scritto" : "Orale";
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
        tdVoto.style.backgroundColor = "rgba(238, 75, 43, .7)";
        tdPeso.style.backgroundColor = "rgba(238, 75, 43, .7)";
    } else if (voto < 6) {
        tdVoto.style.backgroundColor = "rgba(255, 165, 0, .7)";
        tdPeso.style.backgroundColor = "rgba(255, 165, 0, .7)";
    } else {
        tdVoto.style.backgroundColor = "rgba(34, 139, 34, .7)";
        tdPeso.style.backgroundColor = "rgba(34, 139, 34, .7)";
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
    document.getElementById("popup-tipologia").textContent = "Tipologia: " + (type === '1' ? "Scritto" : "Orale");
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
        comment.textContent = "";
        button.textContent = "N.D.";
        button.style.backgroundColor = "#4A90E2";
        return 0;
    }

    var media = somma_voti / somma_pesi;

    if (media >= 6) {
        mediaf.style.backgroundColor = "var(--bg-green)";
    } else if (media < 5) {
        mediaf.style.backgroundColor = "var(--bg-red)";
    } else if (media < 6) {
        mediaf.style.backgroundColor = "var(--bg-orange)";
    }

    button.textContent = media.toFixed(2);
    button.style.backgroundColor = `${mediaf.style.backgroundColor}`;
    comment.style.color = `${mediaf.style.backgroundColor}`;
    mediaf.textContent = media.toFixed(2);

    calculateTotalAverage();
    ins(subjectIndex, media);

    return media;
}

function ins(subjectIndex, media) {
    const gradeContainer = document.getElementById("grade-container");
    const avviso = document.getElementById("avviso");
    const existingGrade = document.getElementById(`ins-${subjectIndex}`);

    if (existingGrade) {
        existingGrade.remove();
    }

    if (media >= 6 || media === 0 || isNaN(media)) {
        // Se non ci sono medie insufficienti, mostra l'avviso corretto
        const insufficientGrades = subjects.some(subject => {
            const media = calc(subjects.indexOf(subject));
            return media < 6 && media !== 0 && !isNaN(media);
        });

        if (!insufficientGrades) {
            avviso.textContent = "Nessuna media insufficiente";
        } else {
            avviso.textContent = "";
        }
        return;
    } else {
        const gradeIns = document.createElement("div");
        gradeIns.id = `ins-${subjectIndex}`;

        if (media < 6) {
            gradeIns.style.backgroundColor = "var(--bg-orange)";
        }
        if (media < 5) {
            gradeIns.style.backgroundColor = "var(--bg-red)";
        }

        gradeIns.classList.add("grade");
        gradeIns.style.transform = "scale(.75)";
        gradeIns.textContent = media.toFixed(1);

        gradeContainer.insertBefore(gradeIns, gradeContainer.firstChild);
        avviso.textContent = "";
    }
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
            <i class="fa-solid fa-list-ul back" onclick="cambio(${index})"></i>
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
                    <option value="1"><i class="fa-solid fa-pen"></i> Scritto</option>
                    <option value="2"><i class="fa-solid fa-ear-listen"></i> Orale</option>
                </select>
                <input type="date" id="date-grade-${index}" class="piccolo" placeholder="Data">
            </div>
            <div class="grid-trio" style="margin-left:38px;">
                <button onclick="add(${index})" class="add" id="add-${index}" title="Aggiungi un voto"></button>
                <button onclick="calculateNeededGrade(${index})" class="calc-needed" id="calc-needed-${index}" title="Calcola che voti devi prendere per avere  la media del 6">6</button>
                <button onclick="removeAllVotes(${index})" class="remove-all" id="remove-all-${index}" title="Rimuovi tutti i voti di questa materia">-</button>
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
            <div class="spessore">zao</div>
        </div>
    `;

    document.body.appendChild(nuovaMateria);
}

function updateSubjectName(index) {
    var input = document.getElementById(`i${index + 1}`);
    subjects[index].name = input.value || `Materia ${index + 1}`;
    saveSubjects();
}

function removeAllVotes(subjectIndex) {
    removeLastVote(subjectIndex);
}

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
    menu();
}

function menu() {
    var aside = document.getElementById("aside");
    aside.classList.toggle("translate");
}

document.addEventListener("DOMContentLoaded", function() {
    const storedMateriaData = localStorage.getItem('materiaData');
    if (storedMateriaData) {
        const materiaData = JSON.parse(storedMateriaData);
        subjects = materiaData.subjects || [];
        loadSubjects();
    }
});

function saveTotalVotes() {
    const totalVotes = subjects.flatMap(subject => subject.voti);
    localStorage.setItem('totalVotes', JSON.stringify(totalVotes));
}

function loadTotalVotes() {
    const storedTotalVotes = localStorage.getItem('totalVotes');
    return storedTotalVotes ? JSON.parse(storedTotalVotes) : [];
}

document.addEventListener("DOMContentLoaded", function() {
    const storedMateriaData = localStorage.getItem('materiaData');
    if (storedMateriaData) {
        const materiaData = JSON.parse(storedMateriaData);
        subjects = materiaData.subjects || [];
        loadSubjects();
    }

    const totalVotes = loadTotalVotes();
    addVotesToGradeContainer(totalVotes);

    console.log('Total votes loaded:', totalVotes);
});

document.addEventListener("DOMContentLoaded", function() {
    const totalVotes = loadTotalVotes();
    addVotesToGradeContainer(totalVotes);

    console.log('Total votes loaded:', totalVotes);
});

function mat() {
    if (subjects.length === 0) {
        return;
    }

    var subjectIndex = subjects.length - 1;

    // Controlla se la materia ha dei voti
    if (subjects[subjectIndex].voti.length > 0) {
        confirm("Rimuovi tutti i voti dalla materia prima di eliminarla!");
    } else {
        // Se la materia non ha voti, procedi con l'eliminazione senza avviso
        subjects.pop();
        saveSubjects();

        // Rimuovi l'elemento visuale della materia
        var materia = document.getElementById("materia");
        var lastMateriaElement = materia.lastElementChild;
        if (lastMateriaElement) {
            lastMateriaElement.classList.add("remove");
            setTimeout(function() {
                materia.removeChild(lastMateriaElement);
            }, 280);
        }

        setTimeout(() => {
            location.reload();
        }, 280);

        // Ricarica i voti totali
        const totalVotes = loadTotalVotes();
        addVotesToGradeContainer(totalVotes);

        // Calcola nuovamente la media totale
        calculateTotalAverage();
    }
}

function removeVotesForSubject(subjectIndex) {
    // Rimuovi tutti i voti della materia
    subjects[subjectIndex].voti = [];
    subjects[subjectIndex].pesi = [];
    subjects[subjectIndex].tipologie = [];
    subjects[subjectIndex].date = [];

    // Salvataggio dei dati aggiornati
    saveSubjects();

    // Rimuovi le righe della tabella dei voti
    var tbody = document.getElementById("media-" + subjectIndex);
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
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

function removeAllVotes(subjectIndex) {
    removeLastVote(subjectIndex);
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
        return;
    }

    var mediaTotale = totalSommaVoti / totalSommaPesi;
    mediaTotElement.textContent = mediaTotale.toFixed(2);

    if (mediaTotale >= 6) {
        mediaTotElement.style.backgroundColor = "var(--bg-green)";
    } else if (mediaTotale < 5) {
        mediaTotElement.style.backgroundColor = "var(--bg-red)";
    } else if (mediaTotale < 6) {
        mediaTotElement.style.backgroundColor = "var(--bg-orange)";
    }

    saveTotalAverage();
}

function addVotesToGradeContainer(votes) {
    const gradeContainer = document.getElementById("grade-container-index");

    // Svuota il container prima di aggiungere nuovi voti
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
        // Aggiungi i voti al container
        votes.reverse().forEach(vote => {
            const gradeElement = document.createElement('div');
            gradeElement.classList.add('grade');

            // Adjust the display based on the decimal part of the vote
            let displayText = vote.toFixed(2);
            if (displayText.endsWith('.50')) {
                displayText = displayText.replace('.50', '½');
            } else if (displayText.endsWith('.25')) {
                displayText = displayText.replace('.25', '+');
            } else if (displayText.endsWith('.75')) {
                displayText = displayText.replace('.75', '−');
            } else if (displayText.endsWith('.00')) {
                displayText = displayText.replace('.00', '');
            }

            gradeElement.textContent = displayText;

            // Applica lo stile in base al valore del voto
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
