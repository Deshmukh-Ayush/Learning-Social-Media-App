import mongoose, { models, model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser {
  _id?: mongoose.Types.ObjectId;
  email: string;
  password: string;
  username: string;
  fullName?: string;
  followers?: mongoose.Types.ObjectId[];
  following?: mongoose.Types.ObjectId[];
  postCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    fullName: { type: String },
    followers: { type: Number },
    following: { type: Number },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

const User = models?.User || model<IUser>("User", UserSchema);
