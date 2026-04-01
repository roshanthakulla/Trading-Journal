import { STRATEGIES } from "@/lib/strategy";
import mongoose from "mongoose";

const TradeModel = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["buy", "sell"],
      required: true,
    },
    
    entryPrice: {
      type: Number,
      required: true,
    },
    
    exitPrice: {
      type: Number,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
    strategy: {
      type: String,
      enum: STRATEGIES,
      default: "Breakout"
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Prevent model overwrite (Next.js hot reload fix)
export default mongoose.models.Trade ||
  mongoose.model("Trade", TradeModel);
