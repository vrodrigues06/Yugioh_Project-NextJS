import { useQuery } from "@tanstack/react-query";
import { RankingData } from "@/@types";
import { getRankingGlobal } from "@/_lib/apis/rankings-api";

export default function useAllRankings() {
  const {
    data = {} as RankingData,
    error,
    isLoading,
  } = useQuery<RankingData>({
    queryKey: ["rankings"],
    queryFn: async () => {
      const rankings = await getRankingGlobal();
      return rankings ?? ({} as RankingData); // Evita retornar null
    },
    staleTime: 0, // Force-dynamic: sempre busca dados atualizados
    refetchOnWindowFocus: true, // Refaz a query quando a janela ganha foco
    refetchOnMount: true, // Refaz a query quando o componente é montado
    retry: 2, // Tenta 2 vezes em caso de erro
  });

  const errorMessage = error
    ? error instanceof Error
      ? `Erro ao carregar rankings: ${error.message}`
      : "Erro desconhecido ao carregar rankings."
    : null;

  return {
    data,
    error: errorMessage,
    isLoading,
  };
}
