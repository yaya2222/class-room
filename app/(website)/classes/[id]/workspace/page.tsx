import Link from "next/link";


interface WorkspacePageProps {
  params: {
    id: string;
  };
}

export default function WorkspacePage({params:{id}}:WorkspacePageProps) {


console.log(id);

  return (
    <div className=" pb-4 px-4">
      <Link href={`/classes/${id}/workspace/add`}>Add</Link>
    </div>
  )
}
