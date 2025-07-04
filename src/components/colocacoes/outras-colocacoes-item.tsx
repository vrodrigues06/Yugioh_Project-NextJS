import React from "react";
import { Classificacao } from "../../@types";
import useRankingByYear from "@/hooks/rankings/useRankingByYear";
import Error from "@/components/error";
import Link from "next/link";
import Perfil from "../personagens/personagem/perfil";
import useAllPersonagens from "@/hooks/personagens/useAllPersonagens";

interface IOutrasColocacoesItem {
  colocacao: Classificacao;
  ano: number;
  geracao: string;
}

const OutrasColocacoesItem = ({
  colocacao,
  ano,
  geracao,
}: IOutrasColocacoesItem) => {
  const { nome } = colocacao;

  const { data: ranking, error: errorRanking } = useRankingByYear(ano, geracao);
  const { data: personagens, error: errorPersonagens } = useAllPersonagens();

  const error = errorPersonagens || errorRanking;

  const personagem = React.useMemo(() => {
    return personagens.find((p) => p.nome === nome);
  }, [personagens, nome]);

  if (error) return <Error message={error} />;
  if (!personagem) return null;

  const pontos = ranking?.ranking.find((c) => c.nome === nome);

  return (
    <Link
      className="group mb-2"
      href={`/personagens/${personagem.geracao}/${personagem.id}`}
    >
      <div className="group-hover:border-orange-500 transition-all group-hover:scale-105 border border-transparent  bg-blue-950 p-2 rounded-sm flex items-start gap-1">
        <Perfil personagem={personagem} size="12" />
        <div className="w-full">
          <div className="flex flex-col sm:flex-row justify-between text-sm sm:text-md">
            <h4>{nome}</h4>
            <span className="bg-clip-text bg-gradient-to-b from-slate-600 to-slate-300 text-transparent ">
              {pontos?.pontos}Pts
            </span>
          </div>
          <span className="text-slate-400 text-xs sm:text-sm">
            Deck: {personagem.deckName}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default OutrasColocacoesItem;
