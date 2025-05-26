import { motion } from 'framer-motion';
import './IdIcon.less';

interface IdIconProps {
    isVisible: boolean;
}

export const IdIcon: React.FC<IdIconProps> = ({ isVisible }) => {
    return (
        <motion.div
            className="id-icon-container"
            initial={{ opacity: 0, scale: 0 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
        >
            <div className="id-icon">
                <svg
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect
                        x="3"
                        y="4"
                        width="18"
                        height="16"
                        rx="2"
                        ry="2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <circle
                        cx="9"
                        cy="9"
                        r="2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M7 18v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <line
                        x1="14"
                        y1="8"
                        x2="18"
                        y2="8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                    <line
                        x1="14"
                        y1="12"
                        x2="18"
                        y2="12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </svg>
            </div>
        </motion.div>
    );
};
