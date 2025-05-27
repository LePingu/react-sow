import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { getStatusIcon, getStatusColor, isClickableAgent, type BaseAgentNodeProps } from './agentNodeUtils';

interface AgentNodeBaseProps extends BaseAgentNodeProps {
    nodeType: 'main' | 'child';
    className?: string;
    description?: string;
}

const AgentNodeBase: React.FC<AgentNodeBaseProps> = ({
    data,
    nodeType,
    className = '',
    description
}) => {
    const isClickable = isClickableAgent(data.name);
    const statusColor = getStatusColor(data.status);
    const statusIcon = getStatusIcon(data.status);

    const baseClassName = nodeType === 'main' ? 'main-agent-flow-node' : 'child-agent-flow-node';
    const headerClassName = nodeType === 'main' ? 'agent-header' : 'child-agent-header';
    const infoClassName = nodeType === 'main' ? 'agent-info' : 'child-agent-info';
    const descriptionClassName = nodeType === 'main' ? 'agent-description' : 'child-agent-description';

    const boxShadow = nodeType === 'main'
        ? `0 4px 12px ${statusColor}20`
        : `0 2px 8px ${statusColor}15`;

    const opacity = isClickable ? (nodeType === 'main' ? 1 : 1) : (nodeType === 'main' ? 0.8 : 0.9);

    const finalClassName = nodeType === 'main'
        ? `${baseClassName} status-${data.status} turbo-border ${isClickable ? 'clickable' : 'non-clickable'} ${className}`
        : `${baseClassName} ${data.status} ${isClickable ? 'clickable' : 'non-clickable'} ${className}`;

    const HeaderTag = nodeType === 'main' ? 'h4' : 'h5';

    return (
        <div
            className={finalClassName}
            onClick={data.onClick}
            style={{
                borderColor: statusColor,
                boxShadow,
                cursor: isClickable ? 'pointer' : 'default',
                opacity
            }}
        >
            <Handle type="target" position={Position.Top} />

            <div className={headerClassName}>
                <div className="status-icon">{statusIcon}</div>
                <div className={infoClassName}>
                    <HeaderTag>{data.name} {isClickable && '🔗'}</HeaderTag>
                    <span className={`status-badge ${data.status}`}>
                        {data.status.toUpperCase()}
                    </span>
                </div>
            </div>

            {description && (
                <div className={descriptionClassName}>
                    {description}
                </div>
            )}

            {nodeType === 'main' && <Handle type="source" position={Position.Bottom} />}
        </div>
    );
};

export default AgentNodeBase;
