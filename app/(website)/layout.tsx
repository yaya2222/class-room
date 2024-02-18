import Sidebar from "@/components/Sidebar";
import { EdgeStoreProvider } from '@/lib/edgestore';

export default function WebsiteLauout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen flex">
      <Sidebar />
      <div className="py-10 px-8 w-full">
        
      <EdgeStoreProvider>{children}</EdgeStoreProvider>


      </div>
    </main>
  );
}
