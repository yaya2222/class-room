import { Schema, model, models } from "mongoose"

const TokenRegisterSchema = new Schema({
    idUser:{type:Schema.Types.ObjectId,required:true},
    expires:{type:Date,default:new Date(Date.now() + 5 * 60 * 1000)}
})

const TokenRegister= models.User || model("TokenRegister",TokenRegisterSchema)

export default TokenRegister