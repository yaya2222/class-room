import { ITokenRegister } from "@/types/TokenRegister"
import { Schema, model, models } from "mongoose"

const TokenRegisterSchema = new Schema<ITokenRegister>({
    email:{type:String,required:true},
    token:{type:String,required:true},
    expires:{type:Date,required:true}
})

export default models.TokenRegister|| model<ITokenRegister>("TokenRegister",TokenRegisterSchema)