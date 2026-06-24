try {
    if (localStorage.getItem('themePreference') === 'alternate') {
        document.getElementById('theme-toggle').checked = true;
    }
} catch (e) {}
