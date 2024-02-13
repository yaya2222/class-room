"use server"

import dbConnect from "@/lib/db"
import { getUser } from "@/lib/auth"
import Message from "@/models/Message"
import { IMessge,IClassroom } from "@/types"
import mongoose, { ObjectId } from "mongoose"
import Classroom from "@/models/Classroom"
import { findUserInClassroom } from "@/services/classroom"
import User from "@/models/User"

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

export const confirmationMessage = async (msg:IMessge)=>{
    try {
        const classroom:IClassroom|null = await Classroom.findById(msg.classId)
        if(!classroom) return {error:'classroom not exsit'}
        const sessionUser = await getUser()
        const userExsitingInClass = await findUserInClassroom(sessionUser.id,classroom._id)
        if(userExsitingInClass) return {error:"User allreday exsiting in classroom"}
        await Classroom.findByIdAndUpdate(classroom._id,{
            $addToSet:{users:{idUser:sessionUser.id,role:msg.role}}
        })
        await User.findByIdAndUpdate(sessionUser.id,{
            $addToSet:{classes:{idClass:classroom._id,role:msg.role}}
          })
          return {success:"Added to a new class"}
    } catch (error) {
        return { error: "Invitation failed" };
        
}
}