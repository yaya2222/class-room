"use client";

import { VerificationEmailSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSearchParams } from "next/navigation";
import { VerificationEmail } from "@/action/verificationEmail";


export default function VerificationEmailPage() {

  const searchParams = useSearchParams()
  const validation = searchParams.get("validation")
  const password = searchParams.get("password")

  const form = useForm<z.infer<typeof VerificationEmailSchema>>({
    resolver: zodResolver(VerificationEmailSchema),
    defaultValues: {
      code: "",
    },
  });

  
  const onSubmit =async (values: z.infer<typeof VerificationEmailSchema>) => {
    const res = await VerificationEmail(values,validation,password)
  };


  return (
    <>
      <h2 className="text-center text-md text-gray-700">
        Enter the code you received in the email
      </h2>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col gap-1">
          <input
            id="code"
            className="text-sm  py-3  px-3 rounded-lg border border-gray-300"
            {...form.register("code")}
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-sky-400 hover:bg-sky-600 px-10 py-2 rounded-lg text-white font-semibold"
          >
            Confirm
          </button>
        </div>
      </form>
    </>
  );
}
