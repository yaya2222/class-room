import {IGradePost  } from "@/types";
import { Schema, model, models } from "mongoose";

const gradePostSchema = new Schema<IGradePost>(
  {
    solution:{ type: Schema.Types.ObjectId, required: true},
    examiner:{ type: Schema.Types.ObjectId, required: true},
    grade:{ type: Number, required: true},
    maxGrade:{ type: Number, required: true},
    classroom:{ type: Schema.Types.ObjectId, required: true},
    user:{ type: Schema.Types.ObjectId, required: true},
    postTitle:{ type: String, required: true},
  },
  { timestamps: true }
);

export default models?.GradePost || model<IGradePost>("GradePost", gradePostSchema);
