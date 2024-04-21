import { resend } from "@/lib/resend";
import { apiResponse } from "@/types/apiResponse";
import VerificationEmail from "../../email/verificationEmail";
export async function sendVerificationEmail(email:string,username:string,verifyCode:string):Promise<apiResponse>  {
    try {
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: "Verification Code",
            react: VerificationEmail({username,verifyCode}),
        });
        return { success:true,message:"Verification Email Sent Successfully"};
        
    } catch (error) {
        console.log("Error in sending verification email: ", error);
        return {success: false, message:"Failed to send verification email"};
        
    }
}
