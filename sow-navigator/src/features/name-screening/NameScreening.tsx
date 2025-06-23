import React, { useState, useMemo } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { AllCommunityModule, ModuleRegistry, type ColDef } from 'ag-grid-community'
import { motion, AnimatePresence } from 'framer-motion'
import { TaskColumn } from '../case-management/TaskColumn'
import { useAccessibleMotion } from '../../hooks/useAccessibleMotion'
import { BANKING_TRANSITIONS, PROFESSIONAL_VARIANTS } from '../../utils/motionPresets'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import './NameScreening.less'

interface NameScreeningData {
    id: string
    entityType: string
    entityName: string
    dob: string
    partnerRole: string
    assignee: string
    status: string
    screeningDate: string
}

export const NameScreening: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { getTransition } = useAccessibleMotion()
    ModuleRegistry.registerModules([AllCommunityModule]);

    const rowData: NameScreeningData[] = [
        {
            id: '1',
            entityType: 'Natural Person',
            entityName: 'Mei Hua Jin',
            dob: '01-02-1967',
            partnerRole: 'Beneficial owner',
            assignee: '-',
            status: 'Not Started',
            screeningDate: '-'
        },
        {
            id: '2',
            entityType: 'Natural Person',
            entityName: 'Yan Ting Wong',
            dob: '01-02-1967',
            partnerRole: 'Account holder',
            assignee: '-',
            status: 'Not Started',
            screeningDate: '-'
        },
        {
            id: '3',
            entityType: 'Natural Person',
            entityName: 'Wei Ming Lee',
            dob: '01-02-1967',
            partnerRole: 'Account holder',
            assignee: '-',
            status: 'Not Started',
            screeningDate: '-'
        },
        {
            id: '4',
            entityType: 'Legal Entity',
            entityName: 'Qi tong Ltd.',
            dob: '01-02-1967',
            partnerRole: 'Authorized sig...',
            assignee: '-',
            status: 'Not Started',
            screeningDate: '-'
        },
        {
            id: '5',
            entityType: 'Legal Entity',
            entityName: 'Xin Xin Telly LLC',
            dob: '01-02-1967',
            partnerRole: 'LPOA',
            assignee: '-',
            status: 'Not Started',
            screeningDate: '-'
        }
    ]

    const columnDefs: ColDef[] = [
        {
            headerName: '',
            field: 'select',
            checkboxSelection: true,
            headerCheckboxSelection: true,
            width: 60,
            suppressMovable: true,
            resizable: false,
            sortable: false,
            filter: false
        },
        {
            headerName: 'Entity Type',
            field: 'entityType',
            sortable: true,
            filter: true,
            flex: 1,
            minWidth: 120
        },
        {
            headerName: 'Entity Name',
            field: 'entityName',
            sortable: true,
            filter: true,
            flex: 1,
            minWidth: 150
        },
        {
            headerName: 'DOB',
            field: 'dob',
            sortable: true,
            filter: true,
            flex: 1,
            minWidth: 120
        },
        {
            headerName: 'Partner Role',
            field: 'partnerRole',
            sortable: true,
            filter: true,
            flex: 1,
            minWidth: 140
        },
        {
            headerName: 'Assignee',
            field: 'assignee',
            sortable: true,
            filter: true,
            flex: 1,
            minWidth: 100
        },
        {
            headerName: 'Status',
            field: 'status',
            sortable: true,
            filter: true,
            flex: 1,
            minWidth: 120
        },
        {
            headerName: 'Screening Date',
            field: 'screeningDate',
            sortable: true,
            filter: true,
            flex: 1,
            minWidth: 140
        }
    ]

    const nameScreeningTasks = [
        { text: "Pre-check", status: "not-assigned" as const, statusText: "Not Assigned" },
        { text: "Rectification", status: "not-assigned" as const, statusText: "Not Assigned" },
        { text: "1st Level Discounting (Maker)", status: "not-assigned" as const, statusText: "Not Assigned" },
        { text: "1st Level Discounting (Checker)", status: "not-assigned" as const, statusText: "Not Assigned" },
        { text: "CA Justification", status: "not-assigned" as const, statusText: "Not Assigned" },
        { text: "Quality Assurance", status: "not-assigned" as const, statusText: "Not Assigned" }
    ]

    const defaultColDef = useMemo(() => ({
        resizable: true,
        sortable: true,
        filter: true,
    }), [])

    const closeSidebar = () => {
        setSidebarOpen(false)
    }

    const toggleTimeline = () => {
        setSidebarOpen(!sidebarOpen)
    }

    return (
        <div className="name-screening">
            <div className="name-screening-header">
                <h1>Name Screening - Batch 1</h1>
                <div className="header-actions">
                    <div className="rejection-count-row">
                        <span className="rejection-count">
                            Rejection Count <span className="count-badge">4</span>
                        </span>
                        <button 
                            className="panel-icon-btn"
                            onClick={toggleTimeline}
                            aria-label="Toggle timeline panel"
                        >
                            📊
                        </button>
                    </div>
                    <div className="action-buttons">
                        <button className="btn btn-outline">Reassign Batch</button>
                        <button className="btn btn-outline">Download Template</button>
                        <button className="btn btn-primary">Complete Pre-Check</button>
                    </div>
                </div>
            </div>

            <div className="name-screening-content">
                <div className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
                    <div className="batch-name-list">
                        <h3>Batch Name List</h3>
                        <div className="ag-theme-alpine grid-container">
                            <AgGridReact
                                rowData={rowData}
                                columnDefs={columnDefs}
                                defaultColDef={defaultColDef}
                                rowSelection="multiple"
                                domLayout="autoHeight"
                                headerHeight={40}
                                rowHeight={35}
                            />
                        </div>
                        <div className="pagination-info">
                            <span>1 to 1 of 2</span>
                            <div className="pagination-controls">
                                <button disabled>«</button>
                                <button disabled>‹</button>
                                <span>Page 1 of 2</span>
                                <button>›</button>
                                <button>»</button>
                            </div>
                        </div>
                        <button className="add-name-btn">+ Add Name</button>
                    </div>
                </div>

                <AnimatePresence>
                    {sidebarOpen && (
                        <motion.div
                            className="timeline-sidebar"
                            variants={PROFESSIONAL_VARIANTS.slideUp}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={getTransition(BANKING_TRANSITIONS.smooth)}
                        >
                            <div className="sidebar-header">
                                <h3>Timeline</h3>
                                <button className="close-btn" onClick={closeSidebar}>×</button>
                            </div>
                            <div className="sidebar-content">
                                <TaskColumn
                                    title="Name Screening Process"
                                    tasks={nameScreeningTasks}
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
