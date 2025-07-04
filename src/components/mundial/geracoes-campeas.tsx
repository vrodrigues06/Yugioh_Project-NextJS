// components/GeracoesCampeas.tsx
import { Mundial } from "@/@types";
import { Personagem } from "@/@types/personagem";
import React from "react";

interface GeracoesCampeasProps {
  mundiais: Mundial[];
  allPersonagens: Personagem[];
  anoLimite: number;
}

const getTagColorClass = (geracao: string) => {
  switch (geracao.toLowerCase()) {
    case "gx":
      return "bg-gradient-to-br from-purple-700 to-purple-500 text-white";
    case "dm":
      return "bg-gradient-to-br from-orange-600 to-yellow-400 text-white";
    case "5ds":
      return "bg-gradient-to-br from-sky-400 to-blue-600 text-white";
    default:
      return "bg-gradient-to-br from-yellow-300 to-yellow-500 text-black";
  }
};

const GeracoesCampeas: React.FC<GeracoesCampeasProps> = ({
  mundiais,
  allPersonagens,
  anoLimite,
}) => {
  const torneiosFiltedByGen = mundiais
    .filter((torneio) => torneio.ano <= anoLimite)
    .reverse();

  const geracoesCampeasCount = torneiosFiltedByGen.reduce((acc, torneio) => {
    const campeao = torneio.podium.find((p) => p.classificacao === "Campeao");
    if (!campeao) return acc;

    const personagem = allPersonagens.find((p) => p.nome === campeao.nome);
    if (!personagem || !personagem.geracao) return acc;

    acc[personagem.geracao] = (acc[personagem.geracao] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <ul className="flex gap-2 flex-wrap">
      {Object.entries(geracoesCampeasCount)
        .sort((a, b) => b[1] - a[1]) // ordena por número de títulos (desc)
        .map(([geracao, count]) => (
          <li key={geracao} className="flex flex-col items-center gap-1">
            <span
              className={`px-2 py-0.5 text-xs font-bold rounded-4xl shadow-2xl ${getTagColorClass(
                geracao,
              )}`}
            >
              {geracao.toUpperCase()}
            </span>
            <span className="text-white text-sm">{count}x</span>
          </li>
        ))}
    </ul>
  );
};

export default GeracoesCampeas;
