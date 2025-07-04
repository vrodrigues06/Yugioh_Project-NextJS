import { Colocacao, Personagem } from "@/@types/personagem";
import { getCorGeracao } from "@/functions/get-cor-geracao";
import { setEmoji } from "@/functions/setEmoji";
import React from "react";

type DuelistItemCardMundialProps = {
  duelista: string | null;
  personagem: Personagem;
  isPerdedor: boolean;
  isCampeao: boolean;
  hasVencedor: boolean;
  isMatchReady: boolean;
  hasTitulo: boolean;
  titulos: Colocacao[];
  vices: Colocacao[];
  terceiro: Colocacao[];
  quarto: Colocacao[];
  openModal: () => void;
};

export function DuelistItemCardMundial({
  duelista,
  personagem,
  isPerdedor,
  isCampeao,
  hasVencedor,
  isMatchReady,
  hasTitulo,
  titulos,
  vices,
  terceiro,
  quarto,
  openModal,
}: DuelistItemCardMundialProps) {
  const handleClick = () => {
    if (!hasVencedor && isMatchReady) {
      openModal();
    }
  };

  const cardClasses = `
    w-50 h-12 text-xs p-1.5 flex gap-1.5 items-center shadow-2xl border border-transparent transition-all group
    ${
      isPerdedor
        ? "text-slate-500 opacity-50 bg-gradient-to-r from-slate-800 to-slate-700 cursor-default"
        : isCampeao
        ? "bg-gradient-to-r from-orange-500 to-laranja-500 text-white border-white cursor-default"
        : `text-white ${
            hasVencedor || !isMatchReady
              ? "bg-azul-950 cursor-default"
              : "bg-azul-950 cursor-pointer hover:scale-105 hover:border-orange-500"
          }`
    }
  `;

  const avatarClasses = `
    size-8 rounded-full bg-cover bg-top border transition-all
    ${
      isPerdedor
        ? "border-slate-500"
        : isCampeao
        ? "border-white"
        : hasVencedor || !isMatchReady
        ? "border-sky-300"
        : "border-sky-300 group-hover:border-orange-500"
    }
  `;

  const corGeracao = getCorGeracao(personagem?.geracao);

  return (
    <div onClick={handleClick} className={cardClasses}>
      <div
        className={avatarClasses}
        style={{ backgroundImage: `url(${personagem?.perfil})` }}
      ></div>

      <div className="grid gap-0.5">
        <h1 className="flex gap-1">
          {duelista}
          <span className={`font-semibold ${corGeracao}`}>
            ({personagem.geracao.toUpperCase()})
          </span>
        </h1>
        <div className="flex gap-1 mb-1 flex-wrap items-center">
          {hasTitulo && (
            <span
              className={`text-xs ${
                isCampeao ? "text-orange-100" : "text-slate-600"
              }`}
            >
              Mundial |
            </span>
          )}
          <div className="flex gap-1">
            {titulos.map((t, i) => (
              <span key={i}>{setEmoji("Mundial-C")}</span>
            ))}
          </div>
          <div className="flex gap-1">
            {vices.map((t, i) => (
              <span key={i}>{setEmoji("Mundial-V")}</span>
            ))}
          </div>
          <div className="flex gap-1">
            {terceiro.map((t, i) => (
              <span key={i}>{setEmoji(t.classificacao)}</span>
            ))}
          </div>
          <div className="flex gap-1">
            {quarto.map((t, i) => (
              <span key={i}>{setEmoji(t.classificacao)}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
