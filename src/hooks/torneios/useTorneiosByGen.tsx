import { useQuery } from "@tanstack/react-query";
import { getTorneiosByGen } from "@/_lib/apis/torneios-api";
import { Torneio, Geracao } from "@/@types";

export const useTorneiosByGen = (geracao: Geracao) => {
  const {
    data = [],
    error,
    isLoading,
  } = useQuery<Torneio[]>({
    queryKey: ["TorneiosByGen", geracao],
    queryFn: async () => {
      const torneios = await getTorneiosByGen(geracao);
      return torneios ?? []; // Garante array mesmo se null
    },
    enabled: !!geracao, // Só executa se geracao for definida
    staleTime: 0, // Force-dynamic: sempre busca dados atualizados
    refetchOnWindowFocus: true, // Refaz a query quando a janela ganha foco
    refetchOnMount: true, // Refaz a query quando o componente é montado
    retry: 2,
  });

  const errorMessage = error
    ? error instanceof Error
      ? `Erro ao carregar torneios da geração ${geracao}: ${error.message}`
      : `Erro desconhecido ao carregar torneios da geração ${geracao}`
    : null;

  return {
    data,
    error: errorMessage,
    isLoading,
  };
};
