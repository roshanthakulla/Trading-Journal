import { dbConnect } from "@/lib/dbConnect";
import TradeModel from "@/models/Trade.model";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";


export async function GET(request) {

  try {
    await dbConnect();
  // const token = cookies().get("token")?.value;
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  // ✅ decode token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // ✅ sirf us user ke trades
  const trades = await TradeModel.find({ user: decoded.userId }).sort({ _id: -1 });

  return NextResponse.json(
    { success: true, trades },
    { status: 200 }
  );


  } catch (error) {

    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
