"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    label: "Updates",
    href: "",
  },
  {
    label: "Workspace",
    href: "/workspace",
  },
  {
    label: "People",
    href: "/people",
  },
  {
    label: "Scores",
    href: "/scores",
  },
];

interface NavbarClassProps {
  id: string;
}

export default function NavbarClass({ id }: NavbarClassProps) {
  console.log(id);

  const pathname = usePathname();
  const basicPath = `/classes/${id}`;
  console.log(pathname, basicPath);
  // ${basicPath+link.href===pathname?"text-blue-600":""}
  return (
    <nav className="border-b flex">
      {links.map((link) => (
        <Link href={basicPath + link.href} className="">
            <span className="px-8">{link.label}</span>
            {basicPath + link.href === pathname && (
              <div className="bg-indigo-600 h-1 rounded-t-lg"></div>
            )}
        </Link>
      ))}
    </nav>
  );
}
