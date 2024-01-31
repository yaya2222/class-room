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
    emailVerified:{type:Boolean,default:false},
    classes:{type:[{type:Schema.Types.ObjectId}],default:[]},
    // classesManager:{type:[{type:Schema.Types.ObjectId}],default:[]},
    // classesTeacher:{type:[{type:Schema.Types.ObjectId}],default:[]},
    // classesStudent:{type:[{type:Schema.Types.ObjectId}],default:[]},
},{timestamps:true})


export default models?.User || model<IUserModel>("User",UserSchame)

