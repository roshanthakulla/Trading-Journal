import { dbConnect } from "@/lib/dbConnect";
import { zSchema } from "@/lib/zodSchema";
import UserModel from "@/models/User.model";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"; 
import {z} from 'zod'
import { sendMail } from "@/lib/sendMail";
import { emailVerification } from "@/app/emails/emailVerification";
import OTPModel from "@/models/Otp.model";
import { otpEmail } from "@/app/emails/optEmail";
import { generateOTP } from "@/lib/helperFunction";


export async function POST(request){
 try {
    await dbConnect();
  const payload = await request.json();

  const validationSchema = zSchema.pick({
    email:true
  }).extend({
    password:z.string()
  })

  const validatedData = validationSchema.safeParse(payload)
  if(!validatedData.success){
    return NextResponse.json({success: false, message: "Invalid or missing input feild.", error: validatedData.error},{status: 404})
  }
  
  const {email,password} = validatedData.data;


const getUser = await UserModel.findOne({deletedAt:null, email}).select("+password")

if(!getUser){
  return NextResponse.json({success:false,message:'Invalid login credentails.'},{status: 400})
  
}

// password verify
const isMatch = await bcrypt.compare(password, getUser.password);


if (!isMatch) {
  return NextResponse.json({success:false,message:'Incorrect password.'},{status: 401})
}

let token; 
if(!getUser.isEmailVerified){

 token = jwt.sign(
    { userId: getUser._id.toString() },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  
    // resend email verification
     await sendMail('Email Verification request from Trade Track', email, 
          emailVerification(getUser.name,`${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email/${token}`))

          return NextResponse.json({success:false,message:'Your email is not verified. We have sent a verification link to your registered email.'},{status: 401})
}




// otp generate
await OTPModel.deleteMany({email})

const otp =generateOTP()

// store otp
const newOtp = new OTPModel({email,otp})

await newOtp.save()

const otpEmailSend = await sendMail('Your login verification code.',email,otpEmail(getUser.name,otp))

if(!otpEmailSend.success){
NextResponse.json({success: false, message: "Failed to send OTP."},{status: 400})

}
const res =  NextResponse.json({success: true, message: "Please verify your device."},{status: 200})

res.cookies.set("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  path: "/",
}); 
return res



} catch (error) {
  console.log(error)
   return NextResponse.json({success: false, message:error.message},{status: 500})
 }
}

