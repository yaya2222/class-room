import { IClassroom } from "@/types/Classroom";
import Image from "next/image";
import Link from "next/link";

interface ClassProps {
  classroom: IClassroom; // התו סוגריים הימני נוסף
}

export default function Class({ classroom }: ClassProps) {
  const { _id, name, description,topic, users } = classroom;
  console.log(classroom);
  return (
    <Link href={`classes/${_id}`} className="">
      <Image
        src={
          "https://img.freepik.com/free-vector/school-classroom-interior-university-educational-concept-blackboard-table_1441-1694.jpg"
        }
        alt="image class"
        width={250}
        height={100}
        className="rounded-t-xl"
      />
      <div className="flex flex-col">
        <span>Name: {name}</span>
        {description && <span>description: {description}</span>}
        {topic && <span>topic: {topic}</span>}
        <span>Sum: {users.length}</span>
      </div>
    </Link>
  );
}
