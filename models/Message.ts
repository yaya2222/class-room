import { enumUsersClassRole,IMessge, enumTypeMessage  } from "@/types";
import { Schema, model, models } from "mongoose";

const Meassgechema = new Schema<IMessge>(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    type: {
      type: String,
      enum: enumTypeMessage,
      required: true
    },
    authorEmail: { type: String, required: true },
    receiver: { type: Schema.Types.ObjectId, ref: "User" },
    classId: { type: String, required: true },
    role: {type:String,enum:enumUsersClassRole},
    messageOpen:{type:Boolean,default:false},

  },
  { timestamps: true }
);

export default models?.Meassge || model<IMessge>("Meassge", Meassgechema);
