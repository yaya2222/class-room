import Classroom from "@/models/Classroom";
import Solution from "@/models/Solution";
import { IClassroom, ISolution } from "@/types";
import { ObjectId } from "mongoose";

export const findSolutionByUserAndPost =async (userId:string|ObjectId,postId:string|ObjectId)=>{
try {
    
    const solution:ISolution|null =  await Solution.findOne({postId,userId})
    return solution
} catch (error) {
    return null
}
}