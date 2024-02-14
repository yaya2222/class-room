import { getAllStudyMaterialOfClassroom } from "@/action/classroomActions";
import Link from "next/link";


interface WorkspacePageProps {
  params: {
    id: string;
  };
}

export default async function WorkspacePage({params:{id}}:WorkspacePageProps) {

const posts = await getAllStudyMaterialOfClassroom(id)

  return (
    <div className=" pb-4 px-4">
      <Link href={`/classes/${id}/workspace/add`}>Add</Link>
    </div>
  )
}
