import { Document, ObjectId } from "mongoose";

export enum enumUsersClassRole {
  ADMINISTRATION = "administration",
  TEACHER = "teacher",
  STUDENT = "student",
}

export enum enumStudyMaterial {
    TASK = "task",
    EXAMINATION = "examination",
    POST="post"
  //   POST_REUSE = "post_reuse",
  }

export enum enumTypeMessage {
  GROUP_INVITATION = "group_invitation",
}

export enum enumRole {
    ADMIN = "admin",
    USER = "user",
  }

export interface IClassroom extends Document {
  name: string;
  description?: string;
  image: string;
  users: [
    {
      idUser: ObjectId;
      role: enumUsersClassRole;
    }
  ];
  code: string;
  posts: [ObjectId];
  topic?:string[];
}

export  interface IMember {
  _id: ObjectId;
  name: string;
  email: string;
  image: string;
  role: enumUsersClassRole;
}

export interface IMessge extends Document {
  title: string;
  body: string;
  type: enumTypeMessage;
  authorEmail: string;
  receiver: ObjectId;
  classId: string;
  role?: enumUsersClassRole;
  messageOpen: boolean;
}

export interface IStudyMaterial extends  Document {
    type:enumStudyMaterial,
    title:string,
    body?:string,
    links?:string[],
    files?:string[]
    grade?:number,
    tupic?:string,
    DueDate?:Date,
}

export interface ITokenRegister extends Document {
    email: string,
    token: string,
    expires: Date,
}



export interface IDisplayProfile {
    name: string,
    email: string,
    image: string,
    isPassword: boolean,
}

export  interface IUser {
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


export  interface FiledForm {
    id: string;
    name: string;
    label: string;
    type: "text" | "email" | "password";
  }