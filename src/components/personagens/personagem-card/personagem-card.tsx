import PersonagemCardModel from "./personagem-card-model";
import Error from "@/components/error";
import PersonagemCardHeader from "./personagem-card-header";
import PersonagemCardHistorico from "./personagem-card-historico";
import PersonagemCardTitulos from "./personagem-card-titulo";
import PersonagemCardRanking from "./personagem-card-ranking";

export default async function PersonagemCard() {
  const {
    randomPersonagem: personagem,
    colocacoesAnteriores,
    melhoresColocacoes,
    melhoresColocacoesMundial,
    rankingMundial,
    rankingNacional,
    error: errorPersonagem,
    errorRanking,
  } = await PersonagemCardModel();

  const error = errorPersonagem || errorRanking;

  if (error) return <Error message={error} />;
  if (!personagem) return <Error message="Personagem não encontrado." />;

  return (
    <div className="bg-azul-950 shadow-xl rounded-md mb-10 overflow-hidden transition-all hover:ring-1 duration-100 animate-slideLeft">
      <PersonagemCardHeader personagem={personagem} />
      <div className="p-4 ">
        <div className="grid xs:grid-cols-2 gap-y-6">
          <PersonagemCardTitulos
            melhoresColocacoes={melhoresColocacoes}
            melhoresColocacoesMundial={melhoresColocacoesMundial}
            geracao={personagem.geracao}
          />
          <PersonagemCardHistorico
            personagem={personagem}
            colocacoesAnteriores={colocacoesAnteriores}
          />

          <PersonagemCardRanking
            rankingMundial={rankingMundial}
            rankingNacional={rankingNacional}
            geracao={personagem.geracao}
          />
        </div>
      </div>
    </div>
  );
}
