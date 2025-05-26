import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './features/layout'
import { Dashboard } from './features/dashboard'
import { PKRStatusPage } from './features/pkr-status'
import { AgentTreeView } from './features/agent-tree'
import './App.less'
import { DocumentProcessor } from './features/document-processor'

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

          {/* Agent Execution Detail Route */}
          <Route path="/case/:caseId/agent/:agentId" element={<AgentTreeView isVisible={true} />} />

          {/* Legacy Document Processing Route */}
          <Route path="/document-processor" element={<DocumentProcessor />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
