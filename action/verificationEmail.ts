"use server"

import { VerificationEmailSchema } from "@/lib/zodSchema"
import TokenRegister from "@/models/TokenRegister"
import { ITokenRegister } from "@/types/TokenRegister"
import { z } from "zod"
import bcrypt from "bcryptjs"
import User from "@/models/User"
import { signInWithCredentials } from "@/lib/auth"
import { IUserModel } from "@/types/User"
import dbConnect from "@/lib/db"

export const VerificationEmail = async (values: z.infer<typeof VerificationEmailSchema>, validation: string | null, password: string | null) => {
    await dbConnect();

    if (!validation || !password) {
        return { error: "Invalid data!" }
    }

    const vaildatedFields = VerificationEmailSchema.safeParse(values);
    if (!vaildatedFields.success) {
        return { error: "Invalid field!" };
    }

    const { code } = vaildatedFields.data
    const token: ITokenRegister | null = await TokenRegister.findOne({ token: code })
    if (!token) {
        return { error: "Invalid code" }
    }

    const hasExpired = new Date(token.expires) < new Date();

    if (hasExpired) {
        return { error: "Code expired!" };
    }



    const verificationEmail = await bcrypt.compare(token.email, validation)
    if (!verificationEmail) {
        return { error: "Identification failed" }
    }
    const user: IUserModel | null = await User.findOneAndUpdate({ email: token.email }, { emailVerified: true })
    await TokenRegister.findByIdAndDelete(token._id)
    
    if (!user) {
        return { error: "Try again" }
    }

    await signInWithCredentials(user.email, password)
}