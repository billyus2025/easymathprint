const fs = require("fs");
const path = require("path");
const config = require("./config.js");

const DOMAIN = "https://www.easymathprint.com";
const templatePath = path.join(__dirname, "template.html");
const indexPath = path.join(__dirname, "index.html");
const sitemapPath = path.join(__dirname, "sitemap.xml");

// Load template
let templateHTML = fs.readFileSync(templatePath, "utf8");

// Collect all URLs for sitemap
const allUrls = [];
const today = new Date().toISOString().split("T")[0];

console.log("🚀 Starting enhanced static site generation…");
console.log("📋 Domain:", DOMAIN);
console.log("📅 Lastmod date:", today);
console.log("");

// Step 1: Generate individual worksheet pages
Object.entries(config).forEach(([key, item]) => {
    const folderPath = path.join(__dirname, key);
    const canonicalUrl = `${DOMAIN}/${key}/`;

    // Create directory
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
        console.log("📁 Created folder:", key);
    }

    // Replace placeholders
    let finalHTML = templateHTML
        .replace(/{{title}}/g, item.title || key)
        .replace(/{{description}}/g, item.description || "")
        .replace(/{{id}}/g, key)
        .replace(/{{canonical}}/g, canonicalUrl);

    // Write generated HTML
    fs.writeFileSync(
        path.join(folderPath, "index.html"),
        finalHTML,
        "utf8"
    );

    // Collect URL for sitemap
    allUrls.push({
        loc: canonicalUrl,
        lastmod: today
    });

    console.log("✅ Generated:", `${key}/index.html`);
});

console.log("");

// Step 2: Generate sitemap.xml
console.log("🗺️  Generating sitemap.xml...");

let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${DOMAIN}/</loc>
    <lastmod>${today}</lastmod>
  </url>
`;

allUrls.forEach(url => {
    sitemapContent += `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
  </url>
`;
});

sitemapContent += `</urlset>`;

fs.writeFileSync(sitemapPath, sitemapContent, "utf8");
console.log("✅ Generated: sitemap.xml");
console.log("");

// Step 3: Inject homepage links into index.html
console.log("🏠 Injecting homepage links into index.html...");

if (!fs.existsSync(indexPath)) {
    console.log("⚠️  Warning: index.html not found. Skipping homepage injection.");
} else {
    let indexHTML = fs.readFileSync(indexPath, "utf8");
    
    // Check if placeholder exists
    if (!indexHTML.includes("<!-- AUTO-GENERATED-LINKS -->")) {
        console.log("⚠️  Warning: Placeholder <!-- AUTO-GENERATED-LINKS --> not found in index.html");
        console.log("   Please add this placeholder where you want the links injected.");
    } else {
        // Generate the worksheet grid HTML
        // Note: We need to get icons from the full config if available
        // For now, we'll generate simple links that match the existing structure
        let worksheetGridHTML = `                <div class="text-center mb-8">
                    <h1 class="text-5xl font-bold mb-4">🧮 EasyMathPrint</h1>
                    <p class="text-xl text-gray-600 mb-8">Free Printable Math Worksheets for Teachers and Parents</p>
                </div>
                
                <div class="homepage-grid" id="worksheet-grid">
`;
        
        Object.entries(config).forEach(([id, item]) => {
            // Extract title without "| EasyMathPrint" suffix for display
            const displayTitle = item.title.replace(" | EasyMathPrint", "");
            worksheetGridHTML += `                    <a href="/${id}/" class="worksheet-card">
                        <h3>${displayTitle}</h3>
                        <p>${item.description}</p>
                    </a>
`;
        });
        
        worksheetGridHTML += `                </div>
                
                <footer class="no-print text-center mt-12 text-gray-600 text-sm">
                    Generated for free at EasyMathPrint.com — © ${new Date().getFullYear()}
                </footer>`;
        
        // Replace placeholder with generated HTML
        indexHTML = indexHTML.replace(
            /<!-- AUTO-GENERATED-LINKS -->/g,
            worksheetGridHTML
        );
        
        fs.writeFileSync(indexPath, indexHTML, "utf8");
        console.log("✅ Injected homepage links into index.html");
    }
}

console.log("");
console.log("🎉 Static site generation complete!");
console.log(`📊 Generated ${allUrls.length} worksheet pages`);
console.log(`🗺️  Sitemap: ${sitemapPath}`);
console.log(`🏠 Homepage: ${indexPath}`);
