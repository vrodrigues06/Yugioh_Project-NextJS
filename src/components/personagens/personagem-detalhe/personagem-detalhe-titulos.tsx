import { Colocacao } from "@/@types/personagem";
import { setEmoji } from "@/functions/setEmoji";

interface IPersonagemCardTitulos {
  melhoresColocacoes: Colocacao[] | undefined;
  melhoresColocacoesMundial: Colocacao[] | undefined;
  geracao: string;
  atualizacoes: string[];
}

const PersonagemDetalheTitulos = ({
  melhoresColocacoes,
  geracao,
  melhoresColocacoesMundial,
  atualizacoes,
}: IPersonagemCardTitulos) => {
  return (
    <div>
      <p className="text-xs sm:text-sm text-slate-400  mb-2 md:mb-3 relative">
        <span className="w-6 h-px -top-0.5 absolute bg-gradient-to-t from-azul-800 to-azul-300 rounded-md"></span>
        Titulos
      </p>
      {melhoresColocacoes?.length ? (
        <div className="text-xs sm:text-sm text-azul-150 grid gap-0.5 *:flex *:gap-1 *:items-center">
          {melhoresColocacoesMundial?.length
            ? melhoresColocacoesMundial.map((colocacao) => {
                return (
                  <span key={colocacao.ano} className="font-bold">
                    {setEmoji(colocacao.classificacao)}
                    MUNDIAL {colocacao.ano}
                  </span>
                );
              })
            : ""}

          {melhoresColocacoes.map((colocacao) => {
            return (
              <span key={colocacao.ano}>
                {setEmoji(colocacao.classificacao)}
                {geracao.toUpperCase()} {colocacao.ano}
              </span>
            );
          })}
        </div>
      ) : (
        <span className="text-xs text-slate-600">Sem Titulos</span>
      )}
      <div className="mt-32">
        {atualizacoes.length > 0 ? (
          <div className="text-xs sm:text-sm text-azul-150 flex flex-wrap gap-1 items-center">
            <p className="text-xs sm:text-sm text-slate-400 relative flex items-center h-full">
              <span className="w-6 h-px -top-0.5 absolute bg-gradient-to-t from-azul-800 to-azul-300 rounded-md"></span>
              Atualizações
            </p>
            {atualizacoes
              .sort((a, b) => Number(a) - Number(b))
              .map((ano) => (
                <span
                  key={ano}
                  className="bg-azul-900 text-white px-2 py-0.5 rounded-full text-[10px] sm:text-xs"
                >
                  {ano}
                </span>
              ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PersonagemDetalheTitulos;
