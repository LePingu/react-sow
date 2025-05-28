import React from 'react';
import { motion } from 'framer-motion';
import AgentNodeBase from '../../components/agent-nodes/AgentNodeBase';
import type { BaseAgentNodeProps } from '../../components/agent-nodes/agentNodeUtils';

interface AnimatedAgentNodeProps extends BaseAgentNodeProps { }

const AnimatedAgentNode: React.FC<AnimatedAgentNodeProps> = ({ data }) => {
    const getStatusColor = () => {
        switch (data.status) {
            case 'completed': return '#10b981'; // green
            case 'active': return '#f97316'; // orange (processing)
            case 'pending': return '#6b7280'; // gray
            case 'error': return '#ef4444'; // red
            default: return '#6b7280';
        }
    };

    const pulseVariants = {
        active: {
            scale: [1, 1.05, 1],
            boxShadow: [
                `0 0 0 0 ${getStatusColor()}40`,
                `0 0 0 8px ${getStatusColor()}10`,
                `0 0 0 0 ${getStatusColor()}40`
            ],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }
        },
        completed: {
            scale: 1,
            boxShadow: `0 0 0 0 ${getStatusColor()}00`,
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        },
        pending: {
            scale: 1,
            boxShadow: `0 0 0 0 ${getStatusColor()}00`
        },
        error: {
            scale: 1,
            boxShadow: `0 0 0 0 ${getStatusColor()}00`
        }
    };

    const statusTransition = {
        duration: 0.8,
        ease: "easeInOut"
    };

    return (
        <motion.div
            style={{ position: 'relative' }}
            variants={pulseVariants}
            animate={data.status}
            transition={statusTransition}
            initial={false}
        >
            <motion.div
                animate={{
                    backgroundColor: getStatusColor(),
                    borderColor: getStatusColor()
                }}
                transition={statusTransition}
                style={{
                    borderRadius: '8px',
                    border: '2px solid',
                    overflow: 'hidden'
                }}
            >
                <AgentNodeBase
                    data={data}
                    nodeType="main"
                    description={`Processing ${data.name.toLowerCase()}`}
                />
            </motion.div>

            {/* Processing indicator */}
            {data.status === 'active' && (
                <motion.div
                    style={{
                        position: 'absolute',
                        top: -2,
                        right: -2,
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        backgroundColor: '#f97316'
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [1, 0.7, 1]
                    }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            )}

            {/* Completion checkmark */}
            {data.status === 'completed' && (
                <motion.div
                    style={{
                        position: 'absolute',
                        top: -2,
                        right: -2,
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        backgroundColor: '#10b981',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '10px',
                        fontWeight: 'bold'
                    }}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20
                    }}
                >
                    ✓
                </motion.div>
            )}
        </motion.div>
    );
};

export default AnimatedAgentNode;
