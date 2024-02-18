"use server"

import { getUser } from "@/lib/auth";
import dbConnect from "@/lib/db";
import Post from "@/models/Post";
import Solution from "@/models/Solution";
import User from "@/models/User";
import { findUserInClassroom } from "@/services/classroom";
import { findSolutionByUserAndPost } from "@/services/solution";
import { IAllSolutionsByPost, IPost, ISolution, IUserModel, enumStudyMaterial, enumUsersClassRole } from "@/types";
import { revalidatePath } from "next/cache";

export const createSolution = async (postId: string, text: string, file?: string,) => {
    try {

        const sessionUser = await getUser()
        const userInDb: IUserModel | null = await User.findById(sessionUser.id)

        if (!userInDb) {
            return { error: "Identification failed", success: null }
        }



        const post: IPost | null = await Post.findById(postId)
        if (!post) {
            return { error: "Post is not exsit", success: null }
        }
        if (post.type === enumStudyMaterial.POST) {
            return { error: "Unable to reply to this post", success: null }
        }

        if (post.DueDate && post.DueDate < new Date()) {
            return { error: "The submission date has passed", success: null }
        }

        const allClassroom = userInDb.classes
        
        const isPostExsitInClassroomOfUser = allClassroom.find(val => val.idClass.toString() === post.classroom.toString())
        
        if (!isPostExsitInClassroomOfUser) {
            return { error: "Classroom is not exsit", success: null }
        }

        if (isPostExsitInClassroomOfUser.role !== enumUsersClassRole.STUDENT) {
            return { error: "Only students can return answers", success: null }
        }

        const solution =await findSolutionByUserAndPost(userInDb._id,post._id)
        if(solution){
            return { error: "A solution has already been sent", success: null }
        }
        
        await Solution.create({ postId: post._id, userId: userInDb._id, text, file })
        // revalidatePath(`/classes/${post.classroom.toString()}/workspace/post/${post._id.toString()}`,"page")

        return { error: null, success: "The solution has been sent" }
        
    } catch (error) {
        return { error: "Operation failed", success: null }

    }

}

export const getTestsByUser = async (classId:string)=>{
    try {
        await dbConnect()
        const sessionUser = await getUser()
        const userInDb:IUserModel|null = await User.findById(sessionUser.id)
        if(!userInDb){
            return {error:"user is not exsit",tests:null}
        }
        const allPosts = await Post.find({author:userInDb._id})
        const allSolutions: IAllSolutionsByPost[] = await Solution.aggregate([
            {
              $lookup: {
                from: "posts",
                localField: "postId",
                foreignField: "_id",
                as: "post",
              },
            },
            {
              $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "user",
              },
            },
            {
              $addFields: {
                userName: { $first: "$user.name" },
                userEmail: { $first: "$user.email" },
              },
            },
            {
              $group: {
                _id: "$post.title",
                solutions: { $push: "$$ROOT" },
              },
            },
          ]);  
          


        
          
          
          return {error:null,tests:allSolutions}
        
    } catch (error) {
        return {error:"fail",tests:null}
        
    }
        
    }

export const getDetailOfTest = async(classroomId:string,testId:string)=>{
    try {
        await dbConnect()
        
        const sessionUser = await getUser()
        const userInDb = await User.findById(sessionUser.id)
        if(!userInDb){
            return {error:"you don't exist",solution:null,author:null,post:null}
        }

        const userInClassroom = await findUserInClassroom(userInDb._id,classroomId)
        if(!userInClassroom){
            return {error:"You don't belong in this classroom",solution:null,author:null,post:null}
        }
        if(userInClassroom.role===enumUsersClassRole.STUDENT){
            return {error:"You do not have permission to look at solutions",solution:null,author:null,post:null}

        }

        const solution:ISolution|null = await Solution.findById(testId)
        
        if(!solution){
            return {error:"solution is not exsit",solution:null,author:null,post:null}
        }

        const author:IUserModel|null = await User.findById(solution.userId)

        if(!author){
            return {error:"author is not exsit",solution:null,author:null,post:null}
        }
        
        const post:IPost|null = await Post.findById(solution.postId)
        if(!post){
            return {error:"post is not exsit",solution:null,author:null,post:null}
        }

        return {error:null,solution,author,post}
        
    } catch (error) {
        return {error:"fail",solution:null,author:null,post:null}
    }
}