import React from "react";
import { Personagem } from "../../@types/personagem";
import Error from "@/components/error";
import HomePersonagemItem from "./home-personagem-item";

interface IHomePersonagensList {
  geracao: string;
  personagens: Personagem[];
  error: string | null;
  isLoading: boolean;
}

const HomePersonagensList = ({
  geracao,
  personagens,
  error,
  isLoading,
}: IHomePersonagensList) => {
  const personagensFilted = React.useMemo(() => {
    return geracao === "Todos"
      ? personagens
      : personagens.filter((p) => p.geracao === geracao.toLowerCase());
  }, [geracao, personagens]);

  if (error) return <Error message={error} />;

  const personagemSorted = personagensFilted.sort(() => Math.random() - 0.5);

  return (
    <div className="grid gap-2">
      {personagemSorted.map((p, index) => {
        if (index > 4) return null;

        return (
          <HomePersonagemItem key={p.id} personagem={p} delay={index * 0.1} />
        );
      })}
    </div>
  );
};

export default HomePersonagensList;
