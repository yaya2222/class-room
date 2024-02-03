"use server"

import { auth } from "@/auth";
import Classroom from "@/models/Classroom";
import { getUserById } from "@/services/user";
import { IUserModel } from "@/types/User";
import { Session } from "next-auth";


export const getClasses = async () => {
    const session:Session | null = await auth()
    
    if(!session?.user){
        return {error:"No permissions"}
    }
    const user:IUserModel | null =await getUserById(session.user.id)
    if(!user){
        return {error:"User not exsit"}
    }
    console.log(user);
    // const allClasses = await Classroom.find({_id:{$in:user.classes}})
}

// [auth][error] JWTSessionError: Read more at https://errors.authjs.dev#jwtsessionerror
// [auth][cause]: MongooseError: Operation `users.findOne()` buffering timed out after 10000ms
//     at Timeout.<anonymous> (C:\Users\gyaak\OneDrive\שולחן העבודה\nextjs\class-room\node_modules\mongoose\lib\drivers\node-mongodb-native\collection.js:186:23)
//     at listOnTimeout (node:internal/timers:573:17)
//     at process.processTimers (node:internal/timers:514:7)
// [auth][details]: {}