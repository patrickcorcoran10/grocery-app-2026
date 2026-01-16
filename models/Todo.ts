import mongoose, {Types, Schema} from 'mongoose';


export interface Todo {
    _id?: Types.ObjectId
    title: string
    completed: boolean
}

const TodoSchema = new Schema<Todo>(
    {   
        title: { type: String, required: true},
        completed: {type: Boolean, default: false}
    },
    {timestamps: true}
);

export default mongoose.models.Todo || mongoose.model<Todo>("Todo", TodoSchema)