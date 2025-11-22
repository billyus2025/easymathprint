# EasyMathPrint Static Site Generator

This project has been converted from a Single Page Application (SPA) to a Static Site Generator (SSG) for better SEO and performance.

## 📁 Project Structure

```
easymathprint/
├── config.js          # Worksheet configuration (ES6 module)
├── template.html      # HTML template with placeholders
├── build.js          # Node.js build script
├── build.py          # Python build script (alternative)
├── package.json      # Node.js dependencies
├── dist/             # Generated static site (created after build)
│   ├── index.html    # Homepage
│   ├── addition/
│   │   └── index.html
│   ├── subtraction/
│   │   └── index.html
│   ├── multiplication/
│   │   └── index.html
│   └── ... (20+ more worksheet pages)
└── README.md         # This file
```

## 🚀 Quick Start

### Using Node.js (Recommended)

```bash
# Build the static site
npm run build

# Or directly with Node.js
node build.js
```

### Using Python

```bash
# Make build.py executable
chmod +x build.py

# Run the build script
python3 build.py
```

## 📦 Generated Output

After running the build script, you'll get:

- **`dist/index.html`** - Homepage listing all worksheets
- **`dist/{worksheet-id}/index.html`** - Individual worksheet pages

### Example URLs:
- `/` - Homepage
- `/addition/` - Addition worksheets
- `/subtraction/` - Subtraction worksheets
- `/multiplication/` - Multiplication worksheets
- ... and 20+ more pages

## 🔧 Configuration

Edit `config.js` to:
- Add new worksheet types
- Modify existing worksheet settings
- Update descriptions and metadata

## 🌐 Deployment

The `dist/` folder contains all static files ready for deployment to:
- GitHub Pages
- Netlify
- Vercel
- AWS S3
- Any static hosting service

## 📝 Build Process

1. Reads `config.js` to get all worksheet configurations
2. Loads `template.html` as the base template
3. For each worksheet in config:
   - Creates a folder: `dist/{id}/`
   - Generates `index.html` with:
     - `window.pageId = "{id}"`
     - Proper `<title>` and `<meta description>`
     - Injected worksheet configuration
4. Generates homepage with links to all worksheets

## ✅ Features

- ✅ SEO-friendly URLs (`/addition/` instead of `/?id=addition`)
- ✅ Static HTML files (no JavaScript routing needed)
- ✅ Proper meta tags for each page
- ✅ Fast page loads
- ✅ Works with any static hosting
- ✅ All original functionality preserved



