import React, { useState } from 'react';
import { ReactFlow, useNodesState, useEdgesState, Background, Panel, type Edge } from '@xyflow/react';
import SimpleTestNode from './SimpleTestNode';
import '@xyflow/react/dist/style.css';

// Test with ultra-simple node
const initialNodes = [
    {
        id: 'simple-test-1',
        type: 'simpleTest',
        position: { x: 250, y: 100 },
        data: {
            name: 'Simple Test Agent',
            status: 'pending',
            activeMessage: '',
            activeSubSteps: [
                'Initialize Process',
                'Validate Input',
                'Execute Task'
            ]
        }
    }
];

const initialEdges: Edge[] = [];

// Simple node types
const nodeTypes = {
    simpleTest: SimpleTestNode,
};

const SimpleTestPage: React.FC = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, , onEdgesChange] = useEdgesState(initialEdges);
    const [nodeStatus, setNodeStatus] = useState('pending');

    console.log('🔄 SimpleTestPage rendering with nodes:', nodes);

    const changeStatusToActive = () => {
        console.log('👆 SIMPLE TEST - Manual button click - updating node status to active');

        setNodes((nds) => {
            const updatedNodes = nds.map((node) => {
                if (node.id === 'simple-test-1') {
                    console.log('🔄 SIMPLE TEST - Before update - node data:', node.data);
                    const updatedNode = {
                        ...node,
                        data: {
                            ...node.data,
                            status: 'active',
                            activeMessage: 'Processing in progress...'
                            // activeSubSteps remain the same - they'll be displayed when active
                        }
                    };
                    console.log('✅ SIMPLE TEST - After update - node data:', updatedNode.data);
                    return updatedNode;
                }
                return node;
            });

            console.log('📋 SIMPLE TEST - Final nodes array:', updatedNodes);
            return updatedNodes;
        });

        setNodeStatus('active');
    };

    const changeStatusToCompleted = () => {
        console.log('👆 SIMPLE TEST - Manual button click - updating node status to completed');

        setNodes((nds) => {
            const updatedNodes = nds.map((node) => {
                if (node.id === 'simple-test-1') {
                    const updatedNode = {
                        ...node,
                        data: {
                            ...node.data,
                            status: 'completed',
                            activeMessage: 'Task completed successfully!'
                            // activeSubSteps remain the same
                        }
                    };
                    console.log('✅ SIMPLE TEST - Completed update - node data:', updatedNode.data);
                    return updatedNode;
                }
                return node;
            });

            return updatedNodes;
        });

        setNodeStatus('completed');
    };

    const resetToPending = () => {
        console.log('🔄 SIMPLE TEST - Reset button clicked');

        setNodes((nds) => {
            const updatedNodes = nds.map((node) => {
                if (node.id === 'simple-test-1') {
                    const updatedNode = {
                        ...node,
                        data: {
                            ...node.data,
                            status: 'pending',
                            activeMessage: ''
                            // activeSubSteps remain the same - they won't be displayed when pending
                        }
                    };
                    console.log('🔄 SIMPLE TEST - Reset - node data:', updatedNode.data);
                    return updatedNode;
                }
                return node;
            });

            return updatedNodes;
        });

        setNodeStatus('pending');
    };

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
                <Panel position="top-left" style={{ background: 'white', padding: '10px', border: '1px solid #ccc', minWidth: '250px' }}>
                    <h3>Simple Node Status Test</h3>
                    <p><strong>Current Status:</strong> {nodeStatus}</p>
                    <p><strong>Node Data Status:</strong> {nodes[0]?.data?.status || 'unknown'}</p>
                    <p><strong>Active Message:</strong> {nodes[0]?.data?.activeMessage || 'none'}</p>
                    <p><strong>Sub-Steps Count:</strong> {nodes[0]?.data?.activeSubSteps?.length || 0}</p>

                    <div style={{ marginTop: '10px' }}>
                        <button
                            onClick={changeStatusToActive}
                            style={{ marginRight: '5px', marginBottom: '5px', padding: '5px 10px', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '4px' }}
                        >
                            Set Active
                        </button>
                        <button
                            onClick={changeStatusToCompleted}
                            style={{ marginRight: '5px', marginBottom: '5px', padding: '5px 10px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px' }}
                        >
                            Set Completed
                        </button>
                        <button
                            onClick={resetToPending}
                            style={{ marginBottom: '5px', padding: '5px 10px', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '4px' }}
                        >
                            Reset to Pending
                        </button>
                    </div>

                    <div style={{ fontSize: '12px', marginTop: '10px' }}>
                        <strong>This test uses a ultra-simple node component</strong><br />
                        Check browser console for detailed logs
                    </div>
                </Panel>
            </ReactFlow>
        </div>
    );
};

export default SimpleTestPage;
