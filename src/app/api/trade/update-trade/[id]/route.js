import { dbConnect } from "@/lib/dbConnect";
import TradeModel from "@/models/Trade.model";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {

const resolvedParams = await params;
  
  const { id } = resolvedParams;
  
  try {
    
    await dbConnect();
    const {id} = await params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: "Invalid ID format." }, { status: 400 });
    }
    const body = await req.json();
    
    const { type, entry, exit } = body;

    const updatedTrade = await TradeModel.findByIdAndUpdate(
      id,{
       type: type,
    entryPrice: entry,
    exitPrice: exit,
      },
      { new: true }
    );
  
     if (!updatedTrade) {
      return NextResponse.json({ success: false, message: "Trade not found." }, { status: 404 });
    }


        return NextResponse.json({ success: true, message: "Updated SuccessFully." ,trade: updatedTrade }, { status: 200 });
    
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
