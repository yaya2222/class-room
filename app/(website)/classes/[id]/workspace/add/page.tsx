"use client";

import { useHandleAction } from "@/hooks/useHandleAction";
import { postSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ErrorInput from "@/components/ErrorInput";
import { enumStudyMaterial } from "@/types";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import { FiLink2 } from "react-icons/fi";
import { BsFiles } from "react-icons/bs";
import { createPost } from "@/action/postActions";
import ErrorMessage from "@/components/ErrorMessage";
import AddDataToPost from "@/components/AddDataToPost";
import Link from "next/link";

const types = [
  { value: enumStudyMaterial.EXAMINATION, label: "Examination" },
  { value: enumStudyMaterial.TASK, label: "Task" },
  { value: enumStudyMaterial.POST, label: "Post" },
];

interface AddPageProps {
  params: {
    id: string;
  };
}

export default function AddPage({ params: { id } }: AddPageProps) {
  const [value, setValue] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });
  const { handleAction, error, isPending } = useHandleAction();
  const [link,setLink]= useState<string|undefined>()
  const [file,setFile]= useState<string|undefined>()
  
  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
  });
  const typeStudyMaterial = form.watch("type");

  const onSubmit = async (values: z.infer<typeof postSchema>) => {
    values.DueDate = value.endDate ? new Date(value.endDate) : undefined;
    values.file=file?file:undefined
    values.classroomId = id;
    handleAction(createPost, values);
  };

  return (
    <section>
      <h3 className="text-2xl font-semibold text-black text-center">
        Create Study Material
      </h3>
      <ErrorMessage message={error} />
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" max-w-2xl m-auto"
      >
        <div className="form-group">
          <select id="type" {...form.register("type")}>
            {types.map((val) => (
              <option key={val.value} value={val.value}>
                {val.label}
              </option>
            ))}
          </select>
          <label
            htmlFor="type"
            className={`${
              form.formState.errors.type ? "text-red-500" : "text-gray-500"
            }`}
          >
            Type
          </label>
          <ErrorInput message={form.formState.errors.type?.message as string} />
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
              form.formState.errors.title ? "text-red-500" : "text-gray-500"
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
              form.formState.errors.title ? "text-red-500" : "text-gray-500"
            }`}
          >
            Body
          </label>
          <ErrorInput message={form.formState.errors.body?.message as string} />
        </div>

        {typeStudyMaterial !== enumStudyMaterial.POST && (
          <>
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
                  form.formState.errors.grade ? "text-red-500" : "text-gray-500"
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
          </>
        )}

        <AddDataToPost addFile={setFile} addLink={setLink} />
        {file&&<Link href={file} className="text-gray-500 flex flex-col"><span>Donload File:</span><span className="text-sm hover:underline"> {file}</span></Link>}
        <div className="text-center mt-3">
          <button className="bg-color py-2 px-6 rounded-lg  hover:bg-gradient-to-b hover:scale-105 text-white font-semibold">
            Create
          </button>
        </div>
      </form>
    </section>
  );
}
