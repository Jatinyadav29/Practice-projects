import * as z from "zod";

export const registerSchema = z.object({
  email: z
    .string("Email is required")
    .trim()
    .toLowerCase()
    .pipe(z.email("Enter a valid email address")),

  phone: z
    .string("Phone number is required")
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),

  password: z
    .string("Password is required")
    .refine((value) => value.trim().length > 0, {
      error: "Password cannot be empty or only spaces",
      abort: true,
    })
    .min(8, "Password must be at least 8 characters long"),
});
