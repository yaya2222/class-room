"use client";
import { useState, useTransition } from "react";

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
            if (res.error) {
              setError(res.error)
              setSuccess(undefined)
            };
            if (res.success) {
              setSuccess(res.success);
              setError(undefined)
            };
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
