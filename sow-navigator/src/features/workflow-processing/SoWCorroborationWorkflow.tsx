import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { type Node, type Edge, useNodesState, useEdgesState } from '@xyflow/react';
import { FlowDiagram } from '../flow-diagram';
import { AnimatedEdge, CompletionBox } from '../../components';
import { OrchestratorNode, MainAgentNode } from '../../components/agent-nodes';
import { SummaryReport } from '../pkr-status';
import { PROFESSIONAL_VARIANTS, BANKING_TRANSITIONS } from '../../utils/motionPresets';
import { useAccessibleMotion } from '../../hooks/useAccessibleMotion';
import './SoWCorroborationWorkflow.less';

interface SoWCorroborationWorkflowProps {
    isVisible: boolean;
    onBack?: () => void;
    caseId?: string;
}

// 7-second processing timeline
const PROCESSING_TIMELINE = {
    ORCHESTRATOR_START: 1000,      // 1s - Orchestrator becomes active
    AGENTS_START: 2000,           // 2s - Main agents start, orchestrator stays active
    ID_COMPLETE: 3000,            // 3s - ID Verification completes
    PAYSLIP_COMPLETE: 6000,       // 6s - Payslip Verification completes
    WEB_COMPLETE: 9500,           // 9.5s - Web References completes, orchestrator completes
    SHOW_BUTTON: 10000,            // 10s - Show "See Report" button
} as const;

// Initial nodes with pending status
const initialNodes: Node[] = [
    {
        id: 'orchestrator',
        type: 'orchestrator',
        position: { x: 400, y: 50 },
        data: {
            message: 'SoW Corroboration Assessor - Coordinating verification agents',
            timestamp: new Date().toLocaleTimeString(),
            status: 'pending',
            onClick: () => console.log('Orchestrator clicked')
        }
    },
    {
        id: 'id-verification',
        type: 'mainAgent',
        position: { x: 150, y: 250 },
        data: {
            name: 'ID Verification',
            status: 'pending',
            activeSubSteps: [
                'Extract Document Info',
                'Validate ID Format',
                'Cross-reference Data'
            ],
            onClick: () => console.log('ID Verification clicked')
        }
    },
    {
        id: 'payslip-verification',
        type: 'mainAgent',
        position: { x: 400, y: 250 },
        data: {
            name: 'Payslip Verification',
            status: 'pending',
            activeSubSteps: [
                'Parse Payslip Data',
                'Verify Employment',
                'Validate Income'
            ],
            onClick: () => console.log('Payslip Verification clicked')
        }
    },
    {
        id: 'web-references',
        type: 'mainAgent',
        position: { x: 650, y: 250 },
        data: {
            name: 'Web References',
            status: 'pending',
            activeSubSteps: [
                'Search Online Records',
                'Cross-check Databases',
                'Compile References'
            ],
            onClick: () => console.log('Web References clicked')
        }
    }
];

// Initial edges
const initialEdges: Edge[] = [
    {
        id: 'e-orchestrator-id',
        source: 'orchestrator',
        target: 'id-verification',
        type: 'animated',
        data: { status: 'default' }
    },
    {
        id: 'e-orchestrator-payslip',
        source: 'orchestrator',
        target: 'payslip-verification',
        type: 'animated',
        data: { status: 'default' }
    },
    {
        id: 'e-orchestrator-web',
        source: 'orchestrator',
        target: 'web-references',
        type: 'animated',
        data: { status: 'default' }
    }
];

// Node types configuration (simple approach without wrapper components)
const nodeTypes = {
    orchestrator: OrchestratorNode,
    mainAgent: MainAgentNode,
};

// Edge types configuration  
const edgeTypes = {
    animated: AnimatedEdge,
};

const SoWCorroborationWorkflow: React.FC<SoWCorroborationWorkflowProps> = ({
    isVisible,
    onBack,
    caseId: propCaseId
}) => {
    const { caseId: urlCaseId } = useParams<{ caseId: string }>();
    const caseId = propCaseId || urlCaseId; // Use prop caseId if provided, otherwise use URL param
    const { getTransition } = useAccessibleMotion();
    const [showSummaryReport, setShowSummaryReport] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Use React Flow hooks with simple state management (following React Flow best practices)
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    // Track when all agents are completed for progress bar animation
    const allAgentsCompleted = nodes.filter(n => n.data.status === 'completed' && n.type === 'mainAgent').length === 3;

    // Auto-start processing sequence on component mount
    useEffect(() => {
        console.log('🚀 SoW Corroboration Workflow - Starting processing sequence');

        const timers: ReturnType<typeof setTimeout>[] = [];

        // Phase 1: Start orchestrator (0.5s)
        const timer1 = setTimeout(() => {
            console.log('⚡ Phase 1: Orchestrator becoming active');
            setNodes((nds) =>
                nds.map((node) => {
                    if (node.id === 'orchestrator') {
                        return {
                            ...node,
                            data: {
                                ...node.data,
                                status: 'active',
                                timestamp: new Date().toLocaleTimeString(),
                            }
                        };
                    }
                    return node;
                })
            );
        }, PROCESSING_TIMELINE.ORCHESTRATOR_START);
        timers.push(timer1);

        // Phase 2: Start main agents (1.5s) - Keep orchestrator active
        const timer2 = setTimeout(() => {
            console.log('⚡ Phase 2: Main agents becoming active, orchestrator remains active');
            setNodes((nds) =>
                nds.map((node) => {
                    if (node.type === 'mainAgent') {
                        return {
                            ...node,
                            data: {
                                ...node.data,
                                status: 'active'
                            }
                        };
                    }
                    return node;
                })
            );

            // Update edges to show active state
            setEdges((eds) =>
                eds.map((edge) => ({
                    ...edge,
                    data: { ...edge.data, status: 'active' }
                }))
            );
        }, PROCESSING_TIMELINE.AGENTS_START);
        timers.push(timer2);

        // Phase 3: Complete ID Verification (3s)
        const timer3 = setTimeout(() => {
            console.log('✅ Phase 3: ID Verification completed');
            setNodes((nds) =>
                nds.map((node) => {
                    if (node.id === 'id-verification') {
                        return {
                            ...node,
                            data: {
                                ...node.data,
                                status: 'completed'
                            }
                        };
                    }
                    return node;
                })
            );

            // Update corresponding edge
            setEdges((eds) =>
                eds.map((edge) => {
                    if (edge.target === 'id-verification') {
                        return {
                            ...edge,
                            data: { ...edge.data, status: 'completed' }
                        };
                    }
                    return edge;
                })
            );
        }, PROCESSING_TIMELINE.ID_COMPLETE);
        timers.push(timer3);

        // Phase 4: Complete Payslip Verification (5s)
        const timer4 = setTimeout(() => {
            console.log('✅ Phase 4: Payslip Verification completed');
            setNodes((nds) =>
                nds.map((node) => {
                    if (node.id === 'payslip-verification') {
                        return {
                            ...node,
                            data: {
                                ...node.data,
                                status: 'completed'
                            }
                        };
                    }
                    return node;
                })
            );

            // Update corresponding edge
            setEdges((eds) =>
                eds.map((edge) => {
                    if (edge.target === 'payslip-verification') {
                        return {
                            ...edge,
                            data: { ...edge.data, status: 'completed' }
                        };
                    }
                    return edge;
                })
            );
        }, PROCESSING_TIMELINE.PAYSLIP_COMPLETE);
        timers.push(timer4);

        // Phase 5: Complete Web References and Orchestrator (7s) - All work done
        const timer5 = setTimeout(() => {
            console.log('✅ Phase 5: Web References completed, completing orchestrator');
            setNodes((nds) =>
                nds.map((node) => {
                    if (node.id === 'web-references') {
                        return {
                            ...node,
                            data: {
                                ...node.data,
                                status: 'completed'
                            }
                        };
                    }
                    if (node.id === 'orchestrator') {
                        return {
                            ...node,
                            data: {
                                ...node.data,
                                status: 'completed',
                                timestamp: new Date().toLocaleTimeString(),
                            }
                        };
                    }
                    return node;
                })
            );

            // Update corresponding edge
            setEdges((eds) =>
                eds.map((edge) => {
                    if (edge.target === 'web-references') {
                        return {
                            ...edge,
                            data: { ...edge.data, status: 'completed' }
                        };
                    }
                    return edge;
                })
            );
        }, PROCESSING_TIMELINE.WEB_COMPLETE);
        timers.push(timer5);

        // Phase 6: Show "See Report" button (7.5s)
        const timer6 = setTimeout(() => {
            console.log('🎉 Phase 6: Showing "See Report" button');
            setShowButton(true);
        }, PROCESSING_TIMELINE.SHOW_BUTTON);
        timers.push(timer6);

        // Cleanup function
        return () => {
            console.log('🧹 Cleaning up timers');
            timers.forEach(timer => clearTimeout(timer));
        };
    }, [setNodes, setEdges]);

    const handleSeeReport = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setShowSummaryReport(true);
        }, 1500);
    };

    const handleCloseSummary = () => {
        setShowSummaryReport(false);
        if (onBack) {
            onBack();
        }
    };

    if (showSummaryReport) {
        return (
            <SummaryReport
                isVisible={showSummaryReport}
                onClose={handleCloseSummary}
                caseId={caseId}
            />
        );
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="sow-corroboration-workflow"
                    variants={PROFESSIONAL_VARIANTS.fadeIn}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={getTransition(BANKING_TRANSITIONS.smooth)}
                >
                    {/* Header */}
                    <motion.div
                        className="workflow-header"
                        variants={PROFESSIONAL_VARIANTS.slideInFromTop}
                        transition={getTransition(BANKING_TRANSITIONS.precise)}
                    >
                        <div className="header-content">
                            <h1>SoW Corroboration Assessment</h1>
                            <p className="subtitle">Processing verification workflow</p>
                            {onBack && (
                                <button
                                    className="back-button"
                                    onClick={onBack}
                                >
                                    ← Back
                                </button>
                            )}
                        </div>
                    </motion.div>

                    <div className="workflow-main">
                        {/* Completion Box - appears at top when completed */}
                        <AnimatePresence>
                            {allAgentsCompleted && (
                                <motion.div
                                    className="completion-section"
                                    initial={{ opacity: 0, y: -50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{
                                        delay: 0.3,
                                        ...getTransition(BANKING_TRANSITIONS.smooth)
                                    }}
                                >
                                    <CompletionBox
                                        overallScore={92}
                                        accuracy={94}
                                        hallucination={8}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* See Report Button - appears after completion box */}
                        <AnimatePresence>
                            {showButton && (
                                <motion.div
                                    className="report-button-section"
                                    initial={{
                                        opacity: 0,
                                        y: 30,
                                        scale: 0.8
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        scale: 1
                                    }}
                                    exit={{
                                        opacity: 0,
                                        y: 20,
                                        scale: 0.9
                                    }}
                                    transition={{
                                        delay: 0.6,
                                        duration: 0.8,
                                        ease: "easeIn",
                                        type: "spring",
                                        stiffness: 100,
                                        damping: 15
                                    }}
                                >
                                    <motion.button
                                        className={`see-report-button ${isLoading ? 'loading' : ''}`}
                                        onClick={handleSeeReport}
                                        disabled={isLoading}
                                        whileHover={!isLoading ? { scale: 1.05 } : {}}
                                        whileTap={!isLoading ? { scale: 0.95 } : {}}
                                        initial={{ rotateX: 15 }}
                                        animate={{ rotateX: 0 }}
                                        transition={{
                                            delay: 0.2,
                                            duration: 0.6,
                                            ease: "easeIn"
                                        }}
                                    >
                                        {isLoading ? (
                                            <motion.div
                                                className="loading-spinner"
                                                animate={{ rotate: 360 }}
                                                transition={{
                                                    duration: 1,
                                                    repeat: Infinity,
                                                    ease: "linear"
                                                }}
                                            >
                                                ⏳
                                            </motion.div>
                                        ) : (
                                            <>
                                                <span className="button-icon">📊</span>
                                                <span className="button-text">See Report</span>
                                            </>
                                        )}
                                    </motion.button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Flow Diagram - always visible */}
                        <motion.div 
                            className="workflow-content"
                            initial={{ opacity: 1 }}
                            animate={{ 
                                opacity: 1,
                                minHeight: allAgentsCompleted ? "70vh" : "60vh"
                            }}
                            transition={getTransition(BANKING_TRANSITIONS.smooth)}
                        >
                            <FlowDiagram
                                nodes={nodes}
                                edges={edges}
                                onNodesChange={onNodesChange}
                                onEdgesChange={onEdgesChange}
                                nodeTypes={nodeTypes}
                                edgeTypes={edgeTypes}
                                className="corroboration-flow"
                                height="500px"
                            />
                        </motion.div>

                        {/* Progress Indicator - only shows while processing */}
                        <AnimatePresence>
                            {!allAgentsCompleted && (
                                <motion.div
                                    className="progress-section"
                                    variants={PROFESSIONAL_VARIANTS.slideInFromBottom}
                                    initial="hidden"
                                    animate="visible"
                                    exit={{
                                        opacity: 0,
                                        y: 20,
                                        scale: 0.95
                                    }}
                                    transition={{
                                        ...getTransition(BANKING_TRANSITIONS.smooth),
                                        exit: { duration: 0.6, ease: "easeOut" }
                                    }}
                                >
                                    <div className="progress-info">
                                        <span className="progress-text">
                                            Processing: {nodes.filter(n => n.data.status === 'completed' && n.type === 'mainAgent').length} of 3 agents completed
                                        </span>
                                        <div className="progress-bar">
                                            <motion.div
                                                className="progress-fill"
                                                initial={{ width: '0%' }}
                                                animate={{
                                                    width: `${((nodes.filter(n => n.data.status === 'completed' && n.type === 'mainAgent').length) / 3) * 100}%`
                                                }}
                                                transition={getTransition(BANKING_TRANSITIONS.smooth)}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SoWCorroborationWorkflow;
