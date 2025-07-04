import { useEffect, useState, useMemo } from "react";
import { Match, Torneio } from "@/@types";
import { Personagem, Rivalidades } from "@/@types/personagem";
import useAllRankings from "@/hooks/rankings/useAllRankings";
import { getPersonagemByName } from "@/_lib/apis/personagens-api";
import { useHandleMatch } from "@/hooks/torneios/useHandleMatch";
import { getPerdedor } from "@/functions/getPerdedor";
import { getResumoPersonagem } from "@/functions/chaves-torneio/getResumoDoPersonagem";
import useRankingByYear from "@/hooks/rankings/useRankingByYear";
import { useTorneiosByGen } from "@/hooks/torneios/useTorneiosByGen";
import { setRivalidades } from "@/functions/set-rivalidades";
import { filtrarRivalidadesEmDestaque } from "@/functions/filtrar-rivalidades-destaque";
import { useTorneioByYear } from "@/hooks/torneios/useTorneioByYear";

export const DuelistItemModel = ({
  duelista,
  match,
  torneio,
}: {
  duelista: string | null;
  match: Match;
  torneio: Torneio;
}) => {
  const [personagem, setPersonagem] = useState<Personagem | null>(null);
  const { handleMatch } = useHandleMatch({
    duelista,
    match,
    torneio,
  });

  const { data: ranking } = useRankingByYear(torneio.ano - 1, torneio.geracao);
  const { data: torneios } = useTorneiosByGen(torneio.geracao);
  const { data: torneioAnterior } = useTorneioByYear(
    torneio.geracao,
    torneio.ano - 1,
  );

  const oponenteAtual =
    match.duelista1 === duelista ? match.duelista2 : match.duelista1;

  const isAvengedDuel = (() => {
    if (!torneioAnterior || !torneioAnterior.classificacao) return false;

    const registroAnterior = torneioAnterior.classificacao.find(
      (c) => c.nome === duelista,
    );

    return registroAnterior?.eliminadoPor === oponenteAtual;
  })();

  const torneiosFilted = torneios.filter((t) => t.ano < torneio.ano);

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
    rankingNacional,
    melhoresColocacoes,
    colocacoesAnteriores,
    titulos,
    vices,
    terceiro,
    quarto,
    hasTitulo,
  } = useMemo(
    () => getResumoPersonagem(personagem, ranking, torneio.ano),
    [personagem, ranking, torneio.ano],
  );

  let rivalidades: Rivalidades[] = [];
  if (personagem !== null) {
    const rivalidadesSemFiltro =
      setRivalidades(personagem, torneiosFilted) || [];

    rivalidades = filtrarRivalidadesEmDestaque(rivalidadesSemFiltro);
  }

  const eliminadoresAnteriores: string[] = useMemo(() => {
    if (!duelista || !torneios) return [];

    const anosValidos = [1, 2, 3].map((i) => torneio.ano - i);

    return anosValidos
      .map((ano) => {
        const t = torneios.find((t) => t.ano === ano && t.classificacao);
        return (
          t?.classificacao.find((c) => c.nome === duelista)?.eliminadoPor ||
          null
        );
      })
      .filter((nome): nome is string => !!nome);
  }, [torneios, duelista, torneio.ano]);

  return {
    personagem,
    handleMatch,
    isPerdedor,
    hasVencedor,
    isMatchReady,
    isCampeao,
    rankingNacional,
    melhoresColocacoes,
    colocacoesAnteriores,
    titulos,
    vices,
    terceiro,
    quarto,
    hasTitulo,
    rivalidades,
    isAvengedDuel,
    eliminadoresAnteriores,
  };
};
