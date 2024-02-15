import { IClassroom } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface ClassProps {
  classroom: IClassroom; // התו סוגריים הימני נוסף
}

export default function Classroom({ classroom }: ClassProps) {
  const { _id, name, image, description, topic, users } = classroom;
  return (
    <Link href={`classes/${_id}`} className="bg-white rounded-2xl border border-gray-300 hover:shadow-md hover:shadow-gray-300  transition duration-500 ease-in-out w-72">
      <div>
        <div className="h-36 w-full ">
          <Image src={image} alt={name} height={224} width={224} className=" w-full h-full rounded-t-2xl" />
        </div>
        <div className="flex flex-col space-y-2 p-4 ">
        <h3 className="font-semibold text-2xl truncate">{name}</h3>
        <p className="text-lg truncate">{description?description:"No description"}</p>
        <p className="truncate">{topic?topic:"No topic"}</p>
        <p className="text-sm text-gray-500">Nembers: {users.length}</p>
        </div>
      </div>
    </Link>
  );
}
