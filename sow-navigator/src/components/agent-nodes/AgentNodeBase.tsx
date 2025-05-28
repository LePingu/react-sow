import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { motion } from 'framer-motion';
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
    const [previousStatus, setPreviousStatus] = React.useState(data.status);
    const [shouldPulse, setShouldPulse] = React.useState(false);

    const isClickable = isClickableAgent(data.name);
    const statusColor = getStatusColor(data.status);
    const statusIcon = getStatusIcon(data.status);

    // Detect status change to completed
    React.useEffect(() => {
        if (previousStatus !== 'completed' && data.status === 'completed') {
            setShouldPulse(true);
            // Stop pulsing after animation completes
            const timer = setTimeout(() => setShouldPulse(false), 2000);
            return () => clearTimeout(timer);
        }
        setPreviousStatus(data.status);
    }, [data.status, previousStatus]);

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

    // Animation variants
    const spinnerVariants = {
        animate: {
            rotate: 360,
            transition: {
                duration: 1,
                repeat: Infinity,
                ease: "linear"
            }
        }
    };

    const pulseVariants = {
        initial: { scale: 1 },
        pulse: {
            scale: [1, 1.15, 1.05, 1.15, 1],
            boxShadow: [
                `0 4px 12px ${statusColor}20`,
                `0 8px 32px ${statusColor}60`,
                `0 6px 24px ${statusColor}40`,
                `0 8px 32px ${statusColor}60`,
                `0 4px 12px ${statusColor}20`
            ],
            transition: {
                duration: 1.5,
                ease: "easeInOut",
                times: [0, 0.3, 0.5, 0.7, 1]
            }
        }
    };

    // Status spinner for replacing the status icon when active
    const StatusSpinner = () => (
        <motion.div
            className="status-spinner"
            variants={spinnerVariants}
            animate="animate"
            style={{
                width: '24px',
                height: '24px',
                border: '3px solid rgba(255, 255, 255, 0.2)',
                borderTop: `3px solid ${statusColor}`,
                borderRadius: '50%',
                display: 'inline-block'
            }}
        />
    );

    // Wrapper component with conditional pulse animation
    const NodeWrapper = ({ children }: { children: React.ReactNode }) => {
        if (shouldPulse) {
            return (
                <motion.div
                    className={finalClassName}
                    onClick={data.onClick}
                    style={{
                        borderColor: statusColor,
                        boxShadow,
                        cursor: isClickable ? 'pointer' : 'default',
                        opacity
                    }}
                    variants={pulseVariants}
                    initial="initial"
                    animate="pulse"
                    onAnimationComplete={() => setShouldPulse(false)}
                >
                    {children}
                </motion.div>
            );
        }

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
                {children}
            </div>
        );
    };

    return (
        <NodeWrapper>
            {nodeType === 'main' && <Handle type="target" position={Position.Top} />}
            {nodeType === 'child' && <Handle type="target" position={Position.Left} />}

            <div className={headerClassName}>
                <div className="status-icon">
                    {data.status === 'active' ? <StatusSpinner /> : statusIcon}
                </div>
                <div className={infoClassName}>
                    <HeaderTag>
                        {data.name} {isClickable && '🔗'}
                    </HeaderTag>
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

            {nodeType === 'main' && <Handle
                type="source"
                position={Position.Bottom}
                id="main-output"
                style={{
                    left: '10%',
                }}
            />}
        </NodeWrapper>
    );
};

export default AgentNodeBase;
