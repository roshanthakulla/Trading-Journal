"use client";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod"; 
import { zSchema } from "@/lib/zodSchema";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import BtnLoading from "@/components/Trade/BtnLoading"; 
import { z } from "zod";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { CLIENT_LOGIN } from "@/routes/websitePanelRoute";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


const UpdatePassword = ({email}) => {
    const router = useRouter()
      const [loading, setLoading] = React.useState(false);
      const [isTypePassword, setIsTypePassword] = useState(true);

      const formSchema = zSchema
        .pick({email: true,password: true })
        .extend({confirmPassword: z.string().min(7,"Password must be at least 7 characters")})
        .refine((data) => data.password === data.confirmPassword, {
          message: "Passwords do not match",
          path:['confirmPassword']
        })

      const form = useForm({
        resolve: zodResolver(formSchema),
        defaultValues: {
            email: email,
          password: "",
          confirmPassword:""
        },
      });
      // Login handler----------->
      const handlePasswordUpdate = async (values) => {
      try {
  setLoading(true);
  const { data: passwordUpdate } = await axios.put("/api/auth/reset-password/update-password", values);

  if (!passwordUpdate.success) 
    {
      throw new Error(passwordUpdate.message);
    }
  form.reset();

  toast(passwordUpdate.message)
   router.push(CLIENT_LOGIN)
} catch (error) {
  toast(error.message || "Somthing went wrong.")
  
} finally {
  setLoading(false);
}

      };

  return (
    <div>
     
        <div>
          <div className="text-center">
            <h1 className=" text-3xl font-bold">Update Password</h1>
            <p1>Create new password by filling below form.</p1>
          </div>

          <div className="mt-5">
            {/* // ---------------form zod validation */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handlePasswordUpdate)}
                className="space-y-4 mt-4"
              >  
             
             
                {/* Password----------------- */}
                <div className="mb-5">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="*******"
                            />
                        </FormControl>    
                         <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/*  confirm password */}
                <div className="mb-5">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type={isTypePassword ? "password" : "text"}
                            placeholder="*******"
                            />
                             <FormMessage />
                        </FormControl>

                        <button
                          className=" absolute top-1/2 right-2 cursor-pointer"
                          type="button"
                          onClick={() => setIsTypePassword(!isTypePassword)}
                        >
                          {isTypePassword ? <FaRegEyeSlash /> : <FaRegEye />}
                        </button>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mb-3">
                  <BtnLoading
                    loading={loading}
                    type="submit"
                    text="Update Password"
                    className="w-full cursor-pointer"
                  />
                </div>
                
              </form>
            </Form>
          </div>
        </div>
      
    </div>

    
  )
}



export default UpdatePassword;