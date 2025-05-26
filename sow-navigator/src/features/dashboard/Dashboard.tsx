import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.less';
import { Background } from '@xyflow/react';

interface DashboardProps {
    isVisible: boolean;
}

interface ClientData {
    name: string;
    brNo: string;
    totalAssets: string;
    ytdChange: string;
    ytdChangePercentage: string;
    numberOfPKRTasks: number;
    highRiskFlag?: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ isVisible }) => {
    const [clientId, setClientId] = useState('');
    const navigate = useNavigate();

    // Dummy data for the dashboard
    const dashboardStats = {
        totalClients: 23,
        clientsInKYCCycle: 2,
        lowRiskPercentage: 40,
        mediumRiskPercentage: 40,
        highRiskPercentage: 20,
        onboardingPercentage: 10,
        pkrPercentage: 90,
        singaporePercentage: 60,
        hongKongPercentage: 40
    };

    const clientsData: ClientData[] = [
        {
            name: 'Sophia Nguyen',
            brNo: '1234-567890',
            totalAssets: 'USD 18,000,000',
            ytdChange: '4,320,000',
            ytdChangePercentage: '+24%',
            numberOfPKRTasks: 20,
            highRiskFlag: true
        },
        {
            name: 'Ethan Lau',
            brNo: '1234-567891',
            totalAssets: 'USD 8,888,880',
            ytdChange: '888,888',
            ytdChangePercentage: '+10%',
            numberOfPKRTasks: 2
        },
        {
            name: 'Chloe Tan',
            brNo: '1234-567892',
            totalAssets: 'USD 8,888,880',
            ytdChange: '',
            ytdChangePercentage: '',
            numberOfPKRTasks: 0
        }
    ];

    const handleProceed = () => {
        if (clientId.trim()) {
            // Navigate to the PKR status page for the entered client ID
            navigate(`/case/${clientId}`);
        }
    };

    const handleRunPKR = (clientName: string) => {
        // Navigate to the PKR status page for the selected client
        navigate(`/case/${clientName.toLowerCase().replace(' ', '-')}`);
    };

    if (!isVisible) return null;

    return (
        <>
            <div className="dashboard">
                {/* Horizontal Statistics Banner */}
                <div className="stats-banner">
                    <div className="stats-section clients-current-section">
                        <div className="stat-group">
                            <div className="stat-number">{dashboardStats.totalClients}</div>
                            <div className="stat-label">Clients</div>
                        </div>
                    </div>
                    <div className="stats-section clients-kyc-section">
                        <div className="stat-group">
                            <div className="stat-number">{dashboardStats.clientsInKYCCycle}</div>
                            <div className="stat-label">Clients in KYC Cycle</div>
                        </div>
                    </div>

                    <div className="stats-section risk-section">
                        <div className="section-label">Risk category</div>
                        <div className="stat-groups-container">
                            <div className="stat-group">
                                <div className="stat-number">{dashboardStats.lowRiskPercentage}%</div>
                                <div className="stat-label">Low</div>
                            </div>
                            <div className="stat-group">
                                <div className="stat-number">{dashboardStats.mediumRiskPercentage}%</div>
                                <div className="stat-label">Medium</div>
                            </div>
                            <div className="stat-group">
                                <div className="stat-number high-risk">{dashboardStats.highRiskPercentage}%</div>
                                <div className="stat-label">High</div>
                            </div>
                        </div>
                    </div>

                    <div className="stats-section journey-section">
                        <div className="section-label">% by journey</div>
                        <div className="stat-groups-container">
                            <div className="stat-group">
                                <div className="stat-number">{dashboardStats.onboardingPercentage}%</div>
                                <div className="stat-label">Onboarding</div>
                            </div>
                            <div className="stat-group">
                                <div className="stat-number">{dashboardStats.pkrPercentage}%</div>
                                <div className="stat-label">PKR</div>
                            </div>
                        </div>
                    </div>

                    <div className="stats-section location-section">
                        <div className="section-label">Location</div>
                        <div className="stat-groups-container">
                            <div className="stat-group">
                                <div className="stat-number">{dashboardStats.singaporePercentage}%</div>
                                <div className="stat-label">Singapore</div>
                            </div>
                            <div className="stat-group">
                                <div className="stat-number">{dashboardStats.hongKongPercentage}%</div>
                                <div className="stat-label">Hong Kong</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="dashboard-content">
                    {/* Main Content Area */}
                    <div className="main-content">
                        {/* OnePass AI Assistant */}
                        <div className="onepass-ai">
                            <div className="ai-icon-container">
                                <div className="ai-icon">◯</div>
                            </div>
                            <div className="ai-text">OnePass AI - Happy to assist you</div>
                            <div className="ai-mic-container">
                                <div className="ai-mic">🎤</div>
                            </div>
                        </div>

                        {/* Continuous Client Monitoring */}
                        <div className="client-monitoring">
                            <div className="section-header">
                                <div className="section-icon">◎</div>
                                <h2>Continuous Client Monitoring</h2>
                            </div>

                            {/* Clients Table */}
                            <div className="clients-table-container">
                                <table className="clients-table">
                                    <thead>
                                        <tr>
                                            <th className="name-column">Name <span className="sort-icon">▼</span></th>
                                            <th>BR no.</th>
                                            <th>
                                                Total assets
                                                <div className="secondary-header">YTD change <span className="sort-icon">▼</span></div>
                                            </th>
                                            <th>Number of PKR tasks <span className="sort-icon">▼</span></th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {clientsData.map((client, index) => (
                                            <tr key={index}>
                                                <td className="name-column">{client.name}</td>
                                                <td>{client.brNo}</td>
                                                <td className="assets-column">
                                                    <div>{client.totalAssets}</div>
                                                    {client.ytdChange && (
                                                        <div className="ytd-change">
                                                            {client.ytdChangePercentage} {client.ytdChange}
                                                        </div>
                                                    )}
                                                </td>
                                                <td>
                                                    {client.numberOfPKRTasks > 0 ? (
                                                        <div className="pkr-tasks">
                                                            <span className="sow-link">{client.numberOfPKRTasks} SOW</span>
                                                            {client.highRiskFlag && (
                                                                <span className="risk-triangle"> (2 🔺)</span>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <span>0</span>
                                                    )}
                                                </td>
                                                <td>
                                                    {client.numberOfPKRTasks > 0 && (
                                                        <div className="pkr-button-container">
                                                            <button
                                                                className="run-pkr-button"
                                                                onClick={() => handleRunPKR(client.name)}
                                                            >
                                                                Let's run the PKR for {client.name.split(' ')[0]}
                                                            </button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
