import Classroom from "@/models/Classroom";
import { IClassroom } from "@/types";
import { ObjectId } from "mongoose";

export const findUserInClassroom =async (userId:string|ObjectId,classroomId:string|ObjectId)=>{
try {
    
    const classroom:IClassroom|null = await Classroom.findById(classroomId)
    if(!classroom) return 
    const user = classroom.users.find((user)=>user.idUser.toString()===userId.toString())
    return user
} catch (error) {
    return
}
}