module.exports = {
    worksheetConfig: {
        "addition": {
            title: "Addition Worksheets",
            icon: "➕",
            type: "addition",
            defaultRange: 20,
            defaultCount: 20,
            description: "Addition practice for Grades K–3. Perfect for building basic math skills.",
            ranges: [10, 20, 50, 100],
            counts: [10, 20, 30]
        },
        "subtraction": {
            title: "Subtraction Worksheets",
            icon: "➖",
            type: "subtraction",
            defaultRange: 20,
            defaultCount: 20,
            description: "Subtraction practice with no negative results. Great for early learners.",
            ranges: [10, 20, 50, 100],
            counts: [10, 20, 30]
        },
        "multiplication": {
            title: "Multiplication Worksheets",
            icon: "✖️",
            type: "multiplication",
            defaultRange: 12,
            defaultCount: 20,
            description: "Multiplication tables and practice. Builds foundational math skills.",
            ranges: [5, 10, 12, 20],
            counts: [10, 20, 30]
        },
        "division": {
            title: "Division Worksheets",
            icon: "➗",
            type: "division",
            defaultRange: 12,
            defaultCount: 20,
            description: "Division practice with whole number results. Perfect for grades 3–5.",
            ranges: [5, 10, 12, 20],
            counts: [10, 20, 30]
        },
        "mixed": {
            title: "Mixed Operations Worksheets",
            icon: "🔀",
            type: "mixed",
            defaultRange: 20,
            defaultCount: 20,
            description: "Mixed addition, subtraction, multiplication, and division problems.",
            ranges: [10, 20, 50, 100],
            counts: [10, 20, 30]
        }
        // ... 其它 also 保留（和 template 的一样）
    }
};