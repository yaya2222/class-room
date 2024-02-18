"use client";

import { useUploadFile } from "@/hooks/useUploadFile";
import { useEdgeStore } from "@/lib/edgestore";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";

interface UploadProps {
  onChange: Dispatch<SetStateAction<string | undefined>>;
  url?: string | undefined;
  type: "file" | "image" | "profile";
}

export default function UploadImage({ onChange, url, type }: UploadProps) {
  const { edgestore } = useEdgeStore();
  const { changeUrl, progress } = useUploadFile(edgestore, onChange);

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      changeUrl(file);
    }
  };


  return (
    <div className="w-72 h-64">
      {(!url || progress !== 100) && (
        <div className="w-full">
          <label
            htmlFor="uploadInput"
            className="flex flex-col items-center p-4 justify-center w-72 h-64 bg-gray-100 border-2 border-dashed rounded-2xl 
          border-black cursor-pointer"
          >
            <span>
              <IoCloudUploadOutline className="h-12 w-12" />
            </span>
            {progress > 0 && progress < 100 && (
              <div className="h-[6px] w-full border rounded overflow-hidden">
                <div
                  className="h-full bg-color transition-all duration-150"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            )}
            {(progress === 0 || progress === 100) && (
              <>
                <p className="mb-2 text-sm ">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs ">{type=='file'?"":" PNG, JPG"}</p>
              </>
            )}
          </label>
        </div>
      )}
      <input id="uploadInput" onChange={uploadImage} hidden type="file" />
      {url && progress === 100 && (
        <>
          {type === "image" && (
            <>
              <Image
                src={url}
                alt="image"
                height={288}
                width={256}
                className="h-full w-full object-cover rounded-2xl"
              ></Image>
              <button
                onClick={() => document.getElementById("uploadInput")?.click()}
                type="button"
                className="cursor-pointer px-4 py-2 rounded-lg bg-color text-white font-semibold"
              >
                Image replacement
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}
