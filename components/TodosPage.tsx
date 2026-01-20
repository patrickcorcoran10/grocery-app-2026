"use client"
import { useEffect, useState } from "react"
import TodoForm from "./TodoForm"
import TodoList, { Todo } from "./TodoList"

export default function TodosPage() {
    const [todos, setTodos] = useState<Todo[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchTodos() {
            try {
                const res = await fetch("/api/todos")
                const data = await res.json()
                sortList(data)
                setTodos(data)
            } catch (error) {
                console.error("Error fetching todos", error)
            } finally {
                setLoading(false)
            }
        }
        fetchTodos()
    }, [])
    const sortList = (data:[]) => {
        // Sort Alphabetically
        data.sort((a:any, b:any) => {
            return a.title.localeCompare(b.title)
        })
        // Sort by Completed or Not.
        data.sort((a:any, b:any) => {
            if(a.completed && !b.completed) {
                return 1;
            }
            if (!a.completed && b.completed) {
                return -1;
            }
            return 0;
        })
    }
    const toggleTodo = async (todo: Todo) => {
        const updatedTodo = { ...todo, completed: !todo.completed }
        setTodos((prev) =>
            prev.map((t) => (t._id === todo._id ? updatedTodo : t))
        )

        try {
            const res = await fetch(`/api/todos/${todo._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedTodo),
            })
            window.location.reload()
            if (!res.ok) throw new Error("Failed to update todo")
        } catch (error) {
            console.error(error)
            setTodos((prev) =>
                prev.map((t) => (t._id === todo._id ? todo : t))
            )
        }
    }

    const addTodo = async (title: string) => {
        try {
            const res = await fetch("/api/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title }),
            })
            if (!res.ok) throw new Error("Failed to add todo")
            const newTodo = await res.json()
            setTodos((prev) => [...prev, newTodo])
        } catch (error) {
            console.error(error)
        }
    }
    const deleteAllTodos = async () => {
        try {
            await fetch('/api/todos?mode=all', {method: "DELETE"})
            setTodos([])
        } catch (error) {
            console.error(error)
        }
    }

    const deleteCompletedTodos = async () => {
        try {
            await fetch('/api/todos?mode=completed', {method: "DELETE"})
            setTodos(prev => prev.filter(todo => !todo.completed))
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <TodoForm onAdd={addTodo} />
            {loading ? <p>Loading...</p> : <TodoList todos={todos} onToggle={toggleTodo} />}
            <div className='flex flex-col'>
            <button className="btn delete" onClick={deleteCompletedTodos}>Delete Completed Items</button>
            <button className="btn delete" onClick={deleteAllTodos}>Delete All Items</button>
            </div>
        </div>
    )
}
