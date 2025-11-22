# SSG Upgrade Output

## 1. template.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{title}}</title>
    <meta name="description" content="{{description}}">
    <link rel="canonical" href="{{canonical}}" />
    <script>
        window.PAGE_ID = "{{id}}";
    </script>
    <link rel="stylesheet" href="/style.css">
</head>
<body>
    <div id="app"></div>
    <script src="/main.js"></script>
</body>
</html>
```

## 2. build.js

```javascript
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
```

## 3. Example of Injected index.html Block

After running `build.js`, the placeholder `<!-- AUTO-GENERATED-LINKS -->` in `index.html` will be replaced with:

```html
                <div class="text-center mb-8">
                    <h1 class="text-5xl font-bold mb-4">🧮 EasyMathPrint</h1>
                    <p class="text-xl text-gray-600 mb-8">Free Printable Math Worksheets for Teachers and Parents</p>
                </div>
                
                <div class="homepage-grid" id="worksheet-grid">
                    <a href="/addition/" class="worksheet-card">
                        <h3>Addition Worksheets</h3>
                        <p>Free printable addition worksheets for students. Perfect for building basic math skills.</p>
                    </a>
                    <a href="/subtraction/" class="worksheet-card">
                        <h3>Subtraction Worksheets</h3>
                        <p>Free printable subtraction worksheets with no negative results. Great for early learners.</p>
                    </a>
                    <a href="/multiplication/" class="worksheet-card">
                        <h3>Multiplication Worksheets</h3>
                        <p>Free printable multiplication tables and practice worksheets. Builds foundational math skills.</p>
                    </a>
                    <!-- ... more links for all 22 worksheet types ... -->
                </div>
                
                <footer class="no-print text-center mt-12 text-gray-600 text-sm">
                    Generated for free at EasyMathPrint.com — © 2025
                </footer>
```

## 4. Example Generated Page (addition/index.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Addition Worksheets | EasyMathPrint</title>
    <meta name="description" content="Free printable addition worksheets for students. Perfect for building basic math skills.">
    <link rel="canonical" href="https://www.easymathprint.com/addition/" />
    <script>
        window.PAGE_ID = "addition";
    </script>
    <link rel="stylesheet" href="/style.css">
</head>
<body>
    <div id="app"></div>
    <script src="/main.js"></script>
</body>
</html>
```

## 5. Example sitemap.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.easymathprint.com/</loc>
    <lastmod>2025-01-27</lastmod>
  </url>
  <url>
    <loc>https://www.easymathprint.com/addition/</loc>
    <lastmod>2025-01-27</lastmod>
  </url>
  <url>
    <loc>https://www.easymathprint.com/subtraction/</loc>
    <lastmod>2025-01-27</lastmod>
  </url>
  <!-- ... more URLs for all 22 worksheet types ... -->
</urlset>
```

## Features

✅ **Google-friendly directory URLs**: All pages generated at `/key/index.html`  
✅ **Canonical tags**: Each page includes `<link rel="canonical" href="...">`  
✅ **Auto-generated sitemap.xml**: Complete sitemap with all URLs and lastmod dates  
✅ **Homepage auto-injection**: Links automatically injected into index.html  
✅ **Zero manual editing**: Everything is automated in the build process

