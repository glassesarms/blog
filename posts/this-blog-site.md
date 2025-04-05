05-04-2025
# this site
I'm writing this site in as close to vanilla JS as is convientent. The majority of the javascript is in the build file. The basic idea is that all of my blog posts are stored as markdown files in this blog's repository. Whenever `build.js` is ran, it converts all posts into html files using a `post.html` template with slug being the name of the file.

The build file will then create an index page, also from a template: `index.html` (who would have guessed). It fills a `<ul>` with the titles and dates of each of the posts that it has collated.

``` js
indexLinks += `
    <li class="post-link">
    <a href="${slug}.html">
        <span class="post-title">${title}</span>
        <span class="post-date">${date}</span>
    </a>
    </li>
`;

const indexTemplate = fs.readFileSync(
  path.join(__dirname, "template", "index.html"),
  "utf8"
);

const indexHtml = indexTemplate.replace("{{postList}}", indexLinks);
```

I've tried to keep the styling minimal, I think I like how the site looks, but I don't want to spend a large amount of time tweaking it or doing something wild, I'd just like to make posts on here every now and then and not have to worry about it. 

The only other slightly interesting piece of code in this site is the themeing, I'm sure this is nothing groundbreaking but normally this kinda stuff is handled for my by NextJS. I have two scripts; `theme-detector.js` and `theme-toggle.js`. The detector is injected at the top of each of the templates and check the browser's local storage to see if a theme preference is present.
``` javascript
//theme-detector.js
(function () {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  })();
```
Actually through writing this, I realised that I don't think I need both `theme-detector.js` and `theme-toggle.js`. The toggler includes a method that should do the same thing as the `theme-dector.js` script. 
``` javascript
//theme-toggle.js
(function () {
const saved = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = saved || (prefersDark ? 'dark' : 'light');

setTheme(initialTheme);
})();  
```
As you can see, in `theme-detector.js`, we get the theme from the local storage, and then add the dark class to the document. In `theme-toggle.js` we load the theme from the local storage, or the browser's preferences, and then call `setTheme(intialTheme)`. Here's what `setTheme()` does:
``` javascript
function setTheme(theme) {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  
    const btn = document.querySelector('.theme-toggle');
    if (btn) btn.textContent = theme === 'dark' ? 'light' : 'dark';
}
```
As you can see, this will also set the document class to dark if neccessary. What a silly boy I am. I'm gonna remove `theme-detector.js` now and have a look.

Ok so it does still work, but my problem is that the theme toggle script **must** be at the bottom of the body, so that the toggle button exists and it can update it's text value. This results in the page flashing white then transitioning to dark mode whenever a new page is loaded, I'm sure there's a better way to do this but I'm just gonna keep both scripts for now.

The only other thing I want to get out my head is that probably at some point this build file will take ages to run if I have a lot of posts in the folder, I'll figure that out whenever I get to that point, hopefully I'll be a lot smarter by then.

Anyways thats the site.