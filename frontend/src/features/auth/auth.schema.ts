// This is for more security, I mean using zod for more type safe and sanitize the inputs.


import z from "zod";

export const registerUserSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters long.")
    .max(30, "Name must be under 30 characters."),

  email: z
    .email("Please provide a valid email adress")
    .trim()
    .toLowerCase()
    .max(100, "Email must be under 100 characters."),

  password: z.string().min(8, "Password must be atleast 8 characters long."),
});

export type RegisterUserData = z.infer<typeof registerUserSchema>;
