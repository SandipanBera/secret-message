import mongoose, { Schema, Document } from "mongoose";
export interface Reset extends Document{
    email: string,
    resetCode: string,
    resetCodeExpiry:Date
}
const resetSchema: Schema<Reset> = new Schema({
    email: {
        type: String,
        required:true
    },
    resetCode: String,
    resetCodeExpiry:Date   
    
}, { timestamps: true })
const ResetModel=(mongoose.models.Reset as  mongoose.Model<Reset>)|| mongoose.model("Reset",resetSchema)
export default ResetModel