import { dbConnect } from "@/lib/dbConnect";
import { zSchema } from "@/lib/zodSchema";
import OTPModel from "@/models/Otp.model";
import UserModel from "@/models/User.model";
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await dbConnect()
    const body = await request.json();
    const validatedSchema = zSchema.pick({
      otp: true, email: true
    })

    const validatedData = validatedSchema.safeParse(body)
    if (!validatedData.success) {

      return NextResponse.json({ success: false, message: "Invalid or missing field." }, { status: 404 })
    }

    const { email, otp } = validatedData.data;

    const getOtpData = await OTPModel.findOne({ email, otp })

    if (!getOtpData) {

      return NextResponse.json({ success: false, message: "Invalid or expired OTP." }, { status: 404 })
    }


    const getUser = await UserModel.findOne({ deletdAt: null, email }).lean()
    if (!getUser) {

      return NextResponse.json({ success: false, message: "User not found." }, { status: 404 })
    }

    const loggedInUserData = {
      _id: getUser._id,
      name: getUser.name
    }


    let token;
    token = jwt.sign(
      { userId: loggedInUserData._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const cookieStore = await cookies();

     cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    await getOtpData.deleteOne()


    return NextResponse.json({ success: true, message: "Login Successfully." ,loggedInUserData: loggedInUserData}, { status: 200 })

  } catch (error) {
    console.log("VERIFY OTP  ERROR 👉", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })

  }
}