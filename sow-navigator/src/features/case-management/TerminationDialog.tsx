import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useAccessibleMotion } from '../../hooks/useAccessibleMotion'
import { BANKING_TRANSITIONS, PROFESSIONAL_VARIANTS } from '../../utils/motionPresets'
import './TerminationDialog.less'

interface TerminationDialogProps {
  onConfirm: (reason: string) => void
  onCancel: () => void
}

export const TerminationDialog: React.FC<TerminationDialogProps> = ({ onConfirm, onCancel }) => {
  const [selectedReason, setSelectedReason] = useState('')
  const { getTransition } = useAccessibleMotion()

  const reasons = [
    'Customer request',
    'Incomplete documentation',
    'Regulatory issues',
    'Risk assessment failure',
    'Duplicate application',
    'Other'
  ]

  const handleConfirm = () => {
    if (selectedReason) {
      onConfirm(selectedReason)
    }
  }

  return (
    <motion.div
      className="termination-overlay"
      variants={PROFESSIONAL_VARIANTS.overlay}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={getTransition(BANKING_TRANSITIONS.smooth)}
      onClick={onCancel}
    >
      <motion.div
        className="termination-dialog"
        variants={PROFESSIONAL_VARIANTS.slideUp}
        transition={getTransition(BANKING_TRANSITIONS.smooth)}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="dialog-header">
          <h3>Terminate Case</h3>
        </div>
        
        <div className="dialog-content">
          <p className="warning-message">
            Are you sure you want to delete this case? This action cannot be undone.
          </p>
          
          <div className="reason-selection">
            <label htmlFor="termination-reason">Reason for termination:</label>
            <select
              id="termination-reason"
              value={selectedReason}
              onChange={(e) => setSelectedReason(e.target.value)}
              className="reason-select"
            >
              <option value="">Select a reason...</option>
              {reasons.map((reason) => (
                <option key={reason} value={reason}>
                  {reason}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="dialog-actions">
          <button
            className="btn btn-danger"
            onClick={handleConfirm}
            disabled={!selectedReason}
          >
            Terminate
          </button>
          <button
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
