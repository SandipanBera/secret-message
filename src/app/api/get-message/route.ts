import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";
import response from "@/util/response";
import UserModel from "@/models/user.model";

export async function GET() {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return Response.json(new response(false, "Unauthorized user"), {
      status: 401,
    });
  }
  try {
    const user = await UserModel.aggregate([
      {
        $match: { _id: session.user._id },
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
    ]);
      if (!user) {
          return Response.json(new response(false, "User not found"), {
              status: 404,
              });
      }
      return Response.json(new response(true,"Message fetched successfully",null,user[0].messages))
  } catch (error) {
    return Response.json(new response(false, "Error while fetching messages"), {
      status: 500,
    });
  }
}
