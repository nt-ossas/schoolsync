function toggleTooltip(n) {
    var info = document.getElementById(`tooltip-${n}`);
    info.classList.toggle('hidden');
    info.classList.toggle('info-info');
}