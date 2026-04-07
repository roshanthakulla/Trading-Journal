import { dbConnect } from "@/lib/dbConnect";
import TradeModel from "@/models/Trade.model";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import UserModel from "@/models/User.model";

export async function POST(request) {
  try {
    await dbConnect();

    const body = await request.json();
    const { type, entryPrice, exitPrice, qty, strategy } = body;

    const token = request.cookies.get("token")?.value;
    console.log("TOKEN:", token);
    
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("DECODED:", decoded);

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
      user: decoded.userId, 
    });

    return NextResponse.json(
      { success: true, trade: newTrade },
      { status: 201 }
    );

  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
