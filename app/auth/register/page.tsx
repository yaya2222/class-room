"use client";

import { register } from "@/action/register";
import ErrorInput from "@/components/ErrorInput";
import { RegisterSchema } from "@/lib/zodSchema";
import FiledForm from "@/types/filedForm";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FieldForm: FiledForm[] = [
  { id: "name", name: "name", label: "Name", type: "text" },
  { id: "email", name: "email", label: "Email", type: "email" },
  { id: "password", name: "password", label: "Password", type: "password" },
  {
    id: "confirmPassword",
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
  },
];

type FieldRegisterForm = "name" | "email" | "password" | "confirmPassword";

export default function RegisterPage() {
  const form= useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit =async (values: z.infer<typeof RegisterSchema>) => {
    const res=await register(values)
    
  };

  return (
    <>
        <h2 className="text-center text-md text-gray-700">
          Create your account
        </h2>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {FieldForm.map((field) => (
            <div key={field.id} className="flex flex-col gap-1">
              <label
                htmlFor={field.id}
                className={`text-xs  ${
                  form.formState.errors[field.name as FieldRegisterForm] ? "text-red-500" : "text-gray-500"
                }`}
              >
                {field.label}
              </label>
              <input
                id={field.id}
                type={field.type}
                {...form.register(field.name as FieldRegisterForm)}
                className="text-sm  py-3  px-3 rounded-lg border border-gray-300"
              />
              <ErrorInput message={form.formState.errors[field.name as FieldRegisterForm]?.message} />
            </div>
          ))}

          
          <div className="text-center">
            <button
              type="submit"
              className="bg-sky-400 hover:bg-sky-600 px-10 py-2 rounded-lg text-white font-semibold"
            >
              Register
            </button>
          </div>
        </form>
        <Link
          href="/auth/login"
          className="text-center text-xs hover:underline text-gray-500"
        >
          Already have an account?
        </Link>
        </>
  );
}

