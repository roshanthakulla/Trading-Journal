import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import BtnLoading from '../Trade/BtnLoading'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '../ui/input-otp'

import { zSchema } from '@/lib/zodSchema'
import { toast } from 'sonner'
import axios from 'axios'

const OTPForm = ({ email, onSubmit, loading }) => {

  const [isResendOtp, setIsResendOtp] = useState(false);

  const formSchema = zSchema.pick({
    otp: true,
    email: true,
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
      email: email || ""
    }
  })

  const handleOtpVerification = async (values) => {
    console.log("Form submitted with values:", values);

     onSubmit(values)
  }
  const resendOtp = async () => {
      try {
       setIsResendOtp(true);
       const { data: otpResponse } = await axios.post("/api/auth/resend-otp", {email});
     
       if (!otpResponse.success) throw new Error(otpResponse.message);
       setOtpEmail(values.email)
       
       form.reset();
       toast(otpResponse.message)
     
     } catch (error) {
        toast( error.message || 'Something went wrong')
     } finally {
       setIsResendOtp(false);
     } 
  }

  console.log(form.formState.errors);

  return (
    <div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleOtpVerification)}
          className="space-y-4 mt-4"
          >

          <div className="text-center">
            <h1 className='text-2xl font-bold mb-2'>Please complete verification</h1>
            <p className='text-md'>We have sent an One-time-Password (OTP) to your registered email. The OTP is valid for 10 minutes only.</p>

          </div>
          <div className="mb-5 mt-5 flex justify-center">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>One-Time-Password (OTP)</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot className="text-xl size-10" index={0} />
                        <InputOTPSlot className="text-xl size-10" index={1} />
                        <InputOTPSlot className="text-xl size-10" index={2} />
                        <InputOTPSlot className="text-xl size-10" index={3} />
                        <InputOTPSlot className="text-xl size-10" index={4} />
                        <InputOTPSlot className="text-xl size-10" index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                </FormItem>
              )}
              />
          </div>


          <div className="mb-3">
            <BtnLoading
              loading={loading}
              type="submit"
              text="Verify"
              className="w-full cursor-pointer bg-blue-500"
              />

              <div className="text-center mt-5">
                {!isResendOtp ?
                <button onClick={resendOtp} type='button' className='text-blue-600 cursor-pointer hover:underline'>Resend OTP</button>
                :
                <span className='text-md'>Resending.....</span>
              }

              </div>
          </div>
        </form>
      </Form>

    </div>


            )
}

export default OTPForm