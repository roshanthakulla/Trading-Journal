import { dbConnect } from "@/lib/dbConnect";
import TradeModel from "@/models/Trade.model";
import { NextResponse } from "next/server";

export  async function  DELETE(request,{params}) {
    
 try {
     await dbConnect()
     const {searchParams} = new URL(request.url)
     const id = searchParams.get("id");

     if(!id){
        return NextResponse.json({success: false, message:"Id required."},{status:400})
    }
    
    await TradeModel.findByIdAndDelete(id)
    
    return NextResponse.json({success: true, message:"Trade Deleted."},{status:200})

 } catch (error) {
     NextResponse(error)
 }
} 