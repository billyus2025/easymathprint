#!/usr/bin/env python3
"""
Static Site Generator for EasyMathPrint
Generates SEO-friendly static HTML pages from template and config.
"""

import json
import os
from pathlib import Path

# Import config (convert from ES6 module to Python dict)
# For simplicity, we'll define it inline or load from a JSON file
# Since config.js uses ES6 export, we'll create a Python version

def load_config():
    """Load worksheet configuration."""
    # Read config.js and extract the config object
    config_path = Path(__file__).parent / 'config.js'
    
    if not config_path.exists():
        raise FileNotFoundError(f"config.js not found at {config_path}")
    
    # Read and parse the JavaScript config
    with open(config_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract the config object (simple parsing)
    # Find the export const worksheetConfig = { ... }
    start = content.find('export const worksheetConfig = {')
    if start == -1:
        raise ValueError("Could not find worksheetConfig in config.js")
    
    # Find matching brace
    brace_count = 0
    start_pos = content.find('{', start)
    end_pos = start_pos
    
    for i in range(start_pos, len(content)):
        if content[i] == '{':
            brace_count += 1
        elif content[i] == '}':
            brace_count -= 1
            if brace_count == 0:
                end_pos = i + 1
                break
    
    config_str = content[start_pos:end_pos]
    
    # Convert JavaScript object to Python dict
    # Replace JS syntax with Python syntax
    config_str = config_str.replace('export const worksheetConfig = ', '')
    config_str = config_str.replace('true', 'True')
    config_str = config_str.replace('false', 'False')
    config_str = config_str.replace('null', 'None')
    
    # Use eval (safe in this context as we control the input)
    try:
        config = eval(config_str)
    except:
        # Fallback: manual parsing
        import re
        config = {}
        pattern = r'"([^"]+)":\s*\{[^}]*"title":\s*"([^"]+)"[^}]*"icon":\s*"([^"]+)"[^}]*"type":\s*"([^"]+)"[^}]*"defaultRange":\s*(\d+)[^}]*"defaultCount":\s*(\d+)[^}]*"description":\s*"([^"]+)"'
        # This is complex, so let's use a simpler approach
        raise NotImplementedError("Please use build.js (Node.js) or convert config.js to JSON")
    
    return config

def load_config_from_json():
    """Alternative: Load from a JSON file if available."""
    json_path = Path(__file__).parent / 'config.json'
    if json_path.exists():
        with open(json_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    return None

def generate_homepage(config, dist_dir):
    """Generate the homepage listing all worksheets."""
    homepage_html = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Free Math Worksheet Generator | EasyMathPrint</title>
    <meta name="description" content="Generate free printable math worksheets for grades K–5. Includes addition, subtraction, multiplication, division, mixed practice, and answer keys. Perfect for teachers and parents worldwide.">
    
    <!-- TailwindCSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Font Awesome CDN -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <style>
        .homepage-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 1.5rem;
            margin-top: 2rem;
        }}
        
        .worksheet-card {{
            background: white;
            border-radius: 8px;
            padding: 1.5rem;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            transition: transform 0.2s, box-shadow 0.2s;
            text-decoration: none;
            display: block;
            color: inherit;
        }}
        
        .worksheet-card:hover {{
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }}
        
        .worksheet-card h3 {{
            font-size: 1.25rem;
            font-weight: bold;
            margin-bottom: 0.5rem;
            color: #1f2937;
        }}
        
        .worksheet-card p {{
            color: #6b7280;
            font-size: 0.9rem;
        }}
    </style>
</head>
<body class="bg-gray-100 min-h-screen">
    <div class="container mx-auto px-4 py-6">
        <div class="text-center mb-8">
            <h1 class="text-5xl font-bold mb-4">🧮 EasyMathPrint</h1>
            <p class="text-xl text-gray-600 mb-8">Free Printable Math Worksheets for Teachers and Parents</p>
        </div>
        
        <div class="homepage-grid">
'''
    
    for id, config_item in config.items():
        homepage_html += f'''            <a href="/{id}/" class="worksheet-card">
                <div class="text-4xl mb-3">{config_item['icon']}</div>
                <h3>{config_item['title']}</h3>
                <p>{config_item['description']}</p>
            </a>
'''
    
    homepage_html += f'''        </div>
        
        <footer class="text-center mt-12 text-gray-600 text-sm">
            Generated for free at EasyMathPrint.com — © {Path(__file__).stat().st_mtime // 31536000 + 1970}
        </footer>
    </div>
</body>
</html>'''
    
    with open(dist_dir / 'index.html', 'w', encoding='utf-8') as f:
        f.write(homepage_html)
    print(f'✓ Generated homepage: {dist_dir / "index.html"}')

def generate_worksheet_pages(config, dist_dir, template_path):
    """Generate individual worksheet pages."""
    # Read template
    with open(template_path, 'r', encoding='utf-8') as f:
        template = f.read()
    
    # Convert config to JSON for injection
    config_json = json.dumps(config).replace('<', '\\u003c')
    
    for id, config_item in config.items():
        # Create directory
        page_dir = dist_dir / id
        page_dir.mkdir(parents=True, exist_ok=True)
        
        # Replace placeholders
        page_html = template
        page_html = page_html.replace('__PAGE_ID__', id)
        page_html = page_html.replace('__PAGE_TITLE__', f"{config_item['title']} | EasyMathPrint")
        page_html = page_html.replace('__PAGE_DESCRIPTION__', config_item['description'])
        page_html = page_html.replace('__WORKSHEET_CONFIG__', config_json)
        
        # Write file
        with open(page_dir / 'index.html', 'w', encoding='utf-8') as f:
            f.write(page_html)
        print(f'✓ Generated: {dist_dir / id / "index.html"}')

def main():
    """Main build function."""
    print('🚀 Building static site...\n')
    
    base_dir = Path(__file__).parent
    dist_dir = base_dir / 'dist'
    template_path = base_dir / 'template.html'
    config_path = base_dir / 'config.js'
    
    # Check files exist
    if not template_path.exists():
        raise FileNotFoundError(f"template.html not found at {template_path}")
    if not config_path.exists():
        raise FileNotFoundError(f"config.js not found at {config_path}")
    
    # Create dist directory
    dist_dir.mkdir(exist_ok=True)
    
    # Try to load config from JSON first (if converted)
    config = load_config_from_json()
    
    if config is None:
        # Try to parse config.js directly
        print("⚠️  config.json not found. Attempting to parse config.js...")
        print("💡 Tip: For best results, use build.js (Node.js) or convert config.js to config.json")
        
        # Simple fallback: create a minimal config for demonstration
        # In production, you'd want to properly parse the JS file
        config = {
            "addition": {
                "title": "Addition Worksheets",
                "icon": "➕",
                "type": "addition",
                "defaultRange": 20,
                "defaultCount": 20,
                "description": "Addition practice for Grades K–3.",
                "ranges": [10, 20, 50, 100],
                "counts": [10, 20, 30]
            }
        }
        print("⚠️  Using minimal config. Please use build.js for full functionality.")
    
    # Generate pages
    generate_homepage(config, dist_dir)
    generate_worksheet_pages(config, dist_dir, template_path)
    
    print(f'\n✅ Build complete! Generated {len(config) + 1} pages.')
    print(f'📁 Output directory: {dist_dir}')

if __name__ == '__main__':
    main()



