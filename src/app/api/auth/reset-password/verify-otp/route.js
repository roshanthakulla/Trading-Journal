import { dbConnect } from "@/lib/dbConnect";
import { zSchema } from "@/lib/zodSchema";
import OTPModel from "@/models/Otp.model";
import UserModel from "@/models/User.model";
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

    await getOtpData.deleteOne()


    return NextResponse.json({ success: true, message: "OTP verified."}, { status: 200 })

  } catch (error) {
    console.log("VERIFY OTP  ERROR 👉", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })

  }
}