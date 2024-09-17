function aula() {
    const select = document.getElementById('class');
    const stampaContainer = document.querySelector('#stampa');
    const stampa = document.querySelector('#stampa span');
    const selectedOption = select.options[select.selectedIndex];
    const value = selectedOption.value;
    const root = document.documentElement;
    const boxs = document.querySelectorAll('.box');

    boxs.forEach(element => {
        element.classList.add('hidden');
    });

    if(value == 0){
        stampaContainer.classList.add('hidden');
        root.style.setProperty('--title', '#4A90E2');
        return;
    }

    stampaContainer.classList.remove('hidden');
    stampa.textContent = value.slice(0,-4);
    stampa.className = '';

    const centrale1 = document.getElementById('box-centrale1');
    const centrale2 = document.getElementById('box-centrale2');
    const centrale3 = document.getElementById('box-centrale3');
    const ospedale1 = document.getElementById('box-ospedale1');
    const ospedale2 = document.getElementById('box-ospedale2');
    const bunker = document.getElementById('box-bunker');
    const erigendo = document.getElementById('box-erigendo');
    const scaruffi = document.getElementById('box-scaruffi');
    const piramide = document.getElementById('box-piramide');

    if (selectedOption.id.includes('centrale')) {
        stampa.classList.add('red');
        root.style.setProperty('--title', '#D02727');
        if(value.slice(-1) == 1){
            centrale1.classList.remove('hidden');
        } else if(value.slice(-1) == 2){
            centrale2.classList.remove('hidden');
        } else{
            centrale3.classList.remove('hidden');
        }
    } else if (selectedOption.id.includes('ospedale')) {
        stampa.classList.add('green');
        root.style.setProperty('--title', 'green');
        if(value.slice(-1) == 1){
            ospedale1.classList.remove('hidden');
        } else{
            ospedale2.classList.remove('hidden');
        }
    } else if (selectedOption.id.includes('erigendo')) {
        stampa.classList.add('orange');
        root.style.setProperty('--title', 'orange');
        erigendo.classList.remove('hidden');
    } else if (selectedOption.id.includes('bunker')) {
        stampa.classList.add('blue');
        root.style.setProperty('--title', 'blue');
        bunker.classList.remove('hidden');
    } else if (selectedOption.id.includes('scaruffi')) {
        stampa.classList.add('magenta');
        root.style.setProperty('--title', '#EC22E3');
        scaruffi.classList.remove('hidden');
    } else if (selectedOption.id.includes('piramide')) {
        stampa.classList.add('ciano');
        root.style.setProperty('--title', '#55E1FA');
        piramide.classList.remove('hidden');
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    const overlay = document.querySelector('.overlay');

    images.forEach(image => {
        image.addEventListener('click', function() {
            overlay.classList.remove('hidden');

            this.classList.add('clicked');
        });
    });
    overlay.addEventListener('click', function(){
        overlay.classList.add('hidden');

        images.forEach(element => {
            element.classList.remove('clicked');
        });
    })
});
