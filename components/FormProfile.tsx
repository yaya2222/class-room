"use client";

import { profile } from "@/action/users/profile";
import { useHandleAction } from "@/hooks/useHandleAction";
import { ProfileSchema } from "@/lib/zodSchema";
import { IDisplayProfile } from "@/types/profile";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { z } from "zod";
import ErrorInput from "./ErrorInput";
import ErrorMessage from "./ErrorMessage";

interface FormProfileProps {
  user: IDisplayProfile;
}

export default function FormProfile({ user }: FormProfileProps) {
  const { handleAction, error, success, isPending } = useHandleAction();

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: user.name,
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ProfileSchema>) => {
    handleAction(profile, values);
  };

  return (
    <div>
        <ErrorMessage message={error} />
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-8 text-xl grow"
      >

        <div className="flex flex-col gap-1">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            {...form.register("name")}
            className=" p-2 bg-transparent bg-clip-padding border border-black rounded-lg focus:border-spacing-1 focus:border-dashed focus:outline-none"
          ></input>
          <ErrorInput message={form.formState.errors.name?.message} />
        </div>
        {user.isPassword && (
          <>
            <div className="flex flex-col gap-1">
              <label htmlFor="passowrd">Password:</label>
              <input
                type="password"
                id="passowrd"
                {...form.register("password")}
                className=" p-2 bg-transparent bg-clip-padding border border-black rounded-lg focus:border-spacing-1 focus:border-dashed focus:outline-none"
              ></input>
              <ErrorInput message={form.formState.errors.password?.message} />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="confirmPassword:">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                {...form.register("confirmPassword")}
                className=" p-2 bg-transparent bg-clip-padding border border-black rounded-lg focus:border-spacing-1 focus:border-dashed focus:outline-none"
              ></input>
              <ErrorInput
                message={form.formState.errors.confirmPassword?.message}
              />
            </div>
          </>
        )}
        <button
          type="submit"
          disabled={isPending}
          className="bg-sky-400 hover:bg-sky-600 px-10 py-2 rounded-lg text-white font-semibold disabled:bg-sky-200"
        >
          Send
        </button>
      </form>
    </div>
  );
}
