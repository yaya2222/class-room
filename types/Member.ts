import {ObjectId } from "mongoose";
import { enumUsersClassRole } from "./Classroom";


export default interface IMember {
_id:ObjectId
  name: string;
  email: string;
  image: string;
  role: enumUsersClassRole;
}

