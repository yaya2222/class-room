"use server"

import Classroom from "@/models/Classroom"
import { IClassroom } from "@/types/Classroom"

export const getMembers = async(classroomId:string)=>{
try {
    

const classroom = await Classroom.findById(classroomId).populate({
    path: 'users',
    populate: {
      path: 'idUser',
      model: 'User',
    },
  });

if(!classroom) return {error:"Classroom not exsit"}

 return classroom
} catch (error) {
    console.log(error);
    
    return {error:"Operation failed"}
}

}