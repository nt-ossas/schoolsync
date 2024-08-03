const checkPermission = () => {
    if (!('serviceWorker' in navigator)) {
        throw new Error('Nessun supporto per Service Worker!');
    }

    if (!('Notification' in window)) {
        throw new Error('Nessun supporto per le notifiche API');
    }
}

const registerSW = async () => {
    const registration = await navigator.serviceWorker.register('sw.js');
    return registration;
}

const requestNotPerm = async () => {
    const permission = await Notification.requestPermission();

    if (permission !== 'granted') {
        throw new Error('Accesso alle notifiche non consentito');
    } else {
        new Notification('Notifiche attivate!');
        newNot();
        scheduleDailyNotification();
        const not = document.querySelector('.not');
        if (not) not.remove();
    }
}

function newNot() {
    new Notification('Controlla dove è la tua aula!', {
        icon: 'img/logo.png'
    });
}

function scheduleDailyNotification() {
    const now = new Date();
    const targetTime = new Date();

    targetTime.setHours(7, 50, 0, 0);

    if (now > targetTime) {
        targetTime.setDate(targetTime.getDate() + 1);
    }

    const timeUntilTarget = targetTime - now;

    setTimeout(() => {
        newNot();

        setInterval(newNot, 24 * 60 * 60 * 1000); 
    }, timeUntilTarget);
}

checkPermission();
registerSW();
