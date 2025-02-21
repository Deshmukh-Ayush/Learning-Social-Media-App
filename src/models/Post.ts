import mongoose, { Document, Schema } from "mongoose";

export interface IPost extends Document {
  _id: mongoose.Types.ObjectId;
  content: string;
  mediaUrl?: string;
  userId?: mongoose.Types.ObjectId;
  likes?: mongoose.Types.ObjectId[];
  comments?: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<IPost>(
  {
    content: { type: String, required: true },
    mediaUrl: { type: String },
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    likes: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.Types.ObjectId, ref: "Comments" }],
  },
  { timestamps: true }
);

export default mongoose.models.Post ||
  mongoose.model<IPost>("Post", PostSchema);
