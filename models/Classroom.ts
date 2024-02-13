import { IClassroom, enumUsersClassRole } from "@/types"
import { Schema, model, models } from "mongoose"

const ClassroomSchema = new Schema<IClassroom>({
    name: { type: String, required: true },
    description: String,
    topic: String,
    image: { type: String, required: true },
    users: {type:[{
        idUser: { type: Schema.Types.ObjectId, ref: "User" },
        role: { type: String,enum:enumUsersClassRole, default: enumUsersClassRole.STUDENT }
    }],default:[]},
    code:{type:String, required: true },
    posts:[{ type: Schema.Types.ObjectId, ref: "Post" }]
}, { timestamps: true })


export default models?.Classroom || model<IClassroom>("Classroom", ClassroomSchema)

