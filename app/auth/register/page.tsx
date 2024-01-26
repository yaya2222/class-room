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

type Field = "name" | "email" | "password" | "confirmPassword";

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
    console.log(values);
    const res=await register(values)
    console.log(res);
    
  };

  return (
    <div className="h-full flex flex-col justify-center items-center bg-sky-400">
      <div className="flex flex-col shadow-md rounded-lg p-6 gap-6  w-[400px] bg-white">
        <h1 className="text-center text-2xl font-semibold">Classroom</h1>
        <h2 className="text-center text-md text-gray-700">
          Create your account
        </h2>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {FieldForm.map((field) => (
            <div key={field.id} className="flex flex-col gap-1">
              <label
                htmlFor={field.id}
                className={`text-xs  ${
                  form.formState.errors[field.name as Field] ? "text-red-500" : "text-gray-500"
                }`}
              >
                {field.label}
              </label>
              <input
                id={field.id}
                type={field.type}
                {...form.register(field.name as Field)}
                className="text-sm  py-3  px-3 rounded-lg border border-gray-300"
              />
              <ErrorInput message={form.formState.errors[field.name as Field]?.message} />
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
      </div>
    </div>
  );
}


{/* <div className="flex flex-col gap-1">
            <label htmlFor="name" className={`text-xs  ${errors.name?"text-red-500":"text-gray-500"}`}>
              Name
            </label>
            <input
              id="name"
              {...register("name")}
              className={`text-sm  py-3  px-3 rounded-lg border ${errors.name?"border-red-300":"border-gray-300"}`}
            />
            <ErrorInput message={errors.name?.message}/>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-xs text-gray-500">
              Email
            </label>
            <input
              id="email"
              {...register("email")}
              className="text-sm  py-3  px-3 rounded-lg border border-gray-300"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-xs text-gray-500">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              className="text-sm  py-3  px-3 rounded-lg border border-gray-300"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="confirmPassword" className="text-xs text-gray-500">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword")}
              className="text-sm  py-3  px-3 rounded-lg border border-gray-300"
            />
          </div> */}