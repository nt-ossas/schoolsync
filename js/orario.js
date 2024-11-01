const daySelect = document.getElementById('daySelect');
const selectedDay = document.getElementById('selectedDay');
const scheduleList = document.getElementById('scheduleList');

const today = new Date();
const options = { weekday: 'long' };
const currentDay = today.toLocaleDateString('it-IT', options);

// Include Sunday in the days of the week
const daysOfWeek = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];

// Populate the dropdown menu with the days of the week
daysOfWeek.forEach(day => {
    const option = document.createElement('option');
    option.value = day;
    option.textContent = day;
    daySelect.appendChild(option);
});

// Set today's day in the select element
daySelect.value = currentDay.charAt(0).toUpperCase() + currentDay.slice(1); // Ensure the first letter is capitalized

// Function to load the schedule from localStorage and display it in the list
function loadSchedule(day) {
    const schedule = JSON.parse(localStorage.getItem(day)) || {};

    // Carica i valori salvati negli input
    document.getElementById('hour1').value  = schedule.hour1 || '';
    document.getElementById('class1').value = schedule.class1 || '';
    document.getElementById('hour2').value  = schedule.hour2 || '';
    document.getElementById('class2').value = schedule.class2 || '';
    document.getElementById('hour3').value  = schedule.hour3 || '';
    document.getElementById('class3').value = schedule.class3 || '';
    document.getElementById('hour4').value  = schedule.hour4 || '';
    document.getElementById('class4').value = schedule.class4 || '';
    document.getElementById('hour5').value  = schedule.hour5 || '';
    document.getElementById('class5').value = schedule.class5 || '';
    document.getElementById('hour6').value  = schedule.hour6 || '';
    document.getElementById('class6').value = schedule.class6 || '';
}

// Event listener for saving the schedule
document.getElementById('saveBtn').addEventListener('click', () => {
    const day = daySelect.value;
    const schedule = {
        hour1 : document.getElementById('hour1').value,
        class1: document.getElementById('class1').value,
        hour2 : document.getElementById('hour2').value,
        class2: document.getElementById('class2').value,
        hour3 : document.getElementById('hour3').value,
        class3: document.getElementById('class3').value,
        hour4 : document.getElementById('hour4').value,
        class4: document.getElementById('class4').value,
        hour5 : document.getElementById('hour5').value,
        class5: document.getElementById('class5').value,
        hour6 : document.getElementById('hour6').value,
        class6: document.getElementById('class6').value
    };
    localStorage.setItem(day, JSON.stringify(schedule));

    // Show notification
    const notification = document.getElementById('notification');
    notification.textContent = 'Orario salvato per ' + day;
    notification.classList.remove('hide');
    notification.classList.add('show');

    // Hide the notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        notification.classList.add('hide');
    }, 1000);
    
    loadSchedule(day); // Load the schedule immediately after saving
});

// Event listener for changing the selected day
daySelect.addEventListener('change', (e) => {
    loadSchedule(e.target.value);
});

// Carica l'orario di oggi all'avvio
loadSchedule(currentDay.charAt(0).toUpperCase() + currentDay.slice(1));

const schedule3MInformatica = {
    lunedì   : { hour1: 'Telecomunicazioni', class1: '21.2', hour2: 'Informatica', class2: 'T6.1', hour3: 'Storia', class3: '12.1', hour4: 'Sistemi', class4: '12.1', hour5: 'Italiano', class5: '12.1', hour6: '', class6: '' },
    martedì  : { hour1: 'Matematica', class1: '10.1', hour2: 'Telecomunicazioni', class2: 'T4.1', hour3: 'Telecomunicazioni', class3: 'T4.1', hour4: 'Inglese', class4: '31.o', hour5: 'Italiano', class5: '31.o', hour6: 'Informatica', class6: '31.o' },
    mercoledì: { hour1: 'Motoria', class1: 'Pala-Pascal', hour2: 'Motoria', class2: 'Pala-Pascal', hour3: 'Org. Aziendale', class3: '72.p', hour4: 'Matematica', class4: '37.o', hour5: 'Inglese', class5: '37.o', hour6: '', class6: '' },
    giovedì  : { hour1: 'Religione', class1: '55.e', hour2: 'Inglese', class2: '43.b', hour3: 'Italiano', class3: '43.b', hour4: 'Italiano', class4: '43.b', hour5: 'Tepsit', class5: 'T2.1', hour6: 'Sistemi', class6: 'T2.1' },
    venerdì  : { hour1: 'Matematica', class1: '10.1', hour2: 'Informatica', class2: 'T3.1', hour3: 'Informatica', class3: 'T3.1', hour4: 'Tepsit', class4: 'T2.1', hour5: 'Sistemi', class5: 'T2.1', hour6: '', class6: '' },
    sabato   : { hour1: 'Italiano', class1: '31.o', hour2: 'Matematica', class2: '31.o', hour3: 'Inglese', class3: 'L1.o', hour4: 'Org. Aziendale', class4: 'A1.t', hour5: 'Informatica', class5: 'T2.1', hour6: '', class6: '' }
};

function load3m(){
    if(confirm(`Sei sicuro di voler caricare l'orario della 3M Informatico della scuola Blaise Pascal?`)) {
        load3MInformaticaWeek();
    }
}

function load3MInformaticaSchedule(day) {
    const schedule = schedule3MInformatica[day.toLowerCase()] || {};
    document.getElementById('hour1').value = schedule.hour1 || '';
    document.getElementById('class1').value = schedule.class1 || '';
    document.getElementById('hour2').value = schedule.hour2 || '';
    document.getElementById('class2').value = schedule.class2 || '';
    document.getElementById('hour3').value = schedule.hour3 || '';
    document.getElementById('class3').value = schedule.class3 || '';
    document.getElementById('hour4').value = schedule.hour4 || '';
    document.getElementById('class4').value = schedule.class4 || '';
    document.getElementById('hour5').value = schedule.hour5 || '';
    document.getElementById('class5').value = schedule.class5 || '';
    document.getElementById('hour6').value = schedule.hour6 || '';
    document.getElementById('class6').value = schedule.class6 || '';
}

function load3MInformaticaWeek() {
    ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'].forEach(day => {
        localStorage.setItem(day, JSON.stringify(schedule3MInformatica[day.toLowerCase()]));
    });
    loadSchedule(daySelect.value);
    const notification = document.getElementById('notification');
    notification.textContent = `Caricato l'orario della 3M Informatico per l'intera settimana con successo`;
    notification.classList.remove('hide');
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
        notification.classList.add('hide');
    }, 1000);
}