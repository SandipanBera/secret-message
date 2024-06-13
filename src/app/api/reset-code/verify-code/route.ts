import dbConnect from "@/lib/dbConnect";
import ResetModel from "@/models/reset.model";
import response from "@/util/response";

export async function POST(req: Request) {
    await dbConnect()

    try {
        const { email, code } = await req.json();
        const user =await ResetModel.findOne({ email });
        if (!user) {
            return Response.json(new response(true,"No user found"),{status:400})
        }
        if (user.resetCode !== code) { 
            return Response.json(new response(false, "Invalid reset code"),{status:400});
            
        }
        if (user.resetCodeExpiry < new Date(Date.now())) {
            
            return Response.json(new response(false, "Code expired"),{status:400});
        }
        return Response.json(new response(true,"Code verified successfully"),{status:200})
            
    } catch (error) {
        console.log(error)
        return Response.json(new response(false,"Server Error"),{status:500})
        
    }


    
}