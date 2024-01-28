export default function AuthLauout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="h-full flex flex-col justify-center items-center bg-sky-400">
    <div className="flex flex-col shadow-md rounded-lg p-6 gap-6  w-[400px] bg-white">
    <h1 className="text-center text-2xl font-semibold">Classroom</h1>

    {children}
    </div>
    </div>;
}
