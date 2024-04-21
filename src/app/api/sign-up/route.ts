import { sendVerificationEmail } from "@/helper/emailSenderHelper";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import { apiResponse } from "@/types/apiResponse";
import bcrypt from "bcryptjs";
export async function POST(req: Request) {
  await dbConnect();
  try {
    const { username, email, password } = await req.json();
    //check if verified user already exist in database
    const userExistAndVerified = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (userExistAndVerified) {
      return Response.json(
        { success: false, message: "User already taken" },
        { status: 409 }
      );
    }
    //user find by email
    const userByEmail = await UserModel.findOne({ email });
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
      if (userByEmail) {
          if (!userByEmail.isVerified) {
              //update the existing user with new verification code and resend the mail
              userByEmail.password = await bcrypt.hash(password, 10)
              userByEmail.verifyCode = verifyCode;
              userByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)
              await userByEmail.save();
          } else {
              return  Response.json(
                  {success :false ,message:"This Email has been registered."}
                  ,{status:409}
              )
        }
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = new UserModel({
        username,
        email,
        password: hashPassword,
        verifyCode,
        verifyCodeExpiry: new Date(Date.now() + 3600000), //one hour expire time for verification code
        isVerified: false,
        isAcceptMessage: false,
        message: [],
      });
      await newUser.save();
    }
    //send verification mail to the user's email address
    const verificationEmail = await sendVerificationEmail(
      email,
      username,
      verifyCode
      );
      if (!verificationEmail.success) {
          return Response.json({success:false,message:verificationEmail.message},{status:502});
      }
      return Response.json(
        {
          success:true,
          message:`A verification mail has been sent to your registered Email ID ${email}.Please verify it`
          },
          {
              status:200,
          }
      )
  } catch (error) {
    console.error("Error registering user", error);
    return Response.json(
      { success: false, message: "Error registering user" },
      { status: 500 }
    );
  }
}
