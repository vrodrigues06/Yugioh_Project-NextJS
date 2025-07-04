"use client";
import Loading from "@/app/loading";
import Error from "@/components/error";
import MundialAnteriores from "@/components/mundial/mundial-anteriores";
import MundialHallOfFame from "@/components/mundial/mundial-hall-of-fame";
import useMundialPageModel from "@/components/mundial/mundial-page/mundial-page-model";
import MundialPageModel from "@/components/mundial/mundial-page/mundial-page-model";
import MundialResultados from "@/components/mundial/mundial-resultados";
import NenhumTorneio from "@/components/nenhum-torneio";
import RankingAnual from "@/components/rankings/ranking-anual";
import Link from "next/link";
import React from "react";
import { MdDashboardCustomize } from "react-icons/md";

export default function MundialPage({
  params,
}: {
  params: Promise<{ ano: string }>;
}) {
  const { ano } = React.use(params); // <-- novo padrão com React.use()
  const [role, setRole] = React.useState<string | undefined>(undefined);
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    fetch("/api/user-role")
      .then((res) => res.json())
      .then((data) => setRole(data.role));
  }, []);

  const {
    torneioSelected,
    edicaoNumber,
    anos,
    error,
    abaSelecionada,
    setAbaSelecionada,
    handleTorneioAnoChange,
  } = useMundialPageModel(ano);

  React.useEffect(() => {
    if (torneioSelected || error) {
      setIsReady(true);
    }
  }, [torneioSelected, error]);

  if (!isReady) return <Loading />;

  if (!torneioSelected || !ano)
    return <NenhumTorneio role={role} mundial={true} />;

  if (error && typeof error !== "boolean") return <Error message={error} />;
  return (
    <section className="container font-sans py-4 px-4 sm:px-8 md:px-16 mx-auto">
      <div className="grid gap-8">
        <div>
          <div className="flex justify-between items-center mb-2 sm:mb-0">
            <h1 className="text-transparent bg-clip-text bg-gradient-to-b from-orange-500 to-orange-300 font-bold text-2xl">
              Mundial
            </h1>
            <div className="flex gap-1.5 sm:gap-2 items-center">
              <select
                onChange={handleTorneioAnoChange}
                value={ano}
                className="bg-azul-950 text-orange-400 font-semibold pl-2 pr-px sm:pl-3 text-xs sm:text-sm  sm:pr-1 py-2 rounded-md shadow-md outline-none 
              focus:ring-2 focus:ring-sky-800 hover:bg-azul-800 transition-all duration-200"
              >
                <option value={ano} disabled>
                  {ano}
                </option>
                {anos.map((a) => (
                  <option key={a} value={a} className="text-white">
                    {a}
                  </option>
                ))}
              </select>
              {role !== "admin" ? (
                ""
              ) : (
                <Link
                  href={`/mundial/painel-mundial`}
                  title="Painel Mundial"
                  className="bg-azul-950 rounded-sm size-8 sm:size-9 cursor-pointer hover:bg-azul-800 transition-all duration-200 flex items-center justify-center"
                >
                  <MdDashboardCustomize className="text-orange-500 text-lg sm:text-2xl" />
                </Link>
              )}
            </div>
          </div>
          <span className="text-slate-400 text-sm">
            Temporada {torneioSelected?.ano} - Edição {edicaoNumber}
          </span>
        </div>
        <MundialHallOfFame ano={Number(ano)} />
        <div key={ano} className="grid lg:grid-cols-[3fr_1fr] gap-4">
          <MundialResultados
            abaSelecionada={abaSelecionada}
            setAbaSelecionada={setAbaSelecionada}
            torneioSelected={torneioSelected}
            ano={Number(ano)}
          />
          <RankingAnual ano={Number(ano)} geracao="mundial" />
        </div>
        <MundialAnteriores ano={Number(ano)} />
      </div>
    </section>
  );
}
