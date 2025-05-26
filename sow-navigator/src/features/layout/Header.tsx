import React, { useState } from 'react';
import './Header.less';

// Assuming vite.svg is in public folder or accessible via an import
// For now, using a placeholder. If vite.svg is in public: const viteLogo = '/vite.svg';
// If it's an import: import viteLogo from '/path/to/vite.svg';
const viteLogo = '/vite.svg'; // Assuming it's in the public folder

interface User {
    name: string;
    // Add other user properties if needed
}

const Header: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('Agentic KYC');
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

    // Placeholder user data - this would typically come from auth context or props
    const currentUser: User = { name: 'John Doe' };

    const tabs = ["Book View", "Agentic KYC", "Onboarding", "PKR", "Marketplace"];

    const handleTabClick = (tabName: string) => {
        if (tabName === 'Agentic KYC') {
            setActiveTab(tabName);
        }
        // For now, other tabs are deactivated
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <header className="app-header">
            <div className="top-bar">
                <div className="logo-title">
                    <img src={viteLogo} alt="Vite Logo" className="app-logo" />
                    <span className="app-name">Client Lifecycle Management</span>
                </div>
                <div className="user-actions">
                    <span className="user-icon">👤</span> {/* Added user icon */}
                    <span className="client-advisor-label">Client advisor</span>
                    <div className="user-dropdown">
                        <button onClick={toggleDropdown} className="user-button">
                            {currentUser.name} <span className="dropdown-arrow">{isDropdownOpen ? '▲' : '▼'}</span>
                        </button>
                        {isDropdownOpen && (
                            <div className="dropdown-menu">
                                <a href="#profile">Profile</a>
                                <a href="#settings">Settings</a>
                                <a href="#logout">Logout</a>
                            </div>
                        )}
                    </div>
                    <button className="bookmarks-button">
                        <span className="star-icon">★</span> Bookmarks
                    </button>
                </div>
            </div>
            <nav className="tab-navigation">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        className={`tab-item ${activeTab === tab ? 'active' : ''} ${tab !== 'Agentic KYC' ? 'disabled' : ''}`}
                        onClick={() => handleTabClick(tab)}
                        disabled={tab !== 'Agentic KYC'}
                    >
                        {tab}
                    </button>
                ))}
            </nav>
        </header>
    );
};

export default Header;
