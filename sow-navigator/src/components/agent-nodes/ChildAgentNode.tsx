import React from 'react';
import AgentNodeBase from './AgentNodeBase';
import type { BaseAgentNodeProps } from './agentNodeUtils';
import './ChildAgentNode.less';

interface ChildAgentNodeProps extends BaseAgentNodeProps { }

const ChildAgentNode: React.FC<ChildAgentNodeProps> = ({ data }) => {
    return (
        <AgentNodeBase
            data={data}
            nodeType="child"
            description="Specialized component"
        />
    );
};

export default ChildAgentNode;
