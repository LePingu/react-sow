import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import './DocumentUpload.less';

interface DocumentUploadProps {
    onFileUpload: (file: File) => void;
    isProcessing: boolean;
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({
    onFileUpload,
    isProcessing
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragOver, setIsDragOver] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onFileUpload(file);
        }
    };

    const handleBoxClick = () => {
        if (!isProcessing) {
            fileInputRef.current?.click();
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);

        const files = e.dataTransfer.files;
        if (files && files[0]) {
            onFileUpload(files[0]);
        }
    };

    return (
        <motion.div
            className="upload-container"
            initial={{ opacity: 1, scale: 1 }}
            animate={isProcessing ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
        >
            <div
                className={`upload-box ${isDragOver ? 'drag-over' : ''}`}
                onClick={handleBoxClick}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <div className="upload-icon">
                    <svg
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <polyline
                            points="14,2 14,8 20,8"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
                <h3>Upload ID Document</h3>
                <p>{isDragOver ? 'Drop your file here' : 'Click to select or drag & drop your ID document'}</p>
                <p className="file-types">Supports: PDF, JPG, PNG</p>
            </div>
            <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
        </motion.div>
    );
};
