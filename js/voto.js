document.getElementById('calcolaVoto').addEventListener('click', function () {
    // Raccogli i valori dall'input
    const punteggioMassimo = parseFloat(document.getElementById('punteggioMassimo').value);
    const punteggioFatto = parseFloat(document.getElementById('punteggioFatto').value);
    const percentuale6 = parseFloat(document.getElementById('percentuale6').value);

    // Controllo validità input
    if (isNaN(punteggioMassimo) || isNaN(punteggioFatto) || isNaN(percentuale6)) {
        document.getElementById('risultato').textContent = 'Inserisci valori validi!';
        return;
    }

    if (punteggioMassimo <= 0 || percentuale6 <= 0 || percentuale6 > 100) {
        document.getElementById('risultato').textContent = 'Valori non validi, controlla i campi.';
        return;
    }

    // Calcolo
    const punteggioPer6 = (punteggioMassimo * percentuale6) / 100;
    const voto = (punteggioFatto / punteggioPer6) * 6;

    // Mostra il risultato
    if (voto >= 0) {
        document.getElementById('risultato').textContent = `Il tuo voto è: ${voto.toFixed(2)}`;
        addVoteToUi(voto.toFixed(2));
    } else {
        document.getElementById('risultato').textContent = 'Errore nel calcolo, verifica i dati inseriti.';
    }
});

function addVoteToUi(voto){
    var tbody = document.getElementById("risultato");
    var tdVoto = document.createElement("div");

    tbody.innerHTML = "";

    tdVoto.textContent = voto;

    tbody.appendChild(tdVoto);

    if (voto < 5) {
        tdVoto.style.backgroundColor = "var(--bg-red)";
        tdVoto.style.color = "var(--color-red)";
    } else if (voto < 6) {
        tdVoto.style.backgroundColor = "var(--bg-orange)";
        tdVoto.style.color = "var(--color-orange)";
    } else {
        tdVoto.style.backgroundColor = "var(--bg-green)";
        tdVoto.style.color = "var(--color-green)";
    }
}