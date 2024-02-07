"use client";

import { register } from "@/action/users/register";
import ErrorMessage from "@/components/ErrorMessage";
import FormContext from "@/components/auth/FormContext";
import { useHandleAction } from "@/hooks/useHandleAction";
import { RegisterSchema } from "@/lib/zodSchema";
import FiledForm from "@/types/FiledForm";
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

export default function RegisterPage() {
  const { handleAction, error, isPending } = useHandleAction();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    handleAction(register,values);
  };

  return (
    <>
      <h2 className="text-center text-md text-gray-700">Create your account</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {<ErrorMessage message={error}/>}

        <FormContext
          fields={FieldForm}
          errors={form.formState.errors}
          register={form.register}
          textButton="Register"
          isPending={isPending}
        />
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

