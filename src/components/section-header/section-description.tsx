import React from "react";

export default function SectionDescription({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p className="text-xs sm:text-sm text-slate-400 mb-4 sm:mb-16">
      {children}
    </p>
  );
}
