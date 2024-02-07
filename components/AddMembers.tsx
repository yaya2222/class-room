"use client";
import { useHandleAction } from "@/hooks/useHandleAction";
import { AddMembersSchema } from "@/lib/zodSchema";
import { enumUsersClassRole } from "@/types/Classroom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoPersonAddSharp } from "react-icons/io5";
import { z } from "zod";
import ErrorInput from "./ErrorInput";
import { addMembersToClass } from "@/action/classes/addMembersToClass";

interface AddMembersProps {
  roleUser: enumUsersClassRole;
  roleModal: enumUsersClassRole;
  title: string;
  classroomId: string;
}

export default function AddMembers({
  roleUser,
  roleModal,
  title,
  classroomId
}: AddMembersProps) {
  if (roleUser !== enumUsersClassRole.ADMINISTRATION) return null;

  const [isOpenModalToAddMembers, setIsOpenModalToAddMembers] =
    useState<boolean>(false);

  const { handleAction, error, isPending } = useHandleAction();

  const form = useForm<z.infer<typeof AddMembersSchema>>({
    resolver: zodResolver(AddMembersSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof AddMembersSchema>) => {
    values.classroomId=classroomId,
    values.roleModal=roleModal
    handleAction(addMembersToClass,values)
  };
console.log({error});

  return (
    <>
      <span className="cursor-pointer hover:bg-gray-200 px-2 py-2 rounded-full">
        <IoPersonAddSharp
          onClick={() => setIsOpenModalToAddMembers(true)}
          className="h-6 w-6"
        />
      </span>
      {isOpenModalToAddMembers && (
        <div className="dialog">
          <div className="bg-white px-10 pt-10 pb-2 rounded-xl text-start max-w-lg">
            <h3 className="text-2xl font-semibold text-black">
              Invitation {title}
            </h3>
            <div>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 mt-4"
              >
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="email"
                    className={`text-xs  ${
                      form.formState.errors.email
                        ? "text-red-500"
                        : "text-gray-500"
                    }`}
                  >
                    Email
                  </label>
                  <input
                    disabled={isPending}
                    id="email"
                    type="email"
                    {...form.register("email")}
                    className="text-sm  py-3  px-3 rounded-lg border-2 border-gray-300 text-gray-500 "
                  />
                  <ErrorInput
                    message={form.formState.errors.email?.message as string}
                  />
                </div>{" "}
                <p className="text-sm text-gray-500">
                  Pay attention to the permissions you grant to the user.
                  <br />
                  Only an administrator can delete the course
                </p>
                <div className="flex gap-3 justify-end text-black mt-6">
                  <button
                    type="button"
                    className="px-2 py-2 rounded-xl hover:bg-gray-200"
                    onClick={() => setIsOpenModalToAddMembers(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-2 py-2 rounded-xl hover:bg-gray-200"
                  >
                    Invitation
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
