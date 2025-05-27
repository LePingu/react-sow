import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.less';
import { StatsBanner, SearchBar } from '../../components';

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

    const handleProceed = (query: string) => {
        if (query.trim()) {
            // Navigate to the PKR status page for the entered client ID/query
            navigate(`/case/${query.trim()}`);
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
                <StatsBanner data={dashboardStats} />

                <div className="dashboard-content">
                    {/* Main Content Area */}
                    <div className="main-content">
                        {/* OnePass AI Assistant - replaced with modern SearchBar */}
                        <SearchBar
                            placeholder="Search clients, cases, or ask OnePass AI..."
                            onSubmit={handleProceed}
                            className="dashboard-search"
                        />

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
