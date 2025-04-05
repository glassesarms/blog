function setTheme(theme) {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  
    const btn = document.querySelector('.theme-toggle');
    if (btn) btn.textContent = theme === 'dark' ? 'light' : 'dark';
  }
  
  
  function toggleTheme() {
    const current = localStorage.getItem('theme') === 'dark' ? 'light' : 'dark';
    setTheme(current);
  }
  
  (function () {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = saved || (prefersDark ? 'dark' : 'light');
  
    setTheme(initialTheme);
  })();  