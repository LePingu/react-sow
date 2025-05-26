import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { type Node, type Edge, type NodeTypes, MarkerType, Handle, Position } from '@xyflow/react';
import { FlowDiagram } from '../flow-diagram';
import './PKRStatusPage.less';

// Simplified custom node for orchestrator
const OrchestratorNode = ({ data }: { data: any }) => (
    <div className="orchestrator-node">
        <Handle type="target" position={Position.Top} style={{ visibility: 'hidden' }} />
        <div className="orchestrator-header">
            <h3>🎯 Agent Orchestrator</h3>
        </div>
        <div className="orchestrator-content">
            <p>{data.message}</p>
            <span className="timestamp">{data.timestamp}</span>
        </div>
        <Handle type="source" position={Position.Bottom} style={{ visibility: 'hidden' }} />
    </div>
);

// Simplified custom node for agents  
const AgentNode = ({ data }: { data: any }) => (
    <div className={`main-agent-flow-node ${data.isClickable ? 'clickable' : 'non-clickable'} ${data.status}`}>
        <Handle type="target" position={Position.Top} style={{ visibility: 'hidden' }} />
        <div className="agent-header">
            <span className="status-icon">{data.statusIcon}</span>
            <div className="agent-info">
                <h4>{data.name}</h4>
                {data.isClickable && <span className="click-indicator">👆</span>}
            </div>
        </div>
        <div className="agent-status">
            <span className={`status-badge ${data.status}`}>
                {data.status}
            </span>
        </div>
        <Handle type="source" position={Position.Bottom} style={{ visibility: 'hidden' }} />
    </div>
);

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

    const handleBackToDashboard = () => {
        navigate('/');
    };

    const nodeTypes: NodeTypes = {
        orchestrator: OrchestratorNode,
        agent: AgentNode,
    };

    // Define nodes - keeping your existing node definitions but simplified
    const nodes: Node[] = [
        {
            id: 'orchestrator',
            type: 'orchestrator',
            position: { x: 400, y: 50 },
            data: {
                message: "📋 PKR Status Overview - Review the current completion status of all verification agents.",
                timestamp: new Date().toLocaleTimeString()
            }
        },
        {
            id: 'kyc-info-processor',
            type: 'agent',
            position: { x: 100, y: 200 },
            data: {
                name: 'KYC Information Processor',
                status: 'completed',
                statusIcon: '✅',
                isClickable: false,
                onClick: () => handleAgentClick('kyc-info-processor', 'KYC Information Processor')
            }
        },
        {
            id: 'kyc-profiler',
            type: 'agent',
            position: { x: 400, y: 200 },
            data: {
                name: 'KYC Profiler',
                status: 'completed',
                statusIcon: '✅',
                isClickable: false,
                onClick: () => handleAgentClick('kyc-profiler', 'KYC Profiler')
            }
        },
        {
            id: 'risk-assessor',
            type: 'agent',
            position: { x: 700, y: 200 },
            data: {
                name: 'Risk Assessor',
                status: 'pending',
                statusIcon: '⏳',
                isClickable: false,
                onClick: () => handleAgentClick('risk-assessor', 'Risk Assessor')
            }
        },
        {
            id: 'sow-corroboration-assessor',
            type: 'agent',
            position: { x: 750, y: 350 },
            data: {
                name: 'SoW Corroboration Assessor',
                status: 'pending',
                statusIcon: '⏳',
                isClickable: true,
                onClick: () => handleAgentClick('sow-corroboration-assessor', 'SoW Corroboration Assessor')
            }
        }
    ];

    // Define edges - keeping your existing edge definitions
    const edges: Edge[] = [
        {
            id: 'e-orchestrator-kyc-info',
            source: 'orchestrator',
            target: 'kyc-info-processor',
            style: { stroke: '#374151', strokeWidth: 2 },
            markerEnd: { type: MarkerType.ArrowClosed, color: '#374151' }
        },
        {
            id: 'e-orchestrator-kyc-profiler',
            source: 'orchestrator',
            target: 'kyc-profiler',
            style: { stroke: '#374151', strokeWidth: 2 },
            markerEnd: { type: MarkerType.ArrowClosed, color: '#374151' }
        },
        {
            id: 'e-orchestrator-risk',
            source: 'orchestrator',
            target: 'risk-assessor',
            style: { stroke: '#f97316', strokeWidth: 2 },
            markerEnd: { type: MarkerType.ArrowClosed, color: '#f97316' }
        },
        {
            id: 'e-risk-sow',
            source: 'risk-assessor',
            target: 'sow-corroboration-assessor',
            style: { stroke: '#f97316', strokeWidth: 2 },
            markerEnd: { type: MarkerType.ArrowClosed, color: '#f97316' }
        }
    ];

    if (!isVisible) return null;

    return (
        <div className="pkr-status-page">
            <div className="pkr-header">
                <button className="back-button" onClick={handleBackToDashboard}>
                    ← Back to Dashboard
                </button>
                <h1>PKR Case Status - {caseId}</h1>
                <p className="subtitle">Permanent KYC Review Agent Overview</p>
            </div>

            <FlowDiagram
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodeClick={handleAgentClick}
                className="pkr-flow"
            />
        </div>
    );
};

export default PKRStatusPage;
