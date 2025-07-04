import React from "react";

export default function SectionTitulo({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h1 className="text-lg sm:text-2xl text-white font-bold mb-1">
      {children}
    </h1>
  );
}
