"use client";
import { useQuery } from "@tanstack/react-query";
import { Personagem } from "@/@types/personagem";
import { getAllPersonagens } from "@/_lib/apis/personagens-api";

const useAllPersonagens = () => {
  const {
    data = [],
    error,
    isLoading,
  } = useQuery<Personagem[]>({
    queryKey: ["allPersonagens"],
    queryFn: async () => {
      const personagens = await getAllPersonagens();
      return personagens ?? [];
    },
    retry: 2,
    staleTime: 0, // Force-dynamic: sempre busca dados atualizados
    refetchOnWindowFocus: true, // Refaz a query quando a janela ganha foco
    refetchOnMount: true, // Refaz a query quando o componente é montado
  });

  // Mensagem de erro mais descritiva
  const errorMessage = error
    ? error instanceof Error
      ? `Erro ao carregar personagens: ${error.message}`
      : "Erro desconhecido ao carregar personagens."
    : null;

  return {
    data,
    error: errorMessage,
    isLoading,
  };
};

export default useAllPersonagens;
