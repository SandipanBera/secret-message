import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";
import response from "@/util/response";
import UserModel from "@/models/user.model";
import mongoose from "mongoose";

export async function GET() {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return Response.json(new response(false, "Unauthorized user"), {
      status: 401,
    });
  }
  const userId = new mongoose.Types.ObjectId(session.user._id);
  try {
    const user = await UserModel.aggregate([
      {
        $match: { _id:userId },
      },
      {
        $unwind: "$messages",
      },
      {
        $sort: { "messages.createdAt": 1 },
      },
      {
        $group: {
          _id: "$_id",
          messages: { $push: "$messages" },
        },
      },
    ]).exec();

    
    if (!user||user.length===0) {
      return Response.json(new response(false, "No messages found"), {
        status: 404,
      });
    }
    
    return Response.json(
      new response(
        true,
        "Message fetched successfully",
        null,
        user[0].messages
      ),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(new response(false, "Error while fetching messages"), {
      status: 500,
    });
  }
}
