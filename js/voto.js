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
    } else {
        document.getElementById('risultato').textContent = 'Errore nel calcolo, verifica i dati inseriti.';
    }
});