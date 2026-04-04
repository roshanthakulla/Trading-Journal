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
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { email, z } from "zod";
import { Input } from "@/components/ui/input";
import BtnLoading from "@/components/Trade/BtnLoading"; 
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import Link from "next/link";
import { CLIENT_HOME, CLIENT_REGISTER, CLIENT_RESETPASSWORD } from "@/routes/websitePanelRoute";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import OTPForm from "@/components/Application/OTPForm";


 const Login = () => {
const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [otpLoading, setotpLoading] = React.useState(false);
  const [otpEmail, setOtpEmail] = React.useState();
   
  const [isTypePassword, setIsTypePassword] = useState(true);


  const formSchema = zSchema
    .pick({ email: true })
    .extend({ password: z.string().min("4", "Password is required") });


  const form = useForm({
    resolve: zodResolver(formSchema),
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
   setTimeout(() => {
    setLoading(false)
    router.replace(CLIENT_HOME);
  }, 800);

} catch (error) {
   toast( error.message || 'Something went wrong')
} finally {
  setLoading(false);
} 


};
// otp verification
const handleOtpVerification = async (values) =>{
  try {
  setOtpVerificationLoading(true);
  const { data: otpResponse } = await axios.post("/api/auth/verify-otp", values);

  if (!otpResponse.success) throw new Error(otpResponse.message);
  setOtpEmail("")
  showToast('success',otpResponse.message)
  dispatch(login(otpResponse.data))

  if(searchParams.has('callback')){
    router.push(searchParams.get('callback'))
  }
  else{
    otpResponse.data.role === 'admin' ? router.push(ADMIN_DASHBOARD) : router.push(USER_DASHBOARD) 
  }
  } catch (error) {
   showToast('error', error?.response?.data?.message || error.message || 'Something went wrong')
} finally {
  setOtpVerificationLoading(false);
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
                    className="w-full cursor-pointer"
                  />
                </div>

                    {/* create a account New------ */}
                <div className="text-center">
                  <div className="flex justify-center items-center gap-1">
                    <p>Don&apos;'t have account</p>
                    <Link href={CLIENT_REGISTER} className="underline text-primary">
                      Create account
                    </Link>
                  </div>

                  {/* forgot password------------ */}
                  <div>
                   
                    <Link href={CLIENT_RESETPASSWORD} className="underline text-primary">
                      Reset password?
                    </Link>
                  </div>
                </div>
              </form>
            </Form>
          </div>
            </>
            :
            
            <OTPForm email={otpEmail} loading={otpLoading} onSubmit={handleOtpVerification}/>
          }

          </CardContent>
      </Card>
    </div>
  )
};

export default Login;