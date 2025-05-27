import React from 'react';
import AgentNodeBase from './AgentNodeBase';
import type { BaseAgentNodeProps } from './agentNodeUtils';
import './MainAgentNode.less';

interface MainAgentNodeProps extends BaseAgentNodeProps { }

const MainAgentNode: React.FC<MainAgentNodeProps> = ({ data }) => {
    const description = `Main processing agent for ${data.name.toLowerCase()} workflows`;

    return (
        <AgentNodeBase
            data={data}
            nodeType="main"
            description={description}
        />
    );
};

export default MainAgentNode;
