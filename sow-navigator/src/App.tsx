import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './features/layout'
import { Dashboard } from './features/dashboard'
import { PKRStatusPage } from './features/pkr-status'
import { SoWCorroborationWorkflow } from './features/workflow-processing'
import { TestNodePage } from './features/test-node'
import SimpleTestPage from './features/test-node/SimpleTestPage'
import './App.less'
import { DocumentProcessor } from './features/document-processor'
import PKRReportPage from './features/pkr-status/PKRReportPage'
import { MotionTest } from './components/MotionTest'
import { PerformanceTest } from './components/PerformanceTest'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Dashboard Route */}
          <Route path="/" element={<Dashboard isVisible={true} />} />

          {/* PKR Status Page Routes - both /case/:caseId and /case/:caseId/pkr-status */}
          <Route path="/case/:caseId" element={<PKRStatusPage />} />
          <Route path="/case/:caseId/pkr-status" element={<PKRStatusPage />} />

          {/* PKR Report Page Route */}
          <Route path="/case/:caseId/report" element={<PKRReportPage />} />

          {/* Agent Execution Detail Route */}
          <Route path="/case/:caseId/agent/:agentId" element={<SoWCorroborationWorkflow isVisible={true} />} />

          {/* Legacy Document Processing Route */}
          <Route path="/document-processor" element={<DocumentProcessor />} />

          {/* Motion Test Route - For testing Framer Motion animations */}
          <Route path="/motion-test" element={<MotionTest />} />

          {/* Performance Test Route - For testing animation performance */}
          <Route path="/performance-test" element={<PerformanceTest />} />

          {/* Test Node Route - For testing single node status updates */}
          <Route path="/test-node" element={<TestNodePage />} />

          {/* Simple Test Route - For testing ultra-simple node status updates */}
          <Route path="/simple-test" element={<SimpleTestPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
