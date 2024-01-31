"use client";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { TbMessageShare } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const links = [
  {
    label: "Dashboard",
    icon: <MdDashboard className="iconSidebar" />,
    href: "/dashboard",
  },
  {
    label: "Classes",
    icon: <SiGoogleclassroom className="iconSidebar" />,
    href: "/classes",
  },
  {
    label: "Messages",
    icon: <TbMessageShare className="iconSidebar" />,
    href: "/messages",
  },
  {
    label: "profile",
    icon: <CgProfile className="iconSidebar" />,
    href: "/profile",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="relative" >
      <div className="px-4 py-8 w-56 shadow-xl h-screen hidden md:block">
      <h1 className="text-2xl px-2 font-semibold">Classroom</h1>
      <div className="h-[0.5px] bg-slate-400"></div>
      <nav className="flex flex-col gap-2 mt-4">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={`flex items-center gap-3 py-2 transition duration-500  text-gray-600 hover:text-blue-700 hover:translate-x-2
             ${link.href == pathname ? "text-blue-700 translate-x-1" : ""}`}
          >
            {link.href !== pathname && <div></div>}{" "}
            {link.href === pathname && (
              <div className="w-1 h-7 rounded-e-lg bg-blue-700 transition-all duration-1000 ease-in-out"></div>
            )}
            {link.icon} {link.label}
          </Link>
        ))}
      </nav>
      </div>
      <div className="absolute bottom-20 w-full text-center">

      <button className="bg-sky-400 hover:bg-sky-600 px-10 py-2 rounded-lg text-white font-semibold disabled:bg-sky-200" onClick={()=>signOut()}>Logout</button>
      </div>
    </aside>
  );
}

// return (
//   <aside className="px-1 py-8 w-56">
//     <h1 className="text-2xl px-4 font-semibold">Classroom</h1>
//     <div className="px-4 h-[0.5px] bg-slate-400"></div>
//     <div className="flex flex-col gap-2 mt-4">
//       {links.map((link) => (
//         <Link
//           key={link.label}
//           href={link.href}
//           className={`flex items-center gap-4 py-2 transition duration-500  text-gray-600 hover:text-blue-700 hover:translate-x-2
//            ${link.href === pathname ? "text-blue-700 translate-x-2" : ""}`}
//         >
//           {link.href !== pathname && <div></div>}
//           {link.href === pathname && <div className="w-1 h-7 rounded-e-lg bg-blue-700 duration-700"></div>}
//           <div className="flex items-center gap-2">
//             {link.icon} {link.label}
//           </div>
//         </Link>
//       ))}
