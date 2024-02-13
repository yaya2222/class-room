import { Document, ObjectId } from "mongoose";

export enum enumStudyMaterial {
  TASK = "task",
  EXAMINATION = "examination",
  POST="post"
//   POST_REUSE = "post_reuse",
}

interface StudyMaterial {
    type:enumStudyMaterial,
    title:string,
    body?:string,
    links?:string[],
    files?:string[]
    grade?:number,
    tupic?:string,
    DueDate?:Date,

}

export interface IStudyMaterial extends StudyMaterial, Document {}
