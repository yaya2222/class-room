import { IMeassge, enumTypeMessage } from "@/types/Message";
import { Schema, model, models } from "mongoose";

const Meassgechema = new Schema<IMeassge>(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    type: {
      type: String,
      enum: enumTypeMessage,
      required: true
    },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    receiver: { type: Schema.Types.ObjectId, ref: "User" },
    expires: Date,
    href: String,
    messageOpen:{type:Boolean,default:false},

  },
  { timestamps: true }
);

export default models?.Meassge || model<IMeassge>("Meassge", Meassgechema);
