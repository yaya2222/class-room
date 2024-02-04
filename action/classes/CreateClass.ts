"use server";

import { z } from "zod";
import { CreateClassSchema } from "@/lib/zodSchema";
import dbConnect from "@/lib/db";
import Classroom from "@/models/Classroom";
import { getUser } from "@/lib/auth";
import User from "@/models/User";
import { IUserModel } from "@/types/User";
import { SessionUser } from "@/next-auth";
import { IClassroom, enumUsersClassRole } from "@/types/Classroom";

export const CreateClass = async (
  values: z.infer<typeof CreateClassSchema>
) => {
    await dbConnect();
    
    const vaildatedFields = CreateClassSchema.safeParse(values);
  if (!vaildatedFields.success) {
    return { error: "Invalid field!" };
  }

  const {name,description,url,topic} = vaildatedFields.data
  if(!url){
    return {error:"Missing picture"}
  }

const user:SessionUser | undefined = await getUser()

if(!user) {
  return {error:"Unidentified user"}
}

const userDb:IUserModel|null = await User.findById(user.id)
if(!userDb){
    return { error:"Unidentified user"}
}

const dataOfClass = {
  name,
  description:description!==""?description:undefined,
  topic:topic!==""?topic:undefined,
  image:url,
  code:"123456",
  users:[{idUser:userDb._id, role:enumUsersClassRole.ADMINISTRATION}]
}


const newClass:IClassroom = await Classroom.create(dataOfClass)
  await User.findByIdAndUpdate(userDb._id,{
    $addToSet:{classes:{idClass:newClass._id,role:enumUsersClassRole.ADMINISTRATION}}
  })
  return { success: `create class id: ${newClass._id}` };
};
