"use server"

import dbConnect from "@/lib/db";
import Classroom from "@/models/Classroom";
import { IClassroom } from "@/types/Classroom";

export const getClassById=async (idClass:string)=>{
    await dbConnect()
try {
    console.log(idClass);
    const classroom:IClassroom | null = await Classroom.findById(idClass) 
    if(!classroom){
        return {error:"No data found"}
    }
    return {classroom}
} catch (error) {
    return {error:"No data found"}
}
}