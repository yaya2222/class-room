"use client";

import { login } from "@/action/login";
import Line from "@/components/auth/Line";
import Social from "@/components/auth/Social";
import { LoginSchema } from "@/lib/zodSchema";
import FiledForm from "@/types/filedForm";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FieldForm: FiledForm[] = [
  { id: "email", name: "email", label: "Email", type: "email" },
  { id: "password", name: "password", label: "Password", type: "password" },
];

type FieldLoginForm =  "email" | "password" ;


export default function LoginPage() {

  const form= useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit =async (values: z.infer<typeof LoginSchema>) => {
    const res=await login(values)
    
  };

  return (
    <>
        <h2 className="text-center text-md text-gray-700">Welcome back</h2>
          <Social />
          <Line />
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {FieldForm.map((field) => (
            <div key={field.id} className="flex flex-col gap-1">
              <label htmlFor={field.id} className="text-xs text-gray-500">
                {field.label}
              </label>
              <input
                id={field.id}
                type={field.type}
                {...form.register(field.name as FieldLoginForm)}
                className="text-sm  py-3  px-3 rounded-lg border border-gray-300"
              />
            </div>
          ))}

          <div className="text-center">
            <button
              type="submit"
              className="bg-sky-400 hover:bg-sky-600 px-10 py-2 rounded-lg text-white font-semibold"
            >
              Login
            </button>
          </div>
        </form>
        <Link
          href="/auth/register"
          className="text-center text-xs hover:underline text-gray-500"
        >
          Don't have an account?
        </Link>
        </>
  );
}
