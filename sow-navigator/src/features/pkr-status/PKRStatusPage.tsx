import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { type Node, type Edge, type NodeTypes, type EdgeTypes, MarkerType } from '@xyflow/react';
import { FlowDiagram } from '../flow-diagram';
import { MainAgentNode, ChildAgentNode, OrchestratorNode } from '../../components/agent-nodes';
import { AnimatedEdge } from '../../components';
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
        style: { stroke: '#f97316', strokeWidth: 2 }
    },
    {
        id: 'e-risk-writer',
        source: 'risk-assessor',
        target: 'client-profile-writer',
        type: 'smoothstep',
        style: { stroke: '#374151', strokeWidth: 2 }
    },
    {
        id: 'e-risk-sow',
        source: 'risk-assessor',
        target: 'sow-corroboration-assessor',
        type: 'smoothstep',
        style: { stroke: '#f97316', strokeWidth: 2 }
    }
];

interface PKRStatusPageProps {
    isVisible?: boolean;
}

const PKRStatusPage: React.FC<PKRStatusPageProps> = ({ isVisible = true }) => {
    const { caseId } = useParams<{ caseId: string }>();
    const navigate = useNavigate();

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
    const edges: Edge[] = edgeConfig.map(edge => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        style: edge.style,
        type: edge.type,
        pathOptions: { offset: 10, borderRadius: 30 },
        markerEnd: { type: MarkerType.ArrowClosed, color: edge.style.stroke }
    }));

    if (!isVisible) return null;

    return (
        <FlowDiagram
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onNodeClick={handleAgentClick}
            className="pkr-flow"
        />
        // <div className="pkr-status-page">
        //     {/* <div className="pkr-header">
        //         <button className="back-button" onClick={handleBackToDashboard}>
        //             ← Back to Dashboard
        //         </button>
        //         <h1>PKR Case Status - {caseId}</h1>
        //         <p className="subtitle">Permanent KYC Review Agent Overview</p>
        //     </div> */}


        // </div>
    );
};

export default PKRStatusPage;
