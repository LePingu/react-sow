import React from 'react';
import { motion } from 'framer-motion';
import { useAccessibleMotion } from '../hooks/useAccessibleMotion';
import { PROFESSIONAL_VARIANTS, BANKING_TRANSITIONS } from '../utils/motionPresets';
import './SoWCompletionBox.less';

interface SoWCompletionBoxProps {
    overallScore: number;
    accuracy: number;
    hallucination: number;
}

const SoWCompletionBox: React.FC<SoWCompletionBoxProps> = ({
    overallScore,
    accuracy,
    hallucination
}) => {
    const { getTransition } = useAccessibleMotion();

    return (
        <motion.div
            className="sow-completion-box"
            variants={PROFESSIONAL_VARIANTS.slideUp}
            initial="hidden"
            animate="visible"
            transition={getTransition(BANKING_TRANSITIONS.smooth)}
        >
            <motion.div
                className="completion-title"
                variants={PROFESSIONAL_VARIANTS.fadeIn}
                transition={{ delay: 0.2, ...getTransition(BANKING_TRANSITIONS.subtle) }}
            >
                SoW Corroboration Agent
            </motion.div>
            
            <motion.div
                className="completion-content"
                variants={PROFESSIONAL_VARIANTS.staggerContainer}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3, ...getTransition(BANKING_TRANSITIONS.smooth) }}
            >
                <motion.div
                    className="agent-section"
                    variants={PROFESSIONAL_VARIANTS.staggerItem}
                >
                    <motion.div
                        className="agent-icon"
                        variants={PROFESSIONAL_VARIANTS.scaleIn}
                        transition={{ delay: 0.4, ...getTransition(BANKING_TRANSITIONS.subtle) }}
                    >
                        🤖
                    </motion.div>
                    <motion.div
                        className="agent-message"
                        variants={PROFESSIONAL_VARIANTS.fadeIn}
                        transition={{ delay: 0.5, ...getTransition(BANKING_TRANSITIONS.subtle) }}
                    >
                        Well done! All of the checks have completed successfully. Please review
                    </motion.div>
                </motion.div>

                <motion.div
                    className="stats-section"
                    variants={PROFESSIONAL_VARIANTS.staggerContainer}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.6, ...getTransition(BANKING_TRANSITIONS.smooth) }}
                >
                    <motion.div
                        className="stat-box"
                        variants={PROFESSIONAL_VARIANTS.staggerItem}
                    >
                        <motion.div
                            className="stat-number"
                            variants={PROFESSIONAL_VARIANTS.scaleIn}
                        >
                            {overallScore}%
                        </motion.div>
                        <div className="stat-label">Overall Score</div>
                    </motion.div>
                    
                    <motion.div
                        className="stat-box"
                        variants={PROFESSIONAL_VARIANTS.staggerItem}
                    >
                        <motion.div
                            className="stat-number"
                            variants={PROFESSIONAL_VARIANTS.scaleIn}
                        >
                            {accuracy}%
                        </motion.div>
                        <div className="stat-label">Accuracy</div>
                    </motion.div>
                    
                    <motion.div
                        className="stat-box"
                        variants={PROFESSIONAL_VARIANTS.staggerItem}
                    >
                        <motion.div
                            className="stat-number"
                            variants={PROFESSIONAL_VARIANTS.scaleIn}
                        >
                            {hallucination}%
                        </motion.div>
                        <div className="stat-label">Hallucination</div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default SoWCompletionBox;
