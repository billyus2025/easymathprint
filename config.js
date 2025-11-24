// Site-wide configuration (母工厂标准配置)
const siteConfig = {
    // 基础配置
    ga4: "G-JZ9W1N4G11", // GA4 自动注入系统（100-Site Factory 标准）
    analytics_id: "G-XXXXXXXXXX", // 预留GA4 ID（兼容旧配置，优先使用 ga4）
    site_url: "https://www.easymathprint.com", // 用于 canonical & sitemap
    enable_pdf_generation: false, // PDF工厂开关（暂时禁用，快速构建）
    enable_social_assets: true, // 社交媒体资产生成开关
    enable_analytics: true, // Google Analytics开关
    enable_legal_pages: true, // 法律页面生成开关
    languages: ["en"], // 启用的语言列表，未来可扩展为 ["en", "cn", "es"]
    
    // 站点元信息 & 安全配置（100-Site Factory 全局安全能力）
    siteId: "ems-001", // 站点唯一 ID（001 号工厂）
    siteGroup: "math-print", // 站群分类
    siteOwner: "EasyMathPrint", // 品牌名
    defaultLang: "en",
    
    // 防盗链配置（Referrer Check）
    allowedReferrers: [
        "https://www.easymathprint.com",
        "https://easymathprint.com",
        "" // 允许直接访问（空字符串表示无referrer）
    ],
    // 未来可能的 CDN 域名可在此添加
    
    // 安全功能开关
    enableSecuritySignature: true, // 版权 & 数字签名系统
    enableReferrerCheck: true, // 防盗链（Referrer Check）
    enableSiteFingerprint: true // 站群追踪指纹（Site Fingerprinting）
};

module.exports = {
    siteConfig,
    worksheetConfig: {
        "addition-sums-within-10": {
            lang: "en",
            slug: "addition-sums-within-10",
            title: {
                en: "Addition Sums Within 10 Worksheets - Grade 1",
                cn: "",
                es: ""
            },
            description: {
                en: "Practice addition facts with sums up to 10. Perfect for Grade 1 students building foundational math skills.",
                cn: "",
                es: ""
            },
            type: "addition",
            defaultRange: 10,
            defaultCount: 20,
            ranges: [10],
            counts: [10, 20, 30],
            releaseDate: "2025-11-24",
            workbook: true,
            workbookPages: 20,
            ogImage: "https://www.easymathprint.com/assets/og-default.png"
        },
        "addition-sums-within-20": {
            lang: "en",
            slug: "addition-sums-within-20",
            title: "Addition Sums Within 20 Worksheets - Grade 1",
            description: "Master addition facts up to 20. Essential practice for first grade students learning basic arithmetic.",
            type: "addition",
            defaultRange: 20,
            defaultCount: 20,
            ranges: [20],
            counts: [10, 20, 30],
            releaseDate: "2025-11-24",
            workbook: false
        },
        "addition-double-digit-no-regroup": {
            slug: "addition-double-digit-no-regroup",
            title: "Double-Digit Addition No Regrouping - Grade 2",
            description: "Practice adding two-digit numbers without regrouping. Build confidence with larger numbers.",
            type: "addition",
            defaultRange: 50,
            defaultCount: 20,
            ranges: [50],
            counts: [15, 20, 25],
            releaseDate: "2025-11-24"
        },
        "addition-single-digit-vertical": {
            slug: "addition-single-digit-vertical",
            title: "Single-Digit Vertical Addition - Grade K-1",
            description: "Vertical format addition worksheets for kindergarten and first grade. Simple and clear layout.",
            type: "addition",
            defaultRange: 10,
            defaultCount: 20,
            ranges: [10],
            counts: [15, 20, 25],
            releaseDate: "2025-11-24"
        },
        "addition-missing-addends": {
            slug: "addition-missing-addends",
            title: "Missing Addends Addition Worksheets - Grade 1",
            description: "Find the missing number in addition equations. Develops number sense and problem-solving skills.",
            type: "addition",
            defaultRange: 20,
            defaultCount: 20,
            ranges: [20],
            counts: [15, 20, 25],
            releaseDate: "2025-11-24"
        },
        "addition-three-numbers": {
            slug: "addition-three-numbers",
            title: "Adding Three Numbers Worksheets - Grade 2",
            description: "Practice adding three single-digit numbers together. Builds mental math and addition fluency.",
            type: "addition",
            defaultRange: 10,
            defaultCount: 15,
            ranges: [10],
            counts: [10, 15, 20],
            releaseDate: "2025-11-24"
        },
        "addition-word-problems": {
            slug: "addition-word-problems",
            title: "Addition Word Problems - Grade 1-2",
            description: "Real-world addition word problems. Helps students apply math to everyday situations.",
            type: "addition",
            defaultRange: 20,
            defaultCount: 10,
            ranges: [20],
            counts: [8, 10, 12],
            releaseDate: "2025-11-24"
        },
        "addition-doubles-facts": {
            slug: "addition-doubles-facts",
            title: "Doubles Addition Facts Worksheets - Grade 1",
            description: "Master doubles facts like 2+2, 3+3, 4+4. Essential building blocks for mental math.",
            type: "addition",
            defaultRange: 10,
            defaultCount: 20,
            ranges: [10],
            counts: [15, 20, 25],
            releaseDate: "2025-11-24"
        },
        "addition-near-doubles": {
            slug: "addition-near-doubles",
            title: "Near Doubles Addition Worksheets - Grade 1",
            description: "Practice near doubles like 3+4, 5+6. Builds on doubles facts for faster mental calculation.",
            type: "addition",
            defaultRange: 10,
            defaultCount: 20,
            ranges: [10],
            counts: [15, 20, 25],
            releaseDate: "2025-11-24"
        },
        "addition-making-ten": {
            slug: "addition-making-ten",
            title: "Making Ten Addition Worksheets - Grade 1",
            description: "Learn number pairs that make 10. Critical skill for mental math and place value understanding.",
            type: "addition",
            defaultRange: 10,
            defaultCount: 20,
            ranges: [10],
            counts: [15, 20, 25],
            releaseDate: "2025-11-24"
        },
        "addition-timed-drill": {
            slug: "addition-timed-drill",
            title: "Addition Timed Drill Worksheets - Grade 2",
            description: "Speed practice for addition facts. Builds automaticity and math fluency through timed exercises.",
            type: "addition",
            defaultRange: 20,
            defaultCount: 30,
            ranges: [20],
            counts: [20, 30, 40],
            releaseDate: "2025-12-04"
        },
        "addition-horizontal-format": {
            slug: "addition-horizontal-format",
            title: "Horizontal Addition Worksheets - Grade 1-2",
            description: "Horizontal format addition problems. Develops mental math and number sense skills.",
            type: "addition",
            defaultRange: 20,
            defaultCount: 20,
            ranges: [20],
            counts: [15, 20, 25],
            releaseDate: "2025-12-05"
        },
        "addition-number-lines": {
            slug: "addition-number-lines",
            title: "Addition Using Number Lines - Grade 1",
            description: "Visual addition practice with number lines. Perfect for visual learners and early math concepts.",
            type: "addition",
            defaultRange: 20,
            defaultCount: 15,
            ranges: [20],
            counts: [10, 15, 20],
            releaseDate: "2025-12-06"
        },
        "addition-picture-problems": {
            slug: "addition-picture-problems",
            title: "Picture Addition Worksheets - Grade K-1",
            description: "Count and add using pictures. Engaging visual worksheets for kindergarten and first grade.",
            type: "addition",
            defaultRange: 10,
            defaultCount: 15,
            ranges: [10],
            counts: [10, 15, 20],
            releaseDate: "2025-12-07"
        },
        "addition-mixed-practice": {
            slug: "addition-mixed-practice",
            title: "Mixed Addition Practice - Grade 1-2",
            description: "Comprehensive addition practice with mixed difficulty levels. Reinforces all addition skills.",
            type: "addition",
            defaultRange: 20,
            defaultCount: 25,
            ranges: [20],
            counts: [20, 25, 30],
            releaseDate: "2025-12-08"
        },
        "subtraction-within-10": {
            slug: "subtraction-within-10",
            title: "Subtraction Within 10 Worksheets - Grade 1",
            description: "Basic subtraction facts up to 10. Perfect introduction to subtraction for first grade students.",
            type: "subtraction",
            defaultRange: 10,
            defaultCount: 20,
            ranges: [10],
            counts: [10, 20, 30],
            releaseDate: "2025-12-09"
        },
        "subtraction-within-20": {
            slug: "subtraction-within-20",
            title: "Subtraction Within 20 Worksheets - Grade 1",
            description: "Master subtraction facts up to 20. Essential practice for building subtraction fluency.",
            type: "subtraction",
            defaultRange: 20,
            defaultCount: 20,
            ranges: [20],
            counts: [15, 20, 25],
            releaseDate: "2025-12-10"
        },
        "subtraction-single-digit": {
            slug: "subtraction-single-digit",
            title: "Single-Digit Subtraction - Grade K-1",
            description: "Simple single-digit subtraction worksheets. Great for kindergarten and early first grade.",
            type: "subtraction",
            defaultRange: 10,
            defaultCount: 20,
            ranges: [10],
            counts: [15, 20, 25],
            releaseDate: "2025-12-11"
        },
        "subtraction-vertical-format": {
            slug: "subtraction-vertical-format",
            title: "Vertical Subtraction Worksheets - Grade 1-2",
            description: "Vertical format subtraction problems. Prepares students for multi-digit subtraction.",
            type: "subtraction",
            defaultRange: 20,
            defaultCount: 20,
            ranges: [20],
            counts: [15, 20, 25],
            releaseDate: "2025-12-12"
        },
        "subtraction-missing-subtrahend": {
            slug: "subtraction-missing-subtrahend",
            title: "Missing Subtrahend Worksheets - Grade 1",
            description: "Find the missing number in subtraction equations. Develops algebraic thinking skills.",
            type: "subtraction",
            defaultRange: 20,
            defaultCount: 20,
            ranges: [20],
            counts: [15, 20, 25],
            releaseDate: "2025-12-13"
        },
        "subtraction-word-problems": {
            slug: "subtraction-word-problems",
            title: "Subtraction Word Problems - Grade 1-2",
            description: "Real-world subtraction word problems. Helps students apply subtraction to everyday situations.",
            type: "subtraction",
            defaultRange: 20,
            defaultCount: 10,
            ranges: [20],
            counts: [8, 10, 12],
            releaseDate: "2025-12-14"
        },
        "subtraction-number-lines": {
            slug: "subtraction-number-lines",
            title: "Subtraction Using Number Lines - Grade 1",
            description: "Visual subtraction practice with number lines. Perfect for understanding subtraction concepts.",
            type: "subtraction",
            defaultRange: 20,
            defaultCount: 15,
            ranges: [20],
            counts: [10, 15, 20],
            releaseDate: "2025-12-15"
        },
        "subtraction-picture-problems": {
            slug: "subtraction-picture-problems",
            title: "Picture Subtraction Worksheets - Grade K-1",
            description: "Count and subtract using pictures. Engaging visual worksheets for early learners.",
            type: "subtraction",
            defaultRange: 10,
            defaultCount: 15,
            ranges: [10],
            counts: [10, 15, 20],
            releaseDate: "2025-12-16"
        },
        "subtraction-timed-drill": {
            slug: "subtraction-timed-drill",
            title: "Subtraction Timed Drill Worksheets - Grade 2",
            description: "Speed practice for subtraction facts. Builds automaticity through timed exercises.",
            type: "subtraction",
            defaultRange: 20,
            defaultCount: 30,
            ranges: [20],
            counts: [20, 30, 40],
            releaseDate: "2025-12-17"
        },
        "subtraction-horizontal-format": {
            slug: "subtraction-horizontal-format",
            title: "Horizontal Subtraction Worksheets - Grade 1-2",
            description: "Horizontal format subtraction problems. Develops mental math skills.",
            type: "subtraction",
            defaultRange: 20,
            defaultCount: 20,
            ranges: [20],
            counts: [15, 20, 25],
            releaseDate: "2025-12-18"
        },
        "subtraction-fact-families": {
            slug: "subtraction-fact-families",
            title: "Subtraction Fact Families - Grade 1",
            description: "Learn fact families connecting addition and subtraction. Builds number relationships.",
            type: "subtraction",
            defaultRange: 20,
            defaultCount: 15,
            ranges: [20],
            counts: [10, 15, 20],
            releaseDate: "2025-12-19"
        },
        "subtraction-comparing-differences": {
            slug: "subtraction-comparing-differences",
            title: "Comparing Differences Worksheets - Grade 1-2",
            description: "Compare subtraction results to find greater or smaller differences. Develops comparison skills.",
            type: "subtraction",
            defaultRange: 20,
            defaultCount: 15,
            ranges: [20],
            counts: [10, 15, 20],
            releaseDate: "2025-12-20"
        },
        "subtraction-mixed-practice": {
            slug: "subtraction-mixed-practice",
            title: "Mixed Subtraction Practice - Grade 1-2",
            description: "Comprehensive subtraction practice with mixed difficulty. Reinforces all subtraction skills.",
            type: "subtraction",
            defaultRange: 20,
            defaultCount: 25,
            ranges: [20],
            counts: [20, 25, 30],
            releaseDate: "2025-12-21"
        },
        "subtraction-within-100": {
            slug: "subtraction-within-100",
            title: "Subtraction Within 100 - Grade 2",
            description: "Practice subtracting numbers up to 100. Builds confidence with larger numbers.",
            type: "subtraction",
            defaultRange: 100,
            defaultCount: 20,
            ranges: [100],
            counts: [15, 20, 25],
            releaseDate: "2025-12-22"
        },
        "subtraction-two-digit-no-regroup": {
            slug: "subtraction-two-digit-no-regroup",
            title: "Two-Digit Subtraction No Regrouping - Grade 2",
            description: "Practice subtracting two-digit numbers without regrouping. Builds subtraction confidence.",
            type: "subtraction",
            defaultRange: 50,
            defaultCount: 20,
            ranges: [50],
            counts: [15, 20, 25],
            releaseDate: "2025-12-23"
        },
        "multiplication-times-2": {
            slug: "multiplication-times-2",
            title: "Multiplication Times 2 Worksheets - Grade 3",
            description: "Master the 2 times table. Essential foundation for all multiplication facts.",
            type: "multiplication",
            defaultRange: 12,
            defaultCount: 20,
            ranges: [12],
            counts: [15, 20, 25],
            releaseDate: "2025-12-24"
        },
        "multiplication-times-3": {
            slug: "multiplication-times-3",
            title: "Multiplication Times 3 Worksheets - Grade 3",
            description: "Practice the 3 times table. Builds multiplication fluency and number sense.",
            type: "multiplication",
            defaultRange: 12,
            defaultCount: 20,
            ranges: [12],
            counts: [15, 20, 25],
            releaseDate: "2025-12-25"
        },
        "multiplication-times-4": {
            slug: "multiplication-times-4",
            title: "Multiplication Times 4 Worksheets - Grade 3",
            description: "Learn the 4 times table. Essential multiplication facts for third grade students.",
            type: "multiplication",
            defaultRange: 12,
            defaultCount: 20,
            ranges: [12],
            counts: [15, 20, 25],
            releaseDate: "2025-12-26"
        },
        "multiplication-times-5": {
            slug: "multiplication-times-5",
            title: "Multiplication Times 5 Worksheets - Grade 3",
            description: "Master the 5 times table. Easy pattern recognition helps build confidence.",
            type: "multiplication",
            defaultRange: 12,
            defaultCount: 20,
            ranges: [12],
            counts: [15, 20, 25],
            releaseDate: "2025-12-27"
        },
        "multiplication-times-10": {
            slug: "multiplication-times-10",
            title: "Multiplication Times 10 Worksheets - Grade 3",
            description: "Practice multiplying by 10. Understanding place value through multiplication.",
            type: "multiplication",
            defaultRange: 12,
            defaultCount: 20,
            ranges: [12],
            counts: [15, 20, 25],
            releaseDate: "2025-12-29"
        },
        "multiplication-mixed-1-5": {
            slug: "multiplication-mixed-1-5",
            title: "Mixed Multiplication 1-5 - Grade 3",
            description: "Mixed practice for times tables 1 through 5. Reinforces early multiplication facts.",
            type: "multiplication",
            defaultRange: 12,
            defaultCount: 25,
            ranges: [12],
            counts: [20, 25, 30],
            releaseDate: "2025-12-28"
        },
        "multiplication-times-6": {
            slug: "multiplication-times-6",
            title: "Multiplication Times 6 Worksheets - Grade 3",
            description: "Learn the 6 times table. Builds on previous multiplication knowledge.",
            type: "multiplication",
            defaultRange: 12,
            defaultCount: 20,
            ranges: [12],
            counts: [15, 20, 25],
            releaseDate: "2025-12-30"
        },
        "multiplication-times-7": {
            slug: "multiplication-times-7",
            title: "Multiplication Times 7 Worksheets - Grade 3",
            description: "Master the 7 times table. Challenging multiplication facts for third grade.",
            type: "multiplication",
            defaultRange: 12,
            defaultCount: 20,
            ranges: [12],
            counts: [15, 20, 25],
            releaseDate: "2026-01-01"
        },
        "multiplication-times-8": {
            slug: "multiplication-times-8",
            title: "Multiplication Times 8 Worksheets - Grade 3",
            description: "Practice the 8 times table. Essential multiplication facts for fluency.",
            type: "multiplication",
            defaultRange: 12,
            defaultCount: 20,
            ranges: [12],
            counts: [15, 20, 25],
            releaseDate: "2025-12-31"
        },
        "multiplication-times-9": {
            slug: "multiplication-times-9",
            title: "Multiplication Times 9 Worksheets - Grade 3",
            description: "Learn the 9 times table. Fun patterns make this table easier to master.",
            type: "multiplication",
            defaultRange: 12,
            defaultCount: 20,
            ranges: [12],
            counts: [15, 20, 25],
            releaseDate: "2026-01-03"
        },
        "multiplication-mixed-1-10": {
            slug: "multiplication-mixed-1-10",
            title: "Mixed Multiplication 1-10 - Grade 3",
            description: "Mixed practice for times tables 1 through 10. Comprehensive multiplication review.",
            type: "multiplication",
            defaultRange: 12,
            defaultCount: 30,
            ranges: [12],
            counts: [25, 30, 35],
            releaseDate: "2026-01-02"
        },
        "multiplication-mixed-1-12": {
            slug: "multiplication-mixed-1-12",
            title: "Mixed Multiplication 1-12 - Grade 3",
            description: "Complete mixed practice up to 12 times table. Full multiplication fact mastery.",
            type: "multiplication",
            defaultRange: 12,
            defaultCount: 30,
            ranges: [12],
            counts: [25, 30, 35],
            releaseDate: "2026-01-06"
        },
        "multiplication-word-problems": {
            slug: "multiplication-word-problems",
            title: "Multiplication Word Problems - Grade 3",
            description: "Real-world multiplication word problems. Apply multiplication to solve everyday situations.",
            type: "multiplication",
            defaultRange: 12,
            defaultCount: 10,
            ranges: [12],
            counts: [8, 10, 12],
            releaseDate: "2026-01-04"
        },
        "multiplication-vertical-format": {
            slug: "multiplication-vertical-format",
            title: "Vertical Multiplication Worksheets - Grade 3",
            description: "Vertical format multiplication problems. Prepares for multi-digit multiplication.",
            type: "multiplication",
            defaultRange: 12,
            defaultCount: 20,
            ranges: [12],
            counts: [15, 20, 25],
            releaseDate: "2026-01-05"
        },
        "multiplication-timed-drill": {
            slug: "multiplication-timed-drill",
            title: "Multiplication Timed Drill - Grade 3",
            description: "Speed practice for multiplication facts. Builds automaticity and math fluency.",
            type: "multiplication",
            defaultRange: 12,
            defaultCount: 30,
            ranges: [12],
            counts: [25, 30, 40],
            releaseDate: "2026-01-07"
        },
        "division-by-2": {
            slug: "division-by-2",
            title: "Division by 2 Worksheets - Grade 3",
            description: "Practice dividing by 2. Introduction to division with whole number answers.",
            type: "division",
            defaultRange: 12,
            defaultCount: 20,
            ranges: [12],
            counts: [15, 20, 25],
            releaseDate: "2026-01-08"
        },
        "division-by-3": {
            slug: "division-by-3",
            title: "Division by 3 Worksheets - Grade 3",
            description: "Master division by 3. Builds division fluency and number sense.",
            type: "division",
            defaultRange: 12,
            defaultCount: 20,
            ranges: [12],
            counts: [15, 20, 25],
            releaseDate: "2026-01-09"
        },
        "division-by-4": {
            slug: "division-by-4",
            title: "Division by 4 Worksheets - Grade 3",
            description: "Practice dividing by 4. Essential division facts for third grade students.",
            type: "division",
            defaultRange: 12,
            defaultCount: 20,
            ranges: [12],
            counts: [15, 20, 25],
            releaseDate: "2026-01-10"
        },
        "division-by-5": {
            slug: "division-by-5",
            title: "Division by 5 Worksheets - Grade 3",
            description: "Learn division by 5. Pattern recognition helps with division fluency.",
            type: "division",
            defaultRange: 12,
            defaultCount: 20,
            ranges: [12],
            counts: [15, 20, 25],
            releaseDate: "2026-01-11"
        },
        "division-by-6": {
            slug: "division-by-6",
            title: "Division by 6 Worksheets - Grade 3-4",
            description: "Master division by 6. Builds on previous division knowledge.",
            type: "division",
            defaultRange: 12,
            defaultCount: 20,
            ranges: [12],
            counts: [15, 20, 25],
            releaseDate: "2026-01-12"
        },
        "division-by-7": {
            slug: "division-by-7",
            title: "Division by 7 Worksheets - Grade 3-4",
            description: "Practice dividing by 7. Challenging division facts for building fluency.",
            type: "division",
            defaultRange: 12,
            defaultCount: 20,
            ranges: [12],
            counts: [15, 20, 25],
            releaseDate: "2026-01-12"
        },
        "division-by-8": {
            slug: "division-by-8",
            title: "Division by 8 Worksheets - Grade 3-4",
            description: "Learn division by 8. Essential division facts for fourth grade readiness.",
            type: "division",
            defaultRange: 12,
            defaultCount: 20,
            ranges: [12],
            counts: [15, 20, 25],
            releaseDate: "2026-01-13"
        },
        "division-by-9": {
            slug: "division-by-9",
            title: "Division by 9 Worksheets - Grade 3-4",
            description: "Master division by 9. Fun patterns make this easier to learn.",
            type: "division",
            defaultRange: 12,
            defaultCount: 20,
            ranges: [12],
            counts: [15, 20, 25],
            releaseDate: "2026-01-14"
        },
        "division-by-10": {
            slug: "division-by-10",
            title: "Division by 10 Worksheets - Grade 3-4",
            description: "Practice dividing by 10. Understanding place value through division.",
            type: "division",
            defaultRange: 12,
            defaultCount: 20,
            ranges: [12],
            counts: [15, 20, 25],
            releaseDate: "2026-01-15"
        },
        "division-mixed-2-5": {
            slug: "division-mixed-2-5",
            title: "Mixed Division 2-5 - Grade 3",
            description: "Mixed practice for division by 2 through 5. Reinforces early division facts.",
            type: "division",
            defaultRange: 12,
            defaultCount: 25,
            ranges: [12],
            counts: [20, 25, 30],
            releaseDate: "2026-01-16"
        },
        "division-mixed-2-10": {
            slug: "division-mixed-2-10",
            title: "Mixed Division 2-10 - Grade 3-4",
            description: "Mixed practice for division by 2 through 10. Comprehensive division review.",
            type: "division",
            defaultRange: 12,
            defaultCount: 30,
            ranges: [12],
            counts: [25, 30, 35],
            releaseDate: "2026-01-17"
        },
        "division-mixed-2-12": {
            slug: "division-mixed-2-12",
            title: "Mixed Division 2-12 - Grade 3-4",
            description: "Complete mixed practice up to division by 12. Full division fact mastery.",
            type: "division",
            defaultRange: 12,
            defaultCount: 30,
            ranges: [12],
            counts: [25, 30, 35],
            releaseDate: "2026-01-18"
        },
        "division-word-problems": {
            slug: "division-word-problems",
            title: "Division Word Problems - Grade 3-4",
            description: "Real-world division word problems. Apply division to solve everyday situations.",
            type: "division",
            defaultRange: 12,
            defaultCount: 10,
            ranges: [12],
            counts: [8, 10, 12],
            releaseDate: "2026-01-19"
        },
        "division-timed-drill": {
            slug: "division-timed-drill",
            title: "Division Timed Drill - Grade 3-4",
            description: "Speed practice for division facts. Builds automaticity and math fluency.",
            type: "division",
            defaultRange: 12,
            defaultCount: 30,
            ranges: [12],
            counts: [25, 30, 40],
            releaseDate: "2026-01-20"
        },
        "division-remainders-intro": {
            slug: "division-remainders-intro",
            title: "Division with Remainders Introduction - Grade 4",
            description: "Introduction to division with remainders. Prepares for advanced division concepts.",
            type: "division",
            defaultRange: 12,
            defaultCount: 15,
            ranges: [12],
            counts: [10, 15, 20],
            releaseDate: "2026-01-22"
        },
        "fractions-like-denominators": {
            slug: "fractions-like-denominators",
            title: "Fractions with Like Denominators - Grade 3-4",
            description: "Add and subtract fractions with the same denominator. Foundation for fraction operations.",
            type: "fractions",
            defaultRange: 10,
            defaultCount: 15,
            ranges: [10],
            counts: [10, 15, 20],
            releaseDate: "2026-01-21"
        },
        "fractions-equivalent": {
            slug: "fractions-equivalent",
            title: "Equivalent Fractions Worksheets - Grade 3-4",
            description: "Learn to identify and create equivalent fractions. Essential fraction understanding.",
            type: "fractions",
            defaultRange: 10,
            defaultCount: 15,
            ranges: [10],
            counts: [10, 15, 20],
            releaseDate: "2026-01-23"
        },
        "fractions-comparing": {
            slug: "fractions-comparing",
            title: "Comparing Fractions Worksheets - Grade 3-4",
            description: "Compare fractions using greater than, less than, and equal to. Builds fraction sense.",
            type: "fractions",
            defaultRange: 10,
            defaultCount: 15,
            ranges: [10],
            counts: [10, 15, 20],
            releaseDate: "2026-01-24"
        },
        "fractions-simplifying": {
            slug: "fractions-simplifying",
            title: "Simplifying Fractions Worksheets - Grade 4",
            description: "Reduce fractions to simplest form. Important skill for fraction operations.",
            type: "fractions",
            defaultRange: 10,
            defaultCount: 15,
            ranges: [10],
            counts: [10, 15, 20],
            releaseDate: "2026-01-25"
        },
        "fractions-visual": {
            slug: "fractions-visual",
            title: "Visual Fractions Worksheets - Grade 3",
            description: "Understand fractions using visual models and pictures. Perfect for visual learners.",
            type: "fractions",
            defaultRange: 10,
            defaultCount: 15,
            ranges: [10],
            counts: [10, 15, 20],
            releaseDate: "2026-01-26"
        },
        "fractions-mixed-numbers": {
            slug: "fractions-mixed-numbers",
            title: "Mixed Numbers Worksheets - Grade 4",
            description: "Work with mixed numbers and improper fractions. Advanced fraction concepts.",
            type: "fractions",
            defaultRange: 10,
            defaultCount: 15,
            ranges: [10],
            counts: [10, 15, 20],
            releaseDate: "2026-01-27"
        },
        "fractions-adding-simple": {
            slug: "fractions-adding-simple",
            title: "Simple Fraction Addition - Grade 3-4",
            description: "Add simple fractions with like denominators. Builds addition skills with fractions.",
            type: "fractions",
            defaultRange: 10,
            defaultCount: 15,
            ranges: [10],
            counts: [10, 15, 20],
            releaseDate: "2026-01-28"
        },
        "fractions-subtracting-simple": {
            slug: "fractions-subtracting-simple",
            title: "Simple Fraction Subtraction - Grade 3-4",
            description: "Subtract simple fractions with like denominators. Foundation for fraction operations.",
            type: "fractions",
            defaultRange: 10,
            defaultCount: 15,
            ranges: [10],
            counts: [10, 15, 20],
            releaseDate: "2026-01-29"
        },
        "fractions-word-problems": {
            slug: "fractions-word-problems",
            title: "Fraction Word Problems - Grade 3-4",
            description: "Real-world fraction word problems. Apply fractions to solve everyday situations.",
            type: "fractions",
            defaultRange: 10,
            defaultCount: 10,
            ranges: [10],
            counts: [8, 10, 12],
            releaseDate: "2026-01-30"
        },
        "fractions-number-line": {
            slug: "fractions-number-line",
            title: "Fractions on Number Line - Grade 3",
            description: "Locate and compare fractions on a number line. Visual understanding of fractions.",
            type: "fractions",
            defaultRange: 10,
            defaultCount: 15,
            ranges: [10],
            counts: [10, 15, 20],
            releaseDate: "2026-01-31"
        },
        "fractions-parts-whole": {
            slug: "fractions-parts-whole",
            title: "Parts of a Whole Fractions - Grade 3",
            description: "Understand fractions as parts of a whole. Fundamental fraction concept.",
            type: "fractions",
            defaultRange: 10,
            defaultCount: 15,
            ranges: [10],
            counts: [10, 15, 20],
            releaseDate: "2026-02-01"
        },
        "fractions-ordering": {
            slug: "fractions-ordering",
            title: "Ordering Fractions Worksheets - Grade 3-4",
            description: "Order fractions from least to greatest. Develops fraction comparison skills.",
            type: "fractions",
            defaultRange: 10,
            defaultCount: 15,
            ranges: [10],
            counts: [10, 15, 20],
            releaseDate: "2026-02-02"
        },
        "fractions-unit-fractions": {
            slug: "fractions-unit-fractions",
            title: "Unit Fractions Worksheets - Grade 3",
            description: "Practice with unit fractions like 1/2, 1/3, 1/4. Foundation for all fraction work.",
            type: "fractions",
            defaultRange: 10,
            defaultCount: 15,
            ranges: [10],
            counts: [10, 15, 20],
            releaseDate: "2026-02-03"
        },
        "fractions-mixed-practice": {
            slug: "fractions-mixed-practice",
            title: "Mixed Fraction Practice - Grade 3-4",
            description: "Comprehensive fraction practice with mixed concepts. Reinforces all fraction skills.",
            type: "fractions",
            defaultRange: 10,
            defaultCount: 20,
            ranges: [10],
            counts: [15, 20, 25],
            releaseDate: "2026-02-04"
        },
        "fractions-decimal-conversion": {
            slug: "fractions-decimal-conversion",
            title: "Fractions to Decimals Conversion - Grade 4",
            description: "Convert fractions to decimals and vice versa. Builds number sense and flexibility. Final fractions worksheet in the series.",
            type: "fractions",
            defaultRange: 10,
            defaultCount: 15,
            ranges: [10],
            counts: [10, 15, 20],
            releaseDate: "2026-02-05"
        },
        "mixed-operations-speed-drill": {
            slug: "mixed-operations-speed-drill",
            title: "Mixed Operations Speed Drill - Grade 3-4",
            description: "Timed practice with all four operations. Builds speed and accuracy.",
            type: "mixed",
            defaultRange: 20,
            defaultCount: 30,
            ranges: [20],
            counts: [25, 30, 40],
            releaseDate: "2026-02-06"
        },
        "mixed-operations-order-operations": {
            slug: "mixed-operations-order-operations",
            title: "Order of Operations - Grade 4-5",
            description: "Practice PEMDAS with simple expressions. Introduction to order of operations.",
            type: "mixed",
            defaultRange: 20,
            defaultCount: 15,
            ranges: [20],
            counts: [10, 15, 20],
            releaseDate: "2026-02-07"
        },
        "mixed-operations-advanced": {
            slug: "mixed-operations-advanced",
            title: "Advanced Mixed Operations - Grade 4-5",
            description: "Challenging mixed operations with larger numbers. Advanced problem-solving practice.",
            type: "mixed",
            defaultRange: 100,
            defaultCount: 25,
            ranges: [100],
            counts: [20, 25, 30],
            releaseDate: "2026-02-08"
        },
        "mixed-operations-timed-practice": {
            slug: "mixed-operations-timed-practice",
            title: "Mixed Operations Timed Practice - Grade 3-4",
            description: "Timed mixed operations worksheets. Builds automaticity across all operations.",
            type: "mixed",
            defaultRange: 20,
            defaultCount: 30,
            ranges: [20],
            counts: [25, 30, 40],
            releaseDate: "2026-02-10"
        },
        "mixed-operations-challenge": {
            slug: "mixed-operations-challenge",
            title: "Mixed Operations Challenge - Grade 4-5",
            description: "Challenging mixed operations problems. Perfect for advanced students.",
            type: "mixed",
            defaultRange: 100,
            defaultCount: 20,
            ranges: [100],
            counts: [15, 20, 25],
            releaseDate: "2026-02-09"
        },
        "mixed-operations-review": {
            slug: "mixed-operations-review",
            title: "Mixed Operations Review - Grade 3-4",
            description: "Comprehensive review of all operations. Perfect for end-of-year practice.",
            type: "mixed",
            defaultRange: 20,
            defaultCount: 30,
            ranges: [20],
            counts: [25, 30, 35],
            releaseDate: "2026-02-11"
        },
        "mixed-operations-multi-step": {
            slug: "mixed-operations-multi-step",
            title: "Multi-Step Mixed Operations - Grade 4-5",
            description: "Solve multi-step problems using multiple operations. Advanced problem-solving.",
            type: "mixed",
            defaultRange: 50,
            defaultCount: 10,
            ranges: [50],
            counts: [8, 10, 12],
            releaseDate: "2026-02-12"
        },
        "mixed-operations-daily-practice": {
            slug: "mixed-operations-daily-practice",
            title: "Daily Mixed Operations Practice - Grade 3-4",
            description: "Daily practice sheets with all operations. Maintains math fluency.",
            type: "mixed",
            defaultRange: 20,
            defaultCount: 25,
            ranges: [20],
            counts: [20, 25, 30],
            releaseDate: "2026-02-13"
        },
        "mixed-operations-problem-solving": {
            slug: "mixed-operations-problem-solving",
            title: "Mixed Operations Problem Solving - Grade 4-5",
            description: "Complex problem-solving using all four operations. Develops critical thinking skills.",
            type: "mixed",
            defaultRange: 50,
            defaultCount: 12,
            ranges: [50],
            counts: [10, 12, 15],
            releaseDate: "2026-02-14"
        },
        "mixed-operations-mental-math": {
            slug: "mixed-operations-mental-math",
            title: "Mental Math Mixed Operations - Grade 3-4",
            description: "Practice mental math with all operations. Builds calculation speed and accuracy.",
            type: "mixed",
            defaultRange: 20,
            defaultCount: 25,
            ranges: [20],
            counts: [20, 25, 30],
            releaseDate: "2026-02-15"
        },
        "mixed-operations-estimation": {
            slug: "mixed-operations-estimation",
            title: "Estimation with Mixed Operations - Grade 4-5",
            description: "Estimate answers using all operations. Develops number sense and approximation skills.",
            type: "mixed",
            defaultRange: 100,
            defaultCount: 15,
            ranges: [100],
            counts: [10, 15, 20],
            releaseDate: "2026-02-16"
        },
        "mixed-operations-patterns": {
            slug: "mixed-operations-patterns",
            title: "Number Patterns with Mixed Operations - Grade 4-5",
            description: "Identify and extend patterns using mixed operations. Builds algebraic thinking.",
            type: "mixed",
            defaultRange: 50,
            defaultCount: 15,
            ranges: [50],
            counts: [10, 15, 20],
            releaseDate: "2026-02-17"
        },
        "mixed-operations-timed-practice-advanced": {
            slug: "mixed-operations-timed-practice-advanced",
            title: "Advanced Mixed Operations Timed Practice - Grade 5",
            description: "Challenge your Grade 5 students with advanced mixed operation timed practice sheets. Boost speed and accuracy.",
            type: "mixed",
            defaultRange: 100,
            defaultCount: 30,
            ranges: [50, 100],
            counts: [20, 30, 40],
            releaseDate: "2026-02-18"
        },
        "mixed-operations-final-review": {
            slug: "mixed-operations-final-review",
            title: "Final Mixed Operations Review - Grade 4-5",
            description: "Comprehensive final review of all mixed operations. Perfect for end-of-year assessment preparation.",
            type: "mixed",
            defaultRange: 100,
            defaultCount: 25,
            ranges: [50, 100],
            counts: [20, 25, 30],
            releaseDate: "2026-02-20"
        },
        "mixed-operations-mastery": {
            slug: "mixed-operations-mastery",
            title: "Mixed Operations Mastery Challenge - Grade 5",
            description: "Ultimate mastery challenge with all four operations. Tests comprehensive math skills and problem-solving ability. Final worksheet in the 90-day series.",
            type: "mixed",
            defaultRange: 100,
            defaultCount: 30,
            ranges: [50, 100],
            counts: [25, 30, 35],
            releaseDate: "2026-02-21"
        }
    }
};
