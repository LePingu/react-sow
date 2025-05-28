import React from 'react';
import { getSmoothStepPath, type EdgeProps } from '@xyflow/react';
import { motion } from 'framer-motion';
import { useAccessibleMotion } from '../../hooks/useAccessibleMotion';
import { BANKING_TRANSITIONS } from '../../utils/motionPresets';

// Animation configurations for different edge states (aligned with agent status styles)
const EDGE_CONFIGS = {
    active: {
        duration: 2,
        dashArray: "12,12",
        opacity: 1,
    },
    pending: {
        duration: 3,
        dashArray: "8,8",
        opacity: 0.7,
    },
    completed: {
        duration: 0, // No animation for completed
        dashArray: "none",
        opacity: 0.8,
    },
    default: {
        duration: 3,
        dashArray: "6,10",
        opacity: 0.6,
    }
} as const;

type EdgeStatus = 'active' | 'pending' | 'completed' | 'default';

interface AnimatedEdgeData {
    status?: EdgeStatus;
}

const AnimatedEdge: React.FC<EdgeProps> = ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    data,
}) => {
    const { getTransition } = useAccessibleMotion();

    const [edgePath] = getSmoothStepPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
        borderRadius: 30,
        offset: 10,
    });

    // Determine edge status from data or fallback to style-based detection
    const strokeColor = (style as any)?.stroke || '#374151';
    const edgeStatus: EdgeStatus = (data as AnimatedEdgeData)?.status ||
        (strokeColor === '#f97316' ? 'active' :
            strokeColor === '#6b7280' ? 'pending' : 'default');

    const edgeConfig = EDGE_CONFIGS[edgeStatus];
    const isActive = edgeStatus === 'active';
    const isCompleted = edgeStatus === 'completed';

    // Get status-appropriate color (aligned with agent node colors)
    const getStatusColor = () => {
        switch (edgeStatus) {
            case 'active': return '#3b82f6'; // Blue (matches agent active color)
            case 'completed': return '#10b981'; // Green (matches agent completed color)
            case 'pending': return '#f59e0b'; // Amber (matches agent pending color)
            default: return strokeColor;
        }
    };

    const statusColor = getStatusColor();

    // Common animation transition
    const pathTransition = getTransition({ ...BANKING_TRANSITIONS.smooth, delay: 0.5 });

    return (
        <>
            {/* Gradient definition for active edges */}
            {isActive && (
                <defs>
                    <linearGradient id={`gradient-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={statusColor} stopOpacity="1" />
                        <stop offset="100%" stopColor={statusColor} stopOpacity="1" />
                    </linearGradient>
                </defs>
            )}

            {/* Background path for non-active states */}
            {!isActive && (
                <motion.path
                    d={edgePath}
                    fill="none"
                    stroke={statusColor}
                    strokeWidth={typeof (style as any)?.strokeWidth === 'number' ? (style as any).strokeWidth : 2}
                    strokeDasharray={isCompleted ? 'none' : edgeConfig.dashArray}
                    opacity={edgeConfig.opacity}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={pathTransition}
                />
            )}

            {/* Animated active path with moving dashes */}
            {isActive && (
                <motion.path
                    d={edgePath}
                    fill="none"
                    stroke={statusColor}
                    strokeWidth={typeof (style as any)?.strokeWidth === 'number' ? (style as any).strokeWidth : 2}
                    strokeDasharray="12,12"
                    opacity={1}
                    initial={{
                        strokeDashoffset: 0
                    }}
                    animate={{
                        strokeDashoffset: -200 // Move dashes continuously
                    }}
                    transition={{
                        duration: edgeConfig.duration,
                        repeat: Infinity,
                        ease: "linear",
                        repeatType: "loop"
                    }}
                />
            )}
        </>
    );
};

export default AnimatedEdge;
