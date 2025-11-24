const fs = require("fs");
const path = require("path");

const DOMAIN = "https://www.easymathprint.com";
const DIST_DIR = path.join(__dirname, "dist");
const today = new Date().toISOString().slice(0, 10);

const worksheetConfig = require("./config.js").worksheetConfig;

if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR, { recursive: true });
}

console.log("📱 Generating social media snippets...");
console.log(`📅 Today's date: ${today}\n`);

const socialPosts = [];

Object.entries(worksheetConfig).forEach(([key, item]) => {
    const shouldPublish = !item.releaseDate || item.releaseDate <= today;
    if (!shouldPublish) return;
    
    const lang = item.lang || "en";
    const slug = item.slug || key;
    
    let url;
    if (lang === "en") {
        url = `${DOMAIN}/${slug}/`;
    } else {
        url = `${DOMAIN}/${lang}/${slug}/`;
    }
    
    const title = item.title.replace(" | EasyMathPrint", "").trim();
    const description = item.description;
    
    const tweet = `New free ${title} – Print & practice now 👉 ${url}`;
    const facebook = `${title}\n\n${description}\n\nDownload free: ${url}`;
    
    socialPosts.push({
        slug: slug,
        lang: lang,
        title: title,
        description: description,
        url: url,
        releaseDate: item.releaseDate,
        twitter: {
            text: tweet,
            maxLength: 280
        },
        facebook: {
            text: facebook,
            maxLength: 5000
        }
    });
});

const outputJSON = {
    generated: today,
    total: socialPosts.length,
    posts: socialPosts
};

fs.writeFileSync(
    path.join(DIST_DIR, "social_posts.json"),
    JSON.stringify(outputJSON, null, 2),
    "utf8"
);

console.log(`✅ Generated: ${socialPosts.length} social post snippets`);
console.log(`📄 Saved to: dist/social_posts.json`);
console.log(`\n🎉 Social snippets generation complete!`);

