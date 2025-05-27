import React from 'react';
import { Handle, Position } from '@xyflow/react';
import './OrchestratorNode.less';

interface OrchestratorNodeProps {
    data: {
        message: string;
        timestamp: string;
    };
}

const OrchestratorNode: React.FC<OrchestratorNodeProps> = ({ data }) => {
    return (
        <div className="orchestrator-flow-node">
            <div className="orchestrator-header">
                <div className="orchestrator-icon">🎯</div>
                <div className="orchestrator-info">
                    <h3>Orchestrator Agent</h3>
                    <span className="status-badge">Monitoring</span>
                </div>
            </div>
            <div className="orchestrator-message">
                {data.message}
            </div>
            <div className="timestamp">
                Last update: {data.timestamp}
            </div>

            {/* Output handles for connecting to main agents */}
            <Handle
                type="source"
                position={Position.Bottom}
                id="output-1"
                style={{ left: '50%' }}
            />
        </div>
    );
};

export default OrchestratorNode;
