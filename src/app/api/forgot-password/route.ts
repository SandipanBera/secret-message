import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import response from "@/util/response";
import bcrypt from "bcryptjs"
export async function POST(req: Request) {
  await dbConnect();

  try {
    const { email, newPassword } = await req.json();
    const user = await UserModel.findOne({email});
    if (!user) {
      return Response.json(new response(false, "no user found"), {
        status: 401,
      });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    user.password = hashedPassword;
    await user.save()
    return Response.json(new response(true,"Password updated successfully"),{status:200})
      
  } catch (error) {
    console.log(error);
    return Response.json(new response(false, "something went wrong"), {
      status: 500,
    });
  }
}
