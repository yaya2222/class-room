import { Schema, model, models } from "mongoose";
import {ISolution} from "@/types"

const SolutionSchema = new Schema<ISolution>(
  {
    postId:{ type: Schema.Types.ObjectId,required: true},
    userId:{ type: Schema.Types.ObjectId,required: true},
    text:String,
    file:String
  },
  { timestamps: true }
);

export default models?.Solution || model<ISolution>("Solution", SolutionSchema);
