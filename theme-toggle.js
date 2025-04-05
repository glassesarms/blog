function setTheme(theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  localStorage.setItem("theme", theme);

  const btn = document.querySelector(".theme-toggle");
  if (btn) btn.textContent = theme === "dark" ? "light" : "dark";

  updateHighlightTheme(theme);
}

function toggleTheme() {
  const current = localStorage.getItem("theme") === "dark" ? "light" : "dark";
  setTheme(current);
}

function updateHighlightTheme(theme) {
    const lightTheme = document.getElementById("hljs-light");
    const darkTheme = document.getElementById("hljs-dark");
  
    if (theme === "dark") {
      lightTheme.disabled = true;
      darkTheme.disabled = false;
    } else {
      lightTheme.disabled = false;
      darkTheme.disabled = true;
    }
  }  

(function () {
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = saved || (prefersDark ? "dark" : "light");

  setTheme(initialTheme);
})();
