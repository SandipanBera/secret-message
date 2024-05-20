import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import { UsernameValidation } from "@/schemas/signUpSchema";
import response from "@/util/response";
export async function GET(request:Request) {
    await dbConnect()
    try {
        const { searchParams } = new URL(request.url)
        const username = searchParams.get("username") 
        const result = UsernameValidation.safeParse(username);
        console.log(result);
        
        
        if (!result.success) {
            return Response.json(new response(false,'Invalid query parameter'),{status:400})
        }
        const user = await UserModel.findOne({ username, isVerified: true })
        if (user) {
            return Response.json(new response(false,"username is not unique") ,{ status:200 })
        }
        return Response.json(new response(true,"username is unique") , { status: 200 })
    } catch (error) {
        console.error(error);
        return Response.json(
            new response(false,'server error'),
            {status:500}
        )
        
    }
}