import { Personagem } from "@/@types/personagem";
import { calcularColocacoes } from "@/functions/calcularColocacoes";
import { setColor } from "@/functions/setColor";
import { FaMap } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";

interface IPersonagemDetalhesRanking {
  rankingMundial: number | null;
  rankingNacional: number | null;
  personagem: Personagem;
}

const PersonagemDetalheRankings = ({
  rankingMundial,
  rankingNacional,
  personagem,
}: IPersonagemDetalhesRanking) => {
  const { titulos, vices, vezesPodium, terceiro, quarto, vezesFinal } =
    calcularColocacoes(personagem.colocacoes);

  const {
    titulos: titulosMundial,
    vices: vicesMundial,
    vezesPodium: vezesPodiumMundial,
    terceiro: terceiroMundial,
    quarto: quartoMundial,
    vezesFinal: vezesFinalMundial,
  } = calcularColocacoes(personagem.colocacoes_mundial);

  if (!rankingNacional) return;

  return (
    <div>
      <div className="mb-8">
        <p className="text-xs sm:text-sm text-slate-400  mb-2 md:mb-3 relative">
          <span className="w-6 h-px -top-0.5 absolute bg-gradient-to-t from-azul-800 to-azul-300 rounded-md"></span>
          Rankings
        </p>
        <div className="text-xs sm:text-sm text-azul-150 grid gap-1">
          {rankingMundial != null && rankingMundial > 0 && (
            <span className="flex items-center gap-0.5 xs:gap-1">
              {" "}
              <TbWorld className="text-orange-500 text-lg" /> Mundial: #
              {rankingMundial}
            </span>
          )}
          <span className="flex items-center gap-1 xs:gap-1.5">
            <FaMap className="text-orange-500 text-lg" />
            {personagem.geracao.toUpperCase()}: #{rankingNacional}
          </span>
        </div>
      </div>
      <div>
        <p className="text-xs sm:text-sm text-slate-400  mb-2 md:mb-3 relative">
          <span className="w-6 h-px -top-0.5 absolute bg-gradient-to-t from-azul-800 to-azul-300 rounded-md"></span>
          Estatísticas
        </p>

        <div className="text-xs sm:text-sm text-azul-150 space-y-6">
          <div className="border-b border-sky-900 pb-4">
            <h3 className="text-orange-500 font-semibold mb-3">
              {personagem.geracao.toUpperCase()}
            </h3>
            <div className="space-y-1">
              {vezesFinal > 0 && (
                <p>
                  Vezes na Final{" "}
                  <span className="font-semibold">{setColor(vezesFinal)}</span>
                </p>
              )}
              {titulos > 0 && (
                <p>
                  Títulos{" "}
                  <span className="font-semibold">{setColor(titulos)}</span>
                </p>
              )}
              {vices > 0 && (
                <p>
                  Vices <span className="font-semibold">{setColor(vices)}</span>
                </p>
              )}
              {vezesPodium > 0 && (
                <p>
                  Vezes no Pódio{" "}
                  <span className="font-semibold">{setColor(vezesPodium)}</span>
                </p>
              )}
              {terceiro > 0 && (
                <p>
                  Terceiro{" "}
                  <span className="font-semibold">{setColor(terceiro)}</span>
                </p>
              )}
              {quarto > 0 && (
                <p>
                  Quarto{" "}
                  <span className="font-semibold">{setColor(quarto)}</span>
                </p>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-orange-500 font-semibold mb-3">Mundial</h3>
            <div className="space-y-1">
              {personagem.participacoes_mundial > 0 && (
                <p>
                  Vezes no Mundial{" "}
                  <span className="font-semibold">
                    {setColor(personagem.participacoes_mundial)}
                  </span>
                </p>
              )}
              {titulosMundial > 0 && (
                <p>
                  Títulos Mundial{" "}
                  <span className="font-semibold">
                    {setColor(titulosMundial)}
                  </span>
                </p>
              )}
              {vicesMundial > 0 && (
                <p>
                  Vices Mundial{" "}
                  <span className="font-semibold">
                    {setColor(vicesMundial)}
                  </span>
                </p>
              )}
              {vezesFinalMundial > 0 && (
                <p>
                  Vezes na Final Mundial{" "}
                  <span className="font-semibold">
                    {setColor(vezesFinalMundial)}
                  </span>
                </p>
              )}
              {vezesPodiumMundial > 0 && (
                <p>
                  Vezes no Pódio Mundial{" "}
                  <span className="font-semibold">
                    {setColor(vezesPodiumMundial)}
                  </span>
                </p>
              )}
              {terceiroMundial > 0 && (
                <p>
                  Terceiro Mundial{" "}
                  <span className="font-semibold">
                    {setColor(terceiroMundial)}
                  </span>
                </p>
              )}
              {quartoMundial > 0 && (
                <p>
                  Quarto Mundial{" "}
                  <span className="font-semibold">
                    {setColor(quartoMundial)}
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonagemDetalheRankings;
