import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { motion } from 'framer-motion';
import { useAccessibleMotion } from '../../hooks/useAccessibleMotion';
import { PROFESSIONAL_VARIANTS, BANKING_TRANSITIONS } from '../../utils/motionPresets';
import './OrchestratorNode.less';

interface OrchestratorNodeProps {
    data: {
        message: string;
        timestamp: string;
        status?: 'pending' | 'active' | 'completed';
    };
}

const OrchestratorNode: React.FC<OrchestratorNodeProps> = ({ data }) => {
    const { getTransition } = useAccessibleMotion();

    // Get status display properties
    const getStatusDisplay = (status?: string) => {
        switch (status) {
            case 'active':
                return { text: 'COORDINATING', icon: '⚡', className: 'status-active' };
            case 'completed':
                return { text: 'COMPLETED', icon: '✅', className: 'status-completed' };
            case 'pending':
            default:
                return { text: 'PENDING', icon: '🎯', className: 'status-pending' };
        }
    };

    const statusDisplay = getStatusDisplay(data.status);

    return (
        <motion.div
            className={`orchestrator-flow-node ${statusDisplay.className}`}
            variants={PROFESSIONAL_VARIANTS.scaleIn}
            initial="hidden"
            animate="visible"
            whileHover={{
                y: -2,
                transition: getTransition(BANKING_TRANSITIONS.precise)
            }}
            transition={getTransition(BANKING_TRANSITIONS.smooth)}
        >
            <div className="orchestrator-header">
                <div className="orchestrator-icon">
                    {statusDisplay.icon}
                </div>
                <div className="orchestrator-info">
                    <h3>Orchestrator Agent</h3>
                    <span className={`status-badge ${data.status || 'pending'}`}>
                        {statusDisplay.text}
                    </span>
                </div>
            </div>

            <motion.div
                className="orchestrator-message"
                variants={PROFESSIONAL_VARIANTS.fadeIn}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3, ...getTransition(BANKING_TRANSITIONS.subtle) }}
            >
                {data.message}
            </motion.div>

            <motion.div
                className="timestamp"
                variants={PROFESSIONAL_VARIANTS.fadeIn}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.5, ...getTransition(BANKING_TRANSITIONS.subtle) }}
            >
                Last update: {data.timestamp}
            </motion.div>

            {/* Output handles for connecting to main agents */}
            <Handle
                type="source"
                position={Position.Bottom}
                id="output-1"
                style={{ left: '50%' }}
            />
        </motion.div>
    );
};

export default OrchestratorNode;
