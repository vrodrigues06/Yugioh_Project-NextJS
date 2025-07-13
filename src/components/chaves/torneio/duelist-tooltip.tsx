import { Colocacao, Personagem, Rivalidades } from "@/@types/personagem";
import { setEmoji } from "@/functions/setEmoji";
import React from "react";

type PersonagemTooltipProps = {
  personagem: Personagem;
  rankingNacional: number | null;
  melhoresColocacoes: Colocacao[];
  colocacoesAnteriores: Colocacao[];
  rivalidades: Rivalidades[];
  eliminadoresAnteriores: { eliminadoPor: string; ano: number }[];
};

export default function DuelistToolTip({
  personagem,
  rankingNacional,
  melhoresColocacoes,
  colocacoesAnteriores,
  rivalidades,
  eliminadoresAnteriores,
}: PersonagemTooltipProps) {
  if (!personagem) return null;

  return (
    <div className="absolute z-50 w-60 p-3 bg-azul-950/80 text-slate-400 text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none left-1/2 -translate-x-1/2 top-14">
      <div className="flex justify-between mb-4 border-b pb-1.5 border-sky-300/80">
        <h2 className="font-semibold text-orange-500 text-sm flex flex-col gap-px">
          {personagem.nome}
          <span className="text-[10px] text-slate-500">
            {personagem.deckName}
          </span>
        </h2>
        <span>
          Ranking <span className="text-white">#{rankingNacional}</span>
        </span>
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

      {rivalidades.length > 0 && (
        <div className="mb-4">
          <p className="mb-1">Rivals:</p>
          {rivalidades.map((rival) => (
            <span
              key={rival.duelista2}
              className="flex gap-0.5 items-center text-white font-semibold"
            >
              {rival.duelista2}
            </span>
          ))}
        </div>
      )}

      <div>
        <p className="mb-1">Histórico Recente:</p>
        <ul className="grid gap-1">
          {colocacoesAnteriores.map((c) => {
            const eliminador = eliminadoresAnteriores.find(
              (e) => e.ano === Number(c.ano),
            );

            return (
              <li
                key={c.ano}
                className="flex flex-col text-white leading-tight"
              >
                <span className="flex items-center gap-1">
                  <span className="text-sky-400 font-semibold">{c.ano}:</span>
                  {setEmoji(c.classificacao)} {c.classificacao}
                </span>

                {eliminador && (
                  <span className="text-slate-500 text-xs italic">
                    eliminado por{" "}
                    <span className="text-rose-400">
                      {eliminador.eliminadoPor}
                    </span>
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
