"use client";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { TbMessageShare } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { MdLogout } from "react-icons/md";
import Image from "next/image";

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
    <aside className="relative h-full hidden md:block rounded-e-3xl">
      <div className=" py-8 w-72 shadow-xl h-screen bg-color text-white rounded-e-3xl">
        <div className="px-6 text-center">
          <h1 className="text-2xl font-semibold flex flex-col items-center justify-center">
            <Image src="/logo.png" alt="logo" width={110} height={110}/>
            <span className="-mt-2">

            Classroom
            </span>
            </h1>
          <div className="h-[0.5px] bg-slate-400"></div>
        </div>
        <nav className="flex flex-col gap-6 mt-10">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex items-center gap-8 px-2 "
            >
              {!pathname.startsWith(link.href) && <div></div>}
              {pathname.startsWith(link.href) && (
                <div className="w-1 h-10 rounded-e-lg bg-white transition-all duration-1000 ease-in-out"></div>
              )}
              <span className="flex items-center w-full text-center gap-3 transition hover:translate-x-2 duration-50 ">
                {link.icon} {link.label}
              </span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="absolute bottom-20 w-full text-center">
        <button
          className="flex gap-3 items-center justify-center w-full text-white"
          onClick={() => signOut()}
        >
          Logout
          <MdLogout className="text-xl" />
        </button>
      </div>
    </aside>
  );
}
