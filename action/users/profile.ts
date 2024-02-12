"use server";

import dbConnect from "@/lib/db";
import { sendTowFactorTokenEmail } from "@/lib/resend";
import { LoginSchema, ProfileSchema } from "@/lib/zodSchema";
import { generateTokenRegister } from "@/services/token";
import { getUserByEmail } from "@/services/user";
import { ITokenRegister } from "@/types/TokenRegister";
import { redirect } from "next/navigation";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { getUser } from "@/lib/auth";
import User from "@/models/User";
import IUser from "@/types/User";


export const profile = async (values: z.infer<typeof ProfileSchema>) => {
  await dbConnect();

  const vaildatedFields = ProfileSchema.safeParse(values);
  if (!vaildatedFields.success) {
    return { error: "Invalid field!" };
  }

  const { name, password, confirmPassword } = vaildatedFields.data;
  const sessionUser = await getUser()
  const userInDb: IUser | null = await User.findById(sessionUser.id);

  if (!userInDb) {
    return { error: "Email does not exist!" };
  }
  if (!userInDb.password && (password || confirmPassword)) {
    return { error: "It is impossible to change a password if you do not log in with a password" }
  }

  const dataToUpdate: z.infer<typeof ProfileSchema> = {}
  if (name && name != "") {
    dataToUpdate.name = name
  }
  if (password && password !== "") {
    const hashPassword = await bcrypt.hash(password, 10)
    dataToUpdate.password = hashPassword

  }
  await User.findByIdAndUpdate(sessionUser.id,dataToUpdate)

  return { success: "The profile is updated successfully" }
}