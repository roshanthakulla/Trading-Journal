"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import React from 'react'

const TradeChart = ({trades}) => {
const getProfit =(trade)=>{
    if(trade.type ==='buy'){
        return trade.exitPrice-trade.entryPrice;
    }
    else{
        return trade.entryPrice-trade.exitPrice;

    }
}
  // 🔥 Cumulative PnL data
  let cumulative = 0;

  const data = trades
    .slice() // copy
    .reverse() // oldest first
    .map((trade, index) => {
      cumulative += getProfit(trade);

      return {
        name: `Trade ${index + 1}`,
        pnl: cumulative,
      };
    });

  if (data.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-3xl mx-auto mt-6 h-64">
      {data && data.length> 0 ? <>

        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data || []}>
                <XAxis dataKey="name"/>
                <Tooltip/>

                <Line type="monotone"
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
  )
}

export default TradeChart