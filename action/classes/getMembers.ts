"use server"

import Classroom from "@/models/Classroom"
import { IClassroom, enumUsersClassRole } from "@/types/Classroom"
import { IUserModel } from "@/types/User"
import IMember from "@/types/Member"

export const getMembers = async(classroomId:string)=>{
try {
    

const classroom= await Classroom.findById(classroomId).populate({
  path: 'users',
  populate: {
    path: 'idUser',
    model: 'User',
  },
});

if(!classroom) return {error:"Classroom not exsit"}

const members:IMember[] = classroom.users.map((member:{idUser:IUserModel,role:enumUsersClassRole})=>{
const {_id,name,email,image} = member.idUser
return {_id,name,email,image,role:member.role}
})


 return {members}
} catch (error) {
    console.log(error);
    return {error:"Operation failed"}
}

}