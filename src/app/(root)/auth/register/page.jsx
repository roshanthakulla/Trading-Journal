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
import Link from "next/link";
import { CLIENT_LOGIN } from "@/routes/websitePanelRoute"; 

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";


const RegisterPage = () => {
      const [loading, setLoading] = React.useState(false);
      const [isTypePassword, setIsTypePassword] = useState(true);

      const formSchema = zSchema
        .pick({ name:true,email: true,password: true })
        .extend({confirmPassword: z.string().min(7,"Password must be at least 7 characters")})
        .refine((data) => data.password === data.confirmPassword, {
          message: "Passwords do not match",
          path:['confirmPassword']
        })

      const form = useForm({
        resolve: zodResolver(formSchema),
        defaultValues: {
            name:"",
          email: "",
          password: "",
          confirmPassword:""
        },
      });
      // Login handler----------->
      const handleRegister = async (values) => {
      try {
  setLoading(true);
  const { data: registerResponse } = await axios.post("/api/auth/register", values);

  if (!registerResponse.success) 
    {
      throw new Error(registerResponse.message);
    }
  form.reset();

  toast(registerResponse.message)
} catch (error) {
  toast(registerResponse.message || "Somthing went wrong.")
  
} finally {
  setLoading(false);
}

      };

  return (
    <div>
             <Card className="w-[400]">
        <CardContent>
          <div className="flex justify-center mb-1">
          <h1 className="text-lg font-bold tracking-tight">
          <span className="text-blue-600">Trade</span>Track
          </h1>
          </div>
          <div className="text-center">
            <h1 className=" text-3xl font-bold">Sign-up</h1>
          </div>

          <div className="mt-5">
            {/* // ---------------form zod validation */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleRegister)}
                className="space-y-4 mt-4"
              >  
              {/* username-------------- */}
                <div className="mb-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} placeholder="Jack William" />
                        </FormControl>
                         <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Email----------------- */}
                <div className="mb-5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} placeholder="jackwilliam34@gmail.com" />
                        </FormControl>
                         <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
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
                    text="Create Account"
                    className="w-full cursor-pointer"
                  />
                </div>
                 <div className=" flex justify-center items-center gap-1">
                    <p>Already have account?</p>
                    <Link href={CLIENT_LOGIN} className="text-primary underline">Login!</Link>
                 </div>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>

    
  )
}



export default RegisterPage;