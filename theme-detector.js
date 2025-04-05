(function () {
    const theme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = theme || (prefersDark ? 'dark' : 'light');

    if (currentTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.write('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/styles/github-dark.min.css">');
    } else {
      document.write('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/styles/github.min.css">');
    }
  })();