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
    retry: 2, // Tenta 2 vezes em caso de erro
    staleTime: 1000 * 60 * 5, // 5 minutos (ajustável)
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
