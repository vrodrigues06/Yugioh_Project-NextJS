import { Torneio } from "@/@types";
import { FaCrown } from "react-icons/fa6";

const TorneiosAnterioresItem = ({ torneio }: { torneio: Torneio }) => {
  const duelistas = torneio.classificacao.length;

  return (
    <div className="group-hover:border-sky-800 bg-blue-950 p-2 rounded-md border border-sky-800/30 shadow-2xl">
      <h3 className="text-orange-500 mb-2">{torneio.nome}</h3>
      <p className="flex gap-1 items-center">
        <FaCrown className="text-yellow-500" /> Campeão:{" "}
        {torneio.podium.find((p) => p.classificacao === "Campeao")?.nome ||
          "Não definido"}
      </p>
      <span className="block text-slate-400 mb-3">{duelistas} Duelistas</span>
      <ul>
        {["Segundo", "Terceiro", "Quarto"].map((posicao, index) => {
          const participante = torneio.podium.find(
            (p) => p.classificacao === posicao,
          );
          if (!participante) return null;
          return (
            <li className="text-slate-400" key={participante.nome}>
              <span className="font-bold">{index + 2}°</span>{" "}
              {participante.nome}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TorneiosAnterioresItem;
