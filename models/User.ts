import { IuserModel } from "@/types/User"
import { Schema, model, models } from "mongoose"

const UserSchame = new Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: [true, "Please provide email"],
        unique: true,
    },
    password: { type: String, required: true },
    isAdmin:{type:Boolean,default:false},
    image:{type:String},
    emailVerified:{type:Boolean,default:false}
},{timestamps:true})

export default models.User || model<IuserModel>("User",UserSchame)

