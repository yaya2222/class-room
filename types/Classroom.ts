import { Document, ObjectId } from "mongoose";

export enum enumUsersClassRole{
    ADMINISTRATION="administration",
    TEACHER="teacher",
    STUDENT="student"
}

export default interface Classroom {
    name: string,
    description: string,
    topic: string,
    image: string,
    users:[{
        idUser:ObjectId,
        role:enumUsersClassRole
    }]
 
    
}

export interface IClassroom extends Classroom,Document {}