const daySelect = document.getElementById('daySelect');
        const selectedDay = document.getElementById('selectedDay');
        const scheduleList = document.getElementById('scheduleList');
        
        const today = new Date();
        const options = { weekday: 'long' };
        const currentDay = today.toLocaleDateString('it-IT', options);
        
        // Aggiungi il sabato
        const daysOfWeek = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
        
        // Popolamento del menu a discesa con i giorni della settimana
        daysOfWeek.forEach(day => {
            const option = document.createElement('option');
            option.value = day;
            option.textContent = day;
            daySelect.appendChild(option);
        });
        
        // Imposta il giorno di oggi nel select
        daySelect.value = currentDay.charAt(0).toUpperCase() + currentDay.slice(1); // Corregge il formato in modo che la prima lettera sia maiuscola
        
        // Carica l'orario dal local storage e visualizzalo nell'elenco
        function loadSchedule(day) {
            const schedule = JSON.parse(localStorage.getItem(day)) || {};
            const hours = [
                {subject: schedule.hour1 || '', classroom: schedule.class1 || ''},
                {subject: schedule.hour2 || '', classroom: schedule.class2 || ''},
                {subject: schedule.hour3 || '', classroom: schedule.class3 || ''},
                {subject: schedule.hour4 || '', classroom: schedule.class4 || ''},
                {subject: schedule.hour5 || '', classroom: schedule.class5 || ''},
                {subject: schedule.hour6 || '', classroom: schedule.class6 || ''}
            ];

            // Pulisce l'elenco precedente
            scheduleList.innerHTML = '';

            // Aggiunge le materie all'elenco
            hours.forEach((item, index) => {
                if (item.subject || item.classroom) {
                    const li = document.createElement('li');
                    li.textContent = `${item.subject} - ${item.classroom}`;
                    scheduleList.appendChild(li);
                }
            });
        }
        
        document.getElementById('saveBtn').addEventListener('click', () => {
            const day = daySelect.value;
            const schedule = {
                hour1: document.getElementById('hour1').value,
                class1: document.getElementById('class1').value,
                hour2: document.getElementById('hour2').value,
                class2: document.getElementById('class2').value,
                hour3: document.getElementById('hour3').value,
                class3: document.getElementById('class3').value,
                hour4: document.getElementById('hour4').value,
                class4: document.getElementById('class4').value,
                hour5: document.getElementById('hour5').value,
                class5: document.getElementById('class5').value,
                hour6: document.getElementById('hour6').value,
                class6: document.getElementById('class6').value
            };
            localStorage.setItem(day, JSON.stringify(schedule));
        
            // Mostra la notifica
            const notification = document.getElementById('notification');
            notification.textContent = 'Orario salvato per ' + day;
            notification.classList.remove('hide'); // Assicurati che sia visibile
            notification.classList.add('show'); // Aggiungi la classe per mostrarla
        
            // Nascondi la notifica dopo 3 secondi
            setTimeout(() => {
                notification.classList.remove('show'); // Rimuovi la classe per nasconderla
                notification.classList.add('hide'); // Aggiungi la classe per l'animazione di scomparsa
            }, 1000);
        
            loadSchedule(day); // Carica subito l'orario dopo il salvataggio
        });              
        
        // Carica l'orario del giorno selezionato
        daySelect.addEventListener('change', (e) => {
            loadSchedule(e.target.value);
        });
        
        // Carica l'orario di oggi all'avvio
        loadSchedule(currentDay.charAt(0).toUpperCase() + currentDay.slice(1)); // Assicura che la prima lettera sia maiuscola        
