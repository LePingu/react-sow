import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccessibleMotion } from '../hooks/useAccessibleMotion';
import { PROFESSIONAL_VARIANTS, BANKING_TRANSITIONS } from '../utils/motionPresets';
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
    const { getTransition } = useAccessibleMotion();

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
        <motion.div
            className={`search-bar ${isFocused ? 'focused' : ''} ${className}`}
            variants={PROFESSIONAL_VARIANTS.scaleIn}
            initial="hidden"
            animate="visible"
            transition={getTransition(BANKING_TRANSITIONS.smooth)}
        >
            <motion.div
                className="search-container"
                animate={{
                    borderColor: isFocused ? "rgba(239, 68, 68, 0.3)" : "rgba(156, 163, 175, 0.3)",
                    boxShadow: isFocused
                        ? "0 0 0 3px rgba(239, 68, 68, 0.1)"
                        : "0 2px 4px rgba(0, 0, 0, 0.05)",
                }}
                transition={getTransition(BANKING_TRANSITIONS.precise)}
            >
                <motion.div
                    className="search-icon"
                    animate={{
                        color: isFocused ? "#ef4444" : "#6b7280",
                        scale: isFocused ? 1.1 : 1
                    }}
                    transition={getTransition(BANKING_TRANSITIONS.precise)}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.35-4.35" />
                    </svg>
                </motion.div>

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

                <motion.div
                    className="ai-indicator"
                    animate={{
                        opacity: isFocused ? 1 : 0.7,
                        scale: isFocused ? 1.02 : 1
                    }}
                    transition={getTransition(BANKING_TRANSITIONS.subtle)}
                >
                    <div className="ai-icon">◯</div>
                    <span className="ai-label">OnePass AI</span>
                </motion.div>

                <AnimatePresence>
                    {query && (
                        <motion.button
                            type="button"
                            onClick={() => setQuery('')}
                            className="clear-button"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={getTransition(BANKING_TRANSITIONS.precise)}
                            whileHover={{
                                scale: 1.1,
                                transition: getTransition(BANKING_TRANSITIONS.precise)
                            }}
                            whileTap={{ scale: 0.9 }}
                        >
                            ×
                        </motion.button>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
};

export default SearchBar;
