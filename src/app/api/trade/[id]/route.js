import { dbConnect } from "@/lib/dbConnect";
import TradeModel from "@/models/Trade.model";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {

  const {id} = await params;
  await dbConnect();

  const trade = await TradeModel.findById(id);

  return NextResponse.json({
    success: true,
    trade,
  });
}
