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

  return {
    handleAction,
    isPending,
    error,
    success,
  };
};