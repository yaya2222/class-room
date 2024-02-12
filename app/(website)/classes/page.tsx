import { getClasses } from "@/action/classes/getClasses";
import Classroom from "@/components/Classroom";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";

export default async function ClassesPage() {
  const { allClasses, error } = await getClasses();

  return (
    <div className="flex gap-x-6 gap-y-4 flex-wrap content-start relative">
      {error && <div>Error</div>}
      <Link href="/classes/new" className="bg-color hover:bg-gradient-to-b hover:scale-120 rounded-full w-10 h-10 flex items-center justify-center text-white text-2xl absolute right-0 top-0"><FiPlus /></Link>
      {allClasses&&allClasses.map(classroom=><Classroom key={classroom._id} classroom={classroom}/>)}
    </div>
  );
}
