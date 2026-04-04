import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import jwt from "jsonwebtoken"
import { NextResponse } from "next/server";

 export async function POST(request) {
     try {
          await dbConnect()
          const body = await request.json();
          const {token} = body

          if(!token){

              return NextResponse.json({success: false, message: "Missing Token."},{status: 404})
          }
          
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          
          const userId = decoded.userId

          if(!userId){

              return NextResponse.json({success: false, message: "User not found."},{status: 404})
            }

          
          const user = await UserModel.findById(userId)
          if(!user){

              return NextResponse.json({success: false, message: "User not found."},{status: 404})
            }
            
            user.isEmailVerified = true
            
            // await user.save()
            const updatedUser = await user.save();

console.log(updatedUser.isEmailVerified);
            return NextResponse.json({success: true, message: "Email verification success."},{status: 200})
     } catch (error) {
         console.log("VERIFY EMAIL ERROR 👉", error);
       return NextResponse.json({success: false, message: error.message},{status: 500})
        
     }
 }