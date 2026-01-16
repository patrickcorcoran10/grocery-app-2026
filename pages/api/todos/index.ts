import type { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '@/lib/mongodb'
import Todo from '@/models/Todo'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectDB()
    // if (req.method === "GET") {
    //     try {
    //         const todos = await Todo.find()
    //         res.status(200).json(todos)
    //     } catch (error) {
    //         res.status(500).json({ message: "Error fetching todos" })
    //     }
    // } else if (req.method === "POST") {
    //     try {
    //         const { title } = req.body;
    //         if (!title) return res.status(400).json({ message: "Title is required" });

    //         const newTodo = await Todo.create({ title });
    //         res.status(201).json(newTodo);
    //     } catch (error) {
    //         res.status(500).json({ message: "Error creating todo" });
    //     }
    // } else if (req.method ==="DELETE") {
    //     try {
    //         const {id} = req.body;

    //     } catch (error) {
            
    //     }
    // }
    // else {
    //     res.status(405).json({ message: "Method Not Allowed" })
    // }
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
        case "PUT":
            try {
                const {id, title, completed} = req.body;
                if (!id) return res.status(400).json({message: "Todo Id is required"})
                if (!title || !title.trim()) return res.status(400).json({message: "title is required"})
                
                const updatedTodo = await Todo.findByIdAndUpdate(
                    id, 
                    {title},
                    {new:true}
                );
                if (!updatedTodo) return res.status(404).json({ message: "Todo not found" });
                res.status(200).json(updatedTodo);
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: "Error updating todo" });
            }
            break;
        case "DELETE":
             try {
                const { id } = req.body;
                if (!id) return res.status(400).json({ message: "Todo ID is required" });

                const deletedTodo = await Todo.findByIdAndDelete(id);
                if (!deletedTodo) return res.status(404).json({ message: "Todo not found" });

                res.status(200).json({ message: "Todo deleted successfully" });
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: "Error deleting todo" });
            }
            break;
        // UNSUPPORTED METHOD
        default:
            res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}