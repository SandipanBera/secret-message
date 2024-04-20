import mongoose, { Schema, Document } from "mongoose";
import { Message } from "./message.model";
export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptMessage: boolean;
  message: Message[];
}
const userSchema: Schema<User> = new Schema({
  username: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    required: true,
  },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  verifyCode: { type: String, required: true },
  verifyCodeExpiry: { type: Date, required: true },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptMessage: { type: Boolean, default: false },
  message: [{ type: mongoose.Schema.Types.ObjectId, ref: "MessageModel" }],
});
const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model("User", userSchema);
export default UserModel;