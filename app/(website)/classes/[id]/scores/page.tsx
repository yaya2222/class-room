import { getGradeByClassroom } from "@/action/gradePostActions";

interface ScoresPageProps {
  params: {
    id: string;
  };
}

export default async function ScoresPage({ params: { id } }: ScoresPageProps) {
  const {error,grades} = await getGradeByClassroom(id);
  
  if(error){
    return <div>{error}</div>;
  }
if(grades){

  return(
    <section>
      <h3 className="text-2xl font-semibold underline mb-6">Scores</h3>
{!grades.length&&<div>You have no scores yet</div>}

<ul className="p-2 space-y-3">
{grades.length&&grades.map(g=>(
  <li key={g._id} className="border-b border-gray-500"><div className="flex justify-between items-center ">
    <span className="text-xl font-semibold">{g.postTitle}</span>
    <span>{g.grade}/{g.maxGrade}</span>
    </div></li>
))}
</ul>
    </section>
  );
}
}
