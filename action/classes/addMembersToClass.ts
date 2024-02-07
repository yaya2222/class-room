"use server";

import dbConnect from "@/lib/db";
import { AddMembersSchema } from "@/lib/zodSchema";
import Classroom from "@/models/Classroom";
import User from "@/models/User";
import { IUserModel } from "@/types/User";
import { z } from "zod";

export const addMembersToClass = async (
  values: z.infer<typeof AddMembersSchema>,
) => {
  try {
    await dbConnect()
    console.log({values});
    
    const vaildatedFields = AddMembersSchema.safeParse(values);
    if (!vaildatedFields.success) {
      return { error: "Invalid field!" };
    }

    const { email,classroomId,roleModal } = vaildatedFields.data;
    if(!classroomId||!roleModal) return {error:"Mssing data"}
    
    const user: IUserModel | null = await User.findOne({ email });
    if (!user || !user.emailVerified) return { error: "User not exsit" };
    
    const memberInClass = user.classes.find((val)=>val.idClass.toString()===classroomId)
    
    console.log({memberInClass});
    
    if(memberInClass){

    }else{
        
        // await User.findByIdAndUpdate(userDb._id,{
        //     $addToSet:{classes:{idClass:newClass._id,role:enumUsersClassRole.ADMINISTRATION}}
        //   })
        console.log({user,classroomId});
        
        await Classroom.findByIdAndUpdate(classroomId,{
            $addToSet:{users:{idUser:user._id,role:roleModal}}
        })
        await User.findByIdAndUpdate(user._id,{
            $addToSet:{classes:{idClass:classroomId,role:roleModal}}
          })
        
    }


    return { success: "" };
  } catch (error) {
    console.log(error);
    
    return { error: "The Invitation failed" };
  }
};
