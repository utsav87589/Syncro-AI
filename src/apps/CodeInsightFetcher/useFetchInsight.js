import { useState } from "react";

const INSIGHTS_DB = {
    react: {
        name: "React",
        type: "JavaScript Library",
        creator: "Meta (Jordan Walke)",
        year: 2013,
        description: "A popular, component-based frontend library for building highly interactive user interfaces.",
        features: ["Component-Based", "Virtual DOM", "Unidirectional Data Flow", "Huge Ecosystem"],
        code: `import React from 'react';\n\nfunction App() {\n  return <h1>Hello React!</h1>;\n}`
    },
    javascript: {
        name: "JavaScript",
        type: "Scripting & Programming Language",
        creator: "Brendan Eich",
        year: 1995,
        description: "The lightweight, interpreted, or just-in-time compiled programming language with first-class functions that powers the web.",
        features: ["Dynamic Typing", "Prototypes", "Event-Driven", "Asynchronous Programming"],
        code: `const greet = () => console.log("Hello, JS!");\ngreet();`
    },
    python: {
        name: "Python",
        type: "Programming Language",
        creator: "Guido van Rossum",
        year: 1991,
        description: "An interpreted, high-level, general-purpose language known for its emphasis on code readability and clean syntax.",
        features: ["Clean Syntax", "Dynamically Typed", "Multi-paradigm", "Great for AI/ML"],
        code: `def greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("Python"))`
    },
    rust: {
        name: "Rust",
        type: "Programming Language",
        creator: "Graydon Hoare (Mozilla)",
        year: 2015,
        description: "A multi-paradigm, high-performance system programming language focused on safety, speed, and concurrency.",
        features: ["Memory Safety", "Zero-Cost Abstractions", "Cargo Build Tool", "No Garbage Collector"],
        code: `fn main() {\n    println!("Hello, Rust!");\n}`
    },
    "c++": {
        name: "C++",
        type: "Programming Language",
        creator: "Bjarne Stroustrup",
        year: 1985,
        description: "A powerful, general-purpose system programming language extending C with object-oriented capabilities.",
        features: ["Low-Level Control", "Object-Oriented", "High Performance", "Standard Template Library"],
        code: `#include <iostream>\n\nint main() {\n    std::cout << "Hello C++!" << std::endl;\n    return 0;\n}`
    },
    go: {
        name: "Go (Golang)",
        type: "Programming Language",
        creator: "Google (Griesemer, Pike, Thompson)",
        year: 2009,
        description: "A statically typed, compiled programming language designed at Google, featuring excellent concurrency primitives and rapid compilation.",
        features: ["Simplicity", "Goroutines & Channels", "Fast Compilation", "Garbage Collected"],
        code: `package main\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, Go!")\n}`
    }
};

export default function useFetchInsight() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [data, setData] = useState(null);

    const fetchInsight = (query) => {
        if (!query.trim()) {
            setError("Please enter a programming language or framework.");
            setData(null);
            return;
        }

        setLoading(true);
        setError("");
        setData(null);

        // Simulate network delay for a rich UI experience
        setTimeout(() => {
            const formattedQuery = query.trim().toLowerCase();
            const result = INSIGHTS_DB[formattedQuery];

            if (result) {
                setData(result);
            } else {
                setError(`Could not find insights for "${query}". Try searching for React, JavaScript, Python, Rust, C++, or Go!`);
            }
            setLoading(false);
        }, 800);
    };

    return { loading, error, data, fetchInsight };
}
