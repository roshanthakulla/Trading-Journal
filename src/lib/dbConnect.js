
import mongoose from "mongoose";

const mongoDb_url = process.env.MONGODB_URI?.trim(); // 👈 trim added

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(mongoDb_url, {
      dbName: "E-commerce",
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}