import React from 'react'
import { TaskBox } from './TaskBox'
import './TaskColumn.less'

interface Task {
  text: string
  status: 'not-assigned' | 'done'
  statusText: string
}

interface TaskColumnProps {
  title: string
  tasks: Task[]
}

export const TaskColumn: React.FC<TaskColumnProps> = ({ title, tasks }) => {
  return (
    <div className="task-column">
      <h3 className="column-title">{title}</h3>
      <div className="task-list">
        {tasks.map((task, index) => (
          <TaskBox
            key={index}
            text={task.text}
            status={task.status}
            statusText={task.statusText}
            isLast={index === tasks.length - 1}
          />
        ))}
      </div>
    </div>
  )
}
