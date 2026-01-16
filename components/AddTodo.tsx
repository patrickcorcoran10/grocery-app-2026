"use client"
import {useState, type FormEvent} from 'react'

export default function AddTodo() {
    const [title, setTitle] = useState('')
    const [loading, setLoading] = useState(false)
    const addTodo = async (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await fetch('/api/todos', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({title})
            });
            console.log(response)
            if (response.ok) {
                setTitle('')
            } else {
                console.error('failed to add todo')
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }
    return (
        <form onSubmit={addTodo}>
            <input
                type="text"
                placeholder="item"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <button type="submit" disabled={loading}>
                {loading ? "Adding To List..." : "Add item"}
            </button>
        </form>
    )
}