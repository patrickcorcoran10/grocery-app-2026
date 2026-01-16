"use client"
import React from 'react'

interface Todo {
    _id: string
    title: string
    completed: boolean
}
interface TodoItemProps {
    item: Todo
    onToggle: (todo:Todo) => void
}

const TodoItem: React.FC<TodoItemProps> = ({item, onToggle}) => {
    return (
        <li key={item._id}>
            <span style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
                {item.title}
            </span>
            <button onClick={() => onToggle(item)}>{item.completed ? "✅" : "❌"}</button>
        </li>
    )
}

export default TodoItem