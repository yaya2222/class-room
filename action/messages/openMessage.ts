"use server"

import { getUser } from "@/lib/auth"
import dbConnect from "@/lib/db"
import Message from "@/models/Message"
import { IMeassge } from "@/types/Message"
import mongoose, { ObjectId } from "mongoose"

export const openMessage = async (messageId:ObjectId) => {
        await dbConnect()
        await Message.findByIdAndUpdate(messageId,{messageOpen:true})      
        
}