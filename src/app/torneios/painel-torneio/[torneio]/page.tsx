"use client";
import React from "react";
import { motion } from "framer-motion";
import Error from "@/components/error";
import Loading from "@/components/loading";
import Link from "next/link";
import Identificador from "@/components/chaves/identificador";
import MatchBracket from "@/components/chaves/torneio/match-bracket";
import NenhumTorneio from "@/components/nenhum-torneio";
import { useTorneioPage } from "@/hooks/pages/use-torneio-pages";
import { prepareRounds } from "@/functions/chaves-torneio/prepareRounds";
import FinalETerceiroLugar from "@/components/chaves/final-e-terceiro";
import PreliminarDouble from "@/components/chaves/torneio/preliminar-double";
import PreliminarSingle from "@/components/chaves/torneio/preliminar-single";

export default function Torneio() {
  const { ref, events, isDragging, torneio, isLoading, error, edicaoNumber } =
    useTorneioPage();

  if (isLoading) return <Loading />;
  if (error) return <Error message={error.message} />;
  if (!torneio) return <NenhumTorneio />;

  const { nome } = torneio;
  const { preliminares, rounds, brackets } = prepareRounds(torneio);

  return (
    <motion.section
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      {...events}
      className={`overflow-x-hidden  mt-16 py-12 border-t border-slate-700 cursor-${
        isDragging ? "grabbing" : "grab"
      }`}
    >
      <Link
        href={"/torneios/painel-torneio"}
        className="text-orange-500 text-xs hover:underline justify-self-start mb-4 block p-2"
      >
        🠔 Voltar para o Painel de Torneios
      </Link>
      <div className="flex flex-col items-center bg-azul-800 p-4 rounded-md overflow-hidden">
        <div className="grid justify-center">
          <h1 className="text-4xl text-transparent bg-clip-text bg-gradient-to-b from-orange-500 to-orange-300 font-bold ">
            {nome}
          </h1>
          <span className="text-slate-400 opacity-70 text-sm text-center">
            Edição #{edicaoNumber}
          </span>
        </div>

        <div className="flex gap-14  ml-6" ref={ref}>
          {rounds.map((round, roundIdx) => (
            <div key={roundIdx} className="grid gap-4 relative">
              <Identificador roundIdx={roundIdx} totalRounds={rounds.length} />
              {round.map((duelo, idx) => {
                const isFinal = roundIdx === rounds.length - 1;

                const matchTerceiro = brackets.find(
                  (partida) => partida.rodada === "Disputa 3º Lugar",
                );

                if (isFinal)
                  return (
                    <FinalETerceiroLugar
                      key={duelo.id}
                      duelo={duelo}
                      matchTerceiro={matchTerceiro}
                      idx={idx}
                      roundIdx={roundIdx}
                      isFinal={isFinal}
                      torneio={torneio}
                    />
                  );

                // Se a Preliminar tem dois Duelistas

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
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
