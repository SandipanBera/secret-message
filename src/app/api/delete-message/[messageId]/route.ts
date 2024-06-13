import dbConnect from "@/lib/dbConnect";
import response from "@/util/response";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/option";
import UserModel from "@/models/user.model";
type Params={
    messageId: string;
}


export async function DELETE(context: { params: Params }) {
    await dbConnect();
    const { messageId } = context.params
    const session =await getServerSession(authOptions);
    if (!session || !session.user) {
        return Response.json(new response(false,"Unauthorized user"),{status:401})  
    }
    try {
        const user = await UserModel.updateOne({ _id: session.user._id }, { $pull: { "message": { _id: messageId } } })
        console.log(user);
        if (!user) {
            return Response.json(new response(false,"User not found"),{status:404})
        }
        return Response.json(new response(true,"Message deleted successfully"),{status:200})
        
    } catch (error) {
        console.log(error);
        return Response.json(new response(false,"Error occured while deleting message"),{status:500})
        
    }
    
}