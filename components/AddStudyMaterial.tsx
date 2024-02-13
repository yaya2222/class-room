"use client";
import { useHandleAction } from "@/hooks/useHandleAction";
import { StudyMaterialSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiPlus } from "react-icons/fi";
import { GiCancel } from "react-icons/gi";
import { z } from "zod";
import ErrorInput from "./ErrorInput";
import { enumStudyMaterial } from "@/types";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

const types = [
  { value: enumStudyMaterial.EXAMINATION, label: "Examination" },
  { value: enumStudyMaterial.TASK, label: "Task" },
  { value: enumStudyMaterial.POST, label: "Post" },
];

export default function AddStudyMaterial() {
  const [openModel, setOpenModel] = useState<boolean>(false);
  const [value, setValue] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });
  const { handleAction, error, success, isPending } = useHandleAction();

  const form = useForm<z.infer<typeof StudyMaterialSchema>>({
    resolver: zodResolver(StudyMaterialSchema),
  });

  const onSubmit = async (values: z.infer<typeof StudyMaterialSchema>) => {};

  const changeOpenModel = () => setOpenModel((prev) => !prev);
  return (
    <div>
      <button
        onClick={changeOpenModel}
        className="flex items-center gap-1 bg-color text-white px-6 py-2 rounded-lg font-semibold text-xl"
      >
        Create <FiPlus />
      </button>
      {openModel && (
        <div className="dialog">
          <div className="bg-white pt-8 pb-2 text-start min-w-lg relative w-full h-full">
            <GiCancel
              onClick={changeOpenModel}
              className="absolute top-3 right-3 text-xl text-red-500 hover:cursor-pointer hover:text-red-600"
            />
            <h3 className="text-2xl font-semibold text-black text-center">
              Create Study Material
            </h3>
            <div className="mt-8 px-20">
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex justify-between"
              >
                <div className="grow max-w-4xl">
                  <div className="form-group">
                    <select id="type" {...form.register("type")}>
                      {types.map((val) => (
                        <option value={val.value}>{val.label}</option>
                      ))}
                    </select>
                    <label
                      htmlFor="type"
                      className={`${
                        form.formState.errors.type
                          ? "text-red-500"
                          : "text-gray-500"
                      }`}
                    >
                      Type
                    </label>
                    <ErrorInput
                      message={form.formState.errors.type?.message as string}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      disabled={isPending}
                      id="title"
                      placeholder=" "
                      {...form.register("title")}
                    />
                    <label
                      htmlFor="title"
                      className={`${
                        form.formState.errors.title
                          ? "text-red-500"
                          : "text-gray-500"
                      }`}
                    >
                      Title
                    </label>
                    <ErrorInput
                      message={form.formState.errors.title?.message as string}
                    />
                  </div>
                  <div className="form-group mt-4">
                    <textarea
                      className="bg-gray-100"
                      rows={3}
                      disabled={isPending}
                      id="body"
                      placeholder=" "
                      {...form.register("body")}
                    />
                    <label
                      htmlFor="body"
                      className={`${
                        form.formState.errors.title
                          ? "text-red-500"
                          : "text-gray-500"
                      }`}
                    >
                      Body
                    </label>
                    <ErrorInput
                      message={form.formState.errors.body?.message as string}
                    />
                  </div>
                </div>
                <div className="grow max-w-56">
                  <div className="form-group">
                    <input
                      disabled={isPending}
                      type="number"
                      max={100}
                      min={0}
                      id="grade"
                      placeholder=" "
                      {...form.register("grade")}
                    />
                    <label
                      htmlFor="grade"
                      className={`${
                        form.formState.errors.grade
                          ? "text-red-500"
                          : "text-gray-500"
                      }`}
                    >
                      Grade
                    </label>
                    <ErrorInput
                      message={form.formState.errors.grade?.message as string}
                    />
                  </div>
                  <div className="form-group">
                    <Datepicker
                      minDate={new Date()}
                      inputId="Due_date"
                      containerClassName="datepicker-container"
                      inputClassName="datepicker-input"
                      primaryColor="blue"
                      asSingle={true}
                      useRange={false}
                      value={value}
                      onChange={(newValue: DateValueType) => {
                        if (newValue !== null) {
                          setValue({
                            startDate: newValue.startDate as Date,
                            endDate: newValue.endDate as Date,
                          });
                        } else {
                          setValue({ startDate: null, endDate: null });
                        }
                      }}
                    />
                    <label htmlFor="Due_date" className="datepicker-label">
                      Due date
                    </label>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
