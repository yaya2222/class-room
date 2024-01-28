import { Document } from "mongoose";

export enum enumRole{
    ADMIN="admin",
    USER="user"
}

export default interface IUser {
    name: string,
    email: string,
    password: string,
    image: string,
    role: enumRole,
    emailVerified: boolean,
}

export interface IUserModel extends IUser,Document {}