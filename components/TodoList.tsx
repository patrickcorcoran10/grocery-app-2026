"use client"
import {useEffect, useState} from 'react'

interface Todo {
    _id: string
    title: string
    completed: boolean
}

export default function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchTodos() {
            try {
                const response = await fetch('/api/todos')
                const data = await response.json()
                setTodos(data)
            } catch(error) {
                console.error("error fetching todos", error)
            } finally {
                setLoading(false)
            }
        }
        fetchTodos()
    }, []);

    return (
        <div>
            <h2>Grocery List</h2>
            {loading ? <p>Loading...</p> : 
                todos.length > 0 ? (
                    <ul>
                        {todos.map((todo) => (
                            <li key={todo._id}>{todo.title}</li>
                        ))}
                    </ul>
                ) : <p>No List yet</p>
            }
        </div>
    )
}