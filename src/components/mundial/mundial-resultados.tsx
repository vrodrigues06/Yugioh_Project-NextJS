import { Mundial } from "@/@types";
import MundialResumo from "./mundial-resumo";
import TorneioFinalizado from "../chaves/mundial/mundial-finalizado";
import MundialFinalizado from "../chaves/mundial/mundial-finalizado";

type MundialResultadosProps = {
  abaSelecionada: string;
  setAbaSelecionada: React.Dispatch<React.SetStateAction<string>>;
  torneioSelected: Mundial;
  ano: number;
};

export default function MundialResultados({
  abaSelecionada,
  setAbaSelecionada,
  torneioSelected,
  ano,
}: MundialResultadosProps) {
  return (
    <div className="overflow-hidden">
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <button
          onClick={() => setAbaSelecionada("resultados")}
          className={`w-full sm:w-auto px-4 py-2 rounded-md font-semibold cursor-pointer
  ${
    abaSelecionada === "resultados"
      ? "bg-orange-500 text-white"
      : "bg-slate-800 text-slate-300"
  }`}
        >
          Resultados
        </button>

        {torneioSelected.matches.length !== 0 && (
          <button
            onClick={() => setAbaSelecionada("chaves")}
            className={`w-full sm:w-auto px-4 py-2 rounded-md font-semibold cursor-pointer
    ${
      abaSelecionada === "chaves"
        ? "bg-orange-500 text-white"
        : "bg-slate-800 text-slate-300"
    }`}
          >
            Chave Final
          </button>
        )}
      </div>

      {abaSelecionada === "chaves" ? (
        <MundialFinalizado torneio={torneioSelected} />
      ) : (
        <MundialResumo torneio={torneioSelected} ano={ano} />
      )}
    </div>
  );
}
