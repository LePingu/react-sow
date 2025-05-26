import { motion } from 'framer-motion';
import './CompletionMessage.less';

interface CompletionMessageProps {
    isVisible: boolean;
    documentId: string;
}

export const CompletionMessage: React.FC<CompletionMessageProps> = ({
    isVisible,
    documentId
}) => {
    return (
        <motion.div
            className="completion-container"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={isVisible ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
        >
            <div className="completion-message">
                <motion.div
                    className="success-icon"
                    initial={{ scale: 0 }}
                    animate={isVisible ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.3, delay: 0.2, type: "spring", bounce: 0.6 }}
                >
                    <svg
                        width="64"
                        height="64"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            cx="12"
                            cy="12"
                            r="10"
                            fill="none"
                            stroke="#10B981"
                            strokeWidth="2"
                        />
                        <motion.path
                            d="m9 12 2 2 4-4"
                            fill="none"
                            stroke="#10B981"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={isVisible ? { pathLength: 1 } : { pathLength: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        />
                    </svg>
                </motion.div>
                <div className="completion-text">
                    <h3>Document Processed Successfully!</h3>
                    <p>Document ID {documentId} has been processed and is ready for review.</p>
                </div>
            </div>
        </motion.div>
    );
};
