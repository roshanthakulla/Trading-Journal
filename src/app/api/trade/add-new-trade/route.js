import { dbConnect } from "@/lib/dbConnect";
import TradeModel from "@/models/Trade.model";
import { NextResponse } from "next/server";

export  async function  POST(request) {
    
 try {
     await dbConnect()
     const body = await request.json()
     const { type,entryPrice, exitPrice,qty, strategy } = body;

     const finalQty = qty || 1;
    const finalStrategy = strategy || "breakout";
 
      if (!type || !entryPrice || !exitPrice) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

     const newTrade = await TradeModel.create({
        type,
        entryPrice,
        exitPrice,
        qty: finalQty,
        strategy: finalStrategy,
     })

     return NextResponse.json({success: true, trade:newTrade},{status: 201})

 } catch (error) {
    return NextResponse.json({success: false, error:error.message},{status: 400})
 }
} 