import React from 'react';
import { motion } from 'framer-motion';
import { useAccessibleMotion } from '../hooks/useAccessibleMotion';
import { PROFESSIONAL_VARIANTS, BANKING_TRANSITIONS } from '../utils/motionPresets';
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
    const { getTransition } = useAccessibleMotion();

    return (
        <motion.div
            className="stats-banner"
            variants={PROFESSIONAL_VARIANTS.staggerContainer}
            initial="hidden"
            animate="visible"
            transition={getTransition(BANKING_TRANSITIONS.smooth)}
        >
            <motion.div
                className="stats-section clients-current-section"
                variants={PROFESSIONAL_VARIANTS.staggerItem}
            >
                <div className="stat-group">
                    <motion.div
                        className="stat-number"
                        variants={PROFESSIONAL_VARIANTS.scaleIn}
                    >
                        {data.totalClients}
                    </motion.div>
                    <div className="stat-label">Clients</div>
                </div>
            </motion.div>

            <motion.div
                className="stats-section clients-kyc-section"
                variants={PROFESSIONAL_VARIANTS.staggerItem}
            >
                <div className="stat-group">
                    <motion.div
                        className="stat-number"
                        variants={PROFESSIONAL_VARIANTS.scaleIn}
                    >
                        {data.clientsInKYCCycle}
                    </motion.div>
                    <div className="stat-label">Clients in KYC Cycle</div>
                </div>
            </motion.div>

            <motion.div
                className="stats-section risk-section"
                variants={PROFESSIONAL_VARIANTS.staggerItem}
            >
                <div className="section-label">Risk category</div>
                <motion.div
                    className="stat-groups-container"
                    variants={PROFESSIONAL_VARIANTS.staggerContainer}
                >
                    <motion.div
                        className="stat-group"
                        variants={PROFESSIONAL_VARIANTS.staggerItem}
                    >
                        <motion.div
                            className="stat-number"
                            variants={PROFESSIONAL_VARIANTS.scaleIn}
                        >
                            {data.lowRiskPercentage}%
                        </motion.div>
                        <div className="stat-label">Low</div>
                    </motion.div>
                    <motion.div
                        className="stat-group"
                        variants={PROFESSIONAL_VARIANTS.staggerItem}
                    >
                        <motion.div
                            className="stat-number"
                            variants={PROFESSIONAL_VARIANTS.scaleIn}
                        >
                            {data.mediumRiskPercentage}%
                        </motion.div>
                        <div className="stat-label">Medium</div>
                    </motion.div>
                    <motion.div
                        className="stat-group"
                        variants={PROFESSIONAL_VARIANTS.staggerItem}
                    >
                        <motion.div
                            className="stat-number high-risk"
                            variants={PROFESSIONAL_VARIANTS.scaleIn}
                        >
                            {data.highRiskPercentage}%
                        </motion.div>
                        <div className="stat-label">High</div>
                    </motion.div>
                </motion.div>
            </motion.div>

            <motion.div
                className="stats-section journey-section"
                variants={PROFESSIONAL_VARIANTS.staggerItem}
            >
                <div className="section-label">% by journey</div>
                <motion.div
                    className="stat-groups-container"
                    variants={PROFESSIONAL_VARIANTS.staggerContainer}
                >
                    <motion.div
                        className="stat-group"
                        variants={PROFESSIONAL_VARIANTS.staggerItem}
                    >
                        <motion.div
                            className="stat-number"
                            variants={PROFESSIONAL_VARIANTS.scaleIn}
                        >
                            {data.onboardingPercentage}%
                        </motion.div>
                        <div className="stat-label">Onboarding</div>
                    </motion.div>
                    <motion.div
                        className="stat-group"
                        variants={PROFESSIONAL_VARIANTS.staggerItem}
                    >
                        <motion.div
                            className="stat-number"
                            variants={PROFESSIONAL_VARIANTS.scaleIn}
                        >
                            {data.pkrPercentage}%
                        </motion.div>
                        <div className="stat-label">PKR</div>
                    </motion.div>
                </motion.div>
            </motion.div>

            <motion.div
                className="stats-section location-section"
                variants={PROFESSIONAL_VARIANTS.staggerItem}
            >
                <div className="section-label">Location</div>
                <motion.div
                    className="stat-groups-container"
                    variants={PROFESSIONAL_VARIANTS.staggerContainer}
                >
                    <motion.div
                        className="stat-group"
                        variants={PROFESSIONAL_VARIANTS.staggerItem}
                    >
                        <motion.div
                            className="stat-number"
                            variants={PROFESSIONAL_VARIANTS.scaleIn}
                        >
                            {data.singaporePercentage}%
                        </motion.div>
                        <div className="stat-label">Singapore</div>
                    </motion.div>
                    <motion.div
                        className="stat-group"
                        variants={PROFESSIONAL_VARIANTS.staggerItem}
                    >
                        <motion.div
                            className="stat-number"
                            variants={PROFESSIONAL_VARIANTS.scaleIn}
                        >
                            {data.hongKongPercentage}%
                        </motion.div>
                        <div className="stat-label">Hong Kong</div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default StatsBanner;
