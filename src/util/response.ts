import { Message } from "@/models/message.model";
import { apiResponse } from "@/types/apiResponse";

class response implements apiResponse {
  success: boolean;
  message: string;
  data: any;
  messages?: [Message] | undefined;
  isAcceptMessage?: boolean | undefined;
  constructor(
    success: boolean,
    message: string,
    data?: any | null,
    messages?: [Message] | undefined,
    isAcceptMessage?: boolean | undefined
  ) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.isAcceptMessage = isAcceptMessage;
    this.messages = messages;
  }
}
export default response;
