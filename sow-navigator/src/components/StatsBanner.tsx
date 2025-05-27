import React from 'react';
import './StatsBanner.less';

export interface StatsData {
    totalClients: number;
    clientsInKYCCycle: number;
    lowRiskPercentage: number;
    mediumRiskPercentage: number;
    highRiskPercentage: number;
    onboardingPercentage: number;
    pkrPercentage: number;
    singaporePercentage: number;
    hongKongPercentage: number;
}

export interface StatsBannerProps {
    data: StatsData;
}

const StatsBanner: React.FC<StatsBannerProps> = ({ data }) => {
    return (
        <div className="stats-banner">
            <div className="stats-section clients-current-section">
                <div className="stat-group">
                    <div className="stat-number">{data.totalClients}</div>
                    <div className="stat-label">Clients</div>
                </div>
            </div>

            <div className="stats-section clients-kyc-section">
                <div className="stat-group">
                    <div className="stat-number">{data.clientsInKYCCycle}</div>
                    <div className="stat-label">Clients in KYC Cycle</div>
                </div>
            </div>

            <div className="stats-section risk-section">
                <div className="section-label">Risk category</div>
                <div className="stat-groups-container">
                    <div className="stat-group">
                        <div className="stat-number">{data.lowRiskPercentage}%</div>
                        <div className="stat-label">Low</div>
                    </div>
                    <div className="stat-group">
                        <div className="stat-number">{data.mediumRiskPercentage}%</div>
                        <div className="stat-label">Medium</div>
                    </div>
                    <div className="stat-group">
                        <div className="stat-number high-risk">{data.highRiskPercentage}%</div>
                        <div className="stat-label">High</div>
                    </div>
                </div>
            </div>

            <div className="stats-section journey-section">
                <div className="section-label">% by journey</div>
                <div className="stat-groups-container">
                    <div className="stat-group">
                        <div className="stat-number">{data.onboardingPercentage}%</div>
                        <div className="stat-label">Onboarding</div>
                    </div>
                    <div className="stat-group">
                        <div className="stat-number">{data.pkrPercentage}%</div>
                        <div className="stat-label">PKR</div>
                    </div>
                </div>
            </div>

            <div className="stats-section location-section">
                <div className="section-label">Location</div>
                <div className="stat-groups-container">
                    <div className="stat-group">
                        <div className="stat-number">{data.singaporePercentage}%</div>
                        <div className="stat-label">Singapore</div>
                    </div>
                    <div className="stat-group">
                        <div className="stat-number">{data.hongKongPercentage}%</div>
                        <div className="stat-label">Hong Kong</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsBanner;
