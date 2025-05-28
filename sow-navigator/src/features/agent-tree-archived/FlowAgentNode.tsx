import React from 'react';
import { Handle, Position } from '@xyflow/react';
import './FlowAgentNode.less';

export type AgentStatus = 'pending' | 'active' | 'completed' | 'error';

interface AgentNodeData {
    id: string;
    name: string;
    status: AgentStatus;
    statusMessage?: string;
    isParent?: boolean;
}

interface FlowAgentNodeProps {
    data: AgentNodeData;
}

const FlowAgentNode: React.FC<FlowAgentNodeProps> = ({ data }) => {
    const { name, status, statusMessage, isParent = false } = data;

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
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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
                    <div className="status-icon pending">
                        <div className="dot"></div>
                    </div>
                );
        }
    };

    const getNodeIcon = () => {
        if (isParent) {
            return '🎯'; // Orchestrator icon
        }

        // Child agent icons based on name
        if (name.includes('ID Data')) return '🆔';
        if (name.includes('Payslip')) return '💰';
        if (name.includes('Web References')) return '🌐';
        return '🤖'; // Default agent icon
    };

    return (
        <div className={`flow-agent-node ${status} ${isParent ? 'orchestrator' : 'child'}`}>
            {/* Input handle for child nodes */}
            {!isParent && (
                <Handle
                    type="target"
                    position={Position.Top}
                    style={{
                        background: '#555',
                        width: 8,
                        height: 8,
                        border: '2px solid #fff'
                    }}
                />
            )}

            <div className="node-content">
                <div className="node-header">
                    <div className="node-icon">{getNodeIcon()}</div>
                    {getStatusIcon()}
                </div>
                <h3 className="node-title">{name}</h3>
                {statusMessage && (
                    <div className="status-message">
                        <p>{statusMessage}</p>
                        {status === 'active' && (
                            <div className="processing-indicator">
                                <div className="processing-dots">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                                <div className="processing-bar">
                                    <div className="processing-fill"></div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Output handles for orchestrator */}
            {isParent && (
                <>
                    <Handle
                        type="source"
                        position={Position.Bottom}
                        id="output-1"
                        style={{
                            left: '25%',
                            background: '#555',
                            width: 8,
                            height: 8,
                            border: '2px solid #fff'
                        }}
                    />
                    <Handle
                        type="source"
                        position={Position.Bottom}
                        id="output-2"
                        style={{
                            left: '50%',
                            background: '#555',
                            width: 8,
                            height: 8,
                            border: '2px solid #fff'
                        }}
                    />
                    <Handle
                        type="source"
                        position={Position.Bottom}
                        id="output-3"
                        style={{
                            left: '75%',
                            background: '#555',
                            width: 8,
                            height: 8,
                            border: '2px solid #fff'
                        }}
                    />
                </>
            )}

            {/* Glow effects for active state */}
            {status === 'active' && (
                <>
                    <div className="node-glow"></div>
                    <div className="node-pulse"></div>
                </>
            )}
        </div>
    );
};

export default FlowAgentNode;
