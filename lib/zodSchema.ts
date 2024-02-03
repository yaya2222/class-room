import { z } from "zod";


export const LoginSchema = z.object({
    email: z.string().email({ message: "Email is required" }),
    password: z.string().min(6,{ message: "Minimum 6 characters  required" }),
})

export const RegisterSchema = z.object({
    name: z.string().min(3,{ message: "Minimum 3 characters  required" }),
    email: z.string().email(),
    password: z.string().min(6,{ message: "Minimum 6 characters  required" }),
    confirmPassword: z.string().min(6,{ message: "Minimum 6 characters  required" })
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
});

export const VerificationEmailSchema = z.object({
    code:z.string().min(6,{ message: "Minimum 6 characters  required" })
})

export const createClassSchema=z.object({
    name:z.string().min(3,{ message: "Minimum 3 characters  required" }),
    description:z.optional(z.string()),
    topic:z.optional(z.string()),
})