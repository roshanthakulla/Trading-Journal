
"use client";

import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";import { Button } from "@/components/ui/button";
import { CLIENT_LOGIN } from "@/routes/websitePanelRoute";
import Link from "next/link";



export default function DemoDashboard() {
  // 🔥 dummy data
  const stats = {
    trades: 24,
    wins: 14,
    losses: 10,
    winRate: "58%",
    totalPnL: 1240,
  };

  const chartData = [
    { name: "T1", pnl: 100 },
    { name: "T2", pnl: 50 },
    { name: "T3", pnl: 200 },
    { name: "T4", pnl: 150 },
    { name: "T5", pnl: 300 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-5">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* 🔥 Header */}
        <h1 className="text-3xl font-bold">
          Trading Dashboard
        </h1>

        {/* 🔥 Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">

          <Card title="Trades" value={stats.trades} />
          <Card title="Wins" value={stats.wins} green />
          <Card title="Losses" value={stats.losses} red />
          <Card title="Win Rate" value={stats.winRate} />
          <Card title="P&L" value={`₹${stats.totalPnL}`} />

        </div>

        {/* 🔥 Chart */}
        <div className="bg-white/70 backdrop-blur-md p-4 rounded-2xl shadow-sm  h-64 sm:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="name" />
              <Tooltip />
              <Line type="monotone" dataKey="pnl" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 🔥 Recent Trades */}
       <div className="bg-white/80 backdrop-blur-xl p-5 rounded-2xl shadow-sm border border-white/40">
  
  {/* 🔹 Header */}
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-lg font-semibold">Recent Trades</h2>
    <span className="text-xs text-gray-400">Demo Data</span>
  </div>


<div className="bg-white/80 backdrop-blur-xl p-5 rounded-2xl shadow-sm border border-white/40 overflow-x-auto">

  <table className="w-full min-w-[400px] text-sm">
    
    {/* 🔹 Table Head */}
    <thead>
      <tr className="text-gray-400 text-xs uppercase">
        <th className="text-left pb-2">Type</th>
        <th>Entry</th>
        <th>Exit</th>
        <th className="text-right">P&L</th>
      </tr>
    </thead>

    {/* 🔹 Table Body */}
    <tbody className="space-y-2">

      {/* Row 1 */}
      <tr className="border-t hover:bg-gray-50 transition">
        <td className="py-3">
          <span className="px-2 py-1 text-xs rounded-lg bg-green-100 text-green-600 font-medium">
            BUY
          </span>
        </td>
        <td className="text-center text-gray-600">₹500</td>
        <td className="text-center text-gray-600">₹650</td>
        <td className="text-right font-semibold text-green-600">
          +₹150
        </td>
      </tr>

      {/* Row 2 */}
      <tr className="border-t hover:bg-gray-50 transition">
        <td className="py-3">
          <span className="px-2 py-1 text-xs rounded-lg bg-red-100 text-red-600 font-medium">
            SELL
          </span>
        </td>
        <td className="text-center text-gray-600">₹700</td>
        <td className="text-center text-gray-600">₹750</td>
        <td className="text-right font-semibold text-red-600">
          -₹50
        </td>
      </tr>

    </tbody>
  </table>
</div>


</div>


      </div>

      <div className="text-center mt-12">
         <Link href={CLIENT_LOGIN}>
           <Button className="bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg shadow-md hover:bg-blue-700 transition cursor-pointer">
             Start Journaling Free
           </Button>
         </Link>
       </div>
    </div>
  );
}

// 🔥 Reusable Card
function Card({ title, value, green, red }) {
  return (
    <div className="p-4 rounded-2xl bg-white/70 backdrop-blur-md border shadow-sm hover:shadow-md transition">
      <p className="text-sm text-gray-500">{title}</p>
      <h2
        className={`text-xl font-bold ${
          green ? "text-green-600" : red ? "text-red-600" : ""
        }`}
      >
        {value}
      </h2>
    </div>
  );
}
