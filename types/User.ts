import { Document, ObjectId } from "mongoose";
import { enumUsersClassRole } from "./Classroom";

export enum enumRole {
  ADMIN = "admin",
  USER = "user",
}

export default interface IUser {
  name: string;
  email: string;
  password: string;
  image: string;
  role: enumRole;
  emailVerified: boolean;
  classes: [
    {
      idClass: ObjectId;
      role: enumUsersClassRole;
    }
  ];
}

export interface IUserModel extends IUser, Document {}
