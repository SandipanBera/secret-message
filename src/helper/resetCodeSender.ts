import { resend } from "@/lib/resend";
import { apiResponse } from "@/types/apiResponse";
import resetCodeEmail from "../../email/resetCodeEmail";
export async function sendResetCode(email:string,username:string,resetCode:string):Promise<apiResponse>  {
    try {
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: "Password reset Code",
            react: resetCodeEmail({username,resetCode}),
        });
        return { success:true,message:"Password reset Code Sent Successfully"};
        
    } catch (error) {
        console.log("Error in sending password reset Code: ", error);
        return {success: false, message:"Failed to send password reset Code"};
        
    }
}
