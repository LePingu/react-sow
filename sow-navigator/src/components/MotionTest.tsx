import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROFESSIONAL_VARIANTS, BANKING_TRANSITIONS } from '../utils/motionPresets';
import { useAccessibleMotion } from '../hooks/useAccessibleMotion';

/**
 * Test component to validate Framer Motion animations
 * This component demonstrates all the motion presets we created
 */
export const MotionTest: React.FC = () => {
    const [showOverlay, setShowOverlay] = useState(false);
    const [showItems, setShowItems] = useState(false);
    const { getTransition } = useAccessibleMotion();

    const testItems = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

    return (
        <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
            <h2>Framer Motion Test - Banking Animations</h2>

            <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
                <motion.button
                    onClick={() => setShowOverlay(true)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={getTransition(BANKING_TRANSITIONS.precise)}
                    style={{
                        padding: '0.75rem 1.5rem',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: '500'
                    }}
                >
                    Test Overlay Animation
                </motion.button>

                <motion.button
                    onClick={() => setShowItems(!showItems)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={getTransition(BANKING_TRANSITIONS.precise)}
                    style={{
                        padding: '0.75rem 1.5rem',
                        backgroundColor: '#6c757d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: '500'
                    }}
                >
                    Toggle Stagger Animation
                </motion.button>
            </div>

            {/* Stagger Animation Test */}
            <AnimatePresence>
                {showItems && (
                    <motion.div
                        variants={PROFESSIONAL_VARIANTS.staggerContainer}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        style={{ marginBottom: '2rem' }}
                    >
                        <h3>Staggered Items:</h3>
                        {testItems.map((item) => (
                            <motion.div
                                key={item}
                                variants={PROFESSIONAL_VARIANTS.staggerItem}
                                transition={getTransition(BANKING_TRANSITIONS.precise)}
                                style={{
                                    padding: '1rem',
                                    margin: '0.5rem 0',
                                    backgroundColor: '#f8f9fa',
                                    border: '1px solid #dee2e6',
                                    borderRadius: '4px'
                                }}
                            >
                                {item}
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Overlay Animation Test */}
            <AnimatePresence mode="wait">
                {showOverlay && (
                    <motion.div
                        variants={PROFESSIONAL_VARIANTS.overlay}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1000
                        }}
                        onClick={() => setShowOverlay(false)}
                    >
                        <motion.div
                            variants={PROFESSIONAL_VARIANTS.slideUp}
                            transition={getTransition(BANKING_TRANSITIONS.smooth)}
                            style={{
                                backgroundColor: 'white',
                                padding: '2rem',
                                borderRadius: '8px',
                                maxWidth: '500px',
                                width: '90%',
                                textAlign: 'center',
                                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3>Banking Animation Test</h3>
                            <p>This overlay demonstrates professional, banking-appropriate animations:</p>
                            <ul style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                                <li>Conservative timing (0.3s duration)</li>
                                <li>Professional easing curves</li>
                                <li>Backdrop blur effect</li>
                                <li>Smooth slide-up animation</li>
                                <li>Accessibility-aware motion</li>
                            </ul>

                            <motion.button
                                onClick={() => setShowOverlay(false)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                transition={getTransition(BANKING_TRANSITIONS.precise)}
                                style={{
                                    padding: '0.75rem 2rem',
                                    backgroundColor: '#dc3545',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontWeight: '500'
                                }}
                            >
                                Close
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Accessibility Info */}
            <div style={{
                marginTop: '2rem',
                padding: '1rem',
                backgroundColor: '#e9ecef',
                borderRadius: '4px',
                fontSize: '0.9rem',
                color: '#495057'
            }}>
                <h4>Accessibility Features:</h4>
                <ul>
                    <li>Respects prefers-reduced-motion setting</li>
                    <li>Respects prefers-contrast setting</li>
                    <li>Conservative timing for banking applications</li>
                    <li>Professional easing curves</li>
                    <li>Keyboard navigation support</li>
                </ul>
            </div>
        </div>
    );
};
