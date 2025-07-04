import Error from "@/components/error";
import React, { Suspense } from "react";
import PersonagensListItem from "./personagem-list-item";
import PersonagensListByGenModel from "./personagens-list-by-gen-model";
import PersonagensListSkeleton from "@/app/personagens/[geracao]/loading";
import Loading from "@/components/loading";

interface IPersonagensListByGen {
  geracao: string;
  role: string | undefined;
}

export default function PersonagensListByGen({
  geracao,
  role,
}: IPersonagensListByGen) {
  const {
    personagens,
    personagensSorted,
    error,
    isLoading,
    searchTerm,
    setSearchTerm,
  } = PersonagensListByGenModel(geracao);

  if (error) return <Error message={error} />;
  if (isLoading) return <PersonagensListSkeleton />;
  if (!personagens) return;

  return (
    <div className="grid gap-4">
      <input
        type="text"
        placeholder="Buscar personagem..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-3 py-2 rounded-md bg-azul-950 border border-sky-900 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
      <Suspense fallback={<Loading />}>
        {personagensSorted.length > 0 ? (
          <div className="grid gap-2">
            {personagensSorted.map((p, index) => (
              <PersonagensListItem
                role={role}
                key={p.id}
                personagem={p}
                delay={index * 0.1}
                isAtualizar={p.precisa_atualizar as boolean}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-400">
            Nenhum personagem encontrado.
          </p>
        )}
      </Suspense>
    </div>
  );
}
