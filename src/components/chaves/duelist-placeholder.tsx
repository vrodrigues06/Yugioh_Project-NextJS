import { Match } from "@/@types";
import React from "react";

type PlaceholderDuelistaProps = {
  match: Match;
  identificador: "1" | "2";
};

export default function DuelistPlaceholder({
  match,
  identificador,
}: PlaceholderDuelistaProps) {
  if (!match) return null;

  const origem =
    match[
      `origemDuelista${identificador}` as "origemDuelista1" | "origemDuelista2"
    ];
  if (!origem) return;

  return (
    <div className="w-50 h-12 text-slate-600 text-xs bg-azul-950 p-1.5 flex gap-1.5 items-center shadow-2xl">
      <div className="size-8 rounded-full bg-cover bg-top border transition-all border-black bg-[url('/assets/shadow.jpg')]" />
      {origem}
    </div>
  );
}
