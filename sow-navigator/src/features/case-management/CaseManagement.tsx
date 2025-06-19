import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TaskColumn } from './TaskColumn'
import { TerminationDialog } from './TerminationDialog'
import { useAccessibleMotion } from '../../hooks/useAccessibleMotion'
import { BANKING_TRANSITIONS, PROFESSIONAL_VARIANTS } from '../../utils/motionPresets'
import './CaseManagement.less'

export const CaseManagement: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [showTerminationDialog, setShowTerminationDialog] = useState(false)
  const { getTransition } = useAccessibleMotion()
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleTerminateClick = () => {
    setShowDropdown(false)
    setShowTerminationDialog(true)
  }

  const handleTerminationConfirm = (reason: string) => {
    console.log('Case terminated with reason:', reason)
    // TODO: Implement actual termination logic
    setShowTerminationDialog(false)
  }

  const handleTerminationCancel = () => {
    setShowTerminationDialog(false)
  }
  const columns = [
    {
      title: "Documents & Forms",
      tasks: [
        { text: "Preparation", status: "not-assigned", statusText: "Not Assigned" },
        { text: "Submission", status: "not-assigned", statusText: "Not Assigned" },
        { text: "Review", status: "not-assigned", statusText: "Not Assigned" },
        { text: "Done", status: "done", statusText: "" },
        { text: "Final Check Review", status: "not-assigned", statusText: "Not Assigned" },
        { text: "Final Check Rectification (if required)", status: "not-assigned", statusText: "Not Assigned" },
        { text: "Done", status: "done", statusText: "" }
      ]
    },
    {
      title: "Name Screening",
      tasks: [
        { text: "Pre-check", status: "not-assigned", statusText: "Not Assigned" },
        { text: "Rectification", status: "not-assigned", statusText: "Not Assigned" },
        { text: "1st Level Discounting (Maker)", status: "not-assigned", statusText: "Not Assigned" },
        { text: "1st Level Discounting (Checker)", status: "not-assigned", statusText: "Not Assigned" },
        { text: "CA Justification", status: "not-assigned", statusText: "Not Assigned" },
        { text: "Quality Assurance", status: "not-assigned", statusText: "Not Assigned" },
        { text: "Done", status: "done", statusText: "" }
      ]
    },
    {
      title: "Client Profile",
      tasks: [
        { text: "CPAC Draft", status: "not-assigned", statusText: "Not Assigned" },
        { text: "CPAC Review", status: "not-assigned", statusText: "Not Assigned" },
        { text: "Done", status: "done", statusText: "" }
      ]
    },
    {
      title: "Approval",
      tasks: [
        { text: "MTH Approval", status: "not-assigned", statusText: "Not Assigned" },
        { text: "Other Approvals", status: "not-assigned", statusText: "Not Assigned" }
      ]
    },
    {
      title: "Account Activation",
      tasks: [
        { text: "Pre-Conversion", status: "not-assigned", statusText: "Not Assigned" },
        { text: "CM Rectification (if required)", status: "not-assigned", statusText: "Not Assigned" },
        { text: "Ready for Conversion (if required)", status: "not-assigned", statusText: "Not Assigned" },
        { text: "Static Data", status: "not-assigned", statusText: "Not Assigned" },
        { text: "Account Activation", status: "not-assigned", statusText: "Not Assigned" },
        { text: "Welcome Letter Generation", status: "not-assigned", statusText: "Not Assigned" },
        { text: "Welcome Letter Review", status: "not-assigned", statusText: "Not Assigned" },
        { text: "Done", status: "done", statusText: "" }
      ]
    }
  ]

  return (
    <div className="case-management">
      <div className="case-management-header">
        <div className="header-top">
          <h1>Case Progress</h1>
          <div className="ellipsis-menu" ref={dropdownRef}>
            <button 
              className="ellipsis-button"
              onClick={() => setShowDropdown(!showDropdown)}
              aria-label="Case options"
            >
              ⋯
            </button>
            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  className="dropdown-menu"
                  variants={PROFESSIONAL_VARIANTS.slideUp}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={getTransition(BANKING_TRANSITIONS.smooth)}
                >
                  <button 
                    className="dropdown-item terminate-option"
                    onClick={handleTerminateClick}
                  >
                    Terminate case
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="tab-navigation">
          <div className="tab tab-active">Tasks</div>
          <div className="tab">Role Assignment</div>
        </div>
      </div>
      
      <div className="task-columns">
        {columns.map((column, index) => (
          <TaskColumn 
            key={index}
            title={column.title}
            tasks={column.tasks}
          />
        ))}
      </div>

      <AnimatePresence>
        {showTerminationDialog && (
          <TerminationDialog
            onConfirm={handleTerminationConfirm}
            onCancel={handleTerminationCancel}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
