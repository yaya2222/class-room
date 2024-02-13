import { Schema, model, models } from "mongoose";
import {IStudyMaterial, enumStudyMaterial} from "@/types"

const StudyMaterialchema = new Schema<IStudyMaterial>(
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

export default models?.StudyMaterial || model<IStudyMaterial>("StudyMaterial", StudyMaterialchema);
