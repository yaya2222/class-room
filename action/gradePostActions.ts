"use server";

import { getUser } from "@/lib/auth";
import dbConnect from "@/lib/db";
import Classroom from "@/models/Classroom";
import GradePost from "@/models/GradePost";
import Message from "@/models/Message";
import Post from "@/models/Post";
import Solution from "@/models/Solution";
import User from "@/models/User";
import { findUserInClassroom } from "@/services/classroom";
import {
  IClassroom,
  IGradePost,
  IPost,
  ISolution,
  IUserModel,
  enumTypeMessage,
  enumUsersClassRole,
} from "@/types";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

export const createGradePost = async (
  testId: string,
  grade: FormDataEntryValue | null,
  classroomId: string,
  maxGrade: number
) => {
  if (!grade) {
    return { error: "MissingData", success: null };
  }
  try {
    await dbConnect();
    const sessionUser = await getUser();
    const userInDb: IUserModel | null = await User.findById(sessionUser.id);
    if (!userInDb) {
      return { error: "you are not exsit", success: null };
    }
    const userInClassroom = await findUserInClassroom(
      userInDb._id,
      classroomId
    );
    if (!userInClassroom) {
      return { error: "Solution is not exsit", success: null };
    }
    if (userInClassroom.role === enumUsersClassRole.STUDENT) {
      return {
        error: "You do not have permission to give grades",
        success: null,
      };
    }

    const gradeDb = parseInt(grade.toString());
    if (maxGrade < gradeDb || gradeDb < 0) {
      return { error: "An unreasonable score", success: null };
    }
    const solution: ISolution | null = await Solution.findById(testId);
    if (!solution) {
      return { error: "Solution is not exsit", success: null };
    }
    const gradeExsit = await GradePost.findOne({ solution: solution._id });
    console.log({ gradeExsit });

    if (gradeExsit) {
      return { error: "Solution is alredy exsit", success: null };
    }
    const post: IPost | null = await Post.findById(solution.postId);
    if (!post) {
      return { error: "Fail", success: null };
    }
    const mClassroomId = new mongoose.Types.ObjectId(classroomId);
    await GradePost.create({
      solution: solution._id,
      examiner: userInDb._id,
      grade: gradeDb,
      maxGrade,
      classroom: mClassroomId,
      user: solution.userId,
      postTitle: post.title,
    });

    revalidatePath(`/classes/${classroomId}/scores`,"page");

    await Message.create({
      title: "Getting a grade",
      body: `You got a score of ${gradeDb}/${maxGrade} for a ${post.title} assignment`,
      authorEmail: sessionUser.email!,
      receiver: solution.userId,
      type: enumTypeMessage.SCORE_ANNOUNCEMENT,
      messageOpen: false,
      classId: classroomId,
      role: enumUsersClassRole.STUDENT,
    });

    revalidatePath(`/messages`,"page");


    return { error: null, success: "The score is saved" };
  } catch (error) {
    console.log(error);

    return { error: "Fail", success: null };
  }
};

export const getGradeByClassroom = async (classroomId: string) => {
  try {
    await dbConnect();
    const classroom: IClassroom | null = await Classroom.findById(classroomId);
    if (!classroom) {
      return { error: "classroom is not exsit", grades: null };
    }
    const posts = await Post.find({ _id: { $in: classroom.posts } });
    const sessionUser = await getUser();
    const userInDb = await User.findById(sessionUser.id);
    if (!userInDb) {
      return { error: "User is no exsit", grades: null };
    }
    const mClassroomId = new mongoose.Types.ObjectId(classroomId);

    const grades: IGradePost[] = await GradePost.find({
      user: userInDb._id,
      classroom: mClassroomId,
    });
    grades.map(async (g) => {
      const sol = await Solution.findById(g.solution);
    });
    return { error: null, grades };
  } catch (error) {
    return { error: "fail", grades: null };
  }
};
