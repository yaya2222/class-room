import { getClasses } from "@/action/classes/getClasses";
import Class from "@/components/Class";

export default async function ClassesPage() {

  const classes = await getClasses()
  console.log(classes);
  

    return (
      <div className="flex gap-x-10 gap-y-2 flex-wrap content-start">
      </div>
    )
  }
  