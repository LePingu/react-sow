import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import './ProcessingLabel.less';

interface ProcessingLabelProps {
    isVisible: boolean;
    documentId: string;
    fileName?: string;
}

export const ProcessingLabel: React.FC<ProcessingLabelProps> = ({
    isVisible,
    documentId,
    fileName
}) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (isVisible) {
            setProgress(0);
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prev + 1;
                });
            }, 100); // 10 seconds = 10000ms / 100 steps = 100ms per step

            return () => clearInterval(interval);
        }
    }, [isVisible]);

    return (
        <motion.div
            className="processing-label-container"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 1 }}
        >
            <div className="processing-label">
                <div className="processing-icon">
                    <motion.div
                        className="spinner"
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeDasharray="31.416"
                                strokeDashoffset="31.416"
                                fill="none"
                                opacity="0.3"
                            />
                            <circle
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeDasharray="31.416"
                                strokeDashoffset="23.562"
                                fill="none"
                            />
                        </svg>
                    </motion.div>
                </div>
                <div className="processing-text">
                    <h3>Processing Document</h3>
                    <p>Fetching document for ID {documentId}</p>
                    {fileName && <p className="file-name">File: {fileName}</p>}
                    <div className="progress-container">
                        <div className="progress-bar">
                            <motion.div
                                className="progress-fill"
                                style={{ width: `${progress}%` }}
                                transition={{ duration: 0.1 }}
                            />
                        </div>
                        <span className="progress-text">{progress}%</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
