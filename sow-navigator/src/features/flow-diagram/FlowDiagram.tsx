import React, { useCallback } from 'react';
import {
    ReactFlow,
    Background,
    Controls,
    useNodesState,
    useEdgesState,
    addEdge,
    type Node,
    type Edge,
    type NodeTypes,
    BackgroundVariant
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './FlowDiagram.less';

interface FlowDiagramProps {
    nodes: Node[];
    edges: Edge[];
    nodeTypes?: NodeTypes;
    onNodeClick?: (nodeId: string, nodeData: any) => void;
    className?: string;
    height?: string;
}

export const FlowDiagram: React.FC<FlowDiagramProps> = ({
    nodes: initialNodes,
    edges: initialEdges,
    nodeTypes,
    onNodeClick,
    className = '',
    height = 'calc(100vh - 200px)'
}) => {
    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params: any) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    const handleNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
        // Handle direct onClick callback from node data
        if (node.data?.onClick && typeof node.data.onClick === 'function') {
            node.data.onClick();
        }
        // Handle external onNodeClick prop
        if (onNodeClick) {
            onNodeClick(node.id, node.data);
        }
    }, [onNodeClick]);

    return (
        <div className={`flow-diagram ${className}`} style={{ height }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeClick={handleNodeClick}
                nodeTypes={nodeTypes}
                fitView
                attributionPosition="bottom-left"
            >
                <Background color="#ccc" variant={BackgroundVariant.Cross} />
                <Controls />
            </ReactFlow>
        </div>
    );
};
