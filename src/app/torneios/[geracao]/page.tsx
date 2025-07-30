import { mundiaisGet } from "@/_lib/actions/mundiais-get";
import { torneiosGet } from "@/_lib/actions/torneios-get";
import Error from "@/components/error";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function TorneioRedirectPage({
  params,
}: {
  params: Promise<{ geracao: string }>;
}) {
  const geracao = (await params).geracao;
  const { data: allTorneios, error } = await torneiosGet();

  if (error) return <Error message={error} />;

  const torneios = allTorneios?.filter((t) => t.geracao === geracao);

  const finalizados = torneios?.filter((m) => m.status === "finalizado");
  const anos = finalizados?.map((m) => m.ano).sort((a, b) => b - a); // maior primeiro

  if (!anos) return;

  const anoMaisRecente = anos[0];

  if (anoMaisRecente !== undefined)
    redirect(`/torneios/${geracao}/${anoMaisRecente}`);

  redirect(`/torneios/${geracao}/criar`);
}
