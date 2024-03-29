"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CreateClassSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHandleAction } from "@/hooks/useHandleAction";
import { CreateClass } from "@/action/classroomActions";
import UploadImage from "@/components/upload/UploadImage";
import ErrorInput from "@/components/ErrorInput";

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
    <section className="flex flex-col justify-center items-center m-auto">
      <h1 className="text-4xl font-semibold mb-6">Create new class</h1>
      <UploadImage onChange={setUrlImage} url={urlImage}  type="image"/>
    
      <form onSubmit={form.handleSubmit(onSubmit)} className=" mt-10 flex  flex-col space-y-6 i">

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

        
      <div className="flex flex-col gap-1">
      <label htmlFor="description">Description:</label>
          <input
            type="text" id="description" {...form.register("description")}
            className=" p-2 bg-transparent bg-clip-padding border border-black rounded-lg focus:border-spacing-1 focus:border-dashed focus:outline-none"
          ></input>
          <ErrorInput message={form.formState.errors.description?.message} />
        </div>

      <div className="flex flex-col gap-1">
 <label htmlFor="topic">Topic:</label>
           <input
           type="text" id="topic" {...form.register("topic")}
            className=" p-2 bg-transparent bg-clip-padding border border-black rounded-lg focus:border-spacing-1 focus:border-dashed focus:outline-none"
          ></input>
          <ErrorInput message={form.formState.errors.name?.message} />
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


{/* <div>
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
</div> */}