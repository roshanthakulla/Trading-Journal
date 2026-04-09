"use client";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
import { zSchema } from "@/lib/zodSchema"; 
import { zodResolver } from "@hookform/resolvers/zod"; 
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import BtnLoading from "@/components/Trade/BtnLoading"; 
import Link from "next/link";
import { CLIENT_HOME, CLIENT_LOGIN } from "@/routes/websitePanelRoute";
import axios from "axios";
import { toast } from "sonner";
import OTPForm from "@/components/Application/OTPForm";
import UpdatePassword from "@/components/Application/UpdatePassword";



const ResetPassword = () => {


  const [loading, setLoading] = React.useState(false);
  const [emailLoading, setEmailLoading] = React.useState(false);
  const [otpLoading, setOtpLoading] = React.useState(false);
  const [otpEmail, setOtpEmail] = React.useState();

  const [isOtpVerified, setisOtpVerified] = useState(false);
   


  const formSchema = zSchema
    .pick({ email: true })


  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleEmailVerification = async (values) =>{
  
  try {
  setEmailLoading(true);
  const { data: sendOtpResponse } = await axios.post("/api/auth/reset-password/send-otp", values);

  if (!sendOtpResponse.success) throw new Error(sendOtpResponse.message);
  setOtpEmail(values.email)
  toast(sendOtpResponse.message)
  
  } catch (error) {
   toast( error?.response?.data?.message || error.message || 'Something went wrong')
} finally {
  setEmailLoading(false);
}
}

// otp verification
const handleOtpVerification = async (values) =>{
  
  try {
  setOtpLoading(true);
  const { data: otpResponse } = await axios.post("/api/auth/reset-password/verify-otp", values);

  if (!otpResponse.success) throw new Error(otpResponse.message);

  toast(otpResponse.message)

  setisOtpVerified(true)

  } catch (error) {
   toast( error?.response?.data?.message || error.message || 'Something went wrong')
} finally {
  setOtpLoading(false);
}
}

  return (
    <div> 
        <Card className="w-[400]">
        <CardContent>
          
          <div className="flex justify-center">
            <h1 className="text-lg font-bold tracking-tight">
          <span className="text-blue-600">Trade</span>Track
          </h1>
          </div>

          {/* not otp  */}

          {
            !otpEmail
            ?
            <>
             <div className="text-center">
            <h1 className=" text-3xl font-bold">Reset Password</h1>
            <p>Enter your email for reset password.</p>
          </div>

          <div className="mt-5">
            {/* // ---------------form zod validation */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleEmailVerification)}
                className="space-y-4 mt-4"
              >
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

                


                <div className="mb-3">
                  <BtnLoading
                    loading={emailLoading}
                    type="submit"
                    text="Send OTP"
                    className="w-full cursor-pointer text-white bg-blue-600 "
                  />
                </div>

                  <div className="text-center">
                  <div className="flex justify-center items-center gap-1">
                    <Link href={CLIENT_LOGIN} className="underline text-primary  hover:text-blue-600">
                    Back to login!
                    </Link>
                  </div>
                  </div>

               
              </form>
            </Form>
          </div>
            </>

            :
            <>
            {
              !isOtpVerified ?
              <OTPForm email={otpEmail} onSubmit={handleOtpVerification} loading={otpLoading} />
              :
              <UpdatePassword email={otpEmail}/>
            }
            
            </>
           
            
          }

          </CardContent>
      </Card>
      </div>
  )
}

export default ResetPassword