import { getDetailOfTest } from "@/action/solutionActions";
import InputGrade from "@/components/InputGrade";
import Link from "next/link";

interface TestPageProps {
  params: {
    id: string;
    idTest: string;
  };
}

export default async function Testpage({
  params: { id, idTest },
}: TestPageProps) {
  const { author, error, solution, post } = await getDetailOfTest(id, idTest);

  if (error) {
    return <div>{error}</div>;
  }
  if (solution && author && post) {
    return (
      <section className="space-y-24">
        <div>
          <h3 className="text-2xl font-semibold underline">Questions</h3>
          <div>
            <h4 className="text-xl font-semibold">{post.title}</h4>
            <p>{post.body}</p>
            <div>
              {post.files && post.files[0] && (
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
              )}
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-semibold underline">Solution</h3>
          <div className="space-x-3">
            <span className="text-xl">{author.name}</span>
            <span className="text-lg text-gray-500">{author.email}</span>
          </div>
          <div>
            <p>{solution.text}</p>
            {solution.file && (
              <Link
                href={solution.file}
                className="text-gray-500 flex flex-col"
              >
                <span>Donload File:</span>
                <span className="text-sm hover:underline">
                  {" "}
                  {solution.file}
                </span>
              </Link>
            )}
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-semibold underline">Grade</h3>
          {post.grade && (
            <InputGrade maxGrade={post.grade} testId={idTest} classroomId={id} />
          )}
          {!post.grade && <div>No Grade</div>}
        </div>
      </section>
    );
  }
}
