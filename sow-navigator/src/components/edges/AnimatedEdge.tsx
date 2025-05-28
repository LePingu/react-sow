import React from 'react';
import { getSmoothStepPath, type EdgeProps } from '@xyflow/react';
import { motion } from 'framer-motion';

const AnimatedEdge: React.FC<EdgeProps> = ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
}) => {
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

    return (
        <>
            <defs>
                <pattern
                    id={`dots-${id}`}
                    x="0"
                    y="0"
                    width="5"
                    height="5"
                    patternUnits="userSpaceOnUse"
                >
                    <circle
                        cx="0"
                        cy="0"
                        r="20"
                        fill={style.stroke}
                        opacity="0.8"
                    />
                </pattern>
            </defs>

            {/* Static background edge */}
            {/* <BaseEdge
                path={edgePath}
                style={{
                    ...style,
                    stroke: style.stroke || '#374151',
                    strokeWidth: typeof style.strokeWidth === 'number' ? style.strokeWidth + 1 : 3,
                    opacity: 0.3,
                }}
                markerEnd={markerEnd}
            /> */}

            {/* Animated dotted edge */}
            <motion.path
                d={edgePath}
                fill="none"
                stroke={`url(#dots-${id})`}
                strokeWidth={typeof style.strokeWidth === 'number' ? style.strokeWidth : 2}
                strokeDasharray="12,12"
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: 100 }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
        </>
    );
};

export default AnimatedEdge;
