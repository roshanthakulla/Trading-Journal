import { emailVerification } from "@/app/emails/emailVerification";
import { dbConnect } from "@/lib/dbConnect";
import { sendMail } from "@/lib/sendMail";
import { zSchema } from "@/lib/zodSchema";
import UserModel from "@/models/User.model"; 
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";



export async function POST(request) {
  try {
    await dbConnect();

    const payload = await request.json();
    const validateSchema = zSchema.pick({ name: true, email: true, password: true });
const validated = validateSchema.safeParse(payload);

if (!validated.success) {
   return NextResponse.json({success: false, message: "Invalid or missing input fields."},{status: 404})

}

    const { name, email, password } = validated.data;


    // ✅ Check if user already exists
    const existingUser = await UserModel.exists({ email });
    if (existingUser) {
        return NextResponse.json({success: false, message: "User with this email already exists."},{status: 409})
    }


    // ✅ Create user
    const newUser = new UserModel({ name, email, password });
    await newUser.save();


    // const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    // const token = await new sign
    const token = jwt.sign(
      { userId: newUser._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    await sendMail('Email Verification request from Trade Track', email, 
      emailVerification(newUser.name,`${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email/${token}`))

  return NextResponse.json({success: true, message: "User Register Successfully, Please verify your email."},{status: 201})
}
catch(err){
  

return NextResponse.json(
  { success: false,  message: err.message},{status: 500, }
);
}

}