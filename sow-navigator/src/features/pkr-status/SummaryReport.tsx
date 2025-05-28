import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PROFESSIONAL_VARIANTS, BANKING_TRANSITIONS } from '../../utils/motionPresets';
import { useAccessibleMotion } from '../../hooks/useAccessibleMotion';
import './SummaryReport.less';

interface SummaryReportProps {
    isVisible: boolean;
    onClose: () => void;
    caseId?: string;
}

interface ReportSection {
    title: string;
    status: 'completed' | 'passed' | 'flagged';
    details: string[];
    score?: number;
}

const SummaryReport: React.FC<SummaryReportProps & { onDownloadReport?: () => void }> = ({
    isVisible,
    onClose,
    caseId,
    onDownloadReport
}) => {
    const navigate = useNavigate();
    const { prefersReducedMotion } = useAccessibleMotion();

    // All numbers set to 100%
    const reportData: ReportSection[] = [
        {
            title: 'Document Verification',
            status: 'completed',
            details: [
                'Identity documents validated',
                'Address verification completed',
                'Digital signatures verified'
            ],
            score: 100
        },
        {
            title: 'Risk Assessment',
            status: 'passed',
            details: [
                'Low risk profile confirmed',
                'No adverse media findings',
                'Source of wealth documented'
            ],
            score: 100
        },
        {
            title: 'Compliance Screening',
            status: 'passed',
            details: [
                'Sanctions screening clear',
                'PEP status: Not applicable',
                'Watchlist screening passed'
            ],
            score: 100
        },
        {
            title: 'Final Recommendation',
            status: 'passed',
            details: [
                'Client approved for onboarding',
                'Standard monitoring recommended',
                'No additional due diligence required'
            ],
            score: 100
        }
    ];

    // Handle close with escape key
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isVisible) {
                onClose();
            }
        };

        if (isVisible) {
            document.addEventListener('keydown', handleKeyDown);
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isVisible, onClose]);

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed': return '✅';
            case 'passed': return '🟢';
            case 'flagged': return '🟡';
            default: return '⏳';
        }
    };

    const handleDownload = useCallback(async () => {
        try {
            onDownloadReport?.();
        } catch (error) {
            console.error('Failed to download report:', error);
        }
    }, [onDownloadReport]);

    const handleContinue = useCallback(() => {
        navigate('/');
    }, [navigate]);

    if (!isVisible) return null;

    return (
        <AnimatePresence mode="wait">
            <motion.div
                className="summary-report-overlay"
                variants={PROFESSIONAL_VARIANTS.overlay}
                initial="hidden"
                animate="visible"
                exit="exit"
                role="dialog"
                aria-modal="true"
                aria-labelledby="report-title"
                onClick={(e) => e.target === e.currentTarget && onClose()}
            >
                <motion.div
                    className="summary-report"
                    variants={PROFESSIONAL_VARIANTS.slideUp}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <motion.div
                        className="report-header"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: prefersReducedMotion ? 0 : 0.3,
                            ...BANKING_TRANSITIONS.subtle
                        }}
                    >
                        <div className="header-content">
                            <h2 id="report-title">🎉 PKR Case Summary Report</h2>
                            <p className="case-id">Case ID: {caseId}</p>
                            <motion.button
                                className="close-button"
                                onClick={onClose}
                                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                                transition={BANKING_TRANSITIONS.precise}
                                aria-label="Close summary report"
                            >
                                ×
                            </motion.button>
                        </div>
                        <div className="completion-banner">
                            <span className="completion-icon">🏆</span>
                            <span className="completion-text">PKR Processing Complete</span>
                        </div>
                    </motion.div>

                    {/* Report Sections */}
                    <motion.div
                        className="report-content"
                        variants={PROFESSIONAL_VARIANTS.staggerContainer}
                        initial="hidden"
                        animate="visible"
                    >
                        {reportData.map((section, index) => (
                            <motion.div
                                key={section.title}
                                className="report-section"
                                variants={PROFESSIONAL_VARIANTS.staggerItem}
                                whileHover={prefersReducedMotion ? {} : {
                                    y: -2,
                                    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.12)",
                                    transition: BANKING_TRANSITIONS.precise
                                }}
                            >
                                <div className="section-header">
                                    <div className="section-title">
                                        <span className="status-icon">{getStatusIcon(section.status)}</span>
                                        <h3>{section.title}</h3>
                                    </div>
                                    {section.score && (
                                        <div className="score-badge">
                                            <span className="score-number">{section.score}%</span>
                                        </div>
                                    )}
                                </div>
                                <div className="section-details">
                                    {section.details.map((detail, detailIndex) => (
                                        <motion.div
                                            key={detailIndex}
                                            className="detail-item"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{
                                                delay: prefersReducedMotion ? 0 : 0.5 + (index * 0.08) + (detailIndex * 0.03),
                                                ...BANKING_TRANSITIONS.subtle
                                            }}
                                        >
                                            <span className="bullet">•</span>
                                            <span className="detail-text">{detail}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Overall Score */}
                    <motion.div
                        className="overall-score"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            delay: prefersReducedMotion ? 0 : 0.8,
                            ...BANKING_TRANSITIONS.smooth
                        }}
                    >
                        <div className="score-circle">
                            <div className="score-value">100%</div>
                            <div className="score-label">Overall Score</div>
                        </div>
                        <div className="recommendation">
                            <h4>Final Recommendation</h4>
                            <p className="recommendation-text">
                                ✅ <strong>Approved for Onboarding</strong> - All verification checks passed successfully
                            </p>
                        </div>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                        className="report-actions"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: prefersReducedMotion ? 0 : 1.0,
                            ...BANKING_TRANSITIONS.smooth
                        }}
                    >
                        <motion.button
                            className="action-button secondary"
                            onClick={handleDownload}
                            whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                            whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                            transition={BANKING_TRANSITIONS.precise}
                        >
                            Access full report
                        </motion.button>
                        <motion.button
                            className="action-button primary"
                            onClick={handleContinue}
                            whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                            whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                            transition={BANKING_TRANSITIONS.precise}
                        >
                            Continue to Dashboard
                        </motion.button>
                    </motion.div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default SummaryReport;
