import { Message } from "@/models/message.model";

export interface apiResponse{
    success: boolean;
    message: string;
    data?: any;
    isAcceptMessage?: boolean
    messages?:[Message]
}