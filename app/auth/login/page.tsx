"use client";

import { login } from "@/action/users/login";
import ErrorMessage from "@/components/ErrorMessage";
import FormContext from "@/components/auth/FormContext";
import Line from "@/components/auth/Line";
import Social from "@/components/auth/Social";
import { useHandleAction } from "@/hooks/useHandleAction";
import { LoginSchema } from "@/lib/zodSchema";
import FiledForm from "@/types/FiledForm";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FieldForm: FiledForm[] = [
  { id: "email", name: "email", label: "Email", type: "email" },
  { id: "password", name: "password", label: "Password", type: "password" },
];


export default function LoginPage() {
  const { handleAction,error,isPending } = useHandleAction();
  
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    handleAction(login,values)
  };

  return (
    <>
      <h2 className="text-center text-md text-gray-700">Welcome back</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} action="#" className="space-y-4">
        {<ErrorMessage message={error}/>}
        <FormContext
          fields={FieldForm}
          errors={form.formState.errors}
          register={form.register}
          textButton="Login"
          isPending={isPending}
        />
      </form>
      <Line />
      <Social />
      <Link
        href="/auth/register"
        className="text-center text-xs hover:underline text-gray-500"
      >
        Don't have an account?
      </Link>
    </>
  );
}
