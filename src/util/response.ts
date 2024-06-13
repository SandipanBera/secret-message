import { Message } from "@/models/message.model";
import { apiResponse } from "@/types/apiResponse";

class response implements apiResponse {
  constructor(
   public success: boolean,
   public message: string,
   public  data?: any | undefined,
   public messages?: [Message] | undefined,
   public isAcceptMessage?: boolean | undefined
  ) {
  
  }
}
export default response;
