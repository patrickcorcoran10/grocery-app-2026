"use client"
import { useEffect, useState } from "react"
import TodoItem from "./TodoItem"

export interface Todo {
    _id: string
    title: string
    completed: boolean
}

interface TodoListProps {
    todos: Todo[]
    onToggle: (todo: Todo) => void
}

export default function TodoList({ todos, onToggle }: TodoListProps) {
    if (!todos.length) return <p>No List yet</p>

    return (
        <ul>
            {todos.map((todo) => (
                <TodoItem key={todo._id} item={todo} onToggle={onToggle} />
            ))}
        </ul>
    )
}
