import { getTestsByUser } from "@/action/solutionActions";
import Link from "next/link";

interface TestsPageProps {
  params: {
    id: string;
  };
}

export default async function TestsPage({ params: { id } }: TestsPageProps) {
  const { error, tests } = await getTestsByUser(id);
  if (error) {
    return <div>{error}</div>;
  }
  if (tests) {
    return (
      <section>
        <ul className="space-y-6">
          {tests.map((t) => (
            <li key={t._id[0]} className=" py-2">
              <div>
                <h3 className="text-2xl underline">{t._id[0]}</h3>
                <ul className="p-2 space-y-3">
                  {t.solutions.map((s) => (
                    <li key={s._id}>
                      <Link href={`/classes/${id}/tests/${s._id.toString()}`} className="flex gap-4 items-center cursor-pointer border-b">
                        <span className="text-xl">{s.userName}</span>
                        <span className="text-gray-500 text-sm">
                          {s.userEmail}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </section>
    );
  }
}
