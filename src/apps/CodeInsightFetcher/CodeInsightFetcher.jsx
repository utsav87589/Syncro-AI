import { useState, useEffect } from "react";
import useFetchInsight from "./useFetchInsight";
import "./CodeInsightFetcher.css";

export default function CodeInsightFetcher() {
    const [input, setInput] = useState("");
    const [submittedText, setSubmittedText] = useState("");
    const { loading, error, data, fetchInsight } = useFetchInsight();

    const changeInput = (event) => {
        setInput(event.target.value);
    };

    const handleSearch = (e) => {
        if (e) e.preventDefault();
        setSubmittedText(input);
        fetchInsight(input);
    };

    useEffect(() => {
        document.title = "Code Insight Fetcher";
    }, []);

    return (
        <div className="container">
            <div className="card">
                <header className="header">
                    <div className="logo-badge">⚡ Insight</div>
                    <h1 className="title">Code Insight App</h1>
                    <p className="subtitle">Discover key insights, features, and code patterns for languages and frameworks.</p>
                </header>

                <form className="input-form" onSubmit={handleSearch}>
                    <div className="input-wrapper">
                        <input
                            type="text"
                            id="input-container"
                            placeholder="Enter e.g. React, JavaScript, Python, C++, Rust, Go"
                            value={input}
                            onChange={changeInput}
                            autoComplete="off"
                        />
                        <button type="submit" id="submit-button" disabled={loading}>
                            {loading ? "Searching..." : "Enter"}
                        </button>
                    </div>
                </form>

                {submittedText && (
                    <p className="entered-text">
                        You entered: <span className="highlight">{submittedText}</span>
                    </p>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Fetching technical insights...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="error-message">
                        <span className="error-icon">⚠️</span>
                        <p>{error}</p>
                    </div>
                )}

                {/* Data State */}
                {data && !loading && (
                    <div className="insight-details">
                        <div className="insight-header">
                            <div className="insight-title-group">
                                <h2>{data.name}</h2>
                                <span className="badge">{data.type}</span>
                            </div>
                            <div className="meta-info">
                                <span><strong>Creator:</strong> {data.creator}</span>
                                <span><strong>Launched:</strong> {data.year}</span>
                            </div>
                        </div>

                        <p className="description">{data.description}</p>

                        <div className="features-section">
                            <h3>Key Highlights</h3>
                            <div className="features-list">
                                {data.features.map((feature, idx) => (
                                    <span key={idx} className="feature-tag">{feature}</span>
                                ))}
                            </div>
                        </div>

                        <div className="code-section">
                            <div className="code-header">
                                <span>Example Syntax</span>
                                <button className="copy-btn" onClick={() => navigator.clipboard.writeText(data.code)}>
                                    Copy
                                </button>
                            </div>
                            <pre className="code-block">
                                <code>{data.code}</code>
                            </pre>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
