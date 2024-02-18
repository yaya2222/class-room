"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { BsFiles } from "react-icons/bs";
import { FiLink2 } from "react-icons/fi";
import UploadImage from "./upload/UploadImage";
import { IoCloseSharp } from "react-icons/io5";

interface AddDataToPost {
  addLink: Dispatch<SetStateAction<string | undefined>>;
  addFile: Dispatch<SetStateAction<string | undefined>>;
}

export default function AddDataToPost({ addLink, addFile }: AddDataToPost) {
  const [openLinkModal, setOpenLinkModal] = useState<boolean>(false);
  const [openFileModal, setOpenFileModal] = useState<boolean>(false);

  return (
    <div className="mt-10">
      <h3>Add</h3>
      <div className="mt-3 text-center flex items-center gap-10   justify-center">
        <div
          onClick={() => setOpenLinkModal(true)}
          className="flex flex-col gap-1 items-center justify-center w-16 h-16 rounded-full hover:scale-105 cursor-pointer"
        >
          <FiLink2 /> <span>Links</span>
        </div>
        <div
          onClick={() => setOpenFileModal(true)}
          className="flex flex-col gap-1 items-center justify-center w-16 h-16 rounded-full hover:scale-105 cursor-pointer"
        >
          <BsFiles /> <span>Files</span>
        </div>
      </div>
      {openLinkModal && <div></div>}
      {openFileModal && (
        <div className="dialog">
          <div className="bg-white px-10 pt-10 pb-2 rounded-xl text-start max-w-lg">
            <div className="flex flex-row-reverse items-start justify-between">
          <IoCloseSharp onClick={()=>setOpenFileModal(false)} className="h-6 w-6 cursor-pointer"/>
          <h3 className="text-2xl font-semibold text-black">
              Add File
            </h3>
          </div>
          <UploadImage type="file" onChange={addFile} />

          </div>
        </div>
      )}
    </div>
  );
}
