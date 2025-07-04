import React from "react";
import useAllPersonagens from "@/hooks/personagens/useAllPersonagens";

export default function PersonagensListByGenModel(geracao: string) {
  const { data: personagens, error, isLoading } = useAllPersonagens();

  const [searchTerm, setSearchTerm] = React.useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = React.useState("");

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 400);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const personagensFilted = React.useMemo(() => {
    const filteredByGen =
      geracao === "Todos"
        ? personagens
        : personagens?.filter((p) => p.geracao === geracao.toLowerCase());

    if (!filteredByGen) return [];

    if (debouncedSearchTerm.trim() === "") return filteredByGen;

    return filteredByGen.filter((p) =>
      p.nome.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
    );
  }, [geracao, personagens, debouncedSearchTerm]);

  const personagensSorted = React.useMemo(() => {
    return personagensFilted.sort((a, b) => {
      return a.nome.localeCompare(b.nome);
    });
  }, [personagensFilted]);

  return {
    personagens,
    personagensSorted,
    searchTerm,
    setSearchTerm,
    error,
    isLoading,
  };
}
