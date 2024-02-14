import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(6, { message: "Minimum 6 characters  required" }),
});

export const RegisterSchema = z
  .object({
    name: z.string().min(3, { message: "Minimum 3 characters  required" }),
    email: z.string().email(),
    password: z.string().min(6, { message: "Minimum 6 characters  required" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Minimum 6 characters  required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
  });

export const VerificationEmailSchema = z.object({
  code: z.string().min(6, { message: "Minimum 6 characters  required" }),
});

export const CreateClassSchema = z.object({
  name: z.string().min(3, { message: "Minimum 3 characters  required" }),
  description: z.optional(z.string()),
  topic: z.optional(z.string()),
  url: z.optional(z.string()),
});

export const AddMembersSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  classroomId: z.optional(z.string()),
  roleModal: z.optional(z.string()),
});

export const ProfileSchema = z
  .object({
    name: z.optional(z.string()),
    password: z.optional(
      z.string().min(6, { message: "Minimum 6 characters  required" })
    ),
    confirmPassword: z.optional(
      z.string().min(6, { message: "Minimum 6 characters  required" })
    ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
  });

export const StudyMaterialSchema = z.object({
  type: z.string().min(1, { message: "type is required" }),
  title: z.string().min(1, { message: "title is required" }),
  body: z.optional(z.string()),
  grade: z.optional(
    z
      .string()
  ),
  tupic: z.optional(z.string()),
  classroomId: z.optional(z.string()),
  DueDate: z.optional(z.date().min(new Date(), { message: "Invalid date" })),
}).refine(data=>!data.grade||(Number(data.grade)>=1&&Number(data.grade)<=100),
{path: ["grade"],
    message: "The score must be between 1-100",});
