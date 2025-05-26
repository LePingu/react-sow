import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { type Node, type Edge } from '@xyflow/react';
import { FlowDiagram } from '../flow-diagram';
import { SummaryReport } from '../pkr-status';
import './AgentTreeView.less';

interface AgentTreeViewProps {
    isVisible: boolean;
}

const AgentTreeView: React.FC<AgentTreeViewProps> = ({ isVisible }) => {
    const { caseId } = useParams<{ caseId: string }>();
    const navigate = useNavigate();
    const [showSummaryReport, setShowSummaryReport] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    // Simplified agent processing simulation
    useEffect(() => {
        if (!isVisible) return;

        const timer = setTimeout(() => {
            setCurrentStep(4);
            setTimeout(() => setShowSummaryReport(true), 2000);
        }, 8000);

        return () => clearTimeout(timer);
    }, [isVisible]);

    const handleBackToPKR = () => {
        navigate(`/case/${caseId}`);
    };

    // Simplified nodes
    const nodes: Node[] = [
        {
            id: 'risk-manager',
            position: { x: 400, y: 100 },
            data: { 
                label: 'Risk Assessment Manager',
                isParent: true
            }
        },
        {
            id: 'web-verifier',
            position: { x: 150, y: 300 },
            data: { label: 'Web References Verifier' }
        },
        {
            id: 'payslip-retriever',
            position: { x: 400, y: 300 },
            data: { label: 'Payslip Retriever' }
        },
        {
            id: 'financial-processor',
            position: { x: 650, y: 300 },
            data: { label: 'Financial Report Processor' }
        }
    ];

    // Simplified edges
    const edges: Edge[] = [
        {
            id: 'risk-web',
            source: 'risk-manager',
            target: 'web-verifier',
            animated: currentStep >= 2
        },
        {
            id: 'risk-payslip',
            source: 'risk-manager',
            target: 'payslip-retriever',
            animated: currentStep >= 2
        },
        {
            id: 'risk-financial',
            source: 'risk-manager',
            target: 'financial-processor',
            animated: currentStep >= 2
        }
    ];
    if (!isVisible) return null;

    return (
        <div className="agent-tree-view">
            <div className="tree-header">
                <h2>Agent Orchestration Visualization</h2>
                <p>Real-time Source of Wealth Agents processing and evaluation</p>
                <button onClick={handleBackToPKR} className="back-button">
                    ← Back to PKR Status
                </button>
            </div>

            <FlowDiagram
                nodes={nodes}
                edges={edges}
                className="agent-tree-flow"
                height="55vh"
            />

            <div className="workflow-progress">
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${(currentStep / 4) * 100}%` }}
                    />
                </div>
                <span className="progress-text">
                    Step {Math.min(currentStep, 4)} of 4
                </span>
            </div>

            {showSummaryReport && (
                <SummaryReport
                    isVisible={showSummaryReport}
                    onClose={() => setShowSummaryReport(false)}
                    caseId={caseId}
                />
            )}
        </div>
    );
};

export default AgentTreeView;
