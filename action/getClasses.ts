"use server"

import { auth } from "@/auth"

export const getClasses = async () => {
const session = auth()
}

// const mongoose = require('mongoose');
// const { Schema, model, models } = mongoose;

// // ... הגדרת מודל ה-User

// // ... הגדרת מודל ה-Classroom

// // השאילתה
// async function getClassroomsByUserId(userId) {
//   try {
//     const user = await User.findById(userId);

//     if (!user) {
//       console.log('User not found');
//       return [];
//     }

//     const result = await Classroom.aggregate([
//       {
//         $match: {
//           'users.idUser': mongoose.Types.ObjectId(userId),
//           'users.role': user.role,
//         },
//       },
//       {
//         $group: {
//           _id: '$users.role',
//           classrooms: { $push: '$$ROOT' },
//         },
//       },
//     ]);

//     const groupedClassrooms = {};

//     result.forEach((group) => {
//       groupedClassrooms[group._id] = group.classrooms;
//     });

//     return groupedClassrooms;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }

// // דוגמה לשימוש
// const userId = 'ה-id של ה-User';
// getClassroomsByUserId(userId)
//   .then((classrooms) => {
//     console.log(classrooms);
//   })
//   .catch((error) => {
//     console.error(error);
//   });
