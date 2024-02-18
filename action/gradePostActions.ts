"use server"

import { getUser } from "@/lib/auth"
import dbConnect from "@/lib/db"
import GradePost from "@/models/GradePost"
import Solution from "@/models/Solution"
import User from "@/models/User"
import { findUserInClassroom } from "@/services/classroom"
import { ISolution, IUserModel, enumUsersClassRole } from "@/types"

export const createGradePost = async (testId: string, grade: FormDataEntryValue | null, classroomId: string, maxGrade: number
) => {
    if (!grade) {
        return { error: "MissingData", success: null }
    }
    try {
        await dbConnect()
        const sessionUser = await getUser()
        const userInDb: IUserModel | null = await User.findById(sessionUser.id)
        if (!userInDb) {
            return { error: "you are not exsit", success: null }
        }
        const userInClassroom = await findUserInClassroom(userInDb._id, classroomId)
        if (!userInClassroom) {
            return { error: "Solution is not exsit", success: null }

        }
        if (userInClassroom.role === enumUsersClassRole.STUDENT) {
            return { error: "You do not have permission to give grades", success: null }
        }

        const gradeDb = parseInt(grade.toString())
        if (maxGrade < gradeDb || gradeDb < 0) {
            return { error: "An unreasonable score", success: null }

        }
        const solution: ISolution | null = await Solution.findById(testId)
        if (!solution) {
            return { error: "Solution is not exsit", success: null }
        }
        const gradeExsit = await GradePost.findOne({ solution: solution._id})
        console.log({gradeExsit});
        
        if(gradeExsit){
            return { error: "Solution is alredy exsit", success: null }

        }
        await GradePost.create({ solution: solution._id, examiner: userInDb._id, grade: gradeDb, maxGrade })
        return { error: null, success: "The score is saved" }
    } catch (error) {
        console.log(error);

        return { error: "Fail", success: null }
    }
}