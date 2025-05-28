import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { type Node, type Edge } from '@xyflow/react';
import { FlowDiagram } from '../flow-diagram';
import { SummaryReport } from '../pkr-status';
import { MainAgentNode, ChildAgentNode } from '../../components/agent-nodes';
import './AgentTreeView.less';

interface AgentTreeViewProps {
    isVisible: boolean;
}

interface AgentData {
    id: string;
    name: string;
    status: 'pending' | 'active' | 'completed' | 'error';
    type: 'orchestrator' | 'child';
    processingTime: number;
    statusMessage?: string;
    isProcessing?: boolean;
}

// Animation timeline phases (total 7 seconds)
const ANIMATION_TIMELINE = {
    PHASE_1_ORCHESTRATOR_START: 0,     // 0s - Orchestrator starts
    PHASE_2_ORCHESTRATOR_COMPLETE: 1500, // 1.5s - Orchestrator completes  
    PHASE_3_CHILDREN_START: 2000,      // 2s - Child agents start
    PHASE_4_CHILD_1_COMPLETE: 3500,    // 3.5s - ID Data completes
    PHASE_5_CHILD_2_COMPLETE: 5000,    // 5s - Payslip completes
    PHASE_6_CHILD_3_COMPLETE: 6000,    // 6s - Web References completes
    PHASE_7_CELEBRATION: 6500,         // 6.5s - Celebration starts
    PHASE_8_SUMMARY: 7000              // 7s - Summary appears
} as const;

const AgentTreeView: React.FC<AgentTreeViewProps> = ({ isVisible }) => {
    const { caseId } = useParams<{ caseId: string }>();
    const navigate = useNavigate();
    const [showSummaryReport, setShowSummaryReport] = useState(false);
    const [showCompletion, setShowCompletion] = useState(false);
    const [agents, setAgents] = useState<AgentData[]>([
        {
            id: 'orchestrator',
            name: 'SoW Orchestrator',
            status: 'pending',
            type: 'orchestrator',
            processingTime: 2000,
            statusMessage: 'Initializing workflow...'
        },
        {
            id: 'id-extraction',
            name: 'ID Data Extraction',
            status: 'pending',
            type: 'child',
            processingTime: 3000,
            statusMessage: 'Extracting identity data...'
        },
        {
            id: 'payslip-verification',
            name: 'Payslip Verification Agent',
            status: 'pending',
            type: 'child',
            processingTime: 3500,
            statusMessage: 'Verifying payslip information...'
        },
        {
            id: 'web-references',
            name: 'Web References Agent',
            status: 'pending',
            type: 'child',
            processingTime: 4000,
            statusMessage: 'Checking web references...'
        }
    ]);

    // Processing animation sequence with 7-second explicit timeline
    useEffect(() => {
        if (!isVisible) return;

        let isMounted = true;

        const runProcessingSequence = async () => {
            // PHASE 1 (0s): Start orchestrator
            if (isMounted) {
                setAgents(prev => prev.map(agent =>
                    agent.id === 'orchestrator'
                        ? { ...agent, status: 'active', statusMessage: 'Coordinating agents...', isProcessing: true }
                        : agent
                ));
            }

            // PHASE 2 (1.5s): Complete orchestrator
            setTimeout(() => {
                if (isMounted) {
                    setAgents(prev => prev.map(agent =>
                        agent.id === 'orchestrator'
                            ? { ...agent, status: 'completed', statusMessage: 'Coordination complete', isProcessing: false }
                            : agent
                    ));
                }
            }, ANIMATION_TIMELINE.PHASE_2_ORCHESTRATOR_COMPLETE);

            // PHASE 3 (2s): Start all child agents
            setTimeout(() => {
                if (isMounted) {
                    setAgents(prev => prev.map(agent =>
                        agent.type === 'child'
                            ? { ...agent, status: 'active', isProcessing: true }
                            : agent
                    ));
                }
            }, ANIMATION_TIMELINE.PHASE_3_CHILDREN_START);

            // PHASE 4 (3.5s): Complete ID Data Extraction
            setTimeout(() => {
                if (isMounted) {
                    setAgents(prev => prev.map(agent =>
                        agent.id === 'id-extraction'
                            ? { ...agent, status: 'completed', statusMessage: 'Data extracted successfully', isProcessing: false }
                            : agent
                    ));
                }
            }, ANIMATION_TIMELINE.PHASE_4_CHILD_1_COMPLETE);

            // PHASE 5 (5s): Complete Payslip Verification
            setTimeout(() => {
                if (isMounted) {
                    setAgents(prev => prev.map(agent =>
                        agent.id === 'payslip-verification'
                            ? { ...agent, status: 'completed', statusMessage: 'Verification complete', isProcessing: false }
                            : agent
                    ));
                }
            }, ANIMATION_TIMELINE.PHASE_5_CHILD_2_COMPLETE);

            // PHASE 6 (6s): Complete Web References
            setTimeout(() => {
                if (isMounted) {
                    setAgents(prev => prev.map(agent =>
                        agent.id === 'web-references'
                            ? { ...agent, status: 'completed', statusMessage: 'References verified', isProcessing: false }
                            : agent
                    ));
                }
            }, ANIMATION_TIMELINE.PHASE_6_CHILD_3_COMPLETE);

            // PHASE 7 (6.5s): Show completion celebration
            setTimeout(() => {
                if (isMounted) {
                    setShowCompletion(true);
                }
            }, ANIMATION_TIMELINE.PHASE_7_CELEBRATION);

            // PHASE 8 (7s): Show summary report
            setTimeout(() => {
                if (isMounted) {
                    setShowSummaryReport(true);
                }
            }, ANIMATION_TIMELINE.PHASE_8_SUMMARY);
        };

        runProcessingSequence();

        return () => {
            isMounted = false;
        };
    }, [isVisible]);

    const handleBackToPKR = () => {
        navigate(-1);
    };

    // ReactFlow wrapper components for existing agent nodes
    const FlowMainAgentNode = ({ data }: { data: any }) => (
        <div className={`flow-agent-wrapper ${data.isProcessing ? 'processing' : ''}`}>
            <MainAgentNode data={{
                name: data.name,
                status: data.status,
                onClick: () => { }
            }} />
        </div>
    );

    const FlowChildAgentNode = ({ data }: { data: any }) => (
        <div className={`flow-agent-wrapper ${data.isProcessing ? 'processing' : ''}`}>
            <ChildAgentNode data={{
                name: data.name,
                status: data.status,
                onClick: () => { }
            }} />
        </div>
    );

    // Create nodes for ReactFlow
    const nodes: Node[] = agents.map(agent => ({
        id: agent.id,
        type: agent.type === 'orchestrator' ? 'mainAgent' : 'childAgent',
        position: getNodePosition(agent.id),
        data: {
            id: agent.id,
            name: agent.name,
            status: agent.status,
            statusMessage: agent.statusMessage,
            isParent: agent.type === 'orchestrator',
            isProcessing: agent.isProcessing || false
        }
    }));

    // Create edges with enhanced moving dotted line animations
    const edges: Edge[] = [
        {
            id: 'orch-id',
            source: 'orchestrator',
            target: 'id-extraction',
            animated: shouldAnimateEdge('orchestrator', 'id-extraction'),
            style: {
                strokeWidth: shouldAnimateEdge('orchestrator', 'id-extraction') ? 4 : 2,
                stroke: getEdgeColor('orchestrator', 'id-extraction'),
                strokeDasharray: shouldAnimateEdge('orchestrator', 'id-extraction') ? '8,4' : 'none'
            },
            className: shouldAnimateEdge('orchestrator', 'id-extraction') ? 'moving-dotted-edge' : ''
        },
        {
            id: 'orch-payslip',
            source: 'orchestrator',
            target: 'payslip-verification',
            animated: shouldAnimateEdge('orchestrator', 'payslip-verification'),
            style: {
                strokeWidth: shouldAnimateEdge('orchestrator', 'payslip-verification') ? 4 : 2,
                stroke: getEdgeColor('orchestrator', 'payslip-verification'),
                strokeDasharray: shouldAnimateEdge('orchestrator', 'payslip-verification') ? '8,4' : 'none'
            },
            className: shouldAnimateEdge('orchestrator', 'payslip-verification') ? 'moving-dotted-edge' : ''
        },
        {
            id: 'orch-web',
            source: 'orchestrator',
            target: 'web-references',
            animated: shouldAnimateEdge('orchestrator', 'web-references'),
            style: {
                strokeWidth: shouldAnimateEdge('orchestrator', 'web-references') ? 4 : 2,
                stroke: getEdgeColor('orchestrator', 'web-references'),
                strokeDasharray: shouldAnimateEdge('orchestrator', 'web-references') ? '8,4' : 'none'
            },
            className: shouldAnimateEdge('orchestrator', 'web-references') ? 'moving-dotted-edge' : ''
        }
    ];

    function getNodePosition(agentId: string) {
        const positions = {
            'orchestrator': { x: 400, y: 80 },
            'id-extraction': { x: 150, y: 280 },
            'payslip-verification': { x: 400, y: 280 },
            'web-references': { x: 650, y: 280 }
        };
        return positions[agentId as keyof typeof positions] || { x: 0, y: 0 };
    }

    function shouldAnimateEdge(sourceId: string, targetId: string): boolean {
        const sourceAgent = agents.find(a => a.id === sourceId);
        const targetAgent = agents.find(a => a.id === targetId);

        return (
            sourceAgent?.status === 'active' ||
            sourceAgent?.status === 'completed' ||
            targetAgent?.status === 'active'
        );
    }

    function getEdgeColor(_sourceId: string, targetId: string): string {
        const targetAgent = agents.find(a => a.id === targetId);

        switch (targetAgent?.status) {
            case 'active':
                return '#3b82f6'; // Blue for active
            case 'completed':
                return '#10b981'; // Green for completed
            default:
                return '#6b7280'; // Gray for pending
        }
    }

    const getOverallProgress = () => {
        const completedCount = agents.filter(a => a.status === 'completed').length;
        return (completedCount / agents.length) * 100;
    };

    if (!isVisible) return null;

    return (
        <div className="agent-tree-view">
            <div className="tree-header">
                <h2>Source of Wealth Agent Processing</h2>
                <p>Real-time agent orchestration and document analysis</p>
                <button onClick={handleBackToPKR} className="back-button">
                    ← Back to PKR Status
                </button>
            </div>

            <FlowDiagram
                nodes={nodes}
                edges={edges}
                nodeTypes={{
                    mainAgent: FlowMainAgentNode,
                    childAgent: FlowChildAgentNode
                }}
                className="agent-tree-flow"
                height="50vh"
            />

            <div className="workflow-progress">
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${getOverallProgress()}%` }}
                    />
                </div>
                <span className="progress-text">
                    Processing: {agents.filter(a => a.status === 'completed').length} of {agents.length} agents completed
                </span>
                <div className="agent-status-summary">
                    {agents.map(agent => (
                        <div key={agent.id} className={`agent-status-indicator ${agent.status}`}>
                            <span className="agent-name">{agent.name.split(' ')[0]}</span>
                            <span className="status-dot"></span>
                            <span className="status-message">{agent.statusMessage}</span>
                        </div>
                    ))}
                </div>
            </div>

            {showCompletion && !showSummaryReport && (
                <div className="completion-celebration">
                    <div className="celebration-content">
                        <div className="celebration-icon">🎉</div>
                        <h3>Processing Complete!</h3>
                        <p>All agents have successfully completed their analysis</p>
                    </div>
                </div>
            )}

            {showSummaryReport && (
                <SummaryReport
                    isVisible={showSummaryReport}
                    onClose={() => setShowSummaryReport(false)}
                    caseId={caseId}
                    onDownloadReport={() => navigate(`/case/${caseId}/report`)}
                />
            )}
        </div>
    );
};

export default AgentTreeView;
