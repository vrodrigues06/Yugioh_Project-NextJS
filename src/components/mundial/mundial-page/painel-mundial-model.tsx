import React from "react";
import { useMundiais } from "@/hooks/mundial/useMundiais";
import useAllPersonagens from "@/hooks/personagens/useAllPersonagens";
import { useAllTorneios } from "@/hooks/torneios/useAllTorneios";
import { verificarSePodeCriarMundial } from "@/functions/mundial/verificar-pode-criar-mundial";
import { definirParticipantesMundial } from "@/functions/mundial/definir-participantes-mundial";

const PainelMundialModel = () => {
  const { data: mundiais, isLoading: isLoadingMundial, error } = useMundiais();

  const { data: personagens, isLoading: isLoadingPersonagens } =
    useAllPersonagens();
  const { data: allTorneios, isLoading: isLoadingAllTorneios } =
    useAllTorneios();

  const podeCriar = React.useMemo(() => {
    return verificarSePodeCriarMundial(allTorneios, mundiais);
  }, [allTorneios, mundiais]);

  const participantes = React.useMemo(() => {
    if (!podeCriar.ano) return null;
    return definirParticipantesMundial(podeCriar.ano, allTorneios);
  }, [podeCriar.ano, allTorneios]);

  const mundiaisEmAndamento = mundiais.filter(
    (t) => t.status === "em_andamento",
  );
  const isLoading =
    isLoadingMundial || isLoadingPersonagens || isLoadingAllTorneios;

  return {
    isLoading,
    podeCriar,
    mundiaisEmAndamento,
    participantes,
  };
};

export default PainelMundialModel;
