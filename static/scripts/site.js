var ALTERNATE_THEME = 'alternate';
var DARK_MODE_MEDIA_QUERY = '(prefers-color-scheme: dark)';
var LOCAL_STORAGE_THEME_KEY = 'themePreference';

var themeToggle = document.getElementById('theme-toggle');

var getThemePreference = function() {
    if (typeof(Storage) !== undefined) {
        return localStorage.getItem('themePreference') || '';
    } else {
        return '';
    }
};

var toggleCheckbox = function() {
    themeToggle.checked = !themeToggle.checked;
}

var updateThemePreference = function(alternateThemeSelected) {
    var themePreference = alternateThemeSelected ? ALTERNATE_THEME  : '';
    if (typeof(Storage) !== undefined) {
        localStorage.setItem('themePreference', themePreference);
    }
};

var onColorSchemeChange = function(updateCheckbox) {
    if (updateCheckbox)
        toggleCheckbox();
    updateThemePreference(themeToggle.checked);
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
