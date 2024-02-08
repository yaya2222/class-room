"use server";

import { getUser } from "@/lib/auth";
import dbConnect from "@/lib/db";
import { AddMembersSchema } from "@/lib/zodSchema";
import Classroom from "@/models/Classroom";
import Message from "@/models/Message";
import User from "@/models/User";
import { findUserInClassroom } from "@/services/class";
import { enumUsersClassRole } from "@/types/Classroom";
import Meassge, { IMeassge, enumTypeMessage } from "@/types/Message";
import { IUserModel } from "@/types/User";
import { z } from "zod";

export const addMembersToClass = async (
  values: z.infer<typeof AddMembersSchema>
) => {
  try {
    await dbConnect();
    const sessionUser = await getUser();
    if (!sessionUser) return { error: "You are not logged in" };
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
      const message: Meassge = {
        title: "Group invitation",
        body: `You are welcome to join the group with permission of ${roleModal}`,
        author: sessionUserInClassroom.idUser,
        receiver: recipientUser._id,
        type: enumTypeMessage.GROUP_INVITATION,
        messageOpen: false,
      };
       await Message.create({...message})
    }

    return { success: "Invitation sent!" };
  } catch (error) {
    console.log(error);

    return { error: "Invitation failed" };
  }
};