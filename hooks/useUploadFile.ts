"use client";

import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";


type result ={
    url: string;
    size: number;
    uploadedAt: Date;
    metadata: Record<string, never>;
    path: Record<string, never>;
    pathOrder: string[];
}

export const useUploadFile = (edgestore:any,setUrl:Dispatch<SetStateAction<string | undefined>>) => {
    const [progress, setProgress] = useState<number>(0);

    const changeUrl =  async (file:File)=>{
        const res:result = await edgestore.publicFiles.upload({
            file,
            onProgressChange: (p:number) => setProgress(p),
        })
        toast.success("The file was saved successfully")
        setUrl(res.url)
    }
    

  return {
    changeUrl,progress
  };
};
