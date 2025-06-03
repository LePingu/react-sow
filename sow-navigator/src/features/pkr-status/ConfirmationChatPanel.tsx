import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ConfirmationChatPanel.less';

interface ConfirmationChatPanelProps {
    isVisible: boolean;
    onConfirm: () => void;
    onClose: () => void;
}

const ConfirmationChatPanel: React.FC<ConfirmationChatPanelProps> = ({
    isVisible,
    onConfirm,
    onClose
}) => {
    const [userMessage, setUserMessage] = useState('');
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: 'agent',
            text: "Hello John! The below Source of Wealth has uncovered an irregularity which requires your review. Please have a look and give an update.",
            timestamp: new Date()
        },
        {
            id: 2,
            sender: 'agent',
            text: "**Source of Wealth Summary:**\n\n• Primary income source: Senior Executive position at TechCorp International\n• Annual declared income: $450,000\n• Secondary income: Real estate investments ($75,000/year)\n• Asset verification: 3 properties valued at $2.1M total\n• Bank statements: Consistent salary deposits over 5 years\n• **Irregularity detected:** Large cash deposit of $150,000 on March 15th without clear documentation of origin\n\nPlease review and confirm if this requires further investigation or if you have additional context.",
            timestamp: new Date()
        }
    ]);
    const [isConfirming, setIsConfirming] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSendMessage = () => {
        if (!userMessage.trim()) return;

        // Add user message
        const newUserMessage = {
            id: messages.length + 1,
            sender: 'user' as const,
            text: userMessage,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newUserMessage]);
        setUserMessage('');

        // Check if user is confirming
        const isConfirmationMessage = userMessage.toLowerCase().includes('confirm') || 
                                    userMessage.toLowerCase().includes('approved') ||
                                    userMessage.toLowerCase().includes('i confirm');

        if (isConfirmationMessage) {
            setIsConfirming(true);
            
            // Add agent confirmation response
            setTimeout(() => {
                const confirmResponse = {
                    id: messages.length + 2,
                    sender: 'agent' as const,
                    text: "Thank you for your confirmation! I will now go ahead and proceed with updating the report.",
                    timestamp: new Date()
                };
                
                setMessages(prev => [...prev, confirmResponse]);
                
                // Auto-close after 3 seconds
                setTimeout(() => {
                    setIsClosing(true);
                    setTimeout(() => {
                        onConfirm();
                        onClose();
                    }, 500);
                }, 3000);
            }, 1000);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    useEffect(() => {
        if (isVisible && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <div className="confirmation-chat-overlay">
                <motion.div
                    className="confirmation-chat-panel"
                    initial={{ x: '100%', opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: '100%', opacity: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                >
                    {/* Header */}
                    <div className="chat-header">
                        <div className="agent-info">
                            <div className="agent-avatar">
                                <img 
                                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNkYzI2MjYiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiPgo8cGF0aCBkPSJNMTIgMTJjMi4yMSAwIDQtMS43OSA0LTRzLTEuNzktNC00LTQtNCAxLjc5LTQgNDEuNzkgNCA0IDR6bTAgMmMtMi42NyAwLTggMS4zNC04IDR2MmgxNnYtMmMwLTIuNjYtNS4zMy00LTgtNHoiLz4KPC9zdmc+Cjwvc3ZnPgo="
                                    alt="AI Agent"
                                />
                            </div>
                            <div className="agent-details">
                                <span className="agent-name">PKR Review Agent</span>
                                <span className="agent-status">Online</span>
                            </div>
                        </div>
                        <button className="close-button" onClick={onClose}>
                            ×
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="chat-messages">
                        {messages.map((message) => (
                            <motion.div
                                key={message.id}
                                className={`message ${message.sender}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="message-content">
                                    <div className="message-text">
                                        {message.text.split('\n').map((line, index) => (
                                            <div key={index}>
                                                {line.startsWith('**') && line.endsWith('**') ? (
                                                    <strong>{line.slice(2, -2)}</strong>
                                                ) : line.startsWith('• ') ? (
                                                    <div className="bullet-point">{line}</div>
                                                ) : (
                                                    line
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="message-time">
                                        {message.timestamp.toLocaleTimeString([], { 
                                            hour: '2-digit', 
                                            minute: '2-digit' 
                                        })}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                        
                        {isConfirming && (
                            <motion.div
                                className="typing-indicator"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <div className="typing-dots">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Input */}
                    {!isClosing && (
                        <motion.div
                            className="chat-input"
                            initial={{ opacity: 1 }}
                            animate={{ opacity: isConfirming ? 0.5 : 1 }}
                        >
                            <input
                                ref={inputRef}
                                type="text"
                                value={userMessage}
                                onChange={(e) => setUserMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Type your response..."
                                disabled={isConfirming}
                            />
                            <button 
                                onClick={handleSendMessage}
                                disabled={!userMessage.trim() || isConfirming}
                            >
                                Send
                            </button>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ConfirmationChatPanel;
