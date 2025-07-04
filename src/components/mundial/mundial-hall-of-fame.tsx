"use client";
import React from "react";
import { motion } from "framer-motion";
import { setEmoji } from "@/functions/setEmoji";
import { useMundiais } from "@/hooks/mundial/useMundiais";
import useAllPersonagens from "@/hooks/personagens/useAllPersonagens";
import GeracoesCampeas from "./geracoes-campeas";
import { getCorGeracao } from "@/functions/get-cor-geracao";

interface IMundialHallOfFame {
  ano: number;
}

const MundialHallOfFame = ({ ano }: IMundialHallOfFame) => {
  const { data: mundiais, error } = useMundiais();
  const { data: allPersonagens, error: errorPersonagens } = useAllPersonagens();

  if (!mundiais) return;

  const torneiosFiltedByGen = mundiais
    .filter((torneio) => torneio.ano <= ano)
    .reverse();

  const campeoesLista = torneiosFiltedByGen.flatMap((t) =>
    t.podium.filter((p) => p.classificacao === "Campeao").map((p) => p.nome),
  );

  const campeoesComTitulos = campeoesLista.reduce((acc, nome) => {
    const existente = acc.find((item) => item.nome === nome);
    if (existente) {
      existente.titulos += 1;
    } else {
      acc.push({ nome, titulos: 1 });
    }
    return acc;
  }, [] as { nome: string; titulos: number }[]);

  const campeoesComTitulosSorted = campeoesComTitulos.sort(
    (a, b) => b.titulos - a.titulos,
  );

  if (!campeoesComTitulosSorted) return;

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-azul-950 rounded-md p-4 shadow transition-colors border border-transparent hover:border-orange-500"
    >
      <div className="flex justify-between">
        <h3 className="font-bold uppercase self-start relative text-white mb-4">
          <span className="w-8 h-px -bottom-0 absolute bg-gradient-to-b from-orange-800 to-orange-300 "></span>
          Hall Of Fame
        </h3>
        <div>
          <GeracoesCampeas
            mundiais={mundiais}
            allPersonagens={allPersonagens}
            anoLimite={ano}
          />
        </div>
      </div>
      <ul className="divide-y divide-sky-300/10">
        <ul className="divide-y divide-sky-300/10">
          {campeoesComTitulosSorted.map((c) => {
            const personagem = allPersonagens?.find((p) => p.nome === c.nome);
            const geracao = personagem?.geracao?.toUpperCase() || "";
            const corGeracao = getCorGeracao(personagem?.geracao);
            return (
              <li key={c.nome} className="flex gap-1.5 py-1 items-center">
                <span className="text-white">
                  {c.nome}{" "}
                  {geracao && (
                    <span className={`${corGeracao} text-xs font-semibold`}>
                      ({geracao})
                    </span>
                  )}
                </span>
                <div className="flex gap-1 items-center">
                  {Array.from({ length: c.titulos }, (_, index) => (
                    <span key={index}>{setEmoji("Campeao")}</span>
                  ))}
                </div>
              </li>
            );
          })}
        </ul>
      </ul>
    </motion.div>
  );
};

export default MundialHallOfFame;
