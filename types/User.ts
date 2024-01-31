import { Document, ObjectId } from "mongoose";

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
    classes:[ObjectId],
//     classesManager:[ObjectId],
//     classesTeacher:[ObjectId],
//     classesStudent:[ObjectId],
}

export interface IUserModel extends IUser,Document {}