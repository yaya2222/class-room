"use server";

import dbConnect from "@/lib/db";
import { RegisterSchema } from "@/lib/zodSchema";
import TokenRegister from "@/models/TokenRegister";
import User from "@/models/User";
import { IUserModel } from "@/types/User";
import { z } from "zod";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  await dbConnect();

  const vaildatedFields = RegisterSchema.safeParse(values);
  if (!vaildatedFields.success) {
    return { error: "Invalid field!" };
  }
  const { name, email, password } = vaildatedFields.data;

  const exsitingUser = await User.findOne({ email });
  console.log({ exsitingUser });
  if (exsitingUser) {
    return { error: "Email already in use!" };
  }

  const newUser: IUserModel = await User.create({ name, email, password });
  const newToken = await TokenRegister.create({ idUser: newUser._id });


  return { success: "register new" };
};
