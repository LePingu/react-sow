import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { type Node, type Edge, type NodeTypes, type EdgeTypes, MarkerType } from '@xyflow/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlowDiagram } from '../flow-diagram';
import { MainAgentNode, ChildAgentNode, OrchestratorNode } from '../../components/agent-nodes';
import { AnimatedEdge } from '../../components';
import { useAccessibleMotion } from '../../hooks/useAccessibleMotion';
import { PROFESSIONAL_VARIANTS, BANKING_TRANSITIONS } from '../../utils/motionPresets';
import './PKRStatusPage.less';

// Agent configuration data
const agentConfig = {
    mainAgents: [
        {
            id: 'kyc-info-processor',
            name: 'KYC Information Processor',
            status: 'active' as const,
            position: { x: 50, y: 300 },
            type: 'main'
        },
        {
            id: 'kyc-profiler',
            name: 'KYC Profiler',
            status: 'completed' as const,
            position: { x: 500, y: 300 },
            type: 'main'
        },
        {
            id: 'risk-assessor',
            name: 'Risk Assessor',
            status: 'pending' as const,
            position: { x: 900, y: 300 },
            type: 'main'
        }
    ],
    childAgents: [
        {
            id: 'client-profile-writer',
            name: 'Client Profile Writer',
            status: 'completed' as const,
            position: { x: 750, y: 350 },
            type: 'child'
        },
        {
            id: 'sow-corroboration-assessor',
            name: 'SoW Corroboration Assessor',
            status: 'pending' as const,
            position: { x: 750, y: 350 },
            type: 'child'
        }
    ]
};

// Helper function to determine edge status based on source and target nodes
const getEdgeStatus = (sourceId: string, targetId: string): 'active' | 'pending' | 'completed' | 'default' => {
    const allAgents = [...agentConfig.mainAgents, ...agentConfig.childAgents];
    const sourceAgent = allAgents.find(agent => agent.id === sourceId);
    const targetAgent = allAgents.find(agent => agent.id === targetId);

    // Special case for orchestrator as source (orchestrator sends tasks to agents)
    if (sourceId === 'orchestrator') {
        if (targetAgent?.status === 'active') return 'active';
        if (targetAgent?.status === 'completed') return 'completed';
        return 'pending';
    }

    // For agent-to-agent connections (data flow between agents)
    if (sourceAgent && targetAgent) {
        // Edge is active when source is completed and target is actively processing
        if (sourceAgent.status === 'completed' && targetAgent.status === 'active') {
            return 'active';
        }
        // Edge is completed when both source and target are completed
        if (sourceAgent.status === 'completed' && targetAgent.status === 'completed') {
            return 'completed';
        }
        // Edge is pending when source is still active (not ready to send data)
        if (sourceAgent.status === 'active' || sourceAgent.status === 'pending') {
            return 'pending';
        }
    }

    return 'default';
};

// Edge configuration data
const edgeConfig = [
    {
        id: 'e-orchestrator-kyc-info',
        source: 'orchestrator',
        target: 'kyc-info-processor',
        type: 'animated',
        style: { stroke: '#374151', strokeWidth: 2 }
    },
    {
        id: 'e-orchestrator-kyc-profiler',
        source: 'orchestrator',
        target: 'kyc-profiler',
        type: 'animated',
        style: { stroke: '#374151', strokeWidth: 2 }
    },
    {
        id: 'e-orchestrator-risk',
        source: 'orchestrator',
        target: 'risk-assessor',
        type: 'animated',
        style: { stroke: '#374151', strokeWidth: 2 }
    },
    {
        id: 'e-risk-writer',
        source: 'risk-assessor',
        target: 'client-profile-writer',
        type: 'animated',
        style: { stroke: '#374151', strokeWidth: 2 }
    },
    {
        id: 'e-risk-sow',
        source: 'risk-assessor',
        target: 'sow-corroboration-assessor',
        type: 'animated',
        style: { stroke: '#374151', strokeWidth: 2 }
    }
];

interface PKRStatusPageProps {
    isVisible?: boolean;
}

const PKRStatusPage: React.FC<PKRStatusPageProps> = ({ isVisible = true }) => {
    const { caseId } = useParams<{ caseId: string }>();
    const navigate = useNavigate();
    const { getTransition } = useAccessibleMotion();

    const handleAgentClick = (agentId: string, agentName: string) => {
        if (agentId === 'sow-corroboration-assessor' || agentName.toLowerCase().includes('sow')) {
            navigate(`/case/${caseId}/agent/${agentId}`);
        }
    };

    // const handleBackToDashboard = () => {
    //     navigate(-1);
    // };

    const nodeTypes: NodeTypes = {
        orchestrator: OrchestratorNode,
        mainAgent: MainAgentNode,
        childAgent: ChildAgentNode,
    };

    const edgeTypes: EdgeTypes = {
        animated: AnimatedEdge,
    };

    // Generate nodes from configuration
    const nodes: Node[] = [
        {
            id: 'orchestrator',
            type: 'orchestrator',
            position: { x: 500, y: 50 },
            data: {
                message: "📋 PKR Status Overview - Review the current completion status of all verification agents.",
                timestamp: new Date().toLocaleTimeString()
            }
        },
        // Main agents
        ...agentConfig.mainAgents.map(agent => ({
            id: agent.id,
            type: 'mainAgent',
            position: agent.position,
            data: {
                name: agent.name,
                status: agent.status,
                onClick: () => handleAgentClick(agent.id, agent.name)
            }
        })),
        // Child agents
        ...agentConfig.childAgents.map(agent => ({
            id: agent.id,
            type: 'childAgent',
            position: agent.position,
            data: {
                name: agent.name,
                status: agent.status,
                onClick: () => handleAgentClick(agent.id, agent.name)
            }
        }))
    ];

    // Generate edges from configuration
    const edges: Edge[] = edgeConfig.map(edge => {
        const edgeStatus = getEdgeStatus(edge.source, edge.target);
        return {
            id: edge.id,
            source: edge.source,
            target: edge.target,
            style: edge.style,
            type: edge.type,
            data: { status: edgeStatus },
            pathOptions: { offset: 10, borderRadius: 30 },
            markerEnd: { type: MarkerType.ArrowClosed, color: edge.style.stroke }
        };
    });

    if (!isVisible) return null;

    return (
        <AnimatePresence mode="wait">
            {isVisible && (
                <motion.div
                    key="pkr-status-page"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={PROFESSIONAL_VARIANTS.fadeIn}
                    transition={getTransition(BANKING_TRANSITIONS.smooth)}
                    className="pkr-status-container"
                >
                    <FlowDiagram
                        nodes={nodes}
                        edges={edges}
                        nodeTypes={nodeTypes}
                        edgeTypes={edgeTypes}
                        onNodeClick={handleAgentClick}
                        className="pkr-flow"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PKRStatusPage;
