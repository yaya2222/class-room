"use server"

import { getUser } from "@/lib/auth"
import dbConnect from "@/lib/db"
import Message from "@/models/Message"
import { IMeassge } from "@/types/Message"
import mongoose from "mongoose"

export const getMessagesByUser = async () => {
    try {
        await dbConnect()
        const sessionUser = await getUser()
        const receiverId = new mongoose.Types.ObjectId(sessionUser.id)
        const allMesaagedByUser:IMeassge[] = await Message.find({ receiver: receiverId })
        console.log(allMesaagedByUser);
        
        return {allMesaagedByUser}
    } catch (error) {
        return { error: "Invitation failed" };
    }
}