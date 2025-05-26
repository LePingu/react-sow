import React from 'react';
import './ContextMenu.less';

interface ContextMenuProps {
    isVisible: boolean;
    position: { x: number; y: number };
    nodeId: string;
    nodeName: string;
    onClose: () => void;
    onViewDetails: () => void;
    onViewLogs: () => void;
    onRestart?: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
    isVisible,
    position,
    nodeId,
    nodeName,
    onClose,
    onViewDetails,
    onViewLogs,
    onRestart
}) => {
    React.useEffect(() => {
        const handleClickOutside = () => onClose();

        if (isVisible) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    return (
        <div
            className="context-menu"
            style={{
                left: position.x,
                top: position.y
            }}
            onClick={(e) => e.stopPropagation()}
        >
            <div className="context-menu-header">
                <span className="node-name">{nodeName}</span>
                <span className="node-id">{nodeId}</span>
            </div>
            <div className="context-menu-divider" />
            <div className="context-menu-items">
                <button className="context-menu-item" onClick={onViewDetails}>
                    <span className="menu-icon">📊</span>
                    View Details
                </button>
                <button className="context-menu-item" onClick={onViewLogs}>
                    <span className="menu-icon">📋</span>
                    View Logs
                </button>
                {onRestart && (
                    <button className="context-menu-item restart" onClick={onRestart}>
                        <span className="menu-icon">🔄</span>
                        Restart Agent
                    </button>
                )}
            </div>
        </div>
    );
};

export default ContextMenu;
