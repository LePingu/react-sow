# Agent Nodes Documentation

## Overview

The agent nodes components have been moved to a shared location to enable reusability across different parts of the application. This modular approach allows for easy integration in future phases of development.

## Structure

```
src/components/agent-nodes/
├── index.ts                 # Clean exports for all agent node components
├── AgentNodeBase.tsx        # Base component for all agent nodes
├── agentNodeUtils.ts        # Shared utilities and types
├── MainAgentNode.tsx        # Main agent node component
├── MainAgentNode.less       # Main agent node styling
├── ChildAgentNode.tsx       # Child agent node component
├── ChildAgentNode.less      # Child agent node styling
├── OrchestratorNode.tsx     # Orchestrator node component
└── OrchestratorNode.less    # Orchestrator node styling
```

## Components

### AgentNodeBase
**Purpose:** Shared base component that provides common functionality for all agent nodes.

**Features:**
- Unified styling approach
- Status handling and visual indicators
- Click handling for interactive nodes
- Configurable for both main and child node types
- Handle positioning for React Flow connections

### MainAgentNode
**Purpose:** Represents main processing agents in the workflow.

**Features:**
- Enhanced visual styling with turbo borders
- Professional shadows and animations
- Larger size and prominence
- Source and target handles for flow connections

### ChildAgentNode
**Purpose:** Represents subsidiary agents that work under main agents.

**Features:**
- Compact design for subsidiary roles
- Consistent status indicators
- Target handle for incoming connections
- Professional hover effects

### OrchestratorNode
**Purpose:** Central coordination node for managing agent workflows.

**Features:**
- Distinguished red gradient background
- Rotating icon animation
- Gentle glow effects
- Multiple output handles for distribution

## Usage Examples

### Basic Import
```tsx
import { MainAgentNode, ChildAgentNode, OrchestratorNode } from '../components/agent-nodes';
```

### Individual Component Import
```tsx
import { AgentNodeBase } from '../components/agent-nodes';
import type { BaseAgentNodeProps } from '../components/agent-nodes';
```

### Using in React Flow
```tsx
const nodeTypes: NodeTypes = {
    orchestrator: OrchestratorNode,
    mainAgent: MainAgentNode,
    childAgent: ChildAgentNode,
};

// In your React Flow component
<FlowDiagram
    nodes={nodes}
    edges={edges}
    nodeTypes={nodeTypes}
/>
```

## Configuration

### Agent Configuration
```tsx
const agentConfig = {
    mainAgents: [
        {
            id: 'unique-id',
            name: 'Agent Name',
            status: 'completed' | 'pending' | 'active' | 'error',
            position: { x: 100, y: 200 },
            type: 'main'
        }
    ],
    childAgents: [
        {
            id: 'unique-id',
            name: 'Child Agent Name',
            status: 'completed' | 'pending' | 'active' | 'error',
            position: { x: 100, y: 350 },
            type: 'child'
        }
    ]
};
```

## Styling

### Status Colors
- **Completed:** Green (#10b981)
- **Pending:** Yellow/Orange (#f59e0b)
- **Active:** Blue (#3b82f6)
- **Error:** Red (#ef4444)

### Animation Features
- **Float animation:** Gentle vertical movement
- **Pulse effects:** For active states
- **Hover transformations:** Scale and lift effects
- **Turbo borders:** Animated gradient borders for main agents

## Reusability Benefits

1. **Cross-Application Usage:** Components can be used in different parts of the app
2. **Consistent Styling:** Unified visual approach across all agent representations
3. **Type Safety:** Shared TypeScript interfaces and utilities
4. **Easy Maintenance:** Centralized location for all agent-related components
5. **Future-Proof:** Ready for integration in upcoming development phases

## Migration Notes

- All imports from `features/pkr-status` have been updated to `components/agent-nodes`
- Styling imports in PKRStatusPage.less have been updated to new paths
- No functional changes - all existing functionality preserved
- Clean export structure provides easy access to all components and types

## Next Phase Preparation

The modular structure is designed to support:
- Additional agent types
- Custom node configurations
- Enhanced interaction patterns
- Cross-workflow agent sharing
- Advanced visualization features
