import { IUserModel, enumRole } from "@/types/User"
import { Schema, model, models } from "mongoose"
import { string } from "zod"

const UserSchame = new Schema<IUserModel>({
    name: { type: String, required: true },
    email: {
        type: String,
        required: [true, "Please provide email"],
        unique: true,
    },
    password: { type: String, required: true },
    role:{type:String,default:enumRole.USER},
    image:{type:String},
    emailVerified:{type:Boolean,default:false}
},{timestamps:true})


export default models?.User || model<IUserModel>("User",UserSchame)

