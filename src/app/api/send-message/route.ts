import UserModel from "@/models/user.model";
import dbConnect from "@/lib/dbConnect";
import { Message } from "@/models/message.model";
import response from "@/util/response";

export async function POST(request: Request) {
  await dbConnect();
  const { username, content } = await request.json();

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return Response.json(new response(false, "User not found"), {
        status: 404,
      });
    }

    // Check if the user is accepting messages
    if (!user.isAcceptMessage) {
      return Response.json(
        new response(false, "User is not accepting messages"),
        { status: 403 } // 403 Forbidden status
      );
    }

    const newMessage = { content, createdAt: new Date() };

    // Push the new message to the user's messages array
    user.messages.push(newMessage as Message);
    await user.save();

    return Response.json(new response(false, "Message sent successfully"), {
      status: 201,
    });
  } catch (error) {
    console.error("Error adding message:", error);
    return Response.json(new response(false, "Internal server error"), {
      status: 500,
    });
  }
}
