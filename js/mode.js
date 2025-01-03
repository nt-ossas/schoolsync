function applyTheme(theme) {
    const root = document.documentElement;

    if (theme === 'dark') {
        root.style.setProperty('--bg-color', '#0D0D1A');
        root.style.setProperty('--secondary-bg-color', '#1A1A33');
        root.style.setProperty('--text-color', '#E0E0FF');
        root.style.setProperty('--secondary-text-color', '#B3B3CC');
        root.style.setProperty('--nav-color', '#26264D');
        root.style.setProperty('--bg-green', 'rgba(47, 255, 0, 0.5)');
        root.style.setProperty('--bg-red', 'rgba(254, 25, 25, 0.5)');
        root.style.setProperty('--bg-orange', 'rgba(255, 140, 0, 0.5)');
        root.style.setProperty('--bg-blue', 'rgba(74, 144, 226, 0.5)');
        root.style.setProperty('--color-green', 'rgba(47, 255, 0, 1)');
        root.style.setProperty('--color-red', 'rgba(254, 25, 25, 1)');
        root.style.setProperty('--color-orange', 'rgba(255, 140, 0, 1)');
        root.style.setProperty('--color-blue', 'rgba(74, 144, 226, 1)');
    } else {
        root.style.setProperty('--bg-color', '#FFFFFF');
        root.style.setProperty('--secondary-bg-color', '#F0F0F0');
        root.style.setProperty('--text-color', '#000000');
        root.style.setProperty('--secondary-text-color', '#333333');
        root.style.setProperty('--nav-color', '#CCCCCC');
        root.style.setProperty('--bg-green', 'rgba(47, 255, 0, 0.2)');
        root.style.setProperty('--bg-red', 'rgba(254, 25, 25, 0.2)');
        root.style.setProperty('--bg-orange', 'rgba(255, 140, 0, 0.2)');
        root.style.setProperty('--bg-blue', 'rgba(74, 144, 226, 0.2)');
        root.style.setProperty('--color-green', 'rgba(47, 255, 0, 0.8)');
        root.style.setProperty('--color-red', 'rgba(254, 25, 25, 0.8)');
        root.style.setProperty('--color-orange', 'rgba(255, 140, 0, 0.8)');
        root.style.setProperty('--color-blue', 'rgba(74, 144, 226, 0.8)');
    }
}

function detectSystemTheme() {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const theme = darkModeMediaQuery.matches ? 'dark' : 'light';
    console.log(`System theme detected: ${theme}`);
    applyTheme(theme);
    darkModeMediaQuery.addEventListener('change', (e) => {
        const newTheme = e.matches ? 'dark' : 'light';
        console.log(`System theme changed to: ${newTheme}`);
        applyTheme(newTheme);
    });
}

document.addEventListener('DOMContentLoaded', detectSystemTheme);