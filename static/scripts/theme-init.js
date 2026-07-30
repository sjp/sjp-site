try {
    var pref = localStorage.getItem('themePreference');
    var osDark = window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;
    var dark = pref === 'alternate' ? !osDark : osDark;
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    var toggle = document.getElementById('theme-toggle');
    if (toggle) toggle.checked = pref === 'alternate';
} catch (e) {}
