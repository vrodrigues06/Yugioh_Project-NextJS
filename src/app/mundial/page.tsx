import { mundiaisGet } from "@/_lib/actions/mundiais-get";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Yugioh | Mundial",
  description: "Página do Mundial de Personagens",
};

export default async function MundialRedirectPage() {
  const { data: mundiais, error } = await mundiaisGet();

  const finalizados = mundiais?.filter((m) => m.status === "finalizado");
  const anos = finalizados?.map((m) => m.ano).sort((a, b) => b - a); // maior primeiro

  if (!anos) return;

  const anoMaisRecente = anos[0];

  if (anoMaisRecente !== undefined) redirect(`/mundial/${anoMaisRecente}`);

  redirect(`/mundial/criar`);
}
