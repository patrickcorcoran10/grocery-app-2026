import type { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '@/lib/mongodb'
import Todo from '@/models/Todo'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectDB()
    const {method} = req;

    switch (method) {
        case "GET":
            try {
                const todos = await Todo.find();
                res.status(200).json(todos)
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: "Error fetching todos" });
            }
            break;
        case "POST":
            try {
                const {title} = req.body;
                if (!title || !title.trim()) {
                    return res.status(400).json({message: "title required"})
                }

                const newTodo = await Todo.create({title});
                res.status(201).json(newTodo)
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: "Error creating todo" });
            }
            break;
        case "DELETE":
            try {
                const {mode} = req.query
                if (mode === "all") {
                    await Todo.deleteMany({})
                    return res.status(200).json({message:"all todos deleted"})
                }
                if (mode === "completed") {
                    await Todo.deleteMany({completed:true})
                    return res.status(200).json({message: "completed todos deleted"})
                }
            } catch (error) {
                
            }
       
        // UNSUPPORTED METHOD
        default:
            res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}