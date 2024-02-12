"use server"

import dbConnect from "@/lib/db"
import { getUser } from "@/lib/auth"
import Message from "@/models/Message"
import { IMessge } from "@/types/Message"
import mongoose, { ObjectId } from "mongoose"

dbConnect()


export const getMessagesByUser = async () => {
    try {
        const sessionUser = await getUser()
        const receiverId = new mongoose.Types.ObjectId(sessionUser.id)
        const allMesaagedByUser:IMessge[] = await Message.find({ receiver: receiverId })
        return {allMesaagedByUser}
    } catch (error) {
        return { error: "Invitation failed" };
    }
}


export const openMessage = async (messageId:ObjectId) => {
        await Message.findByIdAndUpdate(messageId,{messageOpen:true})      
        
}

export const deleteMessage = async (messageId:ObjectId)=>{
    try {
        await Message.findByIdAndDelete(messageId)
    } catch (error) {
return {error:"The delete operation failed"}        
    }
}