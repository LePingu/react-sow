import React, { useState } from 'react';
import './SearchBar.less';

export interface SearchBarProps {
    placeholder?: string;
    onSearch?: (query: string) => void;
    onSubmit?: (query: string) => void;
    className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
    placeholder = "Search clients, cases, or ask OnePass AI...",
    onSearch,
    onSubmit,
    className = ""
}) => {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        onSearch?.(value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            onSubmit?.(query.trim());
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSubmit(e as any);
        }
    };

    return (
        <div className={`search-bar ${isFocused ? 'focused' : ''} ${className}`}>
            <div className="search-container">
                <div className="search-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.35-4.35" />
                    </svg>
                </div>

                <form onSubmit={handleSubmit} className="search-form">
                    <input
                        type="text"
                        value={query}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder={placeholder}
                        className="search-input"
                    />
                </form>

                <div className="ai-indicator">
                    <div className="ai-icon">◯</div>
                    <span className="ai-label">OnePass AI</span>
                </div>

                {query && (
                    <button
                        type="button"
                        onClick={() => setQuery('')}
                        className="clear-button"
                    >
                        ×
                    </button>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
