'use client'
import React from 'react'
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import UpdatedTradeForm from '@/components/Trade/UpdatedTrade';
import { toast } from 'sonner';

const EditTrade = () => {
     
 const { id } = useParams();
   const router = useRouter();

      const [trade, setTrade] = useState(null);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
    const fetchTrade = async () => {
      try {
        const { data } = await axios.get(`/api/trade/${id}`);
        if (data.success) {
          setTrade(data.trade);
        }
      } catch (err) {
        console.error("Error fetching trade:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTrade();
  }, [id]);


  // 🔥 Update trade
  const handleUpdate = async (formData) => {
    try {
      const { data } = await axios.put(`/api/trade/update-trade/${id}`,formData)      
      if (data.success) {
        toast.success("Trade updated successfully");
        router.push("/");
        router.refresh(); // back to home
      }
    } catch (err) {
      toast.error("Update failed. Please try again.");
  console.error("Update failed:", err);
    }
  };

  // 🔄 Loading state
  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }
  
   return (
      <div className="p-5 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Edit Trade
        </h1>
  
        <UpdatedTradeForm
          trade={trade}
          onUpdate={handleUpdate}
        />
      </div>
    );
}

export default EditTrade