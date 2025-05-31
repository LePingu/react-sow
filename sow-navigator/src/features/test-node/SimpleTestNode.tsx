import React from 'react';
import { MainAgentNode } from '../../components/agent-nodes';

interface SimpleTestNodeProps {
    data: {
        name: string;
        status: 'pending' | 'active' | 'completed';
        activeMessage?: string;
        activeSubSteps?: string[];
        onClick?: () => void;
    };
}

const SimpleTestNode: React.FC<SimpleTestNodeProps> = ({ data }) => {
    console.log(`🧪 SimpleTestNode ${data.name} rendering with status:`, data.status);
    console.log(`🧪 SimpleTestNode activeMessage:`, data.activeMessage);
    console.log(`🧪 SimpleTestNode activeSubSteps:`, data.activeSubSteps);

    // Use MainAgentNode to get full functionality
    return (
        <MainAgentNode
            data={{
                ...data,
                onClick: data.onClick || (() => console.log(`Clicked ${data.name}`))
            }}
        />
    );
};

export default SimpleTestNode;
