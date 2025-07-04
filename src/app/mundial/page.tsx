import { mundiaisGet } from "@/_lib/actions/mundiais-get";
import Loading from "@/components/loading";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { MdDashboardCustomize } from "react-icons/md";

export default async function MundialRedirectPage() {
  const { data: mundiais, error } = await mundiaisGet();

  const finalizados = mundiais?.filter((m) => m.status === "finalizado");
  const anos = finalizados?.map((m) => m.ano).sort((a, b) => b - a); // maior primeiro

  if (!anos) return;

  const anoMaisRecente = anos[0];

  if (anoMaisRecente !== undefined) redirect(`/mundial/${anoMaisRecente}`);

  redirect(`/mundial/criar`);
}
