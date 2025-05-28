import { useState } from 'react'
import { DocumentUpload, IdIcon, AnimatedArrow, ProcessingLabel, CompletionMessage } from '../document-upload'
// import { AgentTreeView } from '../agent-tree'

const DocumentProcessor = () => {
    const [isProcessing, setIsProcessing] = useState(false)
    const [isCompleted, setIsCompleted] = useState(false)
    const [showAgentTree, setShowAgentTree] = useState(false)
    const [documentId, setDocumentId] = useState('')
    const [fileName, setFileName] = useState('')

    const handleFileUpload = (file: File) => {
        setFileName(file.name)
        setIsProcessing(true)

        // Generate a mock document ID
        const mockId = Math.floor(Math.random() * 99999).toString().padStart(5, '0')
        setDocumentId(mockId)

        // Mock backend processing
        setTimeout(() => {
            setIsProcessing(false)
            setIsCompleted(true)

            // Show completion for 3 seconds, then transition to agent tree
            setTimeout(() => {
                setIsCompleted(false)
                setShowAgentTree(true)
            }, 3000)
        }, 3000)
    }

    const resetWorkflow = () => {
        setShowAgentTree(false)
        setDocumentId('')
        setFileName('')
        setIsProcessing(false)
        setIsCompleted(false)
    }

    if (showAgentTree) {
        return (
            <>
                {/* <AgentTreeView isVisible={showAgentTree} /> */}
                <button className="reset-button" onClick={resetWorkflow}>
                    ← Back to Document Upload
                </button>
            </>
        )
    }

    return (
        <div className="app-container">
            <h1>SOW Navigator</h1>
            <p className="subtitle">Document Processing System</p>

            <div className="processing-flow">
                {!isProcessing && !isCompleted && (
                    <DocumentUpload
                        onFileUpload={handleFileUpload}
                        isProcessing={isProcessing}
                    />
                )}

                {isProcessing && (
                    <>
                        <IdIcon isVisible={isProcessing} />
                        <AnimatedArrow isVisible={isProcessing} />
                        <ProcessingLabel
                            isVisible={isProcessing}
                            documentId={documentId}
                            fileName={fileName}
                        />
                    </>
                )}

                {isCompleted && (
                    <CompletionMessage
                        isVisible={isCompleted}
                        documentId={documentId}
                    />
                )}
            </div>
        </div>
    )
}

export default DocumentProcessor
