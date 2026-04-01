"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import TradeForm from "@/components/Trade/TradeForm";
import TradeStats from "@/components/Trade/TradeStats";
import TradeList from "@/components/Trade/TradeList";
import TradeChart from "@/components/Trade/TradeChart";
import TradeCumulative from "@/components/Trade/TradeCumulative";
import { toast } from "sonner";
import TotalPnL from "@/components/Trade/TotalPnL";

export default function Home() {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Get All Trades
  useEffect(() => {
    const getTrades = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/trade/get-all-trade");

        if (!data.success) return;

        setTrades(Array.isArray(data.trades) ? data.trades : []);
      } catch (err) {
        console.error(
          "Error fetching trades:",
          err.response?.data || err.message
        );
        setTrades([]);
      } finally {
        setLoading(false);
      }
    };

    getTrades();
  }, []);

  // 🔥 Add Trade
  const addTrade = async (tradeData) => {
    try {
      const { data } = await axios.post(
        "/api/trade/add-new-trade",
        tradeData
      );
      toast.success("Trade Added SuccessFully.")
      
      if (!data.success) return;
      
      setTrades((prev) => [data.trade, ...prev]); 
    } catch (err) {
      console.error(
        "Error creating trade:",
        err.response?.data || err.message
      );
      toast.err("Failed Added Trade.")
    }
  };

  // 🔥 Delete Trade (UI only)
  const deleteTradeHandler = (id) => {
    setTrades((prev) => prev.filter((t) => t._id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-5">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* 🔹 Heading */}
        <h1 className="text-3xl font-bold tracking-tight">
          📊 Trading Dashboard
        </h1>

        {/* 🔹 Form */}
        <div className="bg-white/70 backdrop-blur-md border rounded-2xl p-5 shadow-sm">
          <TradeForm onAdd={addTrade} />
        </div>

        {/* 🔹 Loading */}
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="flex items-center gap-2 text-blue-600">
              <span className="animate-spin border-2 border-blue-600 border-t-transparent rounded-full h-6 w-6"></span>
              Loading trades...
            </div>
          </div>
        ) : (
          <>
            {/* 🔹 Empty State */}
            {trades.length === 0 && (
              <div className="text-center text-gray-500 py-10">
                No trades yet 🚀 <br />
                Start by adding your first trade.
              </div>
            )}

            {/* 🔹 Stats */}
            <TradeStats trades={trades} />

            {/* 🔹 Charts */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/70 backdrop-blur-md p-4 rounded-2xl shadow-sm">
                <TradeCumulative trades={trades} />
              </div>

              <div className="bg-white/70 backdrop-blur-md p-4 rounded-2xl shadow-sm">
                <TradeChart trades={trades} />
              </div>
            </div>

            {/* 🔹 Trade List */}
            <div className="bg-white/70 backdrop-blur-md p-4 rounded-2xl shadow-sm">
              <TradeList
                trades={trades}
                onDelete={deleteTradeHandler}
              />

            </div>
            <TotalPnL trades={trades}/>
          </>
        )}
      </div>
    </div>
  );
}
