import { Types,Document } from "mongoose";

export default interface IUser {
    name: string,
    email: string,
    password: string,
    image: string,
    isAdmin: boolean,
    emailVerified: boolean,
}

export interface IUserModel extends IUser,Document {}