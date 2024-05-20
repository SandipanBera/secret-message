import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import response from "@/util/response";

export async function POST(req: Request) {
  await dbConnect();
  const { code, username } = await req.json();
  try {
    const user = await UserModel.findOne({ username: username });
    if (!user) {
      return Response.json(new response(false, "User not found"), {
        status: 404,
      });
    }
    if (user.verifyCode !== code) {
      return Response.json(new response(false, "Invalid code"), {
        status: 404,
      });
    }
    if (user.verifyCodeExpiry < new Date(Date.now())) {
      return Response.json(
        new response(
          false,
          "Code expired!!Please sign up again and get a new code"
        ),
        { status: 404 }
      );
    }
    return Response.json(
      new response(true, "Congrats!!Your account verified successfully"),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      new response(false, "Error occured while verifying code"),
      { status: 500 }
    );
  }
}
