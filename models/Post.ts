import { Schema, model, models } from "mongoose";
import {IPost, enumStudyMaterial} from "@/types"

const PostSchema = new Schema<IPost>(
  {
    type:{type:String,enum:enumStudyMaterial,required:true},
    title:{type:String,required:true},
    body:{type:String},
    links:[String],
    files:[String],
    grade:Number,
    tupic:String,
    DueDate:Date

  },
  { timestamps: true }
);

export default models?.Post || model<IPost>("Post", PostSchema);
