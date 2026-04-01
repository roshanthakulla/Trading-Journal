"use client";

import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function TradeCumulative({ trades }) {
  let runningTotal = 0;

  const data = trades.map((trade, index) => {
    const pnl =
      trade.type === "buy"
        ? trade.exitPrice - trade.entryPrice
        : trade.entryPrice - trade.exitPrice;

    runningTotal += pnl;

    return {
      name: `T${index + 1}`,
      pnl: runningTotal,
    };
  });

  return (
    <div className="w-full max-w-3xl mx-auto mt-6 h-64">
       {data && data.length> 0 ? 
       <>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data || []}>
          <XAxis dataKey="name" />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="pnl"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
       
       </>
       :
       (
               <p className="text-center text-gray-500">No data available</p>
       )

      }
    </div>
  );
}
