import { Match } from "@/@types";
import { Colocacao, Personagem, Rivalidades } from "@/@types/personagem";
import { getCorGeracao } from "@/functions/get-cor-geracao";
import { setEmoji } from "@/functions/setEmoji";
import React from "react";
import { GiBurningSkull, GiLaurelCrown, GiMightyForce } from "react-icons/gi";
import { LuSwords } from "react-icons/lu";

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
  match: Match;
  rivalidades: Rivalidades[];
  isAvengedDuel: boolean;
  isLastChampion: boolean;
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
  rivalidades,
  match,
  isAvengedDuel,
  isLastChampion,
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

  const posicaoDuelista =
    match.duelista1 === duelista
      ? "duelista1"
      : match.duelista2 === duelista
      ? "duelista2"
      : null;

  const oponente =
    posicaoDuelista === "duelista1" ? match.duelista2 : match.duelista1;

  const isRival =
    rivalidades.length > 0 &&
    oponente &&
    rivalidades.some((r) => r.duelista2 === oponente);

  const posicaoIconeRivalidade =
    posicaoDuelista === "duelista1" ? "-bottom-3" : "-top-4";

  return (
    <div onClick={handleClick} className={cardClasses}>
      {isRival && (
        <span
          title="Duelo Clássico"
          className={`
            absolute z-20 ${posicaoIconeRivalidade} -right-1
            animate-pulse bg-red-900 rounded-full p-1
            flex items-center justify-center
          `}
        >
          <LuSwords className="text-cyan-400  drop-shadow-glow text-lg animate-bounce-slow" />
        </span>
      )}
      {isAvengedDuel && (
        <span
          title="Duelo de Vingança"
          className={`animate-pulse
                    absolute z-20 right-2
                    bg-red-900 rounded-full p-1
                    flex items-center justify-center
                    `}
        >
          <GiBurningSkull />
        </span>
      )}
      {isLastChampion && (
        <span
          title="Último Campeão"
          className={`animate-pulse
                    absolute z-20 right-2
                    bg-laranja-500 rounded-full p-1
                    flex items-center justify-center
                    `}
        >
          <GiLaurelCrown />
        </span>
      )}
      {hasVencedor && match.vencedor === duelista && match.isDueloAmazing && (
        <span
          title="Duelo Incrível"
          className={`animate-pulse
                    absolute z-20 right-8
                    bg-purple-900 rounded-full p-1
                    flex items-center justify-center
                    `}
        >
          <GiMightyForce />
        </span>
      )}

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
