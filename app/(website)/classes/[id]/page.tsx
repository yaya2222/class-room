import { getClassById } from "@/action/classes/GetClassById";
import Classroom from "@/components/Classroom";
import Image from "next/image";

interface ClassesPageProps {
  params: {
    id: string;
  };
}

export default async function classPage({ params }: ClassesPageProps) {

  const { classroom, error } = await getClassById(params.id);
  return (
    <div>
      {error && <div>error</div>}
      {classroom && (
        <section>
          <div className="w-full h-52">
            <Image
              src={classroom.image}
              alt={classroom.name}
              width={256}
              height={256}
              className="h-full w-full rounded-t-3xl object-cover"
            />
          </div>
          <div className="flex flex-col gap-2 pt-4 shadow-lg">
            <span className="text-4xl">{classroom.name}</span>
            <span className="text-2xl">{classroom.description}</span>
          </div>
        </section>
      )}
    </div>
  );
}
