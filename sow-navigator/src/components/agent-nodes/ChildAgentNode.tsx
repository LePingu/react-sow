import React from 'react';
import { motion } from 'framer-motion';
import AgentNodeBase from './AgentNodeBase';
import type { BaseAgentNodeProps } from './agentNodeUtils';
import { useAccessibleMotion } from '../../hooks/useAccessibleMotion';
import { PROFESSIONAL_VARIANTS, BANKING_TRANSITIONS } from '../../utils/motionPresets';
import './ChildAgentNode.less';

interface ChildAgentNodeProps extends BaseAgentNodeProps { }

const ChildAgentNode: React.FC<ChildAgentNodeProps> = ({ data }) => {
    const { getTransition } = useAccessibleMotion();

    // Subtle child agent animations - more conservative than main agents
    const getChildStatusAnimation = () => {
        switch (data.status) {
            case 'active':
                return {
                    opacity: [0.9, 1, 0.9],
                    scale: [1, 1.01, 1],
                    transition: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }
                };
            case 'completed':
                return {
                    opacity: 1,
                    scale: 1,
                    boxShadow: "0 2px 8px rgba(34, 197, 94, 0.15)"
                };
            default:
                return {
                    opacity: 0.8,
                    scale: 1
                };
        }
    };

    return (
        <motion.div
            variants={PROFESSIONAL_VARIANTS.fadeIn}
            initial="hidden"
            animate="visible"
            whileHover={{
                scale: 1.01,
                opacity: 1,
                transition: getTransition(BANKING_TRANSITIONS.precise)
            }}
            transition={getTransition(BANKING_TRANSITIONS.smooth)}
        >
            <motion.div
                animate={getChildStatusAnimation()}
                transition={getTransition(BANKING_TRANSITIONS.subtle)}
            >
                <AgentNodeBase
                    data={data}
                    nodeType="child"
                    description="Specialized component"
                />
            </motion.div>
        </motion.div>
    );
};

export default ChildAgentNode;
