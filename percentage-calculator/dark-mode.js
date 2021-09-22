const checkbox = document.querySelector('input[name=theme]');
let localTheme = localStorage.getItem('theme');

function enabeleDarkMode() {
  localStorage.setItem('theme', 'dark');
  document.documentElement.setAttribute('data-theme', 'dark');
}
function disableDarkMode() {
  localStorage.setItem('theme', 'light');
  document.documentElement.setAttribute('data-theme', 'light');
}

checkbox.addEventListener('change', function () {
  if (this.checked) {
    enabeleDarkMode();
  } else {
    disableDarkMode();
  }
});

if (localTheme === 'dark') enabeleDarkMode();

localTheme === 'dark'
  ? (document.getElementById('dn').checked = true)
  : (document.getElementById('dn').checked = false);
