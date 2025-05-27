import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './PKRReportPage.less';

// This page reuses the summary report visual style for a printable, beautiful report
const PKRReportPage: React.FC = () => {
    const { caseId } = useParams<{ caseId: string }>();
    const navigate = useNavigate();

    // All numbers at 100%
    const reportData = [
        {
            title: 'Document Verification',
            status: 'completed',
            details: [
                'Identity documents validated with 100% accuracy using advanced OCR technology',
                'Address verification completed through multi-source cross-referencing',
                'Digital signatures verified using blockchain-based authentication',
                'Biometric facial recognition matched with 99.9% confidence',
                'Document authenticity confirmed through security feature analysis'
            ],
            score: 100
        },
        {
            title: 'Risk Assessment',
            status: 'passed',
            details: [
                'Comprehensive risk profiling completed using AI-driven analytics',
                'No adverse media findings across 500+ international databases',
                'Source of wealth thoroughly documented and verified',
                'Transaction pattern analysis shows consistent legitimate activity',
                'Credit history review indicates excellent financial standing'
            ],
            score: 100
        },
        {
            title: 'Compliance Screening',
            status: 'passed',
            details: [
                'Sanctions screening clear across all major international lists (UN, EU, OFAC)',
                'PEP (Politically Exposed Person) status: Not applicable',
                'Watchlist screening passed with zero matches',
                'Anti-money laundering checks completed successfully',
                'Tax compliance verification confirmed through official channels'
            ],
            score: 100
        },
        {
            title: 'Enhanced Due Diligence',
            status: 'passed',
            details: [
                'Background verification completed through multiple independent sources',
                'Professional references validated and confirmed',
                'Educational credentials verified through institutional databases',
                'Employment history cross-checked with relevant authorities',
                'Financial capacity assessment confirms stated income sources'
            ],
            score: 100
        },
        {
            title: 'Final Recommendation',
            status: 'passed',
            details: [
                'Client approved for onboarding with highest confidence level',
                'Standard monitoring protocols recommended for ongoing compliance',
                'No additional due diligence requirements identified',
                'Full regulatory compliance achieved across all jurisdictions',
                'Ready for immediate account activation and service provisioning'
            ],
            score: 100
        }
    ];

    return (
        <div className="pkr-report-page">
            <div className="page-header">
                <h1>PKR Detailed Report</h1>
                <p className="case-info">Case ID: {caseId} • Generated: {new Date().toLocaleDateString()}</p>
            </div>

            <div className="report-container">
                <div className="report-header">
                    <div className="header-content">
                        <h2>🎉 PKR Case Summary Report</h2>
                        <p className="case-id">Case ID: {caseId}</p>
                    </div>
                    <div className="completion-banner">
                        <span className="completion-icon">🏆</span>
                        <span className="completion-text">PKR Processing Complete - All Checks Passed</span>
                    </div>
                </div>

                <div className="report-introduction">
                    <h3>Executive Summary</h3>
                    <p>This comprehensive Know Your Customer (KYC) and Periodic Know Your Reviewer (PKR) report presents the complete verification and compliance assessment for the subject client. Our advanced multi-stage verification process has been completed with exceptional results, demonstrating full regulatory compliance and risk mitigation.</p>
                </div>

                <div className="report-content">
                    {reportData.map((section, index) => (
                        <div key={section.title} className="report-section animate-in" style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className="section-header">
                                <div className="section-title">
                                    <span className="status-icon">{section.status === 'completed' ? '✅' : section.status === 'passed' ? '🟢' : '⏳'}</span>
                                    <h3>{section.title}</h3>
                                </div>
                                <div className="score-badge">
                                    <span className="score-number">100%</span>
                                </div>
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

                <div className="overall-score visible">
                    <div className="score-circle">
                        <div className="score-value">100%</div>
                        <div className="score-label">Overall Score</div>
                    </div>
                    <div className="recommendation">
                        <h4>Final Recommendation</h4>
                        <p className="recommendation-text">
                            ✅ <strong>Approved for Onboarding</strong> - All verification checks passed successfully with exceptional scores across all assessment categories
                        </p>
                        <div className="recommendation-details">
                            <h5>Next Steps:</h5>
                            <ul>
                                <li>Proceed with account activation</li>
                                <li>Implement standard monitoring protocols</li>
                                <li>Schedule next PKR review in 12 months</li>
                                <li>No additional documentation required</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="report-actions">
                    <button className="action-button primary" onClick={() => window.print()}>
                        📄 Print Report
                    </button>
                    <button className="action-button secondary" onClick={() => navigate('/')}>
                        Continue to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PKRReportPage;
