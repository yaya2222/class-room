import { getAllStudyMaterialOfClassroom } from "@/action/classroomActions";
import { roleUserInClassroom } from "@/action/userActions";
import { enumUsersClassRole } from "@/types";
import Link from "next/link";
import { FaFileAlt } from "react-icons/fa";

interface WorkspacePageProps {
  params: {
    id: string;
  };
}

export default async function WorkspacePage({
  params: { id },
}: WorkspacePageProps) {
  const { error, posts } = await getAllStudyMaterialOfClassroom(id);
  const user = await roleUserInClassroom(id);
  return (
    <div className=" pb-4 px-4">
      {user.role !== enumUsersClassRole.STUDENT && (
        <Link
          className="px-6 py-2 bg-color rounded-lg  text-white"
          href={`/classes/${id}/workspace/add`}
        >
          Add
        </Link>
      )}
      {error && <div>Error</div>}
      {posts && (
        <div className="mt-4 space-y-2">
          {posts.map((post) => (
            <Link
              href={`/classes/${id}/workspace/post/${post._id.toString()}`}
              key={post._id}
              className="flex justify-between items-center  border border-gray-400 hover:shadow-lg hover:shadow-gray-400 rounded-xl p-2"
            >
              <div>
                <div className=" ">
                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 bg-color rounded-full flex items-center justify-center">
                      <FaFileAlt className="h-8 text-white/70" />
                    </div>
                    <span className="text-xl font-semibold">{post.title}</span>
                  </div>
                  <div className="text-xs text-gray-700 flex gap-4 mt-2">
                    <span>{post.createdAt!.toDateString()}</span>
                    <span>{post.type}</span>
                  </div>
                </div>
              </div>
              <span>
                {post.DueDate ? post.DueDate.toDateString() : "No filing date"}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
