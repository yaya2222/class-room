"use server";

import { getUser } from "@/lib/auth";
import dbConnect from "@/lib/db";
import Classroom from "@/models/Classroom";
import { IClassroom, enumUsersClassRole, IUserModel, IMember, enumTypeMessage } from "@/types";
import { auth } from "@/auth";
import { Session } from "next-auth";
import { z } from "zod";
import { CreateClassSchema } from "@/lib/zodSchema";
import User from "@/models/User";
import { SessionUser } from "@/next-auth";
import { AddMembersSchema } from "@/lib/zodSchema";
import Message from "@/models/Message";
import { findUserInClassroom } from "@/services/classroom";
import { revalidatePath } from "next/cache";



export const getRoleUserByClass = async (classroomId: string) => {
  try {
    await dbConnect()
    const user = await getUser();
    if (!user) return { error: "Not authorized" };
    const classroom: IClassroom | null = await Classroom.findById(classroomId);
    if (!classroom) return { error: "Classroom not exsit" };
    const memberInClass = classroom.users.find(
      (classroomUser) => classroomUser.idUser.toString() === user.id
    );
    if (!memberInClass) return { error: "You are not a member of this class" }
    return { role: memberInClass.role as enumUsersClassRole };

  } catch (error) {
    return { error: "Operation failed" };
  }
};


export const getMembers = async (classroomId: string) => {
  try {
    await dbConnect()

    const classroom = await Classroom.findById(classroomId).populate({
      path: 'users',
      populate: {
        path: 'idUser',
        model: 'User',
      },
    });

    if (!classroom) return { error: "Classroom not exsit" }

    const members: IMember[] = classroom.users.map((member: { idUser: IUserModel, role: enumUsersClassRole }) => {
      const { _id, name, email, image } = member.idUser
      return { _id, name, email, image, role: member.role }
    })


    return { members }
  } catch (error) {
    console.log(error);
    return { error: "Operation failed" }
  }

}

export const getClasses = async () => {
  try {
    await dbConnect()
    const session: Session | null = await auth();

    if (!session?.user) {
      return { error: "No permissions" };
    }
    const user: IUserModel | null = await User.findById(session.user.id);
    if (!user) {
      return { error: "User not exsit" };
    }
    const allIdsOfClasses = user.classes.map((c) => c.idClass);

    const allClasses: IClassroom[] = await Classroom.find({ _id: { $in: allIdsOfClasses } });
    return { allClasses };
  } catch (error) {
    console.log(error);
    return { error: "Operation failed" };
  }
};

export const getClassById = async (idClass: string) => {
  try {
    await dbConnect()
    const classroom: IClassroom | null = await Classroom.findById(idClass)
    if (!classroom) {
      return { error: "No data found" }
    }
    return { classroom }
  } catch (error) {
    return { error: "No data found" }
  }
}


export const CreateClass = async (
  values: z.infer<typeof CreateClassSchema>
) => {
  await dbConnect();

  const vaildatedFields = CreateClassSchema.safeParse(values);
  if (!vaildatedFields.success) {
    return { error: "Invalid field!" };
  }

  const { name, description, url, topic } = vaildatedFields.data
  if (!url) {
    return { error: "Missing picture" }
  }

  const user: SessionUser | undefined = await getUser()

  if (!user) {
    return { error: "Unidentified user" }
  }

  const userDb: IUserModel | null = await User.findById(user.id)
  if (!userDb) {
    return { error: "Unidentified user" }
  }

  const dataOfClass = {
    name,
    description: description !== "" ? description : undefined,
    topic: topic !== "" ? topic : undefined,
    image: url,
    code: "123456",
    users: [{ idUser: userDb._id, role: enumUsersClassRole.ADMINISTRATION }]
  }


  const newClass: IClassroom = await Classroom.create(dataOfClass)
  await User.findByIdAndUpdate(userDb._id, {
    $addToSet: { classes: { idClass: newClass._id, role: enumUsersClassRole.ADMINISTRATION } }
  })
  return { success: `create class id: ${newClass._id}` };
};

export const addMembersToClass = async (
  values: z.infer<typeof AddMembersSchema>
) => {
  try {
    await dbConnect();
    const sessionUser = await getUser();
    const vaildatedFields = AddMembersSchema.safeParse(values);
    if (!vaildatedFields.success) {
      return { error: "Invalid field!" };
    }

    const { email, classroomId, roleModal } = vaildatedFields.data;
    if (!classroomId || !roleModal) return { error: "Mssing data" };

    const sessionUserInClassroom = await findUserInClassroom(
      sessionUser.id,
      classroomId
    );
    if (!sessionUserInClassroom)
      return { error: "You don't belong in this classroom" };
    if (sessionUserInClassroom.role !== enumUsersClassRole.ADMINISTRATION)
      return { error: "You do not have permission to add friends" };

    const recipientUser: IUserModel | null = await User.findOne({ email });
    if (!recipientUser || !recipientUser.emailVerified)
      return { error: "Email not exsit" };

    const memberInClass = await findUserInClassroom(
      recipientUser._id,
      classroomId
    );

    if (memberInClass) {
      return { error: "The user already exists in the group" };
    } else {
      const message = {
        title: "Group invitation",
        body: `You are welcome to join the group with permission of ${roleModal} /n 
        id group:${classroomId}`,
        authorEmail: sessionUser.email!,
        receiver: recipientUser._id,
        type: enumTypeMessage.GROUP_INVITATION,
        messageOpen: false,
        classId: classroomId,
        role: roleModal as enumUsersClassRole
      };
      await Message.create({ ...message })
    }

    return { success: "Invitation sent!" };
  } catch (error) {
    console.log(error);

    return { error: "Invitation failed" };
  }
};

// export const getAllTopicsByClassroomId = async (classroomId: string) => {
//   try {
//     await dbConnect()
//     const classroom: IClassroom | null = await Classroom.findById(classroomId)
//     if (!classroom) return []
//     return classroom.topic
//   } catch (error) {
//     return []
//   }
// }

// export const addTopic = async (newTopic: string, classroomId: string) => {
//   try {
//     await dbConnect()

//     const classroom: IClassroom | null = await Classroom.findById(classroomId)
//     if (!classroom) return { error: "Classroom is not exsit" }
//     const allTopics = classroom.topic
//     let dataToUpdate
//     if (allTopics) {
//       if (allTopics.includes(newTopic.trim())) {
//         return { error: "This topic already exists" }
//       }
//       dataToUpdate = { topic: [...allTopics, newTopic] }
//     } else {
//       dataToUpdate = { topic: [, newTopic] }
//     }
//     await Classroom.findByIdAndUpdate(classroomId, dataToUpdate)
//     return {success:"Add topic"}
//   } catch (error) {
//     return { error: "Invitation failed" };
//   }
// }

export const getAllStudyMaterialOfClassroom = async (classroomId:string)=>{
  try {
      await dbConnect();
      const classroom  = await Classroom.findById(classroomId).populate("posts")
      if(!classroom) return {error:"Classroom is not exsit"}
      console.log({classroom});
        revalidatePath(`/(website)/classes/${classroomId}/workspace`,"page")
        return {posts:Classroom}
  }catch{
      return {error:"Error"}
  }

}