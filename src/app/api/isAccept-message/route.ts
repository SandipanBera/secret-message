import dbConnect from "@/lib/dbConnect";
import { authOptions } from "../auth/[...nextauth]/option";
import { getServerSession } from "next-auth";
import response from "@/util/response";
import UserModel from "@/models/user.model";

export async function POST(req: Request) {
    await dbConnect()
    try {
        const { acceptMessages } = await req.json();
        const session = await getServerSession(authOptions);
        const userId = session?.user?._id;

        if (!session || !session.user) {
            return Response.json(new response(false, "Unauthorized user"), { status: 401 })     
        }
        const updatedUser = await UserModel.findByIdAndUpdate(userId, {
            isAcceptMessage: acceptMessages   
        },{new:true})
        if (!updatedUser) {
            return Response.json(new response(false, "User not found"), { status: 404 })
            
        }
        return Response.json(new response(true,"Successfully changed accept message status",null,undefined,updatedUser.isAcceptMessage),{status:200})

    } catch (error) {
        console.log(error);
        return Response.json(new response(false, "Error occured when changing status"), { status: 500 })

        
    }
    
}
export async function GET() {
    await dbConnect()
    try {
        const session = await getServerSession(authOptions);
        const userId = session?.user?._id;
        if (!session || !session.user) {
            return Response.json(new response(false, "Unauthorized user"), { status: 401 })
        }
        const user = await UserModel.findById(userId)
        if (!user) {
            return Response.json(new response(false, "User not found"), { status: 404 })
        }
        return Response.json(new response(true, "Successfully fetched user", user, undefined,user.isAcceptMessage), { status: 200 })
        
    } catch (error) {
        console.log(error);
        return Response.json(new response(false, "Something went wrong when fetching data"), { status: 500 })
        
    }
    
}