"use client";
import { VerificationEmail } from "@/action/verificationEmail";
import { VerificationEmailSchema } from "@/lib/zodSchema";
import { useState, useTransition } from "react";
import { z } from "zod";

export const useHandleAction = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const handleAction = <T>(
    action: (
      values: T
    ) => Promise<{ error?: string; success?: string } | undefined>,
    values: T
  ) => {
    startTransition(() => {
      action(values)
        .then((res) => {
          if (res) {
            if (res.error) setError(res.error);
            if (res.success) setSuccess(res.success);
          }
        })
        .catch(() => {
          setError("Operation failed");
        });
    });
  };

  const handleActionVerificationEmail = (
    values: z.infer<typeof VerificationEmailSchema>,
    validation: string | null,
    password: string | null
  ) => {
    startTransition(() => {
      VerificationEmail(values, validation, password)
        .then((res) => {
          if (res) {
            if (res.error) setError(res.error);
          }
        })
        .catch(() => {
          setError("Operation failed");
        });
    });
  };

  return {
    handleAction,
    handleActionVerificationEmail,
    isPending,
    error,
    success,
  };
};
