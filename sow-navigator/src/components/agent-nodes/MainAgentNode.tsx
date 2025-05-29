import React from 'react';
import { motion } from 'framer-motion';
import AgentNodeBase from './AgentNodeBase';
import type { BaseAgentNodeProps } from './agentNodeUtils';
import { useAccessibleMotion } from '../../hooks/useAccessibleMotion';
import { PROFESSIONAL_VARIANTS, BANKING_TRANSITIONS } from '../../utils/motionPresets';
import './MainAgentNode.less';

interface MainAgentNodeProps extends BaseAgentNodeProps { }

const MainAgentNode: React.FC<MainAgentNodeProps> = ({ data }) => {
    const { getTransition } = useAccessibleMotion();
    const description = `Main processing agent for ${data.name.toLowerCase()} workflows`;

    // Debug logging for MainAgentNode
    React.useEffect(() => {
        console.log(`🎯 MainAgentNode ${data.name} rendered with status:`, data.status);
        console.log(`🎯 MainAgentNode data:`, data);
    }, [data]);

    // Simple breathing animation for active status only
    const isActive = data.status === 'active';

    console.log(`🎯 MainAgentNode ${data.name} rendering - isActive:`, isActive);

    return (
        <motion.div
            variants={PROFESSIONAL_VARIANTS.scaleIn}
            initial="hidden"
            animate={{
                ...PROFESSIONAL_VARIANTS.scaleIn.visible,
                scale: isActive ? [1, 1.02, 1] : 1
            }}
            transition={{
                ...getTransition(BANKING_TRANSITIONS.smooth),
                scale: isActive ? {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                } : undefined
            }}
        >
            <AgentNodeBase
                data={data}
                nodeType="main"
                description={description}
            />
        </motion.div>
    );
};

export default React.memo(MainAgentNode);
