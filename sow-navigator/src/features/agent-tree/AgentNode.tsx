import React from 'react';
import './AgentNode.less';

export type AgentStatus = 'idle' | 'active' | 'completed' | 'error';

interface AgentNodeProps {
    id: string;
    name: string;
    status: AgentStatus;
    statusMessage?: string;
    position: { x: number; y: number };
    isParent?: boolean;
}

const AgentNode: React.FC<AgentNodeProps> = ({
    id,
    name,
    status,
    statusMessage,
    position,
    isParent = false
}) => {
    const getStatusIcon = () => {
        switch (status) {
            case 'active':
                return (
                    <div className="status-icon active">
                        <div className="spinner"></div>
                    </div>
                );
            case 'completed':
                return (
                    <div className="status-icon completed">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M9 12l2 2 4-4"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                );
            case 'error':
                return (
                    <div className="status-icon error">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M6 6l12 12M6 18L18 6"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                );
            default:
                return (
                    <div className="status-icon idle">
                        <div className="dot"></div>
                    </div>
                );
        }
    };

    return (
        <div
            className={`agent-node ${status} ${isParent ? 'parent' : 'child'}`}
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`
            }}
            data-agent-id={id}
        >
            <div className="node-content">
                <div className="node-header">
                    {getStatusIcon()}
                    <h3 className="node-title">{name}</h3>
                </div>

                {statusMessage && (
                    <div className="status-display">
                        <p className="status-text">{statusMessage}</p>
                    </div>
                )}
            </div>

            {/* Glow effects */}
            <div className="node-glow"></div>
            <div className="node-pulse"></div>
        </div>
    );
};

export default AgentNode;
