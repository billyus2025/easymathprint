/**
 * build.js — 自动生成 /addition/ /subtraction/ 等目录页面
 * 使用 template.html 作为模版
 * 使用 worksheetConfig（从 config.js 导入）
 * 支持计划发布：只生成 releaseDate <= today 的页面
 */

const fs = require("fs");
const path = require("path");

// 站点域名（用于 canonical & sitemap）
const DOMAIN = "https://www.easymathprint.com";

// 获取今天的日期（YYYY-MM-DD）
const today = new Date().toISOString().slice(0, 10);

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

console.log(`🚀 Starting build process...`);
console.log(`📅 Today's date: ${today}`);
console.log("");

// 统计信息
let publishedCount = 0;
let scheduledCount = 0;

// 为每一个 key 创建对应子目录
Object.keys(worksheetConfig).forEach((key) => {
    const cfg = worksheetConfig[key];
    
    // 检查 releaseDate
    const shouldPublish = !cfg.releaseDate || cfg.releaseDate <= today;
    
    if (!shouldPublish) {
        // 计划在未来发布，跳过生成
        console.log(`⏳ Scheduled for future: ${key} (release on ${cfg.releaseDate})`);
        scheduledCount++;
        return; // 跳过这个项目
    }
    
    // 可以发布，正常生成
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
        <lastmod>${today}</lastmod>
    </url>`);

    console.log(`✅ Generated: ${key}`);
    publishedCount++;
});

// 同时把主页 index.html 复制到 dist 根目录
fs.copyFileSync("./index.html", path.join(outDir, "index.html"));

// 生成 sitemap.xml（只包含已发布的页面）
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.join("\n")}
</urlset>`;

fs.writeFileSync(path.join(outDir, "sitemap.xml"), sitemap, "utf8");

console.log("");
console.log("📊 Build Summary:");
console.log(`   ✅ Published: ${publishedCount} pages`);
console.log(`   ⏳ Scheduled: ${scheduledCount} pages`);
console.log(`   🗺️  Sitemap: ${sitemapEntries.length} URLs`);
console.log("");
console.log("🎉 Build 完成！所有页面生成至 dist/");
