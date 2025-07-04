import { useEffect, useState, useMemo } from "react";
import { Match, Mundial, Torneio } from "@/@types";
import { Personagem } from "@/@types/personagem";
import useAllRankings from "@/hooks/rankings/useAllRankings";
import { useHandleMatchMundial } from "@/hooks/mundial/useHandleMatchMundial";
import { getPerdedor } from "@/functions/getPerdedor";
import { findRankingIndex } from "@/functions/findRankingIndex";
import { setMelhoresColocacoes } from "@/functions/setMelhoresColocacoes";
import { getPersonagemByName } from "@/_lib/apis/personagens-api";
import { getResumoPersonagemMundial } from "@/functions/chaves-torneio/getResumoPersonagemMundial";

export const DuelistItemMundialModel = ({
  duelista,
  match,
  torneio,
}: {
  duelista: string | null;
  match: Match;
  torneio: Mundial;
}) => {
  const [personagem, setPersonagem] = useState<Personagem | null>(null);
  const { handleMatch } = useHandleMatchMundial({
    duelista,
    match,
    torneio,
  });

  const { data: rankings, error } = useAllRankings();

  useEffect(() => {
    async function fetchPersonagem() {
      if (duelista === null) return;
      const personagemData = await getPersonagemByName(duelista);
      setPersonagem(personagemData);
    }

    fetchPersonagem();
  }, [duelista]);

  const perdedor = useMemo(() => getPerdedor(match), [match]);
  const isPerdedor = duelista === perdedor;
  const hasVencedor = !!match.vencedor;
  const isMatchReady = match.duelista1 !== null && match.duelista2 !== null;
  const campeao = torneio.podium.find((p) => p.classificacao === "Campeao");
  const isCampeao = campeao?.nome === duelista;

  const {
    rankingMundial,
    melhoresColocacoes,
    colocacoesAnteriores,
    titulos,
    vices,
    terceiro,
    quarto,
    colocacoesAnterioresMundial,
    melhoresColocacoesMundial,
    hasTitulo,
  } = useMemo(
    () => getResumoPersonagemMundial(personagem, rankings),
    [personagem, rankings],
  );

  return {
    personagem,
    handleMatch,
    isPerdedor,
    hasVencedor,
    isMatchReady,
    isCampeao,
    rankingMundial,
    melhoresColocacoes,
    colocacoesAnteriores,
    titulos,
    vices,
    colocacoesAnterioresMundial,
    melhoresColocacoesMundial,
    terceiro,
    quarto,
    hasTitulo,
  };
};
