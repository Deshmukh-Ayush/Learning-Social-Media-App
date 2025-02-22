import mongoose, {Schema, Document} from "mongoose"

export interface IComments extends Document{
    text: string;
    postId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    createdAt: Date
}

const CommentSchema = new Schema<IComments>({
    text: { type: String, required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
  });

export default mongoose.models.Comments || mongoose.model<IComments>("Comments", CommentSchema)