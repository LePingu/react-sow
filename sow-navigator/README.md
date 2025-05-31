# SoW Navigator

A sophisticated banking application for Source of Wealth (SoW) verification and Know Your Customer (KYC) / Periodic Know Your Reviewer (PKR) processes, featuring real-time agent orchestration and professional animations compliant with banking industry standards.

## 🏦 Overview

SoW Navigator is a comprehensive financial compliance platform that automates and visualizes the customer verification process through intelligent agent orchestration. The application provides real-time processing workflows, detailed reporting, and human-in-the-loop verification capabilities.

### Key Features

-   **🎭 Intelligent Agent Orchestration**: Real-time visualization of verification agents with status tracking
-   **📊 Comprehensive PKR Reports**: Detailed compliance reports with dynamic scoring and human verification
-   **♿ Accessibility First**: WCAG 2.1 AA compliant with reduced motion support
-   **🎨 Banking-Grade Animations**: Professional Framer Motion implementations with conservative timing
-   **📋 Document Processing**: Advanced document upload and verification workflows
-   **🔄 Human-in-the-Loop**: Interactive confirmation system for critical verification steps
-   **📱 Responsive Design**: Mobile-first approach with adaptive layouts

## 🚀 Quick Start

### Prerequisites

-   Node.js 18+
-   npm or yarn
-   Modern browser with ES2020+ support

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd sow-navigator

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173
```

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📁 Project Structure

```
sow-navigator/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── agent-nodes/     # Specialized agent visualization components
│   │   ├── edges/           # Custom edge components for flow diagrams
│   │   └── ...              # Other UI components
│   ├── features/            # Feature-based modules
│   │   ├── dashboard/       # Main dashboard interface
│   │   ├── document-upload/ # Document processing workflows
│   │   ├── flow-diagram/    # Interactive flow visualizations
│   │   ├── pkr-status/      # PKR reporting and status pages
│   │   └── workflow-processing/ # Agent orchestration workflows
│   ├── hooks/               # Custom React hooks
│   ├── styles/              # Global styles and design tokens
│   ├── utils/               # Utility functions and motion presets
│   └── docs/                # Technical documentation
├── public/                  # Static assets
└── ...                      # Configuration files
```

## 🛠 Technology Stack

### Core Technologies

-   **React 19** - Modern UI framework with concurrent features
-   **TypeScript** - Type-safe development
-   **Vite** - Fast build tool and dev server
-   **React Router DOM** - Client-side routing

### Visualization & Animation

-   **Framer Motion 12** - Professional animations with banking compliance
-   **@xyflow/react** - Interactive flow diagrams and node-based UIs
-   **LESS** - Enhanced CSS with variables and mixins

### Development Tools

-   **ESLint** - Code linting with TypeScript support
-   **TypeScript ESLint** - Advanced TypeScript linting rules

## 🎯 Core Features

### Agent Orchestration Workflows

The application features sophisticated agent orchestration for verification processes:

```typescript
// Example agent workflow
const verificationAgents = [
    "KYC Information Processor",
    "Risk Assessor",
    "Compliance Screener",
    "SoW Corroboration Assessor",
];
```

**Key Workflow Pages:**

-   `/case/:caseId` - PKR Status overview with agent visualization
-   `/case/:caseId/agent/:agentId` - Individual agent processing workflows
-   `/case/:caseId/report` - Comprehensive PKR reports

### Human-in-the-Loop Verification

Interactive confirmation system for critical verification steps:

-   **Warning Indicators**: Visual alerts for items requiring human review
-   **Dynamic Scoring**: Real-time score updates based on confirmations
-   **Audit Trail**: Complete verification history and decision tracking

### Professional Animation System

Banking-compliant animations with accessibility features:

-   **Conservative Timing**: Maximum 0.5s duration for all animations
-   **Reduced Motion**: Full `prefers-reduced-motion` support
-   **Performance Optimized**: 60fps targets with hardware acceleration
-   **Professional Easing**: Authoritative, non-playful motion curves

## 🔧 Development

### Available Scripts

| Command           | Description                       |
| ----------------- | --------------------------------- |
| `npm run dev`     | Start development server with HMR |
| `npm run build`   | Create production build           |
| `npm run preview` | Preview production build locally  |
| `npm run lint`    | Run ESLint on all source files    |

### Environment Setup

The application is designed to run in dev containers with Debian GNU/Linux 12 (bookworm):

```bash
# Available system tools
apt, dpkg, curl, gpg, find, grep, tar, gzip

# Browser access
"$BROWSER" <url>  # Opens URLs in host default browser
```

### Testing Routes

Navigate to these routes during development:

-   `/` - Main dashboard
-   `/case/test-case-123` - Sample PKR workflow
-   `/case/test-case-123/agent/sow-corroboration-assessor` - SoW verification workflow
-   `/case/test-case-123/report` - Detailed PKR report
-   `/motion-test` - Animation showcase (if available)
-   `/performance-test` - Performance validation (if available)

## 📊 Key Components

### PKR Status Page (`/case/:caseId`)

Interactive agent orchestration dashboard showing:

-   Real-time agent status updates
-   Flow diagram with animated edges
-   Agent completion tracking
-   Navigation to detailed workflows

### SoW Corroboration Workflow (`/case/:caseId/agent/:agentId`)

Comprehensive verification workflow featuring:

-   Multi-stage processing timeline
-   Real-time progress indicators
-   Completion celebrations
-   Summary report generation

### PKR Report Page (`/case/:caseId/report`)

Professional reporting interface with:

-   Executive summary generation
-   Section-by-section verification details
-   Dynamic scoring based on confirmations
-   Print-ready formatting
-   Human verification controls

## ♿ Accessibility Features

-   **WCAG 2.1 AA Compliance**: Full accessibility standard adherence
-   **Reduced Motion Support**: Respects user motion preferences
-   **Keyboard Navigation**: Complete keyboard accessibility
-   **Screen Reader Support**: Proper ARIA attributes and semantic HTML
-   **High Contrast Support**: Adaptive contrast based on user preferences

## 🎨 Design System

### Color Palette

-   **Primary Red**: `#dc3545` - Primary actions and emphasis
-   **Success Green**: `#28a745` - Completion states and positive actions
-   **Warning Orange**: `#fd7e14` - Alerts and pending states
-   **Neutral Grays**: `#6c757d`, `#e9ecef` - Text and backgrounds

### Typography

-   **Headings**: System font stack with weight variations
-   **Body Text**: Optimized for readability across devices
-   **Code**: Monospace for technical content

### Animation Presets

-   **Banking Transitions**: Conservative easing curves
-   **Professional Variants**: Standardized motion patterns
-   **Accessibility Hooks**: Motion preference detection

## 📈 Performance

### Optimization Strategies

-   **Code Splitting**: Dynamic imports for feature modules
-   **Tree Shaking**: Automatic unused code elimination
-   **Asset Optimization**: Vite-powered build optimizations
-   **Memory Management**: Proper cleanup for animations and timers

### Performance Targets

-   **Initial Load**: < 3 seconds on 3G networks
-   **Animation FPS**: Consistent 60fps performance
-   **Memory Usage**: Minimal footprint with proper cleanup
-   **Bundle Size**: Optimized chunk sizes for fast loading

## 🔮 Future Enhancements

### Planned Features

-   **Advanced Reporting**: Enhanced analytics and insights
-   **Multi-language Support**: Internationalization capabilities
-   **Real-time Collaboration**: Multi-user verification workflows
-   **API Integration**: External data source connections
-   **Advanced Animations**: Additional micro-interactions

### Technical Roadmap

-   **Performance Monitoring**: Real-time FPS and memory tracking
-   **A/B Testing**: Animation effectiveness measurement
-   **Progressive Enhancement**: Advanced features for capable devices
-   **Offline Support**: Service worker implementation

## 📝 Documentation

### Additional Resources

-   [Banking Animation Guide](src/docs/BANKING_ANIMATIONS.md) - Comprehensive animation implementation
-   [Framer Motion Summary](FRAMER_MOTION_SUMMARY.md) - Complete animation system overview
-   [Agent Nodes Documentation](src/components/agent-nodes/README.md) - Component architecture guide

### API References

-   [React Router](https://reactrouter.com/) - Routing documentation
-   [Framer Motion](https://www.framer.com/motion/) - Animation library docs
-   [React Flow](https://reactflow.dev/) - Flow diagram documentation

## 🤝 Contributing

### Development Guidelines

1. Follow TypeScript strict mode requirements
2. Implement proper accessibility features
3. Maintain animation performance standards
4. Write comprehensive component documentation
5. Test across multiple browsers and devices

### Code Style

-   Use TypeScript for all new code
-   Follow established naming conventions
-   Implement proper error boundaries
-   Include proper loading states
-   Ensure responsive design compliance

## 📄 License

This project is part of the Flowable development test environment and follows enterprise software development practices.

---

**Status**: ✅ Production Ready | **Version**: 0.0.0 | **Node**: 18+ | **Build Tool**: Vite

For technical support or feature requests, please refer to the project documentation or contact the development team.
},
})

```

```
