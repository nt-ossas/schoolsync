// Funzione per caricare gli elementi dalla memoria
function loadItems() {
    if (window.innerWidth >) { //rompe if, non so perche ma funziona
        var items = JSON.parse(localStorage.getItem('todoItems')) || [];
        var ul = document.getElementById("todo-list");
        ul.innerHTML = '';

        // Ordina gli elementi mettendo quelli completati in fondo
        items.sort(function(a, b) {
            return a.completed - b.completed;
        });

        items.forEach(function(item) {
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(item.text));
            ul.appendChild(li);
            li.addEventListener("click", toggleItem);

            // Aggiungi il pulsante Delete
            var deleteButton = document.createElement("button");
            deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
            deleteButton.className = "delete-button";
            deleteButton.onclick = function() {
                li.style.animation = "slideOutLeft 0.5s forwards";
                setTimeout(function() {
                    ul.removeChild(li);
                    saveItems(); // Salva gli elementi dopo la rimozione
                }, 500);
            };
            li.appendChild(deleteButton);

            // Imposta lo stato completato se necessario
            if (item.completed) {
                li.classList.add("completed");
            }
        });
    }
}

// Funzione per aggiungere un elemento
function addItem() {
    if (window.innerWidth > 600) {
        return; // Non aggiungere elementi se lo schermo è grande
    }

    var input = document.getElementById("todo-input").value;
    if (input === '') {
        alert("Scrivi qualcosa non fare il comunista");
        return;
    }

    var ul = document.getElementById("todo-list");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(input));

    // Aggiungi il pulsante Delete
    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    deleteButton.className = "delete-button";
    deleteButton.onclick = function() {
        li.style.animation = "slideOutLeft 0.5s forwards";
        setTimeout(function() {
            ul.removeChild(li);
            saveItems(); // Salva gli elementi dopo la rimozione
        }, 500);
    };
    li.appendChild(deleteButton);

    ul.insertBefore(li, ul.childNodes[0]);
    document.getElementById("todo-input").value = "";
    li.addEventListener("click", toggleItem);
    saveItems(); // Salva gli elementi dopo l'aggiunta
}

// Funzione per spostare l'elemento selezionato in cima alla lista e poi in basso quando viene deselezionato
function toggleItem() {
    if (window.innerWidth > 600) {
        return; // Non gestire il toggle se lo schermo è grande
    }

    var ul = document.getElementById("todo-list");
    var selectedItem = this;

    selectedItem.classList.toggle("completed");
    if (selectedItem.classList.contains("completed")) {
        // Sposta l'elemento completato in fondo alla lista
        ul.appendChild(selectedItem);
    } else {
        // Sposta l'elemento non completato in cima alla lista
        ul.insertBefore(selectedItem, ul.childNodes[0]);
    }
    saveItems(); // Salva gli elementi dopo aver cambiato lo stato di completamento
}

// Funzione per salvare gli elementi nella memoria
function saveItems() {
    if (window.innerWidth > 600) {
        return; // Non salvare se lo schermo è grande
    }

    var ul = document.getElementById("todo-list");
    var items = [];
    for (var i = 0; i < ul.children.length; i++) {
        var li = ul.children[i];
        var itemText = li.childNodes[0].textContent; // Prendi solo il testo, non il pulsante Delete
        var completed = li.classList.contains("completed");
        items.push({ text: itemText, completed: completed });
    }
    localStorage.setItem('todoItems', JSON.stringify(items));
}

// Carica gli elementi al caricamento della pagina
window.onload = function() {
    if (window.innerWidth > 600) {
        document.body.style.display = 'none';        
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="e404">
                <h2>404</h2>
                <h1>404 ERROR - DEVICE NOT SUPPORTED</h1>
                <h3>Try on something with a smaller screen</h3>
            </div>`;
        document.body.appendChild(div);
    } else {
        loadItems();
    }
};

document.getElementById("todo-input").addEventListener("keypress", addOnEnter);

// Funzione per aggiungere un elemento premendo il tasto "Invio"
function addOnEnter(event) {
    if (event.keyCode === 13) {
        addItem();
    }
}