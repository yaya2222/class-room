import { Document, ObjectId } from "mongoose";
import { enumUsersClassRole } from "./Classroom";

export enum enumTypeMessage {
  GROUP_INVITATION = "group_invitation",
}

export default interface Messge {
  title: string;
  body: string;
  type: enumTypeMessage;
  authorEmail: string;
  receiver: ObjectId;
  classId: string;
  role?: enumUsersClassRole;
  messageOpen: boolean;
}

export interface IMessge extends Messge, Document {}
