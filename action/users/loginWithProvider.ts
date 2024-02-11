"use server"

import { signOut } from "@/auth"
import { getUser } from "@/lib/auth"
import User from "@/models/User"
import IUser from "@/types/User"
import { IDisplayProfile } from "@/types/profile"
import { redirect } from "next/navigation"

export const loginWithProvider = async () => {
    const sessionUser = await getUser()
    const userInDb: IUser | null = await User.findById(sessionUser.id)
    if (!userInDb) {
        await signOut();
        return redirect("/auth/login")
    }

    const displayProfile: IDisplayProfile = { name: userInDb.name, email: userInDb.email, image: userInDb.image, isPassword: !!userInDb.password }
    return displayProfile
}