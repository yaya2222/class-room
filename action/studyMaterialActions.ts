"use server"

import dbConnect from "@/lib/db";
import { StudyMaterialSchema } from "@/lib/zodSchema"
import Classroom from "@/models/Classroom";
import StudyMaterial from "@/models/StudyMaterial";
import { IClassroom, IStudyMaterial } from "@/types";
import { z } from "zod"

export const createStudyMaterial = async (values: z.infer<typeof StudyMaterialSchema>)=>{
try {
    await dbConnect();

    const vaildatedFields = StudyMaterialSchema.safeParse(values);
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
const newPost:IStudyMaterial=await StudyMaterial.create(data)
const dataToUpdate = {posts:[...classroom.posts,newPost._id]}
await Classroom.findByIdAndUpdate(classroomId,dataToUpdate)
return {success:"Create"}
} catch (error) {
    console.log(error);
    
    return {   error:"Post creation failed",};}
}

