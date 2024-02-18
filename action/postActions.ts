"use server"

import { getUser } from "@/lib/auth";
import dbConnect from "@/lib/db";
import { postSchema } from "@/lib/zodSchema"
import Classroom from "@/models/Classroom";
import Post from "@/models/Post";
import User from "@/models/User";
import { findUserInClassroom } from "@/services/classroom";
import { findSolutionByUserAndPost } from "@/services/solution";
import { IClassroom, IPost, IUserModel, enumUsersClassRole } from "@/types";
import { revalidatePath } from "next/cache";
import { z } from "zod"

export const createPost = async (values: z.infer<typeof postSchema>)=>{
try {
    await dbConnect();

    const vaildatedFields = postSchema.safeParse(values);



    if (!vaildatedFields.success) {
      return { error: "Invalid field!" };
    }

const {title,type,DueDate,body,grade,tupic,classroomId,file} = vaildatedFields.data
if(!classroomId){
return {error:"Missing Classroom"}
}

const classroom:IClassroom|null= await Classroom.findById(classroomId)
if(!classroom){
    return {error:"Classroom is not exsit"}
}

const sessionUser = await getUser()

 const userInDb:IUserModel|null = await User.findById(sessionUser.id)

 if(!userInDb){
    return {error:"Identification failed"}
}




const userInClassroom = await findUserInClassroom(userInDb._id,classroom._id)
if(!userInClassroom){
    return {error:"You don't belong in this classroom"}
}

if(userInClassroom.role===enumUsersClassRole.STUDENT){
    return {error:"You do not have permission to post"}
}

const data = {title,type,DueDate,body,grade,tupic,files:[file],author:userInDb._id,classroom:classroom._id}
const newPost:IPost=await Post.create(data)

let dataToUpdate
if(classroom.posts){
     dataToUpdate = {posts:[...classroom.posts,newPost._id]}
}else{
    dataToUpdate= {posts:[newPost._id]}
}
await Classroom.findByIdAndUpdate(classroomId,dataToUpdate)
revalidatePath(`/classes/${classroomId}/workspace`,"page")
return {success:"Create"}
} catch (error) {
    console.log(error);
    
    return {   error:"Post creation failed",};}
}

export const getPostById = async(postId:string)=>{
    try {
        await dbConnect();
        const post:IPost|null  = await Post.findById(postId)
        if(!post) return {post:null,error:"Post is not exsit",author:null,isSolution:false}
        const author:IUserModel|null = await User.findById(post.author)
if(!author) return {error:"author is not exsit" ,post:null,author:null,isSolution:false}
        const sessionUser = await getUser()
        const isSolution = !! await findSolutionByUserAndPost(sessionUser.id,post._id)
        return {post,error:null,author,isSolution}
    } catch (error) {
        return {error:"error", post:null,author:null,isSolution:false}
    }
}
