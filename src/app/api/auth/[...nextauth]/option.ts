import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();
        let user = await UserModel.findOne({
          $or: [
            { username: credentials.identifier },
            { email: credentials.identifier },
          ],
        });
     
        
        if (!user) {
          throw new Error("No user found");
        }
        if (!user.isVerified) {
          throw new Error("Please verify your account first.");
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValidPassword) {
          throw new Error("Invalid Password");
        }
       
        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isAcceptMessage = token.isAcceptMessage;
        session.user.isVerified = token.isVerified;
        session.user.username = token.username;
       
      }
      return session;
    },
    async jwt({ token, user, profile }) {
      if (user) {
        token._id = user._id?.toString();
        token.username = user.username;
        token.isVerified = user.isVerified;
        token.isAcceptMessage = user.isAcceptMessage;
       
      }
      if (profile) {
        const myUser = await UserModel.findOne({ email: profile.email });
        if (myUser) {
          token._id = myUser._id.toString();
          token.username = myUser.username;
          token.isVerified = myUser.isVerified;
          token.isAcceptMessage = myUser.isAcceptMessage;
        }
      }

      return token;
    },
    async signIn({ profile, credentials }) {
      await dbConnect();
      try {
        if (profile) {
          console.log(profile.email);
          const user = await UserModel.findOne({
            email: profile.email,
          });
          if (!user) {
            const newUser = await UserModel.create({
              username: profile.name,
              email: profile.email,
              isVerified: true,
            });
            if (!newUser) {
              throw new Error("Error occured while creating new user");
            }
          }
          if (user && !user.isVerified) {
            user.username = profile.name || user.username;
            user.isVerified = true;
          }
        }
        if (credentials) {
          return true;
        }
        return false;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
 
  secret: process.env.NEXTAUTH_SECRET,
};
