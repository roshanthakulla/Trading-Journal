import {z} from "zod"

 export const zSchema = z.object({
 email: z
    .string()
    .trim()
    .email({ message: "Enter a valid email" }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(20, { message: "Password must be at most 20 characters long" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }
    ),

  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(40, { message: "Name must be at most 40 characters long" })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Name must only contain letters and spaces",
    }),
     otp: z.string()
     .min(6, { message: "OTP must be at least 6 digits" })
     .regex(/^\d{6}$/, { message: "OTP must be exactly 6 digits" }),
  

})

