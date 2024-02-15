"use server"

import dbConnect from "@/lib/db";
import { postSchema } from "@/lib/zodSchema"
import Classroom from "@/models/Classroom";
import Post from "@/models/Post";
import { IClassroom, IPost } from "@/types";
import { z } from "zod"

export const createPost = async (values: z.infer<typeof postSchema>)=>{
try {
    await dbConnect();

    const vaildatedFields = postSchema.safeParse(values);
    if (!vaildatedFields.success) {
      return { error: "Invalid field!" };
    }

const {title,type,DueDate,body,grade,tupic,classroomId} = vaildatedFields.data
if(!classroomId){
return {error:"Missing Classroom"}
}

const classroom:IClassroom|null= await Classroom.findById(classroomId)
if(!classroom){
    return {error:"Classroom is not exsit"}
}
const data = {title,type,DueDate,body,grade,tupic}
const newPost:IPost=await Post.create(data)
let dataToUpdate
if(classroom.posts){
     dataToUpdate = {posts:[...classroom.posts,newPost._id]}
}else{
    dataToUpdate= {posts:[newPost._id]}
}
await Classroom.findByIdAndUpdate(classroomId,dataToUpdate)
return {success:"Create"}
} catch (error) {
    console.log(error);
    
    return {   error:"Post creation failed",};}
}

