"use client";

import { useMundiais } from "@/hooks/mundial/useMundiais";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";

export default function useMundialPageModel(ano: string) {
  const { data: mundiais, error: apiError, isLoading } = useMundiais();
  const [abaSelecionada, setAbaSelecionada] = React.useState("resultados");
  const router = useRouter();

  const mundialFilted = mundiais.filter((m) => m.status === "finalizado");

  const anos = useMemo(() => {
    return mundialFilted
      .filter((t) => t.ano !== Number(ano))
      .map((torneio) => torneio.ano)
      .sort((a, b) => b - a); // Garantindo que o maior ano venha primeiro
  }, [mundialFilted, ano]);

  const torneiosSorted = useMemo(() => {
    return mundialFilted.sort((torneioA, torneioB) => {
      const yearA = parseInt(torneioA.nome.slice(-4));
      const yearB = parseInt(torneioB.nome.slice(-4));
      return yearB - yearA;
    });
  }, [mundialFilted]);

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

  function handleTorneioAnoChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const anoSelecionado = event.target.value;
    router.push(`/mundial/${anoSelecionado}`);
  }

  return {
    torneioSelected,
    edicaoNumber,
    anos,
    error,
    isLoading,
    abaSelecionada,
    setAbaSelecionada,
    handleTorneioAnoChange,
  };
}
