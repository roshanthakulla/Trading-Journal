'use client'
// import { Button } from '../ui/button'; 
import React from 'react'
import { useState } from "react";
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import BtnLoading from './BtnLoading';
import { toast } from 'sonner';
import { STRATEGIES } from '@/lib/strategy';


const TradeForm = ({ onAdd }) => {

  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = useState({});


  const [form, setForm] = useState({
    type: "buy",
    entryPrice: "",
    exitPrice: "",
    qty: 1,
    strategy:""
  });


  // form submit-----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    // 🔥 Validation
    if (!form.entryPrice || !form.exitPrice || !form.qty || !form.strategy) {
      toast.error("All fields are required");
      return;
    }

    if (form.entryPrice <= 0 || form.exitPrice <= 0) {
      toast.error("Values must be greater than 0");
      return;
    }

    setLoading(true)

    try {
      await onAdd(form);
      setForm({ type: "buy", entryPrice: "", exitPrice: "", qty: 1, strategy:""});
    } catch (err) {
      console.log(err);
    }
    setLoading(false)

  };

  return (

 <Card className="w-ful">
  <CardContent className="p-6">
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Type
        </label>
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>
      </div>

      {/* Entry Price */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Entry Price
        </label>
        <Input
          type="number"
          placeholder="100"
          value={form.entryPrice}
          onChange={(e) => setForm({ ...form, entryPrice: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
          min="1"
        />
      </div>

      {/* Exit Price */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Exit Price
        </label>
        <Input
          type="number"
          placeholder="1150"
          value={form.exitPrice}
          onChange={(e) => setForm({ ...form, exitPrice: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
          min="1"
        />
      </div>

      {/* Quantity */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Quantity
        </label>
        <Input
          type="number"
          placeholder="10"
          value={form.qty}
          onChange={(e) => setForm({ ...form, qty: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
          min="1"
        />
      </div>

      {/* Strategy */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Strategy
        </label>
        <select
          value={form.strategy}
          onChange={(e) => setForm({ ...form, strategy: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
            { STRATEGIES.map((s)=>(
          <option key={s} value={s}>
              {s.toUpperCase()}
          </option>
            ))}
          
        </select>
      </div>


      {/* Submit Button */}
      <BtnLoading 
        type="submit" 
        text="Add Trade" 
        loading={loading} 
        className="w-full rounded-xl px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm hover:shadow-md transition-all duration-200" 
      />
    </form>
  </CardContent>
</Card>





  );
}


export default TradeForm