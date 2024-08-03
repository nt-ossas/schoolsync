//! alert pc version
window.onload = function() {
    if (window.innerWidth > 600) {
        document.body.innerHTML = `
    <div class="e404">
        <h2>404</h2>
        <h1>404 ERROR - DEVICE NOT SUPPORTED</h1>
        <h3>Try on something with a smaller screen</h3>
    </div>`;
    }
};