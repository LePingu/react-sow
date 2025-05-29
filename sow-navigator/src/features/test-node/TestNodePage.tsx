import React, { useEffect, useState } from 'react';
import { ReactFlow, useNodesState, useEdgesState, Background, Panel, type Edge } from '@xyflow/react';
import { MainAgentNode } from '../../components/agent-nodes';
import '@xyflow/react/dist/style.css';

// Simple test with one node following React Flow documentation pattern
const initialNodes = [
    {
        id: 'test-node-1',
        type: 'mainAgent',
        position: { x: 250, y: 100 },
        data: {
            name: 'Test Agent',
            status: 'pending'
        }
    }
];

const initialEdges: Edge[] = [];

// Node types - direct assignment without wrappers
const nodeTypes = {
    mainAgent: MainAgentNode,
};

const TestNodePage: React.FC = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, , onEdgesChange] = useEdgesState(initialEdges);
    const [nodeStatus, setNodeStatus] = useState('pending');
    const [timerActive, setTimerActive] = useState(false);

    // Log every render
    console.log('🔄 TestNodePage rendering with nodes:', nodes);
    console.log('📊 Current node status:', nodeStatus);

    // Function to manually change status
    const changeStatusToActive = () => {
        console.log('👆 Manual button click - updating node status to active');

        setNodes((nds) => {
            const updatedNodes = nds.map((node) => {
                if (node.id === 'test-node-1') {
                    console.log('🔄 Before manual update - node data:', node.data);
                    const updatedNode = {
                        ...node,
                        data: {
                            ...node.data,
                            status: 'active'
                        }
                    };
                    console.log('✅ After manual update - node data:', updatedNode.data);
                    return updatedNode;
                }
                return node;
            });

            console.log('📋 Final nodes array (manual):', updatedNodes);
            return updatedNodes;
        });

        setNodeStatus('active');
    };

    const resetToPending = () => {
        console.log('🔄 Reset button clicked - updating node status to pending');

        setNodes((nds) => {
            const updatedNodes = nds.map((node) => {
                if (node.id === 'test-node-1') {
                    const updatedNode = {
                        ...node,
                        data: {
                            ...node.data,
                            status: 'pending'
                        }
                    };
                    console.log('🔄 Reset - node data:', updatedNode.data);
                    return updatedNode;
                }
                return node;
            });

            return updatedNodes;
        });

        setNodeStatus('pending');
        setTimerActive(false);
    };

    const startTimer = () => {
        if (timerActive) return;

        console.log('⏰ Starting 3-second timer to change status to active');
        setTimerActive(true);

        const timer = setTimeout(() => {
            console.log('⚡ Timer fired - updating node status to active');

            setNodes((nds) => {
                const updatedNodes = nds.map((node) => {
                    if (node.id === 'test-node-1') {
                        console.log('🔄 Before timer update - node data:', node.data);
                        const updatedNode = {
                            ...node,
                            data: {
                                ...node.data,
                                status: 'active'
                            }
                        };
                        console.log('✅ After timer update - node data:', updatedNode.data);
                        return updatedNode;
                    }
                    return node;
                });

                console.log('📋 Final nodes array (timer):', updatedNodes);
                return updatedNodes;
            });

            setNodeStatus('active');
            setTimerActive(false);
        }, 3000);

        return () => {
            console.log('🧹 Cleaning up timer');
            clearTimeout(timer);
        };
    };

    // Log when nodes change
    useEffect(() => {
        console.log('📝 Nodes changed:', nodes);
        if (nodes.length > 0) {
            console.log('📈 First node status:', nodes[0].data.status);
        }
    }, [nodes]);

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                fitView
                fitViewOptions={{ padding: 0.2 }}
            >
                <Background />
                <Panel position="top-left" style={{ background: 'white', padding: '10px', border: '1px solid #ccc' }}>
                    <h3>Node Status Test</h3>
                    <p><strong>Current Status:</strong> {nodeStatus}</p>
                    <p><strong>Node Data Status:</strong> {nodes[0]?.data?.status || 'unknown'}</p>
                    <p><strong>Timer Active:</strong> {timerActive ? 'Yes' : 'No'}</p>

                    <div style={{ marginTop: '10px' }}>
                        <button
                            onClick={startTimer}
                            disabled={timerActive}
                            style={{ marginRight: '5px', padding: '5px 10px' }}
                        >
                            Start 3s Timer
                        </button>
                        <button
                            onClick={changeStatusToActive}
                            style={{ marginRight: '5px', padding: '5px 10px' }}
                        >
                            Manual Active
                        </button>
                        <button
                            onClick={resetToPending}
                            style={{ padding: '5px 10px' }}
                        >
                            Reset to Pending
                        </button>
                    </div>

                    <div style={{ fontSize: '12px', marginTop: '10px' }}>
                        <strong>Console:</strong> Check browser console for detailed logs
                    </div>
                </Panel>
            </ReactFlow>
        </div>
    );
};

export default TestNodePage;
