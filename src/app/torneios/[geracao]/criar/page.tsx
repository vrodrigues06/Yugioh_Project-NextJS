// app/mundial/criar/page.tsx
import NenhumTorneio from "@/components/nenhum-torneio";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yugioh | Torneios",
  description: "Nenhum mundial disponível no momento",
};

export default function CriarTorneioPage() {
  return <NenhumTorneio />;
}
