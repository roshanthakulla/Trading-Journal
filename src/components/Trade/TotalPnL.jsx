'use client'
import React from 'react'
import { Card, CardContent } from '../ui/card'

const TotalPnL = ({trades}) => {
    let total = 0 ; 
   
    const totalProfit = trades.reduce((acc, trade) => {
  const qty = trade.qty || 1;

  const pnl =
    trade.type === "buy"
      ? (trade.exitPrice - trade.entryPrice) * qty
      : (trade.entryPrice - trade.exitPrice) * qty;

  return acc + pnl;
}, 0);


  return (

    <Card className="w-full rounded-2xl shadow-sm hover:shadow-md transition" >
        <CardContent className="p-5 space-y-3">  
        <div className="flex justify-between items-center">
            <p className='font font-semibold text-lg'>Total</p>
            <p
              className={`text-xl font-bold ${
                totalProfit >= 0 ? "text-green-600" : "text-red-600"
              }`}
              > 
              {totalProfit >=0 ? "+" : ""}
              {totalProfit || 0}
              </p>
          
        </div>
        </CardContent>
      </Card>
              )
              }
export default TotalPnL