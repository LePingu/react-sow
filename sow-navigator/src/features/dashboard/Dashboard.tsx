import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Dashboard.less';
import { StatsBanner, SearchBar } from '../../components';
import { useAccessibleMotion } from '../../hooks/useAccessibleMotion';
import { PROFESSIONAL_VARIANTS, BANKING_TRANSITIONS } from '../../utils/motionPresets';

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
    const { getTransition } = useAccessibleMotion();

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
        <AnimatePresence mode="wait">
            {isVisible && (
                <motion.div
                    key="dashboard"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={PROFESSIONAL_VARIANTS.fadeIn}
                    transition={getTransition(BANKING_TRANSITIONS.smooth)}
                    className="dashboard"
                >
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
                            <motion.div
                                className="client-monitoring"
                                variants={PROFESSIONAL_VARIANTS.fadeIn}
                                initial="hidden"
                                animate="visible"
                                transition={getTransition(BANKING_TRANSITIONS.smooth)}
                            >
                                <motion.div
                                    className="section-header"
                                    variants={PROFESSIONAL_VARIANTS.staggerItem}
                                >
                                    <motion.div
                                        className="section-icon"
                                        whileHover={{
                                            rotate: 360,
                                            transition: { duration: 0.6, ease: "easeInOut" }
                                        }}
                                    >
                                        ◎
                                    </motion.div>
                                    <h2>Continuous Client Monitoring</h2>
                                </motion.div>

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
                                        <motion.tbody
                                            variants={PROFESSIONAL_VARIANTS.staggerContainer}
                                            initial="hidden"
                                            animate="visible"
                                        >
                                            {clientsData.map((client, index) => (
                                                <motion.tr
                                                    key={index}
                                                    variants={PROFESSIONAL_VARIANTS.staggerItem}
                                                    transition={getTransition(BANKING_TRANSITIONS.subtle)}
                                                    whileHover={{
                                                        backgroundColor: "rgba(239, 68, 68, 0.02)",
                                                        scale: 1.002,
                                                        transition: getTransition(BANKING_TRANSITIONS.precise)
                                                    }}
                                                    className="client-row"
                                                >
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
                                                            <motion.div
                                                                className="pkr-button-container"
                                                                variants={PROFESSIONAL_VARIANTS.scaleIn}
                                                            >
                                                                <motion.button
                                                                    className="run-pkr-button"
                                                                    onClick={() => handleRunPKR(client.name)}
                                                                    whileHover={{
                                                                        scale: 1.02,
                                                                        boxShadow: "0 4px 12px rgba(239, 68, 68, 0.15)",
                                                                        transition: getTransition(BANKING_TRANSITIONS.precise)
                                                                    }}
                                                                    whileTap={{
                                                                        scale: 0.98,
                                                                        transition: getTransition(BANKING_TRANSITIONS.precise)
                                                                    }}
                                                                    transition={getTransition(BANKING_TRANSITIONS.subtle)}
                                                                >
                                                                    Let's run the PKR for {client.name.split(' ')[0]}
                                                                </motion.button>
                                                            </motion.div>
                                                        )}
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </motion.tbody>
                                    </table>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Dashboard;
