import { Rivalidades } from "@/@types/personagem";
import { CiCircleMinus } from "react-icons/ci";
import { FaCaretUp } from "react-icons/fa";

type Props = {
  personagemNome: string;
  rivalidadesEmDestaque: Rivalidades[];
};

export default function RivalidadesItem({
  personagemNome,
  rivalidadesEmDestaque,
}: Props) {
  return (
    <div className="text-xs sm:text-sm text-azul-150 flex flex-col gap-2">
      {rivalidadesEmDestaque.map((r) => {
        const personagemÉDuelista1 = r.duelista1 === personagemNome;
        const vitoriasPersonagem = personagemÉDuelista1
          ? r.vitoriasDuelista1
          : r.vitoriasDuelista2;
        const vitoriasAdversario = personagemÉDuelista1
          ? r.vitoriasDuelista2
          : r.vitoriasDuelista1;
        const adversario = personagemÉDuelista1 ? r.duelista2 : r.duelista1;

        const empate = vitoriasPersonagem === vitoriasAdversario;
        const personagemLidera = vitoriasPersonagem > vitoriasAdversario;

        const resultado = empate ? (
          <>
            <CiCircleMinus className="text-yellow-500" /> Empate por{" "}
            {personagemNome} {vitoriasPersonagem} a {vitoriasAdversario}
          </>
        ) : personagemLidera ? (
          <>
            <FaCaretUp className="text-green-500" /> Vence por {personagemNome}{" "}
            {vitoriasPersonagem} a {vitoriasAdversario}
          </>
        ) : (
          `🔻 Perde por ${personagemNome} ${vitoriasPersonagem} a ${vitoriasAdversario}`
        );

        return (
          <span
            key={adversario}
            className="flex flex-col lg:flex-row lg:items-center gap-1 gap-y-2 lg:gap-1 text-left"
          >
            <div className="flex flex-wrap items-center gap-1 text-[10px] md:text-xs text-left">
              <span className="text-laranja-500 font-semibold">
                {personagemNome}
              </span>{" "}
              <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent font-bold">
                VS
              </span>{" "}
              <span className="text-sky-500 font-semibold">{adversario}</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-left">
              <span className="bg-sky-900 text-sky-300 px-1.5 py-0.5 rounded-full text-[8px] md:text-xs">
                {r.totalConfrontos} Confronto{r.totalConfrontos > 1 ? "s" : ""}
              </span>
              <span className="flex items-center text-[8px] gap-1 md:text-xs">
                {resultado}
              </span>
            </div>
          </span>
        );
      })}
    </div>
  );
}
