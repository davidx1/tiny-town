"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const path = usePathname();
  const pathArr = path.split("/").filter((i) => i !== "");
  const isEditing = pathArr.pop() === "editor";

  return (
    <nav className="bg-white w-full fixed z-50 ">
      <div className="container mx-auto py-3 flex justify-between items-center">
        <Link href="/" className="font-semibold text-xl tracking-tight">
          Tiny Town
        </Link>
        <div className="flex items-center">
          {isEditing ? (
            <Link
              href={`/${pathArr.join("/")}`}
              className="px-3 py-2 rounded-md text-sm font-medium"
            >
              Play
            </Link>
          ) : (
            <Link
              href={`${path}/editor`}
              className="px-3 py-2 rounded-md text-sm font-medium"
            >
              Edit
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
