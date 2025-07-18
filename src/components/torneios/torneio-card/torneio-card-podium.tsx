import { Torneio } from "@/@types";
import { FaMedal, FaTrophy } from "react-icons/fa6";

interface ITorneioCardPodium {
  randomTorneio: Torneio;
}

const TorneioCardPodium = ({ randomTorneio }: ITorneioCardPodium) => {
  if (!randomTorneio) return;

  return (
    <div>
      <p className="text-xs sm:text-sm text-slate-400  mb-2 md:mb-3 relative">
        <span className="w-6 h-px -top-0.5 absolute bg-gradient-to-t from-azul-800 to-azul-300 rounded-md"></span>
        Resultados {randomTorneio?.ano}{" "}
      </p>
      <div className="text-xs sm:text-sm text-azul-150 grid gap-0.5 *:flex *:gap-1 *:items-center">
        <span className="font-semibold mb-2 border-b border-sky-800/50 pb-1">
          {" "}
          <FaTrophy className="text-yellow-300" />
          Campeão:{" "}
          {
            randomTorneio.podium.find((p) => p.classificacao === "Campeao")
              ?.nome
          }
        </span>
        <span className="font-semibold">
          {" "}
          <FaMedal className="text-stone-400" />
          Vice:{" "}
          {
            randomTorneio.podium.find((p) => p.classificacao === "Segundo")
              ?.nome
          }
        </span>
        <span>
          {" "}
          <FaMedal className="text-amber-700" /> Terceiro:{" "}
          {
            randomTorneio.podium.find((p) => p.classificacao === "Terceiro")
              ?.nome
          }
        </span>

        <span>
          {" "}
          <FaMedal className="text-sky-800" /> Quarto:{" "}
          {randomTorneio.podium.find((p) => p.classificacao === "Quarto")?.nome}
        </span>
      </div>
    </div>
  );
};

export default TorneioCardPodium;
