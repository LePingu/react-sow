# Case Management Feature

This feature implements a case management status page that displays the progress of various tasks across different workflow stages.

## Components

### CaseManagement
Main component that renders the case progress page with tabs and task columns.

### TaskColumn
Renders a column of tasks with a title header.

### TaskBox
Individual task component that displays task name, status, and additional status information.

## Usage

The case management page can be accessed via the route:
```
/case/:caseId/management
```

For example:
```
http://localhost:5173/case/test-case/management
```

## Styling

The components use LESS stylesheets that match the design specifications:
- Gray task boxes for incomplete tasks
- Status indicators showing "Not Assigned" and "Not Started"
- Clean, minimal design with proper spacing
- Responsive grid layout for task columns

## Task States

- `not-assigned`: Gray boxes with status information
- `done`: Completion state (styled similarly but semantically different)

## Future Enhancements

- Add interactive task status updates
- Implement role assignment tab functionality
- Add task completion animations
- Connect to backend API for real task data
