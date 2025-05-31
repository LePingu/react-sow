import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { motion, AnimatePresence } from 'framer-motion';
import { getStatusIcon, getStatusColor, isClickableAgent, type BaseAgentNodeProps, type SubStep } from './agentNodeUtils';

interface AgentNodeBaseProps extends BaseAgentNodeProps {
    nodeType: 'main' | 'child';
    className?: string;
    description?: string;
}

// SubStep component for displaying individual sub-steps
const SubStepItem: React.FC<{ step: SubStep; index: number }> = ({ step, index }) => {
    const stepIcon = step.status === 'completed' ? '✅' : step.status === 'active' ? '🔄' : '⏳';
    const stepColor = step.status === 'completed' ? '#10b981' : step.status === 'active' ? '#3b82f6' : '#9ca3af';

    return (
        <motion.div
            className="sub-step-item"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            style={{
                display: 'flex',
                alignItems: 'center',
                padding: '4px 0',
                fontSize: '12px',
                color: stepColor
            }}
        >
            <motion.span
                className="sub-step-icon"
                animate={step.status === 'active' ? {
                    rotate: 360,
                    transition: { duration: 1, repeat: Infinity, ease: "linear" }
                } : step.status === 'completed' ? {
                    scale: [1, 1.3, 1],
                    transition: { duration: 0.5, ease: "easeOut" }
                } : {}}
                style={{
                    marginRight: '8px',
                    minWidth: '16px',
                    textAlign: 'center',
                    fontWeight: 'bold'
                }}
            >
                {stepIcon}
            </motion.span>
            <span className="sub-step-name" style={{
                textDecoration: step.status === 'completed' ? 'line-through' : 'none',
                opacity: step.status === 'completed' ? 0.8 : 1
            }}>
                {step.name}
            </span>
        </motion.div>
    );
};

const AgentNodeBase: React.FC<AgentNodeBaseProps> = ({
    data,
    nodeType,
    className = '',
    description
}) => {
    const [previousStatus, setPreviousStatus] = React.useState(data.status);
    const [shouldPulse, setShouldPulse] = React.useState(false);

    // Debug logging
    React.useEffect(() => {
        console.log(`🔍 AgentNodeBase ${data.name} rendered with status:`, data.status);
        console.log(`🔍 Full node data:`, data);
        console.log(`🔍 Component props:`, { nodeType, className, description });
    }, [data.status, data.name, data, nodeType, className, description]);

    // Mount/unmount logging
    React.useEffect(() => {
        console.log(`🏗️ AgentNodeBase ${data.name} mounted`);
        return () => {
            console.log(`🗑️ AgentNodeBase ${data.name} unmounting`);
        };
    }, [data.name]);

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
            transition: {
                duration: 1.5,
                ease: "easeInOut",
                times: [0, 0.3, 0.5, 0.7, 1]
            }
        }
    };

    // Sub-steps state management
    const [subSteps, setSubSteps] = React.useState<SubStep[]>(data.subSteps || []);
    const [subStepTimers, setSubStepTimers] = React.useState<number[]>([]);

    // Initialize sub-steps when data changes
    React.useEffect(() => {
        if (data.subSteps && data.subSteps.length > 0) {
            setSubSteps(data.subSteps);
        }
    }, [data.subSteps]);

    // Handle sub-step progression when node becomes active
    React.useEffect(() => {
        // Clear any existing timers
        subStepTimers.forEach(timer => window.clearTimeout(timer));
        setSubStepTimers([]);

        if (data.status === 'active' && subSteps.length > 0) {
            console.log(`🔧 Starting sub-step progression for ${data.name}`);

            const newTimers: number[] = [];
            let delay = 500; // Start after 0.5s

            subSteps.forEach((_, index) => {
                // Set step to active
                const activeTimer = window.setTimeout(() => {
                    setSubSteps(prev => prev.map((s, i) =>
                        i === index ? { ...s, status: 'active' as const } : s
                    ));
                }, delay);
                newTimers.push(activeTimer);

                // Set step to completed after processing time
                const completedTimer = window.setTimeout(() => {
                    setSubSteps(prev => prev.map((s, i) =>
                        i === index ? { ...s, status: 'completed' as const } : s
                    ));

                    // Check if all sub-steps are completed
                    const allCompleted = subSteps.every((_, i) => i <= index);
                    if (allCompleted && index === subSteps.length - 1) {
                        console.log(`✅ All sub-steps completed for ${data.name}, notifying parent`);
                        // Note: Parent component should handle setting main status to completed
                    }
                }, delay + 1500); // Each step takes 1.5s to complete
                newTimers.push(completedTimer);

                delay += 2000; // 2s between steps (0.5s active + 1.5s processing + 0s gap)
            });

            setSubStepTimers(newTimers);
        }

        // When node becomes completed, mark all sub-steps as completed
        if (data.status === 'completed' && subSteps.length > 0) {
            console.log(`✅ Node ${data.name} completed, marking all sub-steps as completed`);
            setSubSteps(prev => prev.map(step => ({ ...step, status: 'completed' as const })));
        }

        return () => {
            subStepTimers.forEach(timer => window.clearTimeout(timer));
        };
    }, [data.status, data.name]); // Removed subSteps from deps to avoid infinite loop

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

            {/* Active message display */}
            {data.activeMessage && (
                <div style={{
                    marginTop: '6px',
                    padding: '4px 8px',
                    fontSize: '12px',
                    color: '#3b82f6',
                    background: 'rgba(59, 130, 246, 0.1)',
                    borderRadius: '4px',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                    fontStyle: 'italic'
                }}>
                    {data.activeMessage}
                </div>
            )}

            {/* Active sub-steps display - simple version like activeMessage */}
            {(data.status === 'active' || data.status === 'completed') && data.activeSubSteps && data.activeSubSteps.length > 0 && (
                <div style={{
                    marginTop: '6px',
                    padding: '6px 8px',
                    fontSize: '12px',
                    color: data.status === 'completed' ? '#10b981' : '#3b82f6',
                    background: data.status === 'completed' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                    borderRadius: '4px',
                    border: data.status === 'completed' ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid rgba(59, 130, 246, 0.2)'
                }}>
                    <div style={{
                        fontSize: '10px',
                        fontWeight: 'bold',
                        marginBottom: '4px',
                        opacity: 0.7,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                    }}>
                        Processing Steps
                    </div>
                    {data.activeSubSteps.map((step, index) => (
                        <div key={index} style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '2px 0',
                            fontSize: '11px'
                        }}>
                            <span style={{
                                marginRight: '6px',
                                fontSize: '10px'
                            }}>
                                {data.status === 'completed' ? '✅' : '🔄'}
                            </span>
                            <span style={{
                                textDecoration: data.status === 'completed' ? 'line-through' : 'none',
                                opacity: data.status === 'completed' ? 0.8 : 1
                            }}>
                                {step}
                            </span>
                        </div>
                    ))}
                </div>
            )}

            {/* Sub-steps display - show for active and completed nodes with sub-steps */}
            <AnimatePresence>
                {(data.status === 'active' || data.status === 'completed') && subSteps.length > 0 && (
                    <motion.div
                        className="sub-steps-container"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            marginTop: '8px',
                            padding: '8px 12px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            borderRadius: '6px',
                            border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                    >
                        <div style={{
                            fontSize: '11px',
                            fontWeight: 'bold',
                            marginBottom: '6px',
                            color: '#9ca3af',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }}>
                            Processing Steps
                        </div>
                        {subSteps.map((step, index) => (
                            <SubStepItem key={step.id} step={step} index={index} />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

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
