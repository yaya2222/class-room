import {Document, ObjectId } from "mongoose";

export enum enumTypeMessage{
    GROUP_INVITATION="group_invitation",
}


export default interface Meassge {
   title:string,
   body:string,
   type:enumTypeMessage,
   authorEmail:string,
   receiver:ObjectId,
   expires?: Date,
   href?:string,
   messageOpen:boolean,

}

export interface IMeassge extends Meassge,Document {}