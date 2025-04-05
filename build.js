const fs = require("fs");
const path = require("path");
const { marked } = require("marked");
const hljs = require("highlight.js");
const { markedHighlight } = require("marked-highlight");

// Add marked-highlight middleware
marked.use(
  markedHighlight({
    highlight(code, lang) {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value;
      }
      return hljs.highlightAuto(code).value;
    },
  })
);

const postsDir = path.join(__dirname, "posts");
const distDir = path.join(__dirname, "dist");
const template = fs.readFileSync("./template/post.html", "utf-8");

if (!fs.existsSync(distDir)) fs.mkdirSync(distDir);

const posts = fs.readdirSync(postsDir);

let indexLinks = "";
const postData = [];

posts.forEach((file) => {
  const markdown = fs.readFileSync(path.join(postsDir, file), "utf8");

  const lines = markdown.split("\n");
  const date = lines[0].trim();
  const title =
    lines
      .find((line) => line.startsWith("# "))
      ?.replace("# ", "")
      .trim() || "Untitled";

  const contentLines = lines.slice(2);
  const cleanedMarkdown = contentLines.join("\n").trim();

  const htmlContent = marked.parse(cleanedMarkdown);

  const slug = file.replace(".md", "");

  postData.push({
    title,
    date,
    slug,
    htmlContent,
  });
});

postData.sort((a, b) => new Date(b.date) - new Date(a.date));

postData.forEach(({ title, date, slug, htmlContent }) => {
  const finalHtml = template
    .replace(/{{title}}/g, title)
    .replace(/{{date}}/g, date)
    .replace("{{content}}", htmlContent);

  fs.writeFileSync(path.join(distDir, `${slug}.html`), finalHtml);

  indexLinks += `
      <li class="post-link">
        <a href="${slug}.html">
          <span class="post-title">${title}</span>
          <span class="post-date date">${date}</span>
        </a>
      </li>
  `;
});

const indexTemplate = fs.readFileSync(
  path.join(__dirname, "template", "index.html"),
  "utf8"
);
const indexHtml = indexTemplate.replace("{{postList}}", indexLinks);

fs.copyFileSync(
  path.join(__dirname, "style.css"),
  path.join(distDir, "style.css")
);
fs.copyFileSync(
  path.join(__dirname, "theme-toggle.js"),
  path.join(distDir, "theme-toggle.js")
);
fs.copyFileSync(
  path.join(__dirname, "theme-detector.js"),
  path.join(distDir, "theme-detector.js")
);
fs.writeFileSync(path.join(distDir, "index.html"), indexHtml);
