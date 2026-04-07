import { dbConnect } from "@/lib/dbConnect";
import TradeModel from "@/models/Trade.model";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

export  async function  DELETE(request,{params}) {
    
 try {
     await dbConnect()
     const {searchParams} = new URL(request.url)
     const id = searchParams.get("id");

     if(!id){
        return NextResponse.json({success: false, message:"Id required."},{status:400})
    }
    
    const token  = request.cookies.get('token')?.values
      if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const deletedTrade = await TradeModel.findOneAndDelete({
      _id: id,
      user: decoded.userId, // ✅ ownership check
    });

    if (!deletedTrade) {
      return NextResponse.json(
        { success: false, message: "Trade not found or unauthorized" },
        { status: 404 }
      );
    }
 
    
    return NextResponse.json({success: true, message:"Trade Deleted."},{status:200})

 } catch (error) {
     NextResponse(error)
 }
} 