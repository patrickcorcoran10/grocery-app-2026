import type { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '@/lib/mongodb'
import Todo from '@/models/Todo'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectDB()
const {method} = req;

switch (method) {
 case "PUT":
            try {
                const {_id, title, completed} = req.body;
                if (!_id) return res.status(400).json({message: "Todo Id is required"})
                if (!title || !title.trim()) return res.status(400).json({message: "title is required"})
                
                const updatedTodo = await Todo.findByIdAndUpdate(
                    _id, 
                    {title, completed},
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
                const { _id } = req.body;
                if (!_id) return res.status(400).json({ message: "Todo ID is required" });

                const deletedTodo = await Todo.findByIdAndDelete(_id);
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