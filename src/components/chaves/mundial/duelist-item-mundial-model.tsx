import { useEffect, useState, useMemo } from "react";
import { Match, Mundial, Torneio } from "@/@types";
import { Personagem, Rivalidades } from "@/@types/personagem";
import useAllRankings from "@/hooks/rankings/useAllRankings";
import { useHandleMatchMundial } from "@/hooks/mundial/useHandleMatchMundial";
import { getPerdedor } from "@/functions/getPerdedor";
import { findRankingIndex } from "@/functions/findRankingIndex";
import { setMelhoresColocacoes } from "@/functions/setMelhoresColocacoes";
import { getPersonagemByName } from "@/_lib/apis/personagens-api";
import { getResumoPersonagemMundial } from "@/functions/chaves-torneio/getResumoPersonagemMundial";
import { useMundialByYear } from "@/hooks/mundial/useMundialByYear";
import { useMundiais } from "@/hooks/mundial/useMundiais";
import { setRivalidades } from "@/functions/set-rivalidades";
import { filtrarRivalidadesEmDestaque } from "@/functions/filtrar-rivalidades-destaque";

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
  const { data: torneioAnterior } = useMundialByYear(torneio.ano - 1);
  const { data: torneios } = useMundiais();

  const { data: rankings, error } = useAllRankings();

  useEffect(() => {
    async function fetchPersonagem() {
      if (duelista === null) return;
      const personagemData = await getPersonagemByName(duelista);
      setPersonagem(personagemData);
    }

    fetchPersonagem();
  }, [duelista]);

  const oponenteAtual =
    match.duelista1 === duelista ? match.duelista2 : match.duelista1;

  const isAvengedDuel = (() => {
    if (!torneioAnterior || !torneioAnterior.classificacao) return false;

    const registroAnterior = torneioAnterior.classificacao.find(
      (c) => c.nome === duelista,
    );

    if (!registroAnterior?.eliminadoPor) return false;

    return registroAnterior?.eliminadoPor === oponenteAtual;
  })();

  const isLastChampion = (() => {
    if (!torneioAnterior || !torneioAnterior.podium) return false;

    const registroAnterior = torneioAnterior.podium.find(
      (p) => p.nome === duelista,
    );

    if (!registroAnterior) return false;

    return registroAnterior.classificacao === "Campeao";
  })();

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

  const torneiosFilted = torneios.filter((t) => t.ano < torneio.ano);

  let rivalidades: Rivalidades[] = [];
  if (personagem !== null) {
    const rivalidadesSemFiltro =
      setRivalidades(personagem, torneiosFilted) || [];

    rivalidades = filtrarRivalidadesEmDestaque(rivalidadesSemFiltro);
  }

  const eliminadoresAnteriores: { eliminadoPor: string; ano: number }[] =
    useMemo(() => {
      if (!duelista || !torneios) return [];

      const anosValidos = torneios.map((t) => {
        if (t.ano >= Number(personagem?.inicio_em)) {
          return t.ano;
        }
      });

      return anosValidos
        .map((ano) => {
          const t = torneios.find((t) => t.ano === ano && t.classificacao);
          const eliminadoPor = t?.classificacao.find(
            (c) => c.nome === duelista,
          )?.eliminadoPor;

          return eliminadoPor ? { eliminadoPor, ano } : null;
        })
        .filter(
          (entry): entry is { eliminadoPor: string; ano: number } => !!entry,
        );
    }, [torneios, duelista, personagem?.inicio_em]);

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
    isAvengedDuel,
    isLastChampion,
    rivalidades,
    eliminadoresAnteriores,
  };
};
