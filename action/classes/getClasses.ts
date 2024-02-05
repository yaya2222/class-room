"use server";

import { auth } from "@/auth";
import Classroom from "@/models/Classroom";
import { getUserById } from "@/services/user";
import { IUserModel } from "@/types/User";
import { Session } from "next-auth";

export const getClasses = async () => {
  try {
    const session: Session | null = await auth();

    if (!session?.user) {
      return { error: "No permissions" };
    }
    const user: IUserModel | null = await getUserById(session.user.id);
    if (!user) {
      return { error: "User not exsit" };
    }
    const allIdsOfClasses = user.classes.map((c) => c.idClass);

    const allClasses = await Classroom.find({ _id: { $in: allIdsOfClasses } });
    return { allClasses };
  } catch (error) {
    console.log(error);
    return { error: "Operation failed" };
  }
};

