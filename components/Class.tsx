import Image from "next/image";
import Link from "next/link";

interface ClassProps{
    id:string,
    name:string,
    description:string,
    friend:number
}

export default function Class({id,name,description,friend}:ClassProps) {
  return (
    <Link href={`classes/${id}`}>
      <Image src={"https://img.freepik.com/free-vector/school-classroom-interior-university-educational-concept-blackboard-table_1441-1694.jpg"}
        alt="image class"
        width={200} height={200}
        className="rounded-t-xl"/>
        <div className="flex flex-col">
      <span>Name: {name}</span>
      <span>description: {description}</span>
      <span>Sum: {friend}</span>

        </div>
    </Link>
  )
}
