import { getPostById } from "@/action/postActions";
import { roleUserInClassroom } from "@/action/userActions";
import ResponseToPost from "@/components/ResponseToPost";
import { enumStudyMaterial, enumUsersClassRole } from "@/types";
import Link from "next/link";

interface PostPageProps {
  params: {
    postId: string;
    id:string
  };
}

export default async function PostPage({ params: { postId,id } }: PostPageProps) {
  const { error, post, author, isSolution } = await getPostById(postId);
  if (error) {
    return <div>{error}</div>;
  }
  console.log({ error });

  if (post) {
    const user = await roleUserInClassroom(post.classroom);

    if (user.error) {
      return <div>{user.error}</div>;
    }
    return (
      <section>
        <>
          <div className="shadow-lg p-10">
            <h3>{post._id.toString()}</h3>
            <div className="flex justify-between items-end mb-3">
              <h2 className="text-4xl">{post.title}</h2>
              <div className="flex flex-col gap-2 items-end">
                <span className="md text-gray-500">
                  {post.DueDate
                    ? post.DueDate.toDateString()
                    : "No filing date"}
                </span>
                <div className="md text-gray-500 space-x-2">
                  <span>{author.name}</span>
                  <span className="text-sm">{author.email}</span>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-end">
              <div>
                {post.body && (
                  <p className="px-4">
                    {post.body.split("\n").map((line, index) => (
                      <span key={index}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </p>
                )}
                {post.files && post.files[0]!==null&& (
                  <div className="px-4 ">
                    {
                      <Link
                        href={post.files[0]}
                        className="text-gray-500 flex flex-col"
                      >
                        <span>Donload File:</span>
                        <span className="text-sm hover:underline">
                          {" "}
                          {post.files[0]}
                        </span>
                      </Link>
                    }
                  </div>
                )}
              </div>
              <span>{post.grade ? post.grade : "No Grade"}</span>
            </div>
          </div>
          {post.type !== enumStudyMaterial.POST &&
            user.role === enumUsersClassRole.STUDENT && (
              <div className="mt-10 shadow-lg py-2">
                {isSolution && <div>A solution has already been sent</div>}
                {!isSolution && <ResponseToPost postId={postId} id={id} />}
              </div>
            )}
        </>
      </section>
    );
  }
}
