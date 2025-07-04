import Link from "next/link";
import React from "react";
import { MdDashboardCustomize } from "react-icons/md";

export default function SectionPainelLink({
  href,
  title,
}: {
  href: string;
  title?: string;
}) {
  return (
    <div className="ml-auto">
      <Link
        href={href}
        title={title || "Painel"}
        className="bg-azul-950 rounded-sm size-8 sm:size-9 cursor-pointer hover:bg-azul-800 transition-all duration-200 flex items-center justify-center"
      >
        <MdDashboardCustomize className="text-orange-500 text-lg sm:text-2xl" />
      </Link>
    </div>
  );
}
