// hooks/pages/useTorneioPage.ts
import React from "react";
import useDragTranslate from "@/hooks/useDragTranslate";
import { useAllTorneios } from "@/hooks/torneios/useAllTorneios";
import { useParams } from "next/navigation";
import { useTorneioByYear } from "@/hooks/torneios/useTorneioByYear";

export function useTorneioPage() {
  const { ref, events, isDragging } = useDragTranslate();
  const { data: allTorneios = [] } = useAllTorneios();

  const { torneio: torneioParam } = useParams();

  const [geracao, ano] =
    typeof torneioParam === "string" ? torneioParam.split("-") : ["", ""];

  const torneiosByGen = React.useMemo(() => {
    return allTorneios.filter((torneio) => torneio.geracao === geracao);
  }, [allTorneios, geracao]);

  const edicaoNumber = React.useMemo(() => {
    return torneiosByGen.length;
  }, [torneiosByGen]);

  const {
    data: torneio,
    isLoading,
    error,
  } = useTorneioByYear(geracao, Number(ano));

  return {
    ref,
    events,
    isDragging,
    geracao,
    ano,
    torneio,
    isLoading,
    error,
    edicaoNumber,
    torneiosByGen,
    allTorneios,
  };
}
