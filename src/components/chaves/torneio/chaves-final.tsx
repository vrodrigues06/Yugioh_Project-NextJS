import React from "react";
import { Torneio } from "../../../@types";
import { motion } from "framer-motion";
import useDragTranslate from "@/hooks/useDragTranslate";
import buildRounds from "@/functions/chaves-torneio/buildRounds";
import Identificador from "../identificador";
import MatchBracket from "./match-bracket";
import MatchTerceiro from "./match-terceiro";
import { prepareRounds } from "@/functions/chaves-torneio/prepareRounds";
import PreliminarDouble from "./preliminar-double";
import PreliminarSingle from "./preliminar-single";

type ChavesFinalProps = {
  torneio: Torneio;
};

const ChavesFinal = ({ torneio }: ChavesFinalProps) => {
  const { ref, events, isDragging } = useDragTranslate();

  if (!torneio)
    return (
      <div className="container py-6 text-white text-2xl">
        Nenhum torneio encontrado.
      </div>
    );

  const { preliminares, rounds, brackets } = prepareRounds(torneio);

  const rodadaInicialMatch = brackets.find((b) => b.id === 1);

  if (!rodadaInicialMatch || !rodadaInicialMatch.rodada) {
    return (
      <div className="container py-6 text-white text-2xl">
        Dados da rodada inicial inválidos.
      </div>
    );
  }

  return (
    <div
      {...events}
      className={`flex flex-col items-center  p-4 rounded-md  overflow-hidden  cursor-${
        isDragging ? "grabbing" : "grab"
      }`}
    >
      <div className="flex gap-14  ml-6 scale-[0.90]" ref={ref}>
        {rounds.map((round, roundIdx) => (
          <motion.div
            key={roundIdx}
            className="grid gap-4 relative"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 12,
              delay: roundIdx * 0.15,
            }}
          >
            <Identificador roundIdx={roundIdx} totalRounds={rounds.length} />
            {round.map((duelo, idx) => {
              const isFinal = roundIdx === rounds.length - 1;

              const matchTerceiro = brackets.find(
                (partida) => partida.rodada === "Disputa 3º Lugar",
              );

              if (isFinal) {
                if (!matchTerceiro) return;

                return (
                  <React.Fragment key={duelo.id}>
                    <MatchBracket
                      duelista1={duelo.duelista1}
                      duelista2={duelo.duelista2}
                      match={duelo}
                      index={idx}
                      roundIdx={roundIdx}
                      isFinal={isFinal}
                      torneio={torneio}
                    />

                    <MatchTerceiro
                      duelista1={matchTerceiro.duelista1}
                      duelista2={matchTerceiro.duelista2}
                      match={matchTerceiro}
                      index={idx}
                      roundIdx={roundIdx}
                      isFinal={isFinal}
                      torneio={torneio}
                    />
                  </React.Fragment>
                );
              }

              if (
                duelo.origemDuelista2?.startsWith("Preliminar") &&
                duelo.origemDuelista1?.startsWith("Preliminar")
              ) {
                const duelosPreliminares = preliminares.filter(
                  (p) => p.proxima_partida_id === duelo.id,
                );

                if (!duelosPreliminares.length) return;

                return (
                  <PreliminarDouble
                    key={idx}
                    idx={idx}
                    roundIdx={roundIdx}
                    duelo={duelo}
                    duelosPreliminares={duelosPreliminares}
                    torneio={torneio}
                    isFinal={isFinal}
                  />
                );
              }

              // Se a Preliminar tem apenas um Duelista

              if (duelo.origemDuelista2?.startsWith("Preliminar")) {
                const dueloPreliminar = preliminares.find(
                  (p) => p.proxima_partida_id === duelo.id,
                );

                if (!dueloPreliminar) return;

                return (
                  <PreliminarSingle
                    key={dueloPreliminar.id}
                    idx={idx}
                    roundIdx={roundIdx}
                    duelo={duelo}
                    dueloPreliminar={dueloPreliminar}
                    torneio={torneio}
                    isFinal={isFinal}
                  />
                );
              }

              return (
                <MatchBracket
                  key={duelo.id}
                  duelista1={duelo.duelista1}
                  duelista2={duelo.duelista2}
                  match={duelo}
                  index={idx}
                  roundIdx={roundIdx}
                  isFinal={isFinal}
                  torneio={torneio}
                />
              );
            })}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ChavesFinal;
