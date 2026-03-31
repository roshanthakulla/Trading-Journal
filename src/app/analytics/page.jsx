"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import TradeStats from "@/components/Trade/TradeStats";
import TradeCumulative from "@/components/Trade/TradeCumulative";
import TradeChart from "@/components/Trade/TradeChart";

export default function AnalyticsPage() {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const { data } = await axios.get("/api/trade/get-all-trade");
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
    <div className="max-w-6xl mx-auto p-5 space-y-6">
      
      <h1 className="text-3xl font-bold">📊 Analytics</h1>

      <TradeStats trades={trades} />

      <div className="grid md:grid-cols-2 gap-6">
        <TradeCumulative trades={trades} />
        <TradeChart trades={trades} />
      </div>

    </div>
  );
}
