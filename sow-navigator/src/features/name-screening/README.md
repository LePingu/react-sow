# Name Screening Feature

This feature implements a name screening batch processing interface that matches the design specification with AG Grid table and integrated timeline sidebar.

## Components

### NameScreening
Main component that renders the name screening page with AG Grid table and expandable timeline sidebar.

## Features

### 1. **Header Section**
- Page title: "Name Screening - Batch 1"
- Rejection count badge showing number of rejections
- Action buttons: Reassign Batch, Download Template, Complete Pre-Check

### 2. **AG Grid Table**
- Professional data table using ag-grid-react
- Columns: Entity Type, Entity Name, DOB, Partner Role, Assignee, Status, Screening Date
- Row selection with checkboxes
- Sortable and filterable columns
- Click on any row to expand timeline sidebar

### 3. **Timeline Sidebar**
- Slides in from the right when a row is clicked
- Shows selected entity information
- Uses the existing `TaskColumn` component to display name screening process steps
- Animated with Framer Motion using banking-appropriate transitions

### 4. **Data Structure**
Sample data includes:
- Natural Persons (Mei Hua Jin, Yan Ting Wong, Wei Ming Lee)
- Legal Entities (Qi tong Ltd., Xin Xin Telly LLC)
- Various partner roles (Beneficial owner, Account holder, Authorized sig, LPOA)

### 5. **Name Screening Process Steps**
- Pre-check
- Rectification
- 1st Level Discounting (Maker)
- 1st Level Discounting (Checker)
- CA Justification
- Quality Assurance

## Routes

The name screening page can be accessed via:
```
/name-screening
/case/:caseId/name-screening
```

For example:
```
http://localhost:5173/name-screening
http://localhost:5173/case/test-case/name-screening
```

## Technical Implementation

- **AG Grid**: Professional data table with sorting, filtering, and selection
- **Responsive Layout**: Main content area adjusts when sidebar is open
- **State Management**: React hooks for sidebar state and selected row
- **Animation**: Framer Motion with banking-appropriate easing
- **Styling**: LESS stylesheets matching the banking theme
- **TypeScript**: Full type safety with AG Grid types

## Dependencies

- `ag-grid-react`: React wrapper for AG Grid
- `ag-grid-community`: Core AG Grid functionality
- `framer-motion`: Animations and transitions
- Existing project components: `TaskColumn` from case-management feature

## Future Enhancements

- Connect to backend API for real data
- Implement batch reassignment functionality
- Add template download capability
- Implement pre-check completion workflow
- Add advanced filtering and search
- Add bulk operations for selected rows
