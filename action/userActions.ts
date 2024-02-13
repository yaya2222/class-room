"use server";

import TokenRegister from "@/models/TokenRegister";
import { signOut } from "@/auth";
import { z } from "zod";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { signInWithCredentials, getUser } from "@/lib/auth";
import dbConnect from "@/lib/db";
import { cookies } from "next/headers";
import { sendTowFactorTokenEmail } from "@/lib/resend";
import {
  RegisterSchema,
  ProfileSchema,
  VerificationEmailSchema,
  LoginSchema,
} from "@/lib/zodSchema";
import { generateTokenRegister } from "@/services/token";
import { redirect } from "next/navigation";
import { getUserByEmail } from "@/services/user";
import { ITokenRegister } from "@/types/TokenRegister";
import { IUserModel } from "@/types/User";
import IUser from "@/types/User";
import { IDisplayProfile } from "@/types/profile";

dbConnect();

export const VerificationEmail = async (
  values: z.infer<typeof VerificationEmailSchema>
) => {
  const hashEmail = cookies().get("validation_e")?.value;
  const password = cookies().get("validation_p")?.value;

  if (!hashEmail || !password) {
    return { error: "Invalid data!" };
  }

  const vaildatedFields = VerificationEmailSchema.safeParse(values);
  if (!vaildatedFields.success) {
    return { error: "Invalid field!" };
  }

  const { code } = vaildatedFields.data;
  const token: ITokenRegister | null = await TokenRegister.findOne({
    token: code,
  });
  if (!token) {
    return { error: "Invalid code" };
  }

  const hasExpired = new Date(token.expires) < new Date();

  if (hasExpired) {
    return { error: "Code expired!" };
  }

  const verificationEmail = await bcrypt.compare(token.email, hashEmail);
  if (!verificationEmail) {
    return { error: "Identification failed" };
  }
  const user: IUserModel | null = await User.findOneAndUpdate(
    { email: token.email },
    { emailVerified: true }
  );
  await TokenRegister.findByIdAndDelete(token._id);

  if (!user) {
    return { error: "Try again" };
  }

  cookies().delete("validation_e");
  cookies().delete("validation_p");

  await signInWithCredentials(user.email, password);
};

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const vaildatedFields = RegisterSchema.safeParse(values);
  if (!vaildatedFields.success) {
    return { error: "Invalid field!" };
  }
  const { name, email, password } = vaildatedFields.data;

  const exsitingUser = await getUserByEmail(email);
  if (exsitingUser) {
    return { error: "Email already in use!" };
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser: IUserModel = await User.create({
    name,
    email,
    password: hashPassword,
  });
  const newToken: ITokenRegister | null = await generateTokenRegister(
    newUser.email
  );
  if (!newToken) {
    return { error: "Fail to create token" };
  }
  await sendTowFactorTokenEmail(newUser.email, newToken.token);

  const validation = await bcrypt.hash(newUser.email, 10);
  cookies().set("validation_e", validation);
  cookies().set("validation_p", password);

  return redirect(`/auth/verificationEmail`);
};

export const profile = async (values: z.infer<typeof ProfileSchema>) => {
  const vaildatedFields = ProfileSchema.safeParse(values);
  if (!vaildatedFields.success) {
    return { error: "Invalid field!" };
  }

  const { name, password, confirmPassword } = vaildatedFields.data;
  const sessionUser = await getUser();
  const userInDb: IUser | null = await User.findById(sessionUser.id);

  if (!userInDb) {
    return { error: "Email does not exist!" };
  }
  if (!userInDb.password && (password || confirmPassword)) {
    return {
      error:
        "It is impossible to change a password if you do not log in with a password",
    };
  }

  const dataToUpdate: z.infer<typeof ProfileSchema> = {};
  if (name && name != "") {
    dataToUpdate.name = name;
  }
  if (password && password !== "") {
    const hashPassword = await bcrypt.hash(password, 10);
    dataToUpdate.password = hashPassword;
  }
  await User.findByIdAndUpdate(sessionUser.id, dataToUpdate);

  return { success: "The profile is updated successfully" };
};

export const loginWithProvider = async () => {
  const sessionUser = await getUser();
  const userInDb: IUser | null = await User.findById(sessionUser.id);
  if (!userInDb) {
    await signOut();
    return redirect("/auth/login");
  }

  const displayProfile: IDisplayProfile = {
    name: userInDb.name,
    email: userInDb.email,
    image: userInDb.image,
    isPassword: !!userInDb.password,
  };
  return displayProfile;
};

export const login = async (values: z.infer<typeof LoginSchema>) => {
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
