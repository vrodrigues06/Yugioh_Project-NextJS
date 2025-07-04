import React from "react";
import { Personagem } from "../../@types/personagem";
import useRankingByYear from "@/hooks/rankings/useRankingByYear";
import Link from "next/link";
import Perfil from "../personagens/personagem/perfil";

interface IPodiumItem {
  ano: number;
  geracao: string;
  duelista: Personagem;
}

const Vice = ({ ano, geracao, duelista }: IPodiumItem) => {
  const { data: ranking, error, isLoading } = useRankingByYear(ano, geracao);

  if (!ranking) return;

  const pontos = ranking.ranking.find((p) => p.nome === duelista.nome);

  return (
    <Link
      className="group"
      href={`/personagens/${duelista.geracao}/${duelista.id}`}
    >
      <div className="group-hover:border-orange-500 transition-all group-hover:scale-105 bg-gradient-to-r from-azul-950 to-azul-700 p-2 sm:p-4 rounded-md flex gap-2 items-center border border-sky-300">
        <div className="relative">
          <Perfil personagem={duelista} size="16" />
        </div>
        <div className="w-full text-sm sm:text-md">
          <div className="flex flex-col xs:flex-row xs:justify-between flex-wrap xs:items-center ">
            <h4> Vice: {duelista?.nome}</h4>
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-orange-500 to-orange-300">
              {pontos?.pontos}Pts
            </span>
          </div>
          <span className="text-slate-400">Deck: {duelista?.deckName}</span>
        </div>
      </div>
    </Link>
  );
};

export default Vice;
