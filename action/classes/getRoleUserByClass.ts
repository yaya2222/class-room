"use server";

import { getUser } from "@/lib/auth";
import Classroom from "@/models/Classroom";
import { IClassroom, enumUsersClassRole } from "@/types/Classroom";

export const getRoleUserByClass = async (classroomId: string) => {
  try {
    const user = await getUser();
    if (!user) return { error: "Not authorized" };
    const classroom: IClassroom | null = await Classroom.findById(classroomId);
    if (!classroom) return { error: "Classroom not exsit" };
    const memberInClass = classroom.users.find(
      (classroomUser) => classroomUser.idUser.toString() === user.id
    );
    if(!memberInClass) return {error:"You are not a member of this class"}
    return {role:memberInClass.role as enumUsersClassRole};
    
  } catch (error) {
    return { error: "Operation failed" };
  }
};
