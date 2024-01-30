"use client";

import { VerificationEmailSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { VerificationEmail } from "@/action/verificationEmail";
import FiledForm from "@/types/filedForm";
import FormContext from "@/components/auth/FormContext";
import { useHandleAction } from "@/hooks/useHandleAction";
import ErrorMessage from "@/components/ErrorMessage";

const FieldForm: FiledForm[] = [
  { id: "code", name: "code", label: "Code", type: "text" },
];
export default function VerificationEmailPage() {
  const {handleAction, error, isPending } = useHandleAction();


  const form = useForm<z.infer<typeof VerificationEmailSchema>>({
    resolver: zodResolver(VerificationEmailSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof VerificationEmailSchema>) => {
    handleAction(VerificationEmail,values)
  };

  return (
    <>
      <h2 className="text-center text-md text-gray-700">
        Enter the code you received in the email
      </h2>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {<ErrorMessage message={error}/>}
        <FormContext
          fields={FieldForm}
          errors={form.formState.errors}
          register={form.register}
          textButton="Confirm"
          isPending={isPending}
        />
      </form>
    </>
  );
}


