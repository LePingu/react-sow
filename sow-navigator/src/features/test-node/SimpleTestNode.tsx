import React from 'react';
import { Handle, Position } from '@xyflow/react';

interface SimpleTestNodeProps {
    data: {
        name: string;
        status: 'pending' | 'active' | 'completed';
    };
}

const SimpleTestNode: React.FC<SimpleTestNodeProps> = ({ data }) => {
    console.log(`🧪 SimpleTestNode ${data.name} rendering with status:`, data.status);

    // Simple status-based styling
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return '#f59e0b';
            case 'completed': return '#10b981';
            default: return '#6b7280';
        }
    };

    const statusColor = getStatusColor(data.status);

    return (
        <div
            style={{
                background: 'white',
                border: `3px solid ${statusColor}`,
                borderRadius: '12px',
                padding: '16px',
                minWidth: '200px',
                textAlign: 'center',
                transition: 'all 0.3s ease'
            }}
        >
            <Handle type="target" position={Position.Top} />

            <div style={{ marginBottom: '8px' }}>
                <strong>{data.name}</strong>
            </div>

            <div
                style={{
                    background: statusColor,
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                }}
            >
                {data.status.toUpperCase()}
            </div>

            <Handle type="source" position={Position.Bottom} />
        </div>
    );
};

export default SimpleTestNode;
