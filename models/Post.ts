import { Schema, model, models } from "mongoose";
import {IPost, enumStudyMaterial} from "@/types"
import { ObjectId } from "mongodb";

const PostSchema = new Schema<IPost>(
  {
    type:{type:String,enum:enumStudyMaterial,required:true},
    title:{type:String,required:true},
    body:{type:String},
    links:[String],
    files:[String],
    grade:Number,
    tupic:String,
    DueDate:Date,
    author:{type:ObjectId,required:true},
    classroom:{type:ObjectId,required:true}

  },
  { timestamps: true }
);

export default models?.Post || model<IPost>("Post", PostSchema);
