import { motion } from 'framer-motion';
import './AnimatedArrow.less';

interface AnimatedArrowProps {
    isVisible: boolean;
}

export const AnimatedArrow: React.FC<AnimatedArrowProps> = ({ isVisible }) => {
    return (
        <motion.div
            className="arrow-container"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.8 }}
        >
            <motion.div
                className="arrow"
                animate={isVisible ? {
                    y: [0, 20, 0],
                    opacity: [0.6, 1, 0.6]
                } : {}}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <line
                        x1="12"
                        y1="5"
                        x2="12"
                        y2="19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <polyline
                        points="19,12 12,19 5,12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </motion.div>
        </motion.div>
    );
};
