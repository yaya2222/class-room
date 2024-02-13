import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./lib/zodSchema";
import { getUserByEmail } from "./services/user";
import bcrypt from "bcryptjs";
import dbConnect from "./lib/db";
import { IUserModel } from "@/types";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        try {
          await dbConnect();
          if (!credentials) return null;

          const validatedFileds = LoginSchema.safeParse(credentials);

          if (validatedFileds.success) {
            const { email, password } = validatedFileds.data;

            const user: IUserModel | null = await getUserByEmail(email);
            if (!user || !user.password || !user.emailVerified) return null;
            const passwordsMatch = await bcrypt.compare(
              password,
              user.password
            );
            if (passwordsMatch) return user;
          }
          return null;
        } catch {
          return null;
        }
      },
    }),
  ],
};
