import { useAllTorneios } from "@/hooks/torneios/useAllTorneios";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo } from "react";

export const useTorneioPageModal = (geracao: string, ano: string) => {
  const { data: allTorneios, error: apiError } = useAllTorneios();
  const [abaSelecionada, setAbaSelecionada] = React.useState("resultados");
  const router = useRouter();

  const torneiosByGen = useMemo(() => {
    return allTorneios.filter(
      (torneio) =>
        torneio.geracao === geracao && torneio.status === "finalizado",
    );
  }, [allTorneios, geracao]);

  const anos = useMemo(() => {
    return torneiosByGen
      .filter((t) => t.ano !== Number(ano))
      .map((torneio) => torneio.ano)
      .sort((a, b) => b - a); // Garantindo que o maior ano venha primeiro
  }, [torneiosByGen, ano]);

  function handleTorneioAnoChange({
    target,
  }: React.ChangeEvent<HTMLSelectElement>) {
    const anoSelecionado = target.value;
    router.push(`/torneios/${geracao}/${anoSelecionado}`);
  }

  const torneiosSorted = useMemo(() => {
    return torneiosByGen.sort((torneioA, torneioB) => {
      const yearA = parseInt(torneioA.nome.slice(-4));
      const yearB = parseInt(torneioB.nome.slice(-4));
      return yearB - yearA;
    });
  }, [torneiosByGen]);

  const torneioSelected = torneiosSorted.find(
    (torneio) => torneio.ano === Number(ano),
  );

  const error = torneioSelected === undefined || apiError;

  const edicaoNumber = useMemo(() => {
    if (!torneioSelected) return null;
    return (
      torneiosSorted.length -
      torneiosSorted.findIndex((torneio) => torneioSelected.ano === torneio.ano)
    );
  }, [torneiosSorted, torneioSelected]);

  return {
    geracao,

    torneioSelected,
    edicaoNumber,
    anos,
    handleTorneioAnoChange,
    error,
    abaSelecionada,
    setAbaSelecionada,
  };
};
