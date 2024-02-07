import { getClasses } from "@/action/classes/getClasses";
import Classroom from "@/components/Classroom";

export default async function ClassesPage() {
  const { allClasses, error } = await getClasses();

  return (
    <div className="flex gap-x-6 gap-y-4 flex-wrap content-start">
      {error && <div>Error</div>}
      {allClasses&&allClasses.map(classroom=><Classroom key={classroom._id} classroom={classroom}/>)}
    </div>
  );
}
