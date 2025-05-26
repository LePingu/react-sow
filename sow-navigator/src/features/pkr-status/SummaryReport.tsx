import React, { useState, useEffect } from 'react';
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

const SummaryReport: React.FC<SummaryReportProps> = ({ isVisible, onClose, caseId }) => {
    const [animationStage, setAnimationStage] = useState(0);
    const [currentSection, setCurrentSection] = useState(0);

    const reportData: ReportSection[] = [
        {
            title: 'Document Verification',
            status: 'completed',
            details: [
                'Identity documents validated',
                'Address verification completed',
                'Digital signatures verified'
            ],
            score: 95
        },
        {
            title: 'Risk Assessment',
            status: 'passed',
            details: [
                'Low risk profile confirmed',
                'No adverse media findings',
                'Source of wealth documented'
            ],
            score: 88
        },
        {
            title: 'Compliance Screening',
            status: 'passed',
            details: [
                'Sanctions screening clear',
                'PEP status: Not applicable',
                'Watchlist screening passed'
            ],
            score: 92
        },
        {
            title: 'Final Recommendation',
            status: 'passed',
            details: [
                'Client approved for onboarding',
                'Standard monitoring recommended',
                'No additional due diligence required'
            ],
            score: 91
        }
    ];

    useEffect(() => {
        if (isVisible) {
            // Start animation sequence
            setAnimationStage(0);
            setCurrentSection(0);

            const timer1 = setTimeout(() => setAnimationStage(1), 300);
            const timer2 = setTimeout(() => setAnimationStage(2), 800);

            // Animate sections one by one
            const sectionTimers = reportData.map((_, index) =>
                setTimeout(() => setCurrentSection(index + 1), 1200 + (index * 600))
            );

            return () => {
                clearTimeout(timer1);
                clearTimeout(timer2);
                sectionTimers.forEach(clearTimeout);
            };
        }
    }, [isVisible, reportData.length]);

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed': return '✅';
            case 'passed': return '🟢';
            case 'flagged': return '🟡';
            default: return '⏳';
        }
    };

    if (!isVisible) return null;

    return (
        <div className={`summary-report-overlay ${animationStage >= 1 ? 'visible' : ''}`}>
            <div className={`summary-report ${animationStage >= 2 ? 'slide-in' : ''}`}>
                {/* Header */}
                <div className="report-header">
                    <div className="header-content">
                        <h2>🎉 PKR Case Summary Report</h2>
                        <p className="case-id">Case ID: {caseId}</p>
                        <button className="close-button" onClick={onClose}>×</button>
                    </div>
                    <div className="completion-banner">
                        <span className="completion-icon">🏆</span>
                        <span className="completion-text">PKR Processing Complete</span>
                    </div>
                </div>

                {/* Report Sections */}
                <div className="report-content">
                    {reportData.map((section, index) => (
                        <div
                            key={section.title}
                            className={`report-section ${currentSection > index ? 'animate-in' : ''}`}
                            style={{ animationDelay: `${index * 0.2}s` }}
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
                                    <div key={detailIndex} className="detail-item">
                                        <span className="bullet">•</span>
                                        <span className="detail-text">{detail}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Overall Score */}
                <div className={`overall-score ${currentSection >= reportData.length ? 'visible' : ''}`}>
                    <div className="score-circle">
                        <div className="score-value">91%</div>
                        <div className="score-label">Overall Score</div>
                    </div>
                    <div className="recommendation">
                        <h4>Final Recommendation</h4>
                        <p className="recommendation-text">
                            ✅ <strong>Approved for Onboarding</strong> - All verification checks passed successfully
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="report-actions">
                    <button className="action-button secondary">Download Report</button>
                    <button className="action-button primary" onClick={onClose}>
                        Continue to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SummaryReport;
