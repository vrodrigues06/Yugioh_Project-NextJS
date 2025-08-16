import { Torneio } from "@/@types";
import { getAllTorneios } from "@/_lib/apis/torneios-api";
import { useQuery } from "@tanstack/react-query";

export const useAllTorneios = () => {
  const {
    data = [],
    error,
    isLoading,
  } = useQuery<Torneio[]>({
    queryKey: ["AllTorneios"],
    queryFn: async () => {
      const torneios = await getAllTorneios();
      return torneios ?? []; // Evita retorno de null
    },
    staleTime: 0, // Force-dynamic: sempre busca dados atualizados
    refetchOnWindowFocus: true, // Refaz a query quando a janela ganha foco
    refetchOnMount: true, // Refaz a query quando o componente é montado
    retry: 2, // Tenta novamente até 2 vezes em caso de erro
  });

  const errorMessage = error
    ? error instanceof Error
      ? `Erro ao carregar torneios: ${error.message}`
      : "Erro desconhecido ao carregar torneios."
    : null;

  return {
    data,
    error: errorMessage,
    isLoading,
  };
};
