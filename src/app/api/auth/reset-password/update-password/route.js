import { dbConnect } from "@/lib/dbConnect";
import { zSchema } from "@/lib/zodSchema";
import UserModel from "@/models/User.model";
import { NextResponse } from "next/server";

export async function PUT(request) {
  try {
    await dbConnect()
      const body = await request.json();
    const validatedSchema = zSchema.pick({
       email: true, password: true
    })

    const validatedData = validatedSchema.safeParse(body)
    if (!validatedData.success) {

      return NextResponse.json({ success: false, message: "Invalid or missing field." }, { status: 404 })
    }

    const { email, password } = validatedData.data;

    const getUser = await UserModel.findOne({deletedAt:null, email }).select("+password")

    if (!getUser) {

      return NextResponse.json({ success: false, message: "User not found." }, { status: 404 })
    }
    
    getUser.password = password
    await getUser.save()
    return NextResponse.json({ success: true, message: "Password update successfully." }, { status: 200 })

  } catch (error) {
     return NextResponse.json({ success: false, message: error.message }, { status: 500 })
    
  }   
}