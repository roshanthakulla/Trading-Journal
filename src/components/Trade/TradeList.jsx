'use client'
import React from 'react'
import { Card, CardContent } from '../ui/card';
import axios from 'axios';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const TradeList = ({ trades, onDelete }) => {

  const router = useRouter()

  const getProfit = (trade) => {
    const qty = trade.qty || 1;
    if (trade.type === 'buy') {
      return (trade.exitPrice - trade.entryPrice)*qty;
    } else {
      return (trade.entryPrice - trade.exitPrice)*qty;
    }

  }




  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`/api/trade/delete-trade?id=${id}`)
      if (data.success) {
        onDelete(id)
        toast.success("Trade Deleted Successfully.");
      }
    } catch (error) {
      toast.error("Delete failed. Please try again.");

      console.log(error)
    }
  }

  return (
    <div className='mt-6 grid gap-4'>
      {trades.map((trade) => {
        const profit = getProfit(trade);

        return (
          // <Card key={trade._id} className="w-full rounded-2xl shadow-sm hover:shadow-md transition">
          //   <CardContent className="p-5 space-y-4">
          //     <div className="flex justify-between">
          //       <p className='font-medium capitalize'>{trade.type}</p>

          //       <p
          //         className={`font-semibold ${profit >= 0
          //           ? "text-green-600"
          //           : "text-red-600"
          //           }`}
          //       >
          //         {profit >= 0 ? "+" : ""}
          //         {profit}
          //       </p>
          //     </div>

          //     <div className="text-sm text-gray-600 flex justify-between">
          //       <p>Entry: {trade.entryPrice}</p>
          //       <p>Exit: {trade.exitPrice}</p>
          //     </div>

          //     <div className="text-sm text-gray-600 flex justify-between">
          //       <p>Qty: {trade.qty || 1}</p>
          //       <p className="text-xs bg-gray-100 px-2 py-1 rounded">
          //         {trade.strategy || "No Strategy"}
          //       </p>
          //     </div>

          //     <div className="flex gap-2 mt-2">
          //       <Button
          //         size="sm"

          //         onClick={() => router.push(`/trade/update-trade/${trade._id}`)}
          //       >
          //         Edit
          //       </Button>


          //       <Button
          //         variant="destructive"
          //         size="sm"
          //         onClick={() => handleDelete(trade._id)}
          //       >
          //         Delete
          //       </Button>
          //     </div>
          //   </CardContent>
          // </Card>
           <Card
        key={trade._id}
        className="w-full rounded-2xl shadow-sm hover:shadow-md transition"
      >
        <CardContent className="p-5 space-y-3">

          {/* 🔥 Top Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 capitalize">
                {trade.type}
              </span>

              <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600 capitalize">
                {trade.strategy || "No Strategy"}
              </span>
            </div>

            <p
              className={`text-lg font-bold ${
                profit >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {profit >= 0 ? "+" : ""}
              {profit}
            </p>
          </div>

          {/* 🔥 Middle Section */}
          <div className="grid grid-cols-3 text-sm text-gray-600 gap-2">
            <div>
              <p className="text-xs text-gray-400">Entry</p>
              <p className="font-medium">{trade.entryPrice}</p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Exit</p>
              <p className="font-medium">{trade.exitPrice}</p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Qty</p>
              <p className="font-medium">{trade.qty || 1}</p>
            </div>
          </div>

          {/* 🔥 Divider */}
          <div className="border-t" />

          {/* 🔥 Actions */}
          <div className="flex justify-end gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                router.push(`/trade/update-trade/${trade._id}`)
              }
            >
              Edit
            </Button>

            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(trade._id)}
            >
              Delete
            </Button>
          </div>

        </CardContent>
      </Card>
        );



      })}
    </div>
  )
}

export default TradeList