/**
 * build.js — 自动生成 /addition/ /subtraction/ 等目录页面
 * 使用 template.html 作为模版
 * 使用 worksheetConfig（从 config.js 导入）
 */

const fs = require("fs");
const path = require("path");

// 站点域名（用于 canonical & sitemap）
const DOMAIN = "https://www.easymathprint.com";
// 读取配置文件
const { worksheetConfig } = require("./config.js");

// 读取模板
const template = fs.readFileSync("./template.html", "utf8");

// sitemap 构建列表
let sitemapEntries = [];

// 输出目录
const outDir = "./dist";

// 清空 dist
if (fs.existsSync(outDir)) {
    fs.rmSync(outDir, { recursive: true });
}
fs.mkdirSync(outDir);

// 为每一个 key 创建对应子目录
Object.keys(worksheetConfig).forEach((key) => {
    const cfg = worksheetConfig[key];

    const pageDir = path.join(outDir, key);
    fs.mkdirSync(pageDir, { recursive: true });

    const canonical = `${DOMAIN}/${key}/`;

    // 用模板替换内容
    const html = template
        .replace(/{{id}}/g, key)
        .replace(/{{title}}/g, `${cfg.title} | EasyMathPrint`)
        .replace(/{{description}}/g, cfg.description)
        .replace(/{{canonical}}/g, canonical);

    // 写入 index.html
    fs.writeFileSync(path.join(pageDir, "index.html"), html, "utf8");

    // 加入 sitemap
    sitemapEntries.push(`
    <url>
        <loc>${canonical}</loc>
        <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    </url>`);
});

// 同时把主页 index.html 复制到 dist 根目录
fs.copyFileSync("./index.html", path.join(outDir, "index.html"));

// 生成 sitemap.xml
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.join("\n")}
</urlset>`;

fs.writeFileSync(path.join(outDir, "sitemap.xml"), sitemap, "utf8");

console.log("🎉 Build 完成！所有页面生成至 dist/");