import { Colocacao, Personagem } from "@/@types/personagem";
import { setEmoji } from "@/functions/setEmoji";
import React from "react";

type DuelistMundialTooltipProps = {
  personagem: Personagem;
  rankingMundial: number | null;
  melhoresColocacoes: Colocacao[];
  colocacoesAnterioresMundial: Colocacao[];
  colocacoesAnteriores: Colocacao[];
};

export function DuelistMundialTooltip({
  personagem,
  rankingMundial,
  melhoresColocacoes,
  colocacoesAnterioresMundial,
  colocacoesAnteriores,
}: DuelistMundialTooltipProps) {
  return (
    <div className="absolute z-50 w-60 p-3 bg-azul-950/80 text-slate-400 text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none left-1/2 -translate-x-1/2 top-14">
      <div className="flex justify-between mb-4 border-b pb-1.5 border-sky-300/80">
        <h2 className="font-semibold text-orange-500 text-sm flex flex-col gap-px">
          {personagem?.nome}
          <span className="text-[10px] text-slate-500">
            {personagem?.deckName}
          </span>
        </h2>

        {rankingMundial !== null && rankingMundial > 0 && (
          <div className="flex flex-col gap-0.5">
            <span>
              Ranking <span className="text-white">#{rankingMundial}</span>
            </span>
            <div>
              <p>Part: #{personagem.participacoes_mundial}</p>
            </div>
          </div>
        )}
      </div>

      {melhoresColocacoes.length > 0 && (
        <div className="mb-4">
          <p className="mb-1">Títulos:</p>
          {melhoresColocacoes.map((colocacao) => (
            <span
              key={colocacao.ano}
              className="flex gap-0.5 items-center text-white font-semibold"
            >
              {setEmoji(colocacao.classificacao)}
              {personagem.geracao.toUpperCase()} {colocacao.ano}
            </span>
          ))}
        </div>
      )}

      {colocacoesAnterioresMundial.length > 0 && (
        <div className="mb-4">
          <p className="mb-1">
            Histórico Recente: <span className="text-white">(mundial)</span>
          </p>
          <ul className="grid gap-1">
            {colocacoesAnterioresMundial.map((c) => (
              <li key={c.ano} className="flex gap-0.5 items-center text-white">
                <span className="text-sky-400 font-semibold">{c.ano}:</span>
                {setEmoji(c.classificacao)} {c.classificacao}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <p className="mb-1">
          Histórico Recente: <span className="text-white">(nacional)</span>
        </p>
        <ul className="grid gap-1">
          {colocacoesAnteriores.map((c) => (
            <li key={c.ano} className="flex gap-0.5 items-center text-white">
              <span className="text-sky-400 font-semibold">{c.ano}:</span>
              {setEmoji(c.classificacao)} {c.classificacao}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
