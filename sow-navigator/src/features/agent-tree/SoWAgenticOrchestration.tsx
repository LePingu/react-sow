import React, { useState, useEffect, useCallback } from 'react';
import { type Node, type Edge, type NodeTypes, type EdgeTypes, MarkerType } from '@xyflow/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlowDiagram } from '../flow-diagram';
import { AnimatedEdge } from '../../components';
import AnimatedAgentNode from './AnimatedAgentNode';
import AnimatedOrchestratorNode from './AnimatedOrchestratorNode';
import './SoWAgenticOrchestration.less';

type AgentStatus = 'pending' | 'active' | 'completed';

interface AgentState {
    id: string;
    name: string;
    status: AgentStatus;
    processingTime: number; // in seconds
    position: { x: number; y: number };
}

const SoWAgenticOrchestration: React.FC = () => {
    const [agents, setAgents] = useState<AgentState[]>([
        {
            id: 'id-data-extraction',
            name: 'ID Data Extraction',
            status: 'pending',
            processingTime: 3,
            position: { x: 100, y: 200 }
        },
        {
            id: 'payslip-verification',
            name: 'Payslip Verification Agent',
            status: 'pending',
            processingTime: 5,
            position: { x: 400, y: 200 }
        },
        {
            id: 'web-references-checker',
            name: 'Web References Checker',
            status: 'pending',
            processingTime: 4,
            position: { x: 700, y: 200 }
        }
    ]);

    const [orchestrationStarted, setOrchestrationStarted] = useState(false);
    const [completedCount, setCompletedCount] = useState(0);

    // Start orchestration process
    const startOrchestration = useCallback(() => {
        if (orchestrationStarted) return;

        setOrchestrationStarted(true);

        // Start all agents with a slight delay between them
        agents.forEach((agent, index) => {
            setTimeout(() => {
                setAgents(prev => prev.map(a =>
                    a.id === agent.id ? { ...a, status: 'active' } : a
                ));

                // Complete agent after processing time
                setTimeout(() => {
                    setAgents(prev => prev.map(a =>
                        a.id === agent.id ? { ...a, status: 'completed' } : a
                    ));
                    setCompletedCount(prev => prev + 1);
                }, agent.processingTime * 1000);

            }, index * 800); // Stagger start times
        });
    }, [agents, orchestrationStarted]);

    // Reset orchestration
    const resetOrchestration = useCallback(() => {
        setAgents(prev => prev.map(agent => ({ ...agent, status: 'pending' })));
        setOrchestrationStarted(false);
        setCompletedCount(0);
    }, []);

    // Auto-start orchestration after component mount
    useEffect(() => {
        const timer = setTimeout(() => {
            startOrchestration();
        }, 2000);

        return () => clearTimeout(timer);
    }, [startOrchestration]);

    const nodeTypes: NodeTypes = {
        orchestrator: AnimatedOrchestratorNode,
        agent: AnimatedAgentNode,
    };

    const edgeTypes: EdgeTypes = {
        animated: AnimatedEdge,
    };

    // Generate nodes
    const nodes: Node[] = [
        {
            id: 'orchestrator',
            type: 'orchestrator',
            position: { x: 400, y: 50 },
            data: {
                message: `🎯 SoW Agentic Orchestration - Processing ${completedCount}/${agents.length} agents completed`,
                timestamp: new Date().toLocaleTimeString()
            }
        },
        ...agents.map(agent => ({
            id: agent.id,
            type: 'agent',
            position: agent.position,
            data: {
                name: agent.name,
                status: agent.status,
                onClick: () => { }
            }
        }))
    ];

    // Generate edges
    const edges: Edge[] = agents.map(agent => ({
        id: `e-orchestrator-${agent.id}`,
        source: 'orchestrator',
        target: agent.id,
        type: 'animated',
        style: {
            stroke: agent.status === 'completed' ? '#10b981' :
                agent.status === 'active' ? '#f97316' : '#6b7280',
            strokeWidth: 2
        },
        pathOptions: { offset: 10, borderRadius: 30 },
        markerEnd: {
            type: MarkerType.ArrowClosed,
            color: agent.status === 'completed' ? '#10b981' :
                agent.status === 'active' ? '#f97316' : '#6b7280'
        }
    }));

    return (
        <div className="sow-agentic-orchestration">
            <motion.div
                className="orchestration-header"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1>SoW Agentic Orchestration</h1>
                <p className="subtitle">Real-time Source of Wealth verification processing</p>

                <div className="control-panel">
                    <motion.button
                        className="control-btn start"
                        onClick={startOrchestration}
                        disabled={orchestrationStarted}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {orchestrationStarted ? '🔄 Processing...' : '▶️ Start Orchestration'}
                    </motion.button>

                    <motion.button
                        className="control-btn reset"
                        onClick={resetOrchestration}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        🔄 Reset
                    </motion.button>
                </div>

                <div className="progress-indicator">
                    <div className="progress-text">
                        Progress: {completedCount}/{agents.length} agents completed
                    </div>
                    <div className="progress-bar">
                        <motion.div
                            className="progress-fill"
                            initial={{ width: 0 }}
                            animate={{ width: `${(completedCount / agents.length) * 100}%` }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                    </div>
                </div>
            </motion.div>

            <FlowDiagram
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                className="orchestration-flow"
                height="calc(100vh - 250px)"
            />

            {/* Completion celebration */}
            {/* <AnimatePresence>
                {completedCount === agents.length && orchestrationStarted && (
                    <motion.div
                        className="completion-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.div
                            className="completion-message"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 20,
                                delay: 0.2
                            }}
                        >
                            <h2>🎉 Orchestration Complete!</h2>
                            <p>All SoW verification agents have completed processing</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence> */}
        </div>
    );
};

export default SoWAgenticOrchestration;
