import { dbConnect } from "@/lib/dbConnect";
import TradeModel from "@/models/Trade.model";
import { NextResponse } from "next/server";

export async function GET() {

  try {
    await dbConnect();
    const trades = await TradeModel.find().sort({ _id: -1 });;
    return NextResponse.json({ success: true,trades }, { status: 200 });

  } catch (error) {

    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
