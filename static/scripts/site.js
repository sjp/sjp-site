var ALTERNATE_THEME = 'alternate';
var DARK_MODE_MEDIA_QUERY = '(prefers-color-scheme: dark)';
var LOCAL_STORAGE_THEME_KEY = 'themePreference';

var themeToggle = document.getElementById('theme-toggle');

var getThemePreference = function() {
    try {
        if (typeof Storage !== "undefined") {
            return localStorage.getItem('themePreference') || '';
        } else {
            return '';
        }
    } catch {
        // may not be available (e.g. under cookies blocked or incognito)
        return '';
    }
};

var toggleCheckbox = function() {
    themeToggle.checked = !themeToggle.checked;
}

var updateThemePreference = function(alternateThemeSelected) {
    var themePreference = alternateThemeSelected ? ALTERNATE_THEME  : '';
    try {
        if (typeof Storage !== "undefined") {
            localStorage.setItem('themePreference', themePreference);
        }
    } catch {
        // may not be available (e.g. under cookies blocked or incognito)
    }
};

var applyTheme = function() {
    var osDark = window.matchMedia &&
        window.matchMedia(DARK_MODE_MEDIA_QUERY).matches;
    var dark = themeToggle.checked ? !osDark : osDark;
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
};

var onColorSchemeChange = function(updateCheckbox) {
    if (updateCheckbox)
        toggleCheckbox();
    updateThemePreference(themeToggle.checked);
    applyTheme();
};

if (window.matchMedia) {
    window.matchMedia(DARK_MODE_MEDIA_QUERY)
        .addEventListener('change', () => onColorSchemeChange(true));
}

themeToggle.addEventListener('change', () => onColorSchemeChange(false));

var newCheckedState = getThemePreference() === ALTERNATE_THEME;
if (themeToggle.checked !== newCheckedState) {
    toggleCheckbox();
}
applyTheme();
