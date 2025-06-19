import React from 'react'
import { motion } from 'framer-motion'
import { useAccessibleMotion } from '../../hooks/useAccessibleMotion'
import { BANKING_TRANSITIONS } from '../../utils/motionPresets'
import './TaskBox.less'

interface TaskBoxProps {
  text: string
  status: 'not-assigned' | 'done'
  statusText: string
  isLast?: boolean
}

export const TaskBox: React.FC<TaskBoxProps> = ({ text, status, statusText, isLast }) => {
  const { getTransition } = useAccessibleMotion();

  const circleVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.1 },
    tap: { scale: 0.95 }
  };

  const containerVariants = {
    rest: { 
      backgroundColor: 'transparent'
    },
    hover: { 
      backgroundColor: 'rgba(248, 249, 250, 0.3)'
    }
  };

  return (
    <motion.div 
      className={`task-item ${status}`}
      variants={containerVariants}
      initial="rest"
      whileHover="hover"
      transition={getTransition(BANKING_TRANSITIONS.subtle)}
    >
      <div className="task-circle-container">
        <motion.div 
          className={`task-circle ${status}`}
          variants={circleVariants}
          transition={getTransition(BANKING_TRANSITIONS.precise)}
        >
          {status === 'done' && <div className="checkmark">✓</div>}
        </motion.div>
        {!isLast && status !== 'done' && (
          <div className="connecting-line"></div>
        )}
      </div>
      <div className="task-content">
        <div className="task-text">{text}</div>
        {statusText && (
          <div className="task-status">
            <div className="status-text">{statusText}</div>
            <div className="status-subtext">Not Started</div>
          </div>
        )}
      </div>
      {status === 'done' && (
        <div className="done-separator"></div>
      )}
    </motion.div>
  )
}
