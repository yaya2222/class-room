import Sidebar from "@/components/Sidebar";

export default function WebsiteLauout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen flex">
      <Sidebar />
      <div className="py-10 px-8 w-full">
      {children}

      </div>
    </main>
  );
}
