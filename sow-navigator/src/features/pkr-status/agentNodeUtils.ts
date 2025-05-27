// Shared utilities for agent nodes
export const getStatusIcon = (status: string) => {
    switch (status) {
        case 'active': return '🔄';
        case 'completed': return '✅';
        case 'pending': return '⏳';
        case 'error': return '❌';
        default: return '⏳';
    }
};

export const getStatusColor = (status: string) => {
    switch (status) {
        case 'completed': return '#10b981';
        case 'pending': return '#f59e0b';
        case 'active': return '#3b82f6';
        case 'error': return '#ef4444';
        default: return '#6b7280';
    }
};

export const isClickableAgent = (name: string) => {
    return name.toLowerCase().includes('sow');
};

export type AgentStatus = 'active' | 'completed' | 'pending' | 'error';

export interface BaseAgentNodeProps {
    data: {
        name: string;
        status: AgentStatus;
        onClick: () => void;
    };
}
