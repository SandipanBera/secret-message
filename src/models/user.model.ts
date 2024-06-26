import mongoose, { Schema, Document } from "mongoose";
import { Message, messageSchema } from "./message.model";

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptMessage: boolean;
  messages: Message[];
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
  password: { type: String },
  verifyCode: { type: String},
  verifyCodeExpiry: { type: Date },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptMessage: { type: Boolean, default: false },
  messages: [messageSchema],
},{timestamps:true});
const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model("User", userSchema);
export default UserModel;

