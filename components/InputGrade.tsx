"use client";

import { createGradePost } from "@/action/gradePostActions";
import toast from "react-hot-toast";

interface InputGradeProps {
  maxGrade: number;
  testId: string;
  classroomId: string;
}

export default function InputGrade({
  maxGrade,
  testId,
  classroomId,
}: InputGradeProps) {
  const action = async (formData: FormData) => {
    const grade = formData.get("grade");
    const { error, success } = await createGradePost(
      testId,
      grade,
      classroomId,
      maxGrade
    );
    console.log({success,error});
    
    if (success) {
      toast.success(success);
    }
    if (error) {
      toast.error(error);
    }
  };

  return (
    <div className="mt-4">
      <form action={action} className="flex gap-2">
        <input
          name="grade"
          type="number"
          max={maxGrade}
          min={0}
          className="w-36 px-2 py-2 rounded-full border-dashed"
        />
        <button type="submit" className="bg-color px-6 py-2 rounded-xl">
          O.K
        </button>
      </form>
    </div>
  );
}
