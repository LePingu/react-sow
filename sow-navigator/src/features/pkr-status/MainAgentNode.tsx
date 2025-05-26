import React from 'react';
import { Handle, Position } from '@xyflow/react';

interface MainAgentNodeProps {
    data: {
        name: string;
        status: 'active' | 'completed' | 'pending' | 'error';
        onClick: () => void;
    };
}

const MainAgentNode: React.FC<MainAgentNodeProps> = ({ data }) => {
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
            className={`main-agent-flow-node status-${data.status} turbo-border ${isClickable ? 'clickable' : 'non-clickable'}`}
            onClick={data.onClick}
            style={{
                borderColor: getStatusColor(data.status),
                boxShadow: `0 4px 12px ${getStatusColor(data.status)}20`,
                cursor: isClickable ? 'pointer' : 'default',
                opacity: isClickable ? 1 : 0.8
            }}
        >
            <Handle type="target" position={Position.Top} />

            <div className="agent-header">
                <div className="status-icon">{getStatusIcon(data.status)}</div>
                <div className="agent-info">
                    <h4>{data.name} {isClickable && '🔗'}</h4>
                    <span className={`status-badge ${data.status}`}>
                        {data.status.toUpperCase()}
                    </span>
                </div>
            </div>

            <div className="agent-description">
                Main processing agent for {data.name.toLowerCase()} workflows
            </div>

            <Handle type="source" position={Position.Bottom} />
        </div>
    );
};

export default MainAgentNode;
