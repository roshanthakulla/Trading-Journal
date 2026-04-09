"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import TradeList from "@/components/Trade/TradeList";

export default function HistoryPage() {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const { data } = await axios.get("/api/trade/get-all-trade",{withCredentials: true,});
        if (data.success) {
          setTrades(data.trades);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchTrades();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">📋 Trade History</h1>

      <TradeList trades={trades} />

    </div>
  );
}
