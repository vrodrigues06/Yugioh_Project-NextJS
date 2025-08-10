"use client";
import Loading from "@/components/loading";
import MundialEmAndamento from "@/components/mundial/mundial-em-andamento";
import MundialIndisponivel from "@/components/mundial/mundial-indisponivel";
import PainelMundialModel from "@/components/mundial/mundial-page/painel-mundial-model";
import GerarMundial from "@/components/mundial/mundial-page/v1/gerar-mundial";

export default function PainelMundialPage() {
  const { isLoading, podeCriar, mundiaisEmAndamento, participantes } =
    PainelMundialModel();

  if (isLoading) return <Loading />;

  return (
    <section className="container font-sans py-4 px-4 sm:px-8 md:px-16 mx-auto">
      <h1 className="text-lg sm:text-2xl text-white font-bold mb-1">
        Painel de Torneios Mundiais
      </h1>
      <p className="text-xs sm:text-sm text-slate-400 mb-4 sm:mb-16">
        Gerencie os torneios mundiais desde a sua concepção e desfecho final!.
      </p>
      {podeCriar.liberado ? (
        <GerarMundial ano={podeCriar.ano} participantes={participantes} />
      ) : (
        <MundialIndisponivel />
      )}
      <MundialEmAndamento mundiaisEmAndamento={mundiaisEmAndamento} />
    </section>
  );
}
