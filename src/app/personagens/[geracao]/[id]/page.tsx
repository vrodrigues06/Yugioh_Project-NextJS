import { personagemGet } from "@/_lib/actions/personagem-get";
import { rankingGlobalGet } from "@/_lib/actions/ranking-global-get";
import Error from "@/components/error";
import MiniLoading from "@/components/mini-loading";
import PersonagemDetalheHeader from "@/components/personagens/personagem-detalhe/personagem-detalhe-hearder";
import PersonagemDetalheHistorico from "@/components/personagens/personagem-detalhe/personagem-detalhe-historico";
import PersonagemDetalheRankings from "@/components/personagens/personagem-detalhe/personagem-detalhe-ranking";
import PersonagemDetalheTitulos from "@/components/personagens/personagem-detalhe/personagem-detalhe-titulos";
import PersonagemRivalidade from "@/components/personagens/personagem-detalhe/personagem-rivalidade";
import { findRankingIndex } from "@/functions/findRankingIndex";
import { setMelhoresColocacoes } from "@/functions/setMelhoresColocacoes";
import Link from "next/link";
import React, { Suspense } from "react";

interface IPersonagemDetalheCard {
  params: Promise<{
    id: string;
  }>;
}

export default async function PersonagemPage({
  params,
}: IPersonagemDetalheCard) {
  const id = (await params).id;

  const { data: personagem, error: errorPersonagem } = await personagemGet(
    Number(id),
  );
  const { data: rankings, error: errorRankings } = await rankingGlobalGet();

  const error = errorPersonagem || errorRankings;

  if (!personagem || !rankings) return <Error message={error} />;

  const melhoresColocacoes = setMelhoresColocacoes(personagem);
  const melhoresColocacoesMundial = setMelhoresColocacoes(personagem, true);

  const colocacoesAnteriores = personagem.colocacoes.sort((a, b) => {
    return b.ano - a.ano;
  });

  if (Object.keys(rankings).length === 0) return;

  const rankingMundial = findRankingIndex(
    personagem.nome,
    personagem.geracao,
    rankings,
    true,
  );
  const rankingNacional = findRankingIndex(
    personagem.nome,
    personagem.geracao,
    rankings,
  );
  return (
    <div className="bg-azul-950 p-2 rounded col-span-2">
      <Link
        href={`/personagens/${personagem.geracao}`}
        className="hover:underline text-slate-400 text-xs block p-2"
      >
        {" "}
        🠔 Voltar para personagens{" "}
      </Link>
      <div className="bg-azul-950 shadow-xl rounded-md mb-10 overflow-hidden transition-all hover:ring-1 hover:ring-white duration-100">
        <PersonagemDetalheHeader personagem={personagem} />
        <div className="p-4 ">
          <div className="grid xs:grid-cols-2 gap-y-6 mb-8">
            <div>
              <PersonagemDetalheTitulos
                melhoresColocacoes={melhoresColocacoes}
                melhoresColocacoesMundial={melhoresColocacoesMundial}
                geracao={personagem.geracao}
                atualizacoes={personagem.atualizacoes}
              />
              <Suspense fallback={<MiniLoading />}>
                <PersonagemRivalidade personagem={personagem} />
              </Suspense>
            </div>
            <PersonagemDetalheRankings
              rankingMundial={rankingMundial}
              rankingNacional={rankingNacional}
              personagem={personagem}
            />
          </div>
          <PersonagemDetalheHistorico
            personagem={personagem}
            colocacoesAnteriores={colocacoesAnteriores}
          />
        </div>
      </div>
    </div>
  );
}
