import User from "@/models/User";


export const getUserById = (id: string) => {
    try {
        return User.findById(id)
    } catch (error) {
        return null
    }
}
