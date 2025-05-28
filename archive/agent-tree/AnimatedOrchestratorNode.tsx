import React from 'react';
import { motion } from 'framer-motion';
import OrchestratorNode from '../../components/agent-nodes/OrchestratorNode';

interface AnimatedOrchestratorNodeProps {
    data: {
        message: string;
        timestamp: string;
    };
}

const AnimatedOrchestratorNode: React.FC<AnimatedOrchestratorNodeProps> = ({ data }) => {
    const breathingVariants = {
        animate: {
            scale: [1, 1.02, 1],
            boxShadow: [
                '0 4px 20px rgba(59, 130, 246, 0.3)',
                '0 8px 30px rgba(59, 130, 246, 0.4)',
                '0 4px 20px rgba(59, 130, 246, 0.3)'
            ],
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <motion.div
            style={{ position: 'relative' }}
            variants={breathingVariants}
            animate="animate"
        >
            <motion.div
                style={{
                    borderRadius: '12px',
                    border: '3px solid #3b82f6',
                    background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                    overflow: 'hidden'
                }}
                whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 }
                }}
            >
                <OrchestratorNode data={data} />
            </motion.div>

            {/* Orchestrator crown indicator */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: -8,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '20px'
                }}
                animate={{
                    y: [-2, 2, -2],
                    rotate: [-5, 5, -5]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                👑
            </motion.div>
        </motion.div>
    );
};

export default AnimatedOrchestratorNode;
