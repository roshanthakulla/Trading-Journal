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

    // Optional (future use 🔥)
    note: {
      type: String,
      default: "",
    },

    // Soft delete (optional)
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Prevent model overwrite (Next.js hot reload fix)
export default mongoose.models.Trade ||
  mongoose.model("Trade", tradeSchema);
