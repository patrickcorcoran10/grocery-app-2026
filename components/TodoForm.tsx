"use client"
import { useState, FormEvent } from "react"

interface TodoFormProps {
    onAdd: (title: string) => void
}

export default function TodoForm({ onAdd }: TodoFormProps) {
    const [title, setTitle] = useState("")

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (!title.trim()) return
        onAdd(title.trim())
        setTitle("")
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add a new todo"
            />
            <button type="submit">Add</button>
        </form>
    )
}
