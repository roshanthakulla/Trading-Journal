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
import { z } from "zod";
import { Input } from "@/components/ui/input";
import BtnLoading from "@/components/Trade/BtnLoading"; 
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import Link from "next/link";
import { CLIENT_HOME, CLIENT_REGISTER, CLIENT_RESETPASSWORD } from "@/routes/websitePanelRoute";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import OTPForm from "@/components/Application/OTPForm";
import {useDispatch} from "react-redux"
import { login } from "@/store/reducer/authReducer";


 const Login = () => {
const router = useRouter();
const dispatch = useDispatch()
 const searchParams = useSearchParams()
  const [loading, setLoading] = React.useState(false);
  const [otpLoading, setotpLoading] = React.useState(false);
  const [otpEmail, setOtpEmail] = React.useState();
   
  const [isTypePassword, setIsTypePassword] = useState(true);


  const formSchema = zSchema
    .pick({ email: true })
    .extend({ password: z.string().min("4", "Password is required") });


  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  // Login handler----------->
  const handleLogin = async (values) => {
 try {
  setLoading(true);
  const { data: loginResponse } = await axios.post("/api/auth/login", values,{ withCredentials: true, });

  if (!loginResponse.success) throw new Error(loginResponse.message);
  setOtpEmail(values.email)
  
  form.reset();
  toast(loginResponse.message)

} catch (error) {
   toast( error.message || 'Something went wrong')
} finally {
  setLoading(false);
} 


};
// otp verification
const handleOtpVerification = async (values) =>{
  
  try {
  setotpLoading(true);
  const { data: otpResponse } = await axios.post("/api/auth/verify-otp", values);

  if (!otpResponse.success) throw new Error(otpResponse.message);
  setOtpEmail("")
  toast(otpResponse.message)

  dispatch(login(otpResponse.loggedInUserData))


   if (searchParams.has('callback')) {
      router.push(searchParams.get('callback'));
    } else{
    router.push(CLIENT_HOME)
  }
  
  } catch (error) {
   toast( error?.response?.data?.message || error.message || 'Something went wrong')
} finally {
  setotpLoading(false);
}
}



  return (
    <div>
      <Card className="w-[400px]">
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
            <h1 className=" text-3xl font-bold">Login Account</h1>
          </div>

          <div className="mt-5">
            {/* // ---------------form zod validation */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleLogin)}
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
                            type={isTypePassword ? "password" : "text"}
                            placeholder="*******"
                          />
                        </FormControl>
                        <FormMessage /> 

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
                    text="Login"
                    className="w-full cursor-pointer text-white bg-blue-600 "
                  />
                </div>

                    {/* create a account New------ */}
                <div className="text-center">
                  <div className="flex justify-center items-center gap-1">
                    <p>Don&apos;'t have account</p>
                    <Link href={CLIENT_REGISTER} className="underline text-primary  hover:text-blue-600">
                      Create account
                    </Link>
                  </div>

                  {/* forgot password------------ */}
                  <div>
                   
                    <Link href={CLIENT_RESETPASSWORD} className="underline hover:text-blue-600">
                      Reset password?
                    </Link>
                  </div>
                </div>
              </form>
            </Form>
          </div>
            </>
            :
            
            <OTPForm email={otpEmail} onSubmit={handleOtpVerification} loading={otpLoading} />
          }

          </CardContent>
      </Card>
    </div>
  )
};

export default Login;