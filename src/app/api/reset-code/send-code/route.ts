import { sendResetCode } from "@/helper/resetCodeSender";
import dbConnect from "@/lib/dbConnect";
import ResetModel from "@/models/reset.model";
import UserModel from "@/models/user.model";
import response from "@/util/response";


export async function POST(req: Request) {
  await dbConnect();
  try {
    const { email } = await req.json();
    const user = await UserModel.findOne({ email,isVerified:true });
    if (!user) {
      return Response.json(new response(false, "Email doesn't exist"), {
        status: 404,
      });
      }
      const resetUser = await ResetModel.findOne({ email });
      const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
      if (!resetUser) {
          await ResetModel.create({
              email,
              resetCode,
              resetCodeExpiry:new Date(Date.now() + 3600000)       
        })
      }
      if (resetUser) {
          resetUser.resetCode = resetCode;
        resetUser.resetCodeExpiry = new Date(Date.now() + 3600000)  
        await resetUser.save();
          
      }
     const resetCodeEmail=await sendResetCode(user.email, user.username, resetCode)
      if (!resetCodeEmail.success) {
        return Response.json(new response(false,resetCodeEmail.message),{status:500})
      }
      return Response.json(new response(true,"reset code send successfully"),{status:200})
    
  } catch (error) {
      console.log(error)
      return Response.json(new response(false,"something went wrong"),{status:500})
  }
}
