import { Torneio } from "@/@types";
import TorneioResumo from "./torneio-resumo";
import TorneioFinalizado from "../chaves/torneio/torneio-finalizado";

type TorneioResultadosProps = {
  abaSelecionada: string;
  setAbaSelecionada: React.Dispatch<React.SetStateAction<string>>;
  torneioSelected: Torneio;
  ano: number;
};

export default function TorneioResultados({
  abaSelecionada,
  setAbaSelecionada,
  torneioSelected,
  ano,
}: TorneioResultadosProps) {
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
        <TorneioFinalizado torneio={torneioSelected} />
      ) : (
        <TorneioResumo torneio={torneioSelected} ano={ano} />
      )}
    </div>
  );
}
