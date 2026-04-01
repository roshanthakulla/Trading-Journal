'use client'
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import BtnLoading from "./BtnLoading";


const UpdatedTradeForm = ({ trade, onUpdate }) => {

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    type: "buy",
    entryPrice: "",
    exitPrice: "",
  });

  useEffect(() => {
    if (trade) {
      setForm({
        type: trade.type,
        entryPrice: trade.entryPrice,
        exitPrice: trade.exitPrice,
      });
    }
  }, [trade]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔥 Validation
    if (!form.entryPrice || !form.exitPrice) {
      toast.error("All fields are required");
      return;
    }

    if (form.entryPrice <= 0 || form.exitPrice <= 0) {
      toast.error("Values must be greater than 0");
      return;
    }

    setLoading(true)
    try {
      await onUpdate({
        type: form.type,
        entry: Number(form.entryPrice),
        exit: Number(form.exitPrice),
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }

  };




  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardContent className="p-6 space-y-4">

        <h2 className="text-lg font-semibold">
          Update Trade
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Type */}
          <select
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value })
            }
            className="border p-2 w-full rounded"
          >
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>

          {/* Entry */}
          <Input
            type="number"
            placeholder="Entry Price"
            value={form.entryPrice}
            onChange={(e) =>
              setForm({ ...form, entryPrice: e.target.value })

            }
            className="border p-2 w-full"
            required
            min="1"
          />

          {/* Exit */}
          <Input
            type="number"
            placeholder="Exit Price"
            value={form.exitPrice}
            onChange={(e) =>
              setForm({ ...form, exitPrice: e.target.value })
            }
            className="border p-2 w-full"
            required
            min="1"
          />


          <BtnLoading
            type="submit"
            text="Update Trade"
            loading={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white w-full p-2"
          />

        </form>
      </CardContent>
    </Card>
  );
}


export default UpdatedTradeForm