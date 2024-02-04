"use server"

import cloudinary from "@/lib/cloudinary"

export const uploadImage = async (formData:FormData)=>{
    const image = formData.get("image")
    if(!image){
        return {error:"Image not exsit"}
    }
    const fileUri = await convertImageToBase64(image as File)
    try {
        const data = await cloudinary.uploader.upload(fileUri,{folder:process.env.CLOUDINARY_FOLDER_IMAGES})
        return {url:data.secure_url}
    } catch (error) {
        return {error:"The system failed to save the image"}
    }
} 



async function convertImageToBase64(image:File) {
    const fileBuffer = await image.arrayBuffer();
    const mime = image.type;
    const encoding = 'base64';
    const base64Data = Buffer.from(fileBuffer).toString('base64');
    const fileUri = 'data:' + mime + ';' + encoding + ',' + base64Data;
    return fileUri
  }