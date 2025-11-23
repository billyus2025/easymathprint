# Scheduled Release System - Implementation Notes

## Overview
The static site generator now supports scheduled publishing. Pages with a `releaseDate` in the future will not be generated until that date arrives.

## Changes Made

### 1. config.js
- Added optional `releaseDate` field to each worksheet configuration
- Format: `"YYYY-MM-DD"` (e.g., `"2025-12-01"`)
- If `releaseDate` is missing → page publishes immediately
- If `releaseDate` exists and is in the future → page is skipped during build

### 2. build.js
- Added date comparison logic at the start: `const today = new Date().toISOString().slice(0, 10)`
- Checks each item's `releaseDate` before generating
- Skips future-dated pages (no folder creation, no sitemap entry)
- Enhanced logging with scheduled items count
- Sitemap only includes published pages

## Usage Examples

### Immediate Publishing (No releaseDate)
```javascript
"subtraction": {
    title: "Subtraction Worksheets",
    // ... other fields
    // No releaseDate = publishes immediately
}
```

### Scheduled Publishing
```javascript
"multiplication": {
    title: "Multiplication Worksheets",
    // ... other fields
    releaseDate: "2025-12-01" // Will be published on or after Dec 1, 2025
}
```

### Already Published
```javascript
"addition": {
    title: "Addition Worksheets",
    // ... other fields
    releaseDate: "2024-01-01" // Already published (date in past)
}
```

## Build Output

When running `node build.js`, you'll see:

```
🚀 Starting build process...
📅 Today's date: 2025-01-27

⏳ Scheduled for future: multiplication (release on 2025-12-01)
✅ Generated: addition
✅ Generated: subtraction
✅ Generated: division
✅ Generated: mixed

📊 Build Summary:
   ✅ Published: 4 pages
   ⏳ Scheduled: 1 pages
   🗺️  Sitemap: 4 URLs

🎉 Build 完成！所有页面生成至 dist/
```

## Important Notes

1. **Date Format**: Always use `YYYY-MM-DD` format (ISO 8601 date format)
2. **Time Zone**: Uses system time zone for date comparison
3. **Sitemap**: Only published pages are included in sitemap.xml
4. **Homepage**: Homepage grid injection still works (only shows published pages if you filter there too)
5. **Re-running Builds**: Re-run `node build.js` daily to publish scheduled pages when their date arrives

## Preserved Features

All existing features remain unchanged:
- ✅ Homepage grid injection
- ✅ template.html insertion
- ✅ canonical tag generation
- ✅ folder creation
- ✅ sitemap.xml generation
- ✅ asset copying
- ✅ SEO metadata insertion

Only the release date filtering has been added.

