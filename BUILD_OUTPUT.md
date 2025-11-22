# Build Output Structure

After running `node build.js` or `python3 build.py`, the following structure will be generated:

```
dist/
├── index.html                    # Homepage with all worksheet links
├── addition/
│   └── index.html               # Addition worksheet page
├── subtraction/
│   └── index.html               # Subtraction worksheet page
├── multiplication/
│   └── index.html               # Multiplication worksheet page
├── division/
│   └── index.html               # Division worksheet page
├── mixed/
│   └── index.html               # Mixed operations worksheet page
├── fractions/
│   └── index.html               # Fraction worksheet page
├── place-value/
│   └── index.html               # Place value worksheet page
├── number-line/
│   └── index.html               # Number line worksheet page
├── money-counting/
│   └── index.html               # Money counting worksheet page
├── measurement/
│   └── index.html               # Measurement worksheet page
├── comparing-numbers/
│   └── index.html               # Comparing numbers worksheet page
├── patterns/
│   └── index.html               # Number pattern worksheet page
├── bar-graphs/
│   └── index.html               # Bar graph worksheet page
├── tally-charts/
│   └── index.html               # Tally chart worksheet page
├── probability/
│   └── index.html               # Probability worksheet page
├── coordinate-plane/
│   └── index.html               # Coordinate plane worksheet page
├── factors-multiples/
│   └── index.html               # Factors & multiples worksheet page
├── area-perimeter/
│   └── index.html               # Area & perimeter worksheet page
├── fraction-multiply/
│   └── index.html               # Fraction multiplication worksheet page
├── decimals/
│   └── index.html               # Decimal worksheet page
├── symmetry/
│   └── index.html               # Symmetry worksheet page
└── rounding/
    └── index.html               # Rounding worksheet page
```

## Total Pages Generated

- **1** homepage (`dist/index.html`)
- **22** worksheet pages (one per worksheet type)
- **Total: 23 static HTML files**

## URL Structure

All pages are accessible via clean, SEO-friendly URLs:

- `https://easymathprint.com/` → Homepage
- `https://easymathprint.com/addition/` → Addition worksheets
- `https://easymathprint.com/subtraction/` → Subtraction worksheets
- `https://easymathprint.com/multiplication/` → Multiplication worksheets
- ... and so on for all 22 worksheet types

## File Sizes

Each generated HTML file is:
- Self-contained (all CSS and JS inline)
- ~15-20 KB per page
- No external dependencies (except CDN resources)
- Fully functional offline (after CDN resources load)

## SEO Benefits

Each page includes:
- ✅ Unique `<title>` tag
- ✅ Unique `<meta name="description">` tag
- ✅ Clean URL structure
- ✅ Proper heading hierarchy
- ✅ Semantic HTML
- ✅ Fast load times (static files)



