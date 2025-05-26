import React from 'react';
import { Handle, Position } from '@xyflow/react';

interface ChildAgentNodeProps {
    data: {
        name: string;
        status: 'active' | 'completed' | 'pending' | 'error';
        onClick: () => void;
    };
}

const ChildAgentNode: React.FC<ChildAgentNodeProps> = ({ data }) => {
    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'active': return '🔄';
            case 'completed': return '✅';
            case 'pending': return '⏳';
            case 'error': return '❌';
            default: return '⏳';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return '#10b981';
            case 'pending': return '#f59e0b';
            case 'active': return '#3b82f6';
            case 'error': return '#ef4444';
            default: return '#6b7280';
        }
    };

    // Check if this is a SoW-related agent (clickable)
    const isClickable = data.name.toLowerCase().includes('sow');

    return (
        <div
            className={`child-agent-flow-node ${data.status} ${isClickable ? 'clickable' : 'non-clickable'}`}
            onClick={data.onClick}
            style={{
                borderColor: getStatusColor(data.status),
                boxShadow: `0 2px 8px ${getStatusColor(data.status)}15`,
                cursor: isClickable ? 'pointer' : 'default',
                opacity: isClickable ? 1 : 0.9
            }}
        >
            <Handle type="target" position={Position.Top} />

            <div className="child-agent-header">
                <div className="status-icon">{getStatusIcon(data.status)}</div>
                <div className="child-agent-info">
                    <h5>{data.name} {isClickable && '🔗'}</h5>
                    <span className={`status-badge ${data.status}`}>
                        {data.status.toUpperCase()}
                    </span>
                </div>
            </div>

            <div className="child-agent-description">
                Specialized component
            </div>
        </div>
    );
};

export default ChildAgentNode;
