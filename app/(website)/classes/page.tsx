import { getClasses } from "@/action/classes/getClasses";
import Class from "@/components/Class";

export default async function ClassesPage() {
  const { allClasses, error } = await getClasses();
  console.log(allClasses);

  return (
    <div className="flex gap-x-10 gap-y-2 flex-wrap content-start">
      {error && <div>Error</div>}
      {allClasses&&allClasses.map(classroom=><div>
        {JSON.stringify(classroom)}
      </div>)}
    </div>
  );
}
