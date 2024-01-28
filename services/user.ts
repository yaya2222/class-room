import User from "@/models/User";
import { IUserModel } from "@/types/User";
import { ObjectId } from "mongoose";


export const getUserById = (id: ObjectId) => {
    try {
        return User.findById(id)
    } catch (error) {
        return null
    }
}


export const getUserByEmail = (email: string) => {
    try {
        return User.findOne({ email })
    } catch (error) {
        return null;
    }
};
