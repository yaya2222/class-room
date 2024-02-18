"use client";

import { useState } from "react";
import UploadImage from "./upload/UploadImage";
import toast from "react-hot-toast";
import { createSolution } from "@/action/solutionActions";
import { redirect } from "next/navigation";

interface ResponseToPostProps {
  postId: string;
  id: string;
}

export default function ResponseToPost({ postId, id }: ResponseToPostProps) {
  const [url, setUrl] = useState<string | undefined>();

  const addResponse = async (formData: FormData) => {
    const text = formData.get("text_response");
    const responseUrl = url;
    try {
      if (text) {
        const { error, success } = await createSolution(
          postId,
          text.toString(),
          responseUrl
        );
        if (success) {
          toast.success(success);
          redirect(`/clasess/${id}/workspace`);
        }
        if (error) toast.error(error);
      } else {
        toast.error("Missing text");
      }
    } catch (error) {
      toast.error("Operation failed");
    }
  };

  return (
    <div>
      <form action={addResponse}>
        <div className="flex justify-between gap-2">
          <div className="grow">
            <label htmlFor="text-response">Solution:</label>
            <textarea
              id="text_response"
              required
              name="text_response"
              className="w-full h-52 border-dashed border border-black"
            />
          </div>
          <UploadImage type="file" onChange={setUrl} />
        </div>
        <button
          type="submit"
          className="bg-color px-4 py-2 rounded-lg w-full mt-2"
        >
          Send
        </button>
      </form>
    </div>
  );
}
