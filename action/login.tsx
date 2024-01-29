"use server";

import dbConnect from "@/lib/db";
import { sendTowFactorTokenEmail } from "@/lib/resend";
import { LoginSchema } from "@/lib/zodSchema";
import { generateTokenRegister } from "@/services/token";
import { getUserByEmail } from "@/services/user";
import { ITokenRegister } from "@/types/TokenRegister";
import { redirect } from "next/navigation";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { signInWithCredentials } from "@/lib/auth";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  await dbConnect();

  const vaildatedFields = LoginSchema.safeParse(values);
  if (!vaildatedFields.success) {
    return { error: "Invalid field!" };
  }

  const { email, password } = vaildatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }

  if (!existingUser.emailVerified) {
    const newToken: ITokenRegister | null = await generateTokenRegister(
      existingUser.email
    );
    if (!newToken) {
      return { error: "Fail to create token" };
    }
    await sendTowFactorTokenEmail(existingUser.email, newToken.token);
    const validation = await bcrypt.hash(existingUser.email, 10);
    return redirect(
      `/auth/verificationEmail?validation=${validation}&password=${password}`
    );
  }
  return await signInWithCredentials(existingUser.email, password);
};
