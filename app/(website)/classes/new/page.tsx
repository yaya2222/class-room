"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CreateClassSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHandleAction } from "@/hooks/useHandleAction";
import { CreateClass } from "@/action/classroomActions";
import UploadImage from "@/components/upload/UploadImage";

export default function NewPage() {

  const {handleAction,isPending,error,success} = useHandleAction()

  const [urlImage, setUrlImage] = useState<string | undefined>();


  const form = useForm<z.infer<typeof CreateClassSchema>>({
    resolver:zodResolver(CreateClassSchema),
    defaultValues:{
      name:"",
      description:undefined,
      topic:undefined,
      url:""
    }
  })

  const onSubmit = async (values: z.infer<typeof CreateClassSchema>) => {
    values.url=urlImage
    handleAction(CreateClass,values)
  };

  

  return (
    <section className="flex flex-col justify-center items-center text-center m-auto">
      <h1>Create new class</h1>
      <UploadImage onChange={setUrlImage} url={urlImage}  type="image"/>
    
      <form onSubmit={form.handleSubmit(onSubmit)} className=" mt-10 flex  flex-col space-y-6">
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" {...form.register("name")}></input>
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input type="text" id="description" {...form.register("description")}></input>
        </div>
        <div>
          <label htmlFor="topic">Topic:</label>
          <input type="text" id="topic" {...form.register("topic")}></input>
        </div>
        <div className="text-center">
          <button
            type="submit"
            // disabled={isPending}
            className="bg-sky-400 hover:bg-sky-600 px-10 py-2 rounded-lg text-white font-semibold disabled:bg-sky-200"
          >
            add class
            {/* {textButton} */}
          </button>
        </div>
      </form>
    </section>
  );
}
