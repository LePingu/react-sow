import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.less';

interface DashboardProps {
    isVisible: boolean;
}

interface CaseData {
    clientId: string;
    stage: string;
    manualIntervention: boolean;
    assignedUser: string;
    riskCategory: 'High' | 'Medium' | 'Low';
}

const Dashboard: React.FC<DashboardProps> = ({ isVisible }) => {
    const [clientId, setClientId] = useState('');
    const navigate = useNavigate();

    // Dummy data for the dashboard
    const dashboardStats = {
        openCases: 2,
        closedCases: 53,
        sgPercentage: 65,
        hkPercentage: 35,
        highRisk: 15,
        mediumRisk: 60,
        lowRisk: 25
    };

    const caseData: CaseData[] = [
        {
            clientId: 'SOW-2025-001',
            stage: 'Document Review',
            manualIntervention: true,
            assignedUser: 'John Doe',
            riskCategory: 'High'
        },
        {
            clientId: 'SOW-2025-002',
            stage: 'Background Check',
            manualIntervention: false,
            assignedUser: 'John Doe',
            riskCategory: 'Medium'
        },
        {
            clientId: 'SOW-2025-003',
            stage: 'Final Approval',
            manualIntervention: true,
            assignedUser: 'John Doe',
            riskCategory: 'Low'
        }
    ];

    const handleProceed = () => {
        if (clientId.trim()) {
            // Navigate to the PKR status page for the entered client ID
            navigate(`/case/${clientId}`);
        }
    };

    const handleViewCase = (caseId: string) => {
        // Navigate to the PKR status page for the selected case
        navigate(`/case/${caseId}`);
    };

    if (!isVisible) return null;

    return (
        <>
            <div className="dashboard">
                <div className="dashboard-header">
                    <h1>Client Permanent KYC Dashboard</h1>
                    <p className="subtitle">Monitor and manage PKR cases</p>
                </div>

                {/* Statistics Cards */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-number">{dashboardStats.openCases}</div>
                        <div className="stat-label">Open Cases Pending SOW</div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-number">{dashboardStats.closedCases}</div>
                        <div className="stat-label">Cases Closed Since Jan 2025</div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-number">{dashboardStats.sgPercentage}% / {dashboardStats.hkPercentage}%</div>
                        <div className="stat-label">Singapore/Hong Kong Distribution</div>
                    </div>

                    <div className="stat-card">
                        <div className="risk-breakdown">
                            <div className="risk-item high">H: {dashboardStats.highRisk}%</div>
                            <div className="risk-item medium">M: {dashboardStats.mediumRisk}%</div>
                            <div className="risk-item low">L: {dashboardStats.lowRisk}%</div>
                        </div>
                        <div className="stat-label">Risk Distribution</div>
                    </div>
                </div>

                {/* Client ID Input */}
                <div className="client-search">
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Search Client with ID"
                            value={clientId}
                            onChange={(e) => setClientId(e.target.value)}
                            className="client-input"
                        />
                        <button
                            onClick={handleProceed}
                            className="proceed-button"
                            disabled={!clientId.trim()}
                        >
                            Proceed
                        </button>
                    </div>
                </div>

                {/* Cases Table */}
                <div className="cases-table-container">
                    <h2>Open Cases</h2>
                    <div className="table-wrapper">
                        <table className="cases-table">
                            <thead>
                                <tr>
                                    <th>Client ID</th>
                                    <th>Current Stage</th>
                                    <th>Manual Intervention</th>
                                    <th>Assigned User</th>
                                    <th>Risk Category</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {caseData.map((case_, index) => (
                                    <tr key={index}>
                                        <td className="client-id">{case_.clientId}</td>
                                        <td>{case_.stage}</td>
                                        <td>
                                            <span className={`intervention-badge ${case_.manualIntervention ? 'required' : 'not-required'}`}>
                                                {case_.manualIntervention ? 'Yes' : 'No'}
                                            </span>
                                        </td>
                                        <td>{case_.assignedUser}</td>
                                        <td>
                                            <span className={`risk-badge ${case_.riskCategory.toLowerCase()}`}>
                                                {case_.riskCategory}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                className="view-case-button"
                                                onClick={() => handleViewCase(case_.clientId)}
                                            >
                                                View Case
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
