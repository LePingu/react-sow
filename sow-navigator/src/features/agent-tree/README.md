# SoW Agentic Orchestration

A dynamic, real-time visualization of Source of Wealth (SoW) verification agents processing in an orchestrated workflow.

## Features

### 🎭 **Live Agent Orchestration**
- **Orchestrator Node**: "SoW Orchestration" - Central coordination hub with breathing animations
- **Three Specialized Agents**:
  - **ID Data Extraction** - Processes identity verification documents
  - **Payslip Verification Agent** - Validates income documentation
  - **Web References Checker** - Verifies online presence and references

### 🎨 **Rich Animations & Visual Feedback**
- **Framer Motion Integration**: Smooth, performant animations throughout
- **Dynamic Status Transitions**: 
  - `pending` (gray) → `active` (orange with pulse) → `completed` (green with checkmark)
- **Animated Edges**: Moving dotted lines showing data flow from orchestrator to agents
- **Real-time Progress**: Live progress bar and completion counter

### ⚡ **Simulated Async Processing**
- **Realistic Processing Times**: Each agent has different processing durations (3-5 seconds)
- **Staggered Execution**: Agents start with 800ms delays to simulate real async behavior
- **Status Indicators**: 
  - Pulsing orange dots during processing
  - Animated green checkmarks on completion
  - Breathing orchestrator with crown indicator

### 🎮 **Interactive Controls**
- **Start/Reset Controls**: Manual orchestration control
- **Auto-start**: Begins processing 2 seconds after page load
- **Completion Celebration**: Animated overlay when all agents complete

## Technical Implementation

### Components
- `SoWAgenticOrchestration.tsx` - Main orchestration container
- `AnimatedAgentNode.tsx` - Enhanced agent nodes with motion animations
- `AnimatedOrchestratorNode.tsx` - Orchestrator with breathing effects
- `AnimatedEdge.tsx` - Moving dotted edges (reused from flow-diagram)

### State Management
- React hooks for agent state management
- Timer-based async simulation
- Real-time status updates with smooth transitions

### Styling
- LESS stylesheets with gradient backgrounds
- Responsive design for mobile/desktop
- Modern UI with glassmorphism effects

## Usage

Navigate to any agent detail route (e.g., `/case/{caseId}/agent/{agentId}`) to view the orchestration in action.

The system automatically:
1. Starts orchestration after 2 seconds
2. Processes each agent asynchronously
3. Updates visual states in real-time
4. Shows completion celebration when finished

## Architecture Benefits

- **Reusable Components**: Leverages existing FlowDiagram and agent node infrastructure
- **Motion-First Design**: Built with Framer Motion for smooth performance
- **Modular Structure**: Easy to extend with additional agent types
- **Type Safety**: Full TypeScript integration with existing agent interfaces
