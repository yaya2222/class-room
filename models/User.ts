import { IUserModel, enumRole,enumUsersClassRole } from "@/types";
import { Schema, model, models } from "mongoose";

const UserSchame = new Schema<IUserModel>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: [true, "Please provide email"],
      unique: true,
    },
    password: { type: String, required: true },
    role: { type: String, default: enumRole.USER },
    image: { type: String },
    emailVerified: { type: Boolean, default: false },
    classes: {
      type: [
        {
          idClass: { type: Schema.Types.ObjectId },
          role: {
            type: String,
            enum: enumUsersClassRole,
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export default models?.User || model<IUserModel>("User", UserSchame);
