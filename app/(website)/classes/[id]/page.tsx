import { getClassById } from "@/action/classes/GetClassById";
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
              className="h-full w-full rounded-3xl object-fill"
            />
          </div>
        </section>
      )}
    </div>
  );
}
