import { otpEmail } from "@/app/emails/optEmail";
import { dbConnect } from "@/lib/dbConnect";
import { generateOTP } from "@/lib/helperFunction";
import { sendMail } from "@/lib/sendMail";
import { zSchema } from "@/lib/zodSchema";
import OTPModel from "@/models/Otp.model";
import UserModel from "@/models/User.model";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await dbConnect()
    const body = await request.json();
    const validatedSchema = zSchema.pick({ email: true })

     const validatedData = validatedSchema.safeParse(body)
        if (!validatedData.success) {
    
          return NextResponse.json({ success: false, message: "Invalid or missing field." }, { status: 404 })
          }

          const {email} = validatedData.data

          const getUser = await UserModel.findOne({ deletdAt: null, email }).lean()
            if (!getUser) {
        
              return NextResponse.json({ success: false, message: "User not found." }, { status: 404 })
            }
    
         await OTPModel.deletdAtMany({ email })
    
         const otp = generateOTP()

        const newOtp = new OTPModel({ email, otp })

        await newOtp.save()
    
        const otpEmailSend = await sendMail('Your login verification code.',email,otpEmail(getUser.name,otp))
        
        if(!otpEmailSend.success){
        NextResponse.json({success: false, message: "Failed to send OTP."},{status: 400})
        
        }

       return NextResponse.json({success: true, message: "OTP sent succesfully."},{status: 200})
}  catch (error) {
    console.log("Resnd  OTP  ERROR 👉", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })

  }
}