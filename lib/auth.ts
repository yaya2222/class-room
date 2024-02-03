import { auth, signIn } from "@/auth"
import { DEFAULT_LOGIN_REDIRECT } from "@/route"
import { AuthError } from "next-auth"
import { cookies } from "next/headers"

export const signInWithCredentials = async (email: string, password: string, path?: string) => {
    const redirectTo = path ? path : DEFAULT_LOGIN_REDIRECT as string

    try {
        await signIn("credentials", {
            email, password, redirectTo
        })
    } catch (error) {

        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials" };
                default:
                    return { error: "Error login" };
            }
        }
        throw error;
    }
}

export const getUser = async () => {
    const session = await auth()
    return session?.user
}

