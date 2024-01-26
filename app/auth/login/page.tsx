"use client";

import Line from "@/components/auth/Line";
import Social from "@/components/auth/Social";
import FiledForm from "@/types/filedForm";
import Link from "next/link";

const FieldForm: FiledForm[] = [
  { id: "email", name: "email", label: "Email", type: "email" },
  { id: "password", name: "password", label: "Password", type: "password" },
];

export default function LoginPage() {
  const action = (fromData: FormData) => {
    console.log(fromData.get("email"));
    console.log(fromData.get("password"));
  };

  return (
    <div className="h-full flex flex-col justify-center items-center bg-sky-400">
      <div className="flex flex-col shadow-md rounded-lg p-6 gap-6  w-[400px] bg-white">
        <h1 className="text-center text-2xl font-semibold">Classroom</h1>
        <h2 className="text-center text-md text-gray-700">Welcome back</h2>
          <Social />
          <Line />
        <form action={action} className="space-y-4">
          {FieldForm.map((field) => (
            <div key={field.id} className="flex flex-col gap-1">
              <label htmlFor={field.id} className="text-xs text-gray-500">
                {field.label}
              </label>
              <input
                id={field.id}
                type={field.type}
                name={field.name}
                className="text-sm  py-3  px-3 rounded-lg border border-gray-300"
              />
            </div>
          ))}

          <div className="text-center">
            <button
              type="submit"
              className="bg-sky-400 hover:bg-sky-600 px-10 py-2 rounded-lg text-white font-semibold"
            >
              Login
            </button>
          </div>
        </form>
        <Link
          href="/auth/register"
          className="text-center text-xs hover:underline text-gray-500"
        >
          Don't have an account?
        </Link>
      </div>
    </div>
  );
}
