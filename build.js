const fs = require("fs");
const path = require("path");

// 加载配置
const { siteConfig, worksheetConfig } = require("./config.js");
const templateHTML = fs.readFileSync(path.join(__dirname, "template.html"), "utf8");

const DOMAIN = siteConfig.site_url || "https://www.easymathprint.com";
const DIST_DIR = path.join(__dirname, "dist");
const PDF_DIR = path.join(DIST_DIR, "pdf");
const today = new Date().toISOString().slice(0, 10);

// 多语言支持：当前启用的语言列表（暂时只启用英文，不生成 cn / es 目录）
const languages = ["en"]; // 未来可扩展为 ["en", "cn", "es"]

// 确保目录存在
if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR, { recursive: true });
}
if (siteConfig.enable_pdf_generation && !fs.existsSync(PDF_DIR)) {
    fs.mkdirSync(PDF_DIR, { recursive: true });
}

let publishedCount = 0;
let scheduledCount = 0;
let pdfGeneratedCount = 0;
const allUrls = [
    {
        loc: DOMAIN + "/",
        lastmod: today
    }
];
const publishedSlugs = []; // 用于PDF生成

console.log("🚀 Starting build process...");
console.log(`📅 Today's date: ${today}`);
console.log(`🌐 Site URL: ${DOMAIN}`);
console.log(`📊 Analytics: ${siteConfig.enable_analytics ? 'Enabled' : 'Disabled'}\n`);

// ====================================================================
// GA4 自动注入系统（100-Site Factory 标准）
// ====================================================================
function generateGA4Script() {
    // 优先使用 ga4 字段，如果没有则回退到 analytics_id（兼容旧配置）
    const ga4Id = siteConfig.ga4 || siteConfig.analytics_id;
    
    // 如果未启用或ID无效，返回空字符串
    if (!siteConfig.enable_analytics || !ga4Id || ga4Id === "G-XXXXXXXXXX") {
        return '';
    }
    
    // 生成标准 GA4 代码
    return `
    <!-- Google Analytics (GA4) - 100-Site Factory 自动注入 -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${ga4Id}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${ga4Id}');
    </script>`;
}

// ====================================================================
// 智能图标生成系统（根据slug自动生成主题图标）
// ====================================================================
function getIconForSlug(slug) {
    // 根据slug关键词自动匹配图标，保持简洁、教育风格统一
    const slugLower = slug.toLowerCase();
    
    // Addition 主题图标
    if (slugLower.includes('sums-within-10') || slugLower.includes('within-10')) return '🔟';
    if (slugLower.includes('sums-within-20') || slugLower.includes('within-20')) return '2️⃣0️⃣';
    if (slugLower.includes('double-digit')) return '🔢';
    if (slugLower.includes('single-digit') || slugLower.includes('vertical')) return '📊';
    if (slugLower.includes('missing-addends') || slugLower.includes('missing')) return '❓';
    if (slugLower.includes('three-numbers') || slugLower.includes('three')) return '3️⃣';
    if (slugLower.includes('word-problems') || slugLower.includes('word')) return '📝';
    if (slugLower.includes('doubles-facts') || slugLower.includes('doubles')) return '⚡';
    if (slugLower.includes('near-doubles') || slugLower.includes('near')) return '⚡';
    if (slugLower.includes('making-ten') || slugLower.includes('ten')) return '🔟';
    if (slugLower.includes('timed-drill') || slugLower.includes('timed')) return '⏱️';
    if (slugLower.includes('horizontal')) return '➡️';
    if (slugLower.includes('number-lines') || slugLower.includes('number-line')) return '📏';
    if (slugLower.includes('picture') || slugLower.includes('visual')) return '🖼️';
    if (slugLower.includes('mixed-practice') || slugLower.includes('mixed')) return '🔀';
    if (slugLower.includes('addition')) return '➕';
    
    // Subtraction 主题图标
    if (slugLower.includes('within-10') && slugLower.includes('subtract')) return '🔟';
    if (slugLower.includes('within-20') && slugLower.includes('subtract')) return '2️⃣0️⃣';
    if (slugLower.includes('fact-families') || slugLower.includes('families')) return '👨‍👩‍👧‍👦';
    if (slugLower.includes('comparing-differences') || slugLower.includes('comparing')) return '⚖️';
    if (slugLower.includes('within-100')) return '💯';
    if (slugLower.includes('two-digit')) return '🔢';
    if (slugLower.includes('subtraction')) return '➖';
    
    // Multiplication 主题图标
    if (slugLower.includes('times-2') || slugLower.includes('2x')) return '✖️2️⃣';
    if (slugLower.includes('times-3') || slugLower.includes('3x')) return '✖️3️⃣';
    if (slugLower.includes('times-4') || slugLower.includes('4x')) return '✖️4️⃣';
    if (slugLower.includes('times-5') || slugLower.includes('5x')) return '✖️5️⃣';
    if (slugLower.includes('times-6') || slugLower.includes('6x')) return '✖️6️⃣';
    if (slugLower.includes('times-7') || slugLower.includes('7x')) return '✖️7️⃣';
    if (slugLower.includes('times-8') || slugLower.includes('8x')) return '✖️8️⃣';
    if (slugLower.includes('times-9') || slugLower.includes('9x')) return '✖️9️⃣';
    if (slugLower.includes('times-10') || slugLower.includes('10x')) return '✖️🔟';
    if (slugLower.includes('multiplication')) return '✖️';
    
    // Division 主题图标
    if (slugLower.includes('by-2') || slugLower.includes('divide-2')) return '➗2️⃣';
    if (slugLower.includes('by-3') || slugLower.includes('divide-3')) return '➗3️⃣';
    if (slugLower.includes('by-4') || slugLower.includes('divide-4')) return '➗4️⃣';
    if (slugLower.includes('by-5') || slugLower.includes('divide-5')) return '➗5️⃣';
    if (slugLower.includes('by-6') || slugLower.includes('divide-6')) return '➗6️⃣';
    if (slugLower.includes('by-7') || slugLower.includes('divide-7')) return '➗7️⃣';
    if (slugLower.includes('by-8') || slugLower.includes('divide-8')) return '➗8️⃣';
    if (slugLower.includes('by-9') || slugLower.includes('divide-9')) return '➗9️⃣';
    if (slugLower.includes('by-10') || slugLower.includes('divide-10')) return '➗🔟';
    if (slugLower.includes('remainders')) return '🔢';
    if (slugLower.includes('division')) return '➗';
    
    // Fractions 主题图标
    if (slugLower.includes('like-denominators') || slugLower.includes('denominators')) return '🔢';
    if (slugLower.includes('equivalent')) return '🔄';
    if (slugLower.includes('comparing') && slugLower.includes('fraction')) return '⚖️';
    if (slugLower.includes('simplifying')) return '✨';
    if (slugLower.includes('visual')) return '👁️';
    if (slugLower.includes('mixed-numbers')) return '🔀';
    if (slugLower.includes('adding') && slugLower.includes('fraction')) return '➕';
    if (slugLower.includes('subtracting') && slugLower.includes('fraction')) return '➖';
    if (slugLower.includes('number-line') && slugLower.includes('fraction')) return '📏';
    if (slugLower.includes('parts-whole') || slugLower.includes('parts')) return '🧩';
    if (slugLower.includes('ordering')) return '🔢';
    if (slugLower.includes('unit-fractions')) return '1️⃣';
    if (slugLower.includes('decimal-conversion')) return '🔄';
    if (slugLower.includes('fractions')) return '🔢';
    
    // Mixed Operations 主题图标
    if (slugLower.includes('speed-drill')) return '⚡';
    if (slugLower.includes('order-operations') || slugLower.includes('order')) return '🔢';
    if (slugLower.includes('advanced')) return '🎯';
    if (slugLower.includes('timed-practice')) return '⏱️';
    if (slugLower.includes('challenge')) return '🏆';
    if (slugLower.includes('review')) return '📚';
    if (slugLower.includes('multi-step')) return '🔄';
    if (slugLower.includes('daily-practice')) return '📅';
    if (slugLower.includes('problem-solving')) return '🧩';
    if (slugLower.includes('mental-math')) return '🧠';
    if (slugLower.includes('estimation')) return '📊';
    if (slugLower.includes('patterns')) return '🔀';
    if (slugLower.includes('mastery')) return '⭐';
    if (slugLower.includes('mixed-operations')) return '🔀';
    
    // 默认图标（根据type）
    return '📝';
}

// ====================================================================
// PART 1-4: 生成所有工作表页面（多语言支持）
// ====================================================================
Object.entries(worksheetConfig).forEach(([key, item]) => {
    const itemLang = item.lang || "en";
    const slug = item.slug || key;
    
    // 只为启用的语言生成页面
    languages.forEach(lang => {
        // 获取多语言内容（兼容旧格式）
        const getTitle = (item, lang) => {
            if (typeof item.title === 'string') return item.title; // 兼容旧格式
            return item.title && item.title[lang] ? item.title[lang] : (item.title && item.title.en ? item.title.en : '');
        };
        
        const getDescription = (item, lang) => {
            if (typeof item.description === 'string') return item.description; // 兼容旧格式
            return item.description && item.description[lang] ? item.description[lang] : (item.description && item.description.en ? item.description.en : '');
        };
        
        const title = getTitle(item, lang);
        const description = getDescription(item, lang);
        
        // 如果当前语言没有内容，跳过（未来扩展时使用）
        if (!title || !description) {
            return;
        }
        
        // 根据slug自动生成主题图标
        const pageIcon = getIconForSlug(slug);
        
        // ====================================================================
        // 100-Site Factory — Global Immutable Directory Rules
        // 强制所有页面使用 /{slug}/index.html 格式
        // 禁止：/{slug}.html, /type/{slug}/, /{category}/{slug}/
        // ====================================================================
        let folderPath;
        let canonicalUrl;
        
        // 严格遵循规则：所有页面必须在根目录，使用 /{slug}/index.html
        // 即使未来支持多语言，也应该使用不同的slug（如 slug-cn），而不是子目录
        folderPath = path.join(DIST_DIR, slug);
        canonicalUrl = `${DOMAIN}/${slug}/`;

        const shouldPublish = !item.releaseDate || item.releaseDate <= today;

        if (!shouldPublish) {
            if (lang === "en") { // 只在英文时打印，避免重复
                console.log(`⏳ Scheduled for future: ${slug} (release on ${item.releaseDate})`);
            }
            scheduledCount++;
            return;
        }

        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }

        // PART 2: 自动生成OG图URL（占位符方案）
        const ogImage = siteConfig.enable_social_assets 
            ? (item.ogImage || `https://via.placeholder.com/1200x630.png?text=${encodeURIComponent(title)}`)
            : (item.ogImage || "https://www.easymathprint.com/assets/og-default.png");
        
        // 生成GA4脚本（使用统一的 GA4 自动注入系统）
        const gaScript = generateGA4Script();

        // ====================================================================
        // 全局安全能力注入：版权签名、指纹、Referrer检测
        // ====================================================================
        const crypto = require("crypto");
        const buildTimestamp = new Date().toISOString();
        const buildId = crypto.createHash('md5')
            .update(`${siteConfig.siteId}:${buildTimestamp}`)
            .digest('hex')
            .substring(0, 8); // 8位构建ID
        
        // 1. 版权 & 数字签名系统
        // 签名包含：slug、build time、siteId、siteGroup
        const pageSignature = crypto.createHash('sha256')
            .update(`${slug}:${buildTimestamp}:${siteConfig.siteId}:${siteConfig.siteGroup}`)
            .digest('hex')
            .substring(0, 12); // 12位短版签名hash
        
        const signatureMeta = {
            slug: slug,
            buildTime: buildTimestamp,
            siteId: siteConfig.siteId,
            siteGroup: siteConfig.siteGroup,
            signature: pageSignature
        };
        
        // 2. 站群追踪指纹（Site Fingerprinting）
        // 注入到 window.SITE_META 中
        const siteFingerprint = {
            siteId: siteConfig.siteId,
            siteGroup: siteConfig.siteGroup,
            buildId: buildId,
            buildTime: buildTimestamp
        };
        
        // 3. 防盗链（Referrer Check）脚本
        let securityScript = '';
        if (siteConfig.enableReferrerCheck) {
            const allowedReferrers = siteConfig.allowedReferrers || [];
            securityScript += `
    <!-- Referrer Check (防盗链) -->
    <script>
        (function() {
            const allowedReferrers = ${JSON.stringify(allowedReferrers)};
            const currentReferrer = document.referrer || '';
            const currentOrigin = window.location.origin;
            const isDirectAccess = currentReferrer === '';
            
            // 检查是否在白名单中
            const isAllowed = allowedReferrers.some(ref => {
                if (ref === '') return isDirectAccess;
                return currentReferrer.startsWith(ref) || currentOrigin.startsWith(ref);
            });
            
            // 非白名单来源访问时显示"Access Denied"
            if (!isAllowed && currentReferrer !== '') {
                document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:Arial,sans-serif;background:#f5f5f5;"><div style="text-align:center;padding:2rem;background:white;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.1);"><h1 style="color:#dc2626;margin:0 0 1rem 0;">Access Denied</h1><p style="color:#666;margin:0;">This content is protected by referrer check.</p></div></div>';
            }
        })();
    </script>`;
        }
        
        // 站群追踪指纹注入
        if (siteConfig.enableSiteFingerprint) {
            securityScript += `
    <!-- Site Fingerprinting (站群追踪指纹) -->
    <script>
        window.SITE_META = ${JSON.stringify(siteFingerprint)};
    </script>`;
        }
        
        // 版权签名数据（用于页面显示和meta标签）
        const copyrightSignature = siteConfig.enableSecuritySignature ? {
            siteId: siteConfig.siteId,
            siteGroup: siteConfig.siteGroup,
            buildTime: buildTimestamp,
            signature: pageSignature,
            owner: siteConfig.siteOwner,
            slug: slug
        } : null;
        
        // 生成签名 Meta 标签脚本
        let signatureMetaScript = '';
        if (siteConfig.enableSecuritySignature) {
            signatureMetaScript = `
    <!-- Copyright & Digital Signature Meta Tags -->
    <meta name="site-signature" content="${pageSignature}">
    <meta name="site-id" content="${siteConfig.siteId}">
    <meta name="site-group" content="${siteConfig.siteGroup}">
    <meta name="build-time" content="${buildTimestamp}">
    <meta name="page-slug" content="${slug}">`;
        }

        // 注入所有占位符（使用多语言内容）
        // 所有模板渲染时增加 { lang }，现阶段 lang 固定为 "en"
        let finalHTML = templateHTML
            .replace(/{{title\[lang\]}}/g, title)
            .replace(/{{title}}/g, title) // 兼容旧占位符
            .replace(/{{description\[lang\]}}/g, description)
            .replace(/{{description}}/g, description) // 兼容旧占位符
            .replace(/{{slug}}/g, slug)
            .replace(/{{lang}}/g, lang) // 渲染语言变量
            .replace(/{{pageIcon}}/g, pageIcon) // 页面图标
            .replace(/{{ogImage}}/g, ogImage)
            .replace(/{{canonical}}/g, canonicalUrl)
            .replace(/{{signature_meta_script}}/g, signatureMetaScript)
            .replace(/{{ga_script}}/g, gaScript)
            .replace(/{{security_script}}/g, securityScript)
            .replace(/{{copyright_signature}}/g, copyrightSignature ? JSON.stringify(copyrightSignature) : 'null')
            .replace(/{{worksheetConfig}}/g, JSON.stringify(worksheetConfig, null, 4));

        fs.writeFileSync(
            path.join(folderPath, "index.html"),
            finalHTML,
            "utf8"
        );

        allUrls.push({
            loc: canonicalUrl,
            lastmod: today
        });
        publishedSlugs.push({ slug, folderPath, canonicalUrl, lang });
        publishedCount++;
        console.log(`✅ Generated: ${lang === "en" ? "" : lang + "/"}${slug}/index.html`);

        // PART 2: 生成 social-post.txt
        if (siteConfig.enable_social_assets) {
            const socialPostContent = `${title}

${description}

${canonicalUrl}

#math #worksheet #homeschool #education #printable #${item.type} #grade1 #freemath`;
            
            fs.writeFileSync(
                path.join(folderPath, "social-post.txt"),
                socialPostContent,
                "utf8"
            );
        }
    });
});

// ====================================================================
// 未来语言扩展接口预埋（不启用）
// ====================================================================
// Future multilingual build:
// languages.forEach(lang => {
//   generatePageForLanguage(lang);
// });

function generatePageForLanguage(lang, item) {
    // reserved for future multilingual build
    // 当需要启用多语言时，此函数将处理特定语言的页面生成逻辑
}

// ====================================================================
// PART 1: PDF工厂（Puppeteer自动生成PDF）
// ====================================================================
async function generatePDFs() {
    if (!siteConfig.enable_pdf_generation) {
        console.log("\n📄 PDF generation disabled in config");
        return;
    }

    try {
        const puppeteer = require("puppeteer");
        console.log("\n📄 Starting PDF generation...");
        
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        for (const { slug, folderPath, canonicalUrl, lang } of publishedSlugs) {
            try {
                const htmlPath = path.join(folderPath, "index.html");
                const pdfPath = path.join(PDF_DIR, `${slug}.pdf`);
                
                const page = await browser.newPage();
                await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });
                
                await page.pdf({
                    path: pdfPath,
                    format: 'A4',
                    printBackground: true,
                    margin: {
                        top: '12mm',
                        right: '12mm',
                        bottom: '12mm',
                        left: '12mm'
                    },
                    displayHeaderFooter: false,
                    preferCSSPageSize: true
                });
                
                await page.close();
                pdfGeneratedCount++;
                console.log(`  ✅ PDF: ${slug}.pdf`);
            } catch (err) {
                console.log(`  ⚠️  PDF generation failed for ${slug}: ${err.message}`);
            }
        }

        await browser.close();
        console.log(`\n📄 PDF generation complete: ${pdfGeneratedCount} PDFs generated`);
    } catch (err) {
        if (err.code === 'MODULE_NOT_FOUND') {
            console.log("\n⚠️  Puppeteer not installed. Installing...");
            console.log("   Run: npm install puppeteer");
            console.log("   PDF generation skipped for this build.");
        } else {
            console.log(`\n⚠️  PDF generation error: ${err.message}`);
        }
    }
}

// ====================================================================
// 生成首页（分页系统）
// ====================================================================
console.log("\n📄 Generating homepage with pagination...");

// 收集所有已发布的页面，按 releaseDate 倒序排序（仅英文，首页暂时只显示英文）
const publishedPages = Object.entries(worksheetConfig)
    .filter(([key, item]) => {
        const shouldPublish = !item.releaseDate || item.releaseDate <= today;
        // 只收集英文内容（未来可扩展为多语言首页）
        const hasEnglishContent = typeof item.title === 'string' || (item.title && item.title.en);
        return shouldPublish && hasEnglishContent;
    })
    .map(([key, item]) => {
        const lang = "en"; // 首页暂时只显示英文
        const slug = item.slug || key;
        const href = `/${slug}/`;
        // 根据slug自动生成主题图标（使用智能图标生成系统）
        const pageIcon = getIconForSlug(slug);
        // 获取英文标题（兼容多语言结构）
        const getTitle = (item) => {
            if (typeof item.title === 'string') return item.title;
            return item.title && item.title.en ? item.title.en : '';
        };
        const getDescription = (item) => {
            if (typeof item.description === 'string') return item.description;
            return item.description && item.description.en ? item.description.en : '';
        };
        return {
            key,
            item: {
                ...item,
                title: getTitle(item),
                description: getDescription(item)
            },
            lang,
            slug,
            href,
            icon: pageIcon, // 使用智能生成的图标
            releaseDate: item.releaseDate || "9999-12-31" // 没有日期的排最后
        };
    })
    .sort((a, b) => b.releaseDate.localeCompare(a.releaseDate)); // 倒序：最新的在前

const PAGE_SIZE = 12;
const totalPages = Math.ceil(publishedPages.length / PAGE_SIZE);

console.log(`   Total published pages: ${publishedPages.length}`);
console.log(`   Total pagination pages: ${totalPages}`);

// 生成分页导航HTML
function generatePaginationHTML(currentPage, totalPages) {
    if (totalPages <= 1) return '';
    
    const prevPage = currentPage > 1 ? currentPage - 1 : null;
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;
    const prevHref = prevPage === 1 ? '/' : `/page${prevPage}.html`;
    const nextHref = `/page${nextPage}.html`;
    
    let paginationHTML = '<div class="flex justify-center items-center gap-4 mt-12 mb-8">';
    
    // Prev 按钮
    if (prevPage) {
        paginationHTML += `<a href="${prevHref}" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">« Prev</a>`;
    } else {
        paginationHTML += '<span class="px-4 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed">« Prev</span>';
    }
    
    // 页码信息
    paginationHTML += `<span class="px-4 py-2 text-gray-700 font-semibold">Page ${currentPage} of ${totalPages}</span>`;
    
    // Next 按钮
    if (nextPage) {
        paginationHTML += `<a href="${nextHref}" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Next »</a>`;
    } else {
        paginationHTML += '<span class="px-4 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed">Next »</span>';
    }
    
    paginationHTML += '</div>';
    return paginationHTML;
}

// 生成页面HTML
function generateHomepageHTML(pageNum, pages, totalPages) {
    const startIdx = (pageNum - 1) * PAGE_SIZE;
    const endIdx = startIdx + PAGE_SIZE;
    const currentPageItems = pages.slice(startIdx, endIdx);
    
    const isFirstPage = pageNum === 1;
    const isLastPage = pageNum === totalPages;
    const canonicalUrl = isFirstPage ? `${DOMAIN}/` : `${DOMAIN}/page${pageNum}.html`;
    const prevUrl = pageNum > 1 ? (pageNum === 2 ? `${DOMAIN}/` : `${DOMAIN}/page${pageNum - 1}.html`) : null;
    const nextUrl = pageNum < totalPages ? `${DOMAIN}/page${pageNum + 1}.html` : null;
    
    const cardsHTML = currentPageItems.map(({ item, href, icon }) => {
        const title = item.title.replace(" | EasyMathPrint", "").replace(" - Grade", "").replace(" Worksheets", "");
        return `            <a href="${href}" class="worksheet-card">
                <div class="icon">${icon}</div>
                <h3 class="font-bold text-lg">${title}</h3>
                <p class="text-gray-600 text-sm">${item.description}</p>
            </a>`;
    }).join("\n");
    
    const paginationHTML = generatePaginationHTML(pageNum, totalPages);
    
    let relLinks = '';
    if (prevUrl) {
        relLinks += `    <link rel="prev" href="${prevUrl}">\n`;
    }
    if (nextUrl) {
        relLinks += `    <link rel="next" href="${nextUrl}">\n`;
    }
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="shortcut icon" href="/favicon.svg">
    <title>${isFirstPage ? 'Free Printable Math Worksheets' : `Page ${pageNum} - Free Printable Math Worksheets`} | EasyMathPrint</title>
    <meta name="description" content="Free printable math worksheets for grades K–5. Includes addition, subtraction, multiplication, division, fractions, and more with full answer keys.">
    <link rel="canonical" href="${canonicalUrl}">
${relLinks}${generateGA4Script()}
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        .worksheet-card {
            background: white;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            transition: 0.2s;
            display: block;
            text-decoration: none;
            color: inherit;
        }
        .worksheet-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 4px 10px rgba(0,0,0,0.15);
        }
        .icon {
            font-size: 32px;
            margin-bottom: 8px;
        }
    </style>
</head>
<body class="bg-gray-100 min-h-screen">
    <header class="bg-white shadow-sm mb-4">
        <div class="container mx-auto px-4 py-3 flex items-center gap-3">
            <a href="/" class="flex items-center gap-3">
                <img src="/logo.svg" alt="EasyMathPrint logo" class="w-10 h-10">
                <div>
                    <div class="text-xl font-bold leading-tight">EasyMathPrint</div>
                    <div class="text-xs text-gray-500">Free printable math worksheets</div>
                </div>
            </a>
        </div>
    </header>

    <div id="ad-top" class="bg-gray-100 animate-pulse text-gray-400 text-center py-2 text-sm">
        Ad Space (728x90)
    </div>

    <div class="max-w-5xl mx-auto px-4 py-10">
        <h1 class="text-5xl font-bold text-center mb-6">🧮 EasyMathPrint</h1>
        <p class="text-xl text-center text-gray-600 mb-10">
            Free Printable Math Worksheets for Teachers and Parents
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
${cardsHTML}
        </div>

${paginationHTML}
        <footer class="text-center text-gray-600 text-sm mt-12">
            © ${new Date().getFullYear()} EasyMathPrint.com · All Worksheets Free
        </footer>
    </div>
</body>
</html>`;
}

// 生成所有分页
for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
    const html = generateHomepageHTML(pageNum, publishedPages, totalPages);
    const filename = pageNum === 1 ? 'index.html' : `page${pageNum}.html`;
    fs.writeFileSync(path.join(DIST_DIR, filename), html, "utf8");
    console.log(`  ✅ Generated: ${filename} (${(pageNum - 1) * PAGE_SIZE + 1}-${Math.min(pageNum * PAGE_SIZE, publishedPages.length)} of ${publishedPages.length})`);
    
    // 添加到 sitemap
    if (pageNum === 1) {
        // index.html 已经在 allUrls 中
    } else {
        allUrls.push({
            loc: `${DOMAIN}/page${pageNum}.html`,
            lastmod: today
        });
    }
}

// ====================================================================
// PART 5: 法律页面自动生成（AdSense必备）
// ====================================================================
if (siteConfig.enable_legal_pages) {
    console.log("\n📜 Generating legal pages...");
    
    // Privacy Policy
    const privacyPolicyHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <title>Privacy Policy | EasyMathPrint</title>
    <meta name="description" content="Privacy Policy for EasyMathPrint.com - Free printable math worksheets.">
    <link rel="canonical" href="${DOMAIN}/privacy-policy/">
${generateGA4Script()}
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 min-h-screen">
    <header class="bg-white shadow-sm mb-4">
        <div class="container mx-auto px-4 py-3">
            <a href="/" class="text-blue-600 hover:text-blue-800">← Back to Home</a>
        </div>
    </header>
    <div class="max-w-4xl mx-auto px-4 py-10">
        <h1 class="text-4xl font-bold mb-6">Privacy Policy</h1>
        <div class="bg-white rounded-lg shadow-lg p-8 prose max-w-none">
            <p class="text-gray-600 mb-4">Last updated: ${new Date().toLocaleDateString()}</p>
            <h2 class="text-2xl font-bold mt-6 mb-4">Information We Collect</h2>
            <p class="mb-4">EasyMathPrint.com is committed to protecting your privacy. We do not collect personal information from visitors to our website. Our website uses Google Analytics to understand how visitors use our site, which may collect anonymous usage data.</p>
            <h2 class="text-2xl font-bold mt-6 mb-4">Cookies</h2>
            <p class="mb-4">We use cookies to improve your experience on our website. You can disable cookies in your browser settings if you prefer.</p>
            <h2 class="text-2xl font-bold mt-6 mb-4">Third-Party Services</h2>
            <p class="mb-4">Our website may use third-party services such as Google Analytics and advertising networks. These services have their own privacy policies.</p>
            <h2 class="text-2xl font-bold mt-6 mb-4">Contact Us</h2>
            <p class="mb-4">If you have questions about this Privacy Policy, please contact us through our <a href="/contact/" class="text-blue-600 hover:underline">Contact Page</a>.</p>
        </div>
    </div>
</body>
</html>`;
    
    const privacyDir = path.join(DIST_DIR, "privacy-policy");
    if (!fs.existsSync(privacyDir)) fs.mkdirSync(privacyDir, { recursive: true });
    fs.writeFileSync(path.join(privacyDir, "index.html"), privacyPolicyHTML, "utf8");
    allUrls.push({ loc: `${DOMAIN}/privacy-policy/`, lastmod: today });
    console.log("  ✅ privacy-policy/index.html");

    // Terms of Service
    const termsHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <title>Terms of Service | EasyMathPrint</title>
    <meta name="description" content="Terms of Service for EasyMathPrint.com - Free printable math worksheets.">
    <link rel="canonical" href="${DOMAIN}/terms/">
${generateGA4Script()}
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 min-h-screen">
    <header class="bg-white shadow-sm mb-4">
        <div class="container mx-auto px-4 py-3">
            <a href="/" class="text-blue-600 hover:text-blue-800">← Back to Home</a>
        </div>
    </header>
    <div class="max-w-4xl mx-auto px-4 py-10">
        <h1 class="text-4xl font-bold mb-6">Terms of Service</h1>
        <div class="bg-white rounded-lg shadow-lg p-8 prose max-w-none">
            <p class="text-gray-600 mb-4">Last updated: ${new Date().toLocaleDateString()}</p>
            <h2 class="text-2xl font-bold mt-6 mb-4">Acceptance of Terms</h2>
            <p class="mb-4">By accessing and using EasyMathPrint.com, you accept and agree to be bound by these Terms of Service.</p>
            <h2 class="text-2xl font-bold mt-6 mb-4">Use License</h2>
            <p class="mb-4">All worksheets and content on EasyMathPrint.com are provided free of charge for personal and educational use. You may print and use these worksheets for non-commercial purposes.</p>
            <h2 class="text-2xl font-bold mt-6 mb-4">Prohibited Uses</h2>
            <p class="mb-4">You may not use our content for commercial purposes without permission. You may not redistribute our worksheets as your own work.</p>
            <h2 class="text-2xl font-bold mt-6 mb-4">Disclaimer</h2>
            <p class="mb-4">EasyMathPrint.com provides worksheets "as is" without warranties of any kind. We are not responsible for any errors or omissions.</p>
            <h2 class="text-2xl font-bold mt-6 mb-4">Contact Us</h2>
            <p class="mb-4">If you have questions about these Terms, please contact us through our <a href="/contact/" class="text-blue-600 hover:underline">Contact Page</a>.</p>
        </div>
    </div>
</body>
</html>`;
    
    const termsDir = path.join(DIST_DIR, "terms");
    if (!fs.existsSync(termsDir)) fs.mkdirSync(termsDir, { recursive: true });
    fs.writeFileSync(path.join(termsDir, "index.html"), termsHTML, "utf8");
    allUrls.push({ loc: `${DOMAIN}/terms/`, lastmod: today });
    console.log("  ✅ terms/index.html");

    // Contact Page
    const contactHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <title>Contact Us | EasyMathPrint</title>
    <meta name="description" content="Contact EasyMathPrint.com for questions, feedback, or support.">
    <link rel="canonical" href="${DOMAIN}/contact/">
${generateGA4Script()}
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 min-h-screen">
    <header class="bg-white shadow-sm mb-4">
        <div class="container mx-auto px-4 py-3">
            <a href="/" class="text-blue-600 hover:text-blue-800">← Back to Home</a>
        </div>
    </header>
    <div class="max-w-4xl mx-auto px-4 py-10">
        <h1 class="text-4xl font-bold mb-6">Contact Us</h1>
        <div class="bg-white rounded-lg shadow-lg p-8">
            <p class="mb-6 text-gray-700">We'd love to hear from you! If you have questions, feedback, or suggestions about EasyMathPrint.com, please reach out to us.</p>
            <div class="space-y-4">
                <div>
                    <h2 class="text-xl font-bold mb-2">Email</h2>
                    <p class="text-gray-600">contact@easymathprint.com</p>
                </div>
                <div>
                    <h2 class="text-xl font-bold mb-2">Website</h2>
                    <p class="text-gray-600"><a href="${DOMAIN}" class="text-blue-600 hover:underline">${DOMAIN}</a></p>
                </div>
            </div>
            <div class="mt-8 pt-8 border-t">
                <h2 class="text-xl font-bold mb-4">Other Pages</h2>
                <ul class="space-y-2">
                    <li><a href="/privacy-policy/" class="text-blue-600 hover:underline">Privacy Policy</a></li>
                    <li><a href="/terms/" class="text-blue-600 hover:underline">Terms of Service</a></li>
                </ul>
            </div>
        </div>
    </div>
</body>
</html>`;
    
    const contactDir = path.join(DIST_DIR, "contact");
    if (!fs.existsSync(contactDir)) fs.mkdirSync(contactDir, { recursive: true });
    fs.writeFileSync(path.join(contactDir, "index.html"), contactHTML, "utf8");
    allUrls.push({ loc: `${DOMAIN}/contact/`, lastmod: today });
    console.log("  ✅ contact/index.html");
}

// ====================================================================
// PART 4: 生成Sitemap（包含所有页面、首页分页和法律页面）
// ====================================================================
const finalSitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
  </url>`).join("\n")}
</urlset>`;

fs.writeFileSync(path.join(DIST_DIR, "sitemap.xml"), finalSitemapXML, "utf8");
console.log(`\n🗺️  Sitemap generated: ${allUrls.length} URLs`);

// ====================================================================
// PART 1: 执行PDF生成（在所有页面生成完成后）
// ====================================================================
generatePDFs().then(() => {
    console.log(`\n📊 Build Summary:`);
    console.log(`✅ Published: ${publishedCount} pages`);
    console.log(`⏳ Scheduled: ${scheduledCount} pages`);
    console.log(`📄 PDFs: ${pdfGeneratedCount} generated`);
    console.log(`🗺️  Sitemap: ${allUrls.length} URLs`);
    console.log(`\n🎉 Build complete! All pages generated to dist/`);
}).catch(err => {
    console.log(`\n📊 Build Summary:`);
    console.log(`✅ Published: ${publishedCount} pages`);
    console.log(`⏳ Scheduled: ${scheduledCount} pages`);
    console.log(`📄 PDFs: ${pdfGeneratedCount} generated`);
    console.log(`🗺️  Sitemap: ${allUrls.length} URLs`);
    console.log(`\n🎉 Build complete! All pages generated to dist/`);
});
