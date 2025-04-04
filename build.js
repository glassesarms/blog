const fs = require("fs");
const path = require("path");
const marked = require("marked");

const postsDir = path.join(__dirname, "posts");
const distDir = path.join(__dirname, "dist");
const template = fs.readFileSync("./template/post.html", "utf-8");

if (!fs.existsSync(distDir)) fs.mkdirSync(distDir);

const posts = fs.readdirSync(postsDir);

let indexLinks = "";

posts.forEach(file => {
    const markdown = fs.readFileSync(path.join(postsDir, file), "utf8");

    const lines = markdown.split("\n");
    const date = lines[0].trim();
    const title = lines.find(line => line.startsWith("# "))?.replace("# ", "").trim() || "Untitled";

    const htmlContent = marked.parse(markdown);

    const slug = file.replace(".md", "");
    const finalHtml = template
        .replace(/{{title}}/g, title)
        .replace("{{content}}", htmlContent);
    
    fs.writeFileSync(path.join(distDir, `${slug}.html`), finalHtml);

    indexLinks += `<li><a href="${slug}.html">${date} - ${title}</a></li>\n`;
});

const indexHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>glass arms</title>
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <main>
    <h1>glass arms</h1>
    <ul>${indexLinks}</ul>
  </main>
</body>
</html>
`;

fs.writeFileSync(path.join(distDir, "index.html"), indexHtml);