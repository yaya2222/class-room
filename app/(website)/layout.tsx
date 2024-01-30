import Sidebar from "@/components/Sidebar";

export default function WebsiteLauout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen flex bg-gray-300">
      <Sidebar />

      {children}
    </main>
  );
}
