import { Document, ObjectId } from "mongoose";

export enum enumUsersClassRole {
    ADMINISTRATION="administration",
    TEACHER="Teacher",
    STUDENT="student",
}

export enum enumPost {
    TASK,
    EXAMINATION,
    STUDYMATERIAL,
    POST_RECYCLING,
}

export default interface Classroom {
    name: string,
    description?: string,
    topic?: string,
    image: string,
    users: [{
        idUser: ObjectId,
        role: enumUsersClassRole
    }]
    code: string,
    posts: [ObjectId]

}

export interface IClassroom extends Classroom, Document { }