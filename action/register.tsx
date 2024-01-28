"use server";

import dbConnect from "@/lib/db";
import { sendTowFactorTokenEmail } from "@/lib/resend";
import { RegisterSchema } from "@/lib/zodSchema";
import User from "@/models/User";
import { generateTokenRegister } from "@/services/token";
import { ITokenRegister } from "@/types/TokenRegister";
import { IUserModel } from "@/types/User";
import { redirect } from "next/navigation";
import { z } from "zod";
import bcrypt from "bcryptjs"
import { getUserByEmail } from "@/services/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  await dbConnect();

  const vaildatedFields = RegisterSchema.safeParse(values);
  if (!vaildatedFields.success) {
    return { error: "Invalid field!" };
  }
  const { name, email, password } = vaildatedFields.data;

  const exsitingUser = await getUserByEmail(email);
  if (exsitingUser) {
    return { error: "Email already in use!" };
  }
  
  const hashPassword =  await bcrypt.hash(password, 10)

  const newUser: IUserModel = await User.create({ name, email, password:hashPassword});
  const newToken: ITokenRegister | null = await generateTokenRegister(
    newUser.email
    );
  if (!newToken) {
    return { error: "Fail to create token" };
  }
  await sendTowFactorTokenEmail(newUser.email, newToken.token);

  const validation  = await bcrypt.hash(newUser.email, 10);

  
  return redirect(`/auth/verificationEmail?validation=${validation}&password=${password}`);
};
