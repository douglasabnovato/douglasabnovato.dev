const body = document.querySelector("body"),
  sidebar = body.querySelector("nav"),
  toggle = body.querySelector(".toggle"),
  searchBtn = body.querySelector(".search-box"),
  modeSwitch = body.querySelector(".toggle-switch");

let modeDarkTheme = localStorage.getItem('mode-dark-theme');

if (modeDarkTheme) {
    body.classList.toggle("dark");
  }


toggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});

searchBtn.addEventListener("click", () => {
  sidebar.classList.remove("close");
});

modeSwitch.addEventListener("click", () => {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    localStorage.setItem('mode-dark-theme', true);
  } else {
    localStorage.removeItem('mode-dark-theme');
  }

});
