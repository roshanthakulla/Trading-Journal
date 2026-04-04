import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormField, FormItem, FormLabel } from '../ui/form'
import BtnLoading from '../Trade/BtnLoading'
import { RefreshCwIcon } from 'lucide-react'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '../ui/input-otp'
import { FieldDescription } from '@base-ui/react'

const OTPForm = ({email,onSubmit, loading}) => {
   
    const formSchema = z.schema.pick({
      otp: true, 
      email: true,
    })

    const from = useForm({
        resolver:zodResolver(formSchema),
        defaultValue: {
            otp: "",
            email: email
        }
    })

    const handleOtpVerification=async (values)=>{

    }

  return (
    <div>          
        
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleOtpVerification)}
                className="space-y-4 mt-4"
              >
                <div className="mb-5">
                  <FormField
                    control={form.control}
                    name="otp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>OTP</FormLabel>
                        <FormControl>
                         <InputOTP maxLength={6} {...field}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
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
                    text="Login"
                    className="w-full cursor-pointer"
                  />
                </div>
                </form>
                </Form>

    </div>



    // <Card className="mx-auto max-w-md">
    //   <CardHeader>
    //     <CardTitle>Verify your login</CardTitle>
    //     <CardDescription>
    //       Enter the verification code we sent to your email address:{" "}
    //       <span className="font-medium">m@example.com</span>.
    //     </CardDescription>
    //   </CardHeader>
    //   <CardContent>
    //     <Field>
    //       <div className="flex items-center justify-between">
    //         <FieldLabel htmlFor="otp-verification">
    //           Verification code
    //         </FieldLabel>
    //         <Button variant="outline" size="xs">
    //           <RefreshCwIcon />
    //           Resend Code
    //         </Button>
    //       </div>
    //       <InputOTP maxLength={6} id="otp-verification" required>
    //         <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
    //           <InputOTPSlot index={0} />
    //           <InputOTPSlot index={1} />
    //           <InputOTPSlot index={2} />
    //         </InputOTPGroup>
    //         <InputOTPSeparator className="mx-2" />
    //         <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
    //           <InputOTPSlot index={3} />
    //           <InputOTPSlot index={4} />
    //           <InputOTPSlot index={5} />
    //         </InputOTPGroup>
    //       </InputOTP>
    //       <FieldDescription>
    //         <a href="#">I no longer have access to this email address.</a>
    //       </FieldDescription>
    //     </Field>
    //   </CardContent>
    //   <CardFooter>
    //     <Field>
    //       <Button type="submit" className="w-full">
    //         Verify
    //       </Button>
    //       <div className="text-sm text-muted-foreground">
    //         Having trouble signing in?{" "}
    //         <a
    //           href="#"
    //           className="underline underline-offset-4 transition-colors hover:text-primary"
    //         >
    //           Contact support
    //         </a>
    //       </div>
    //     </Field>
    //   </CardFooter>
    // </Card>
  )
}

export default OTPForm