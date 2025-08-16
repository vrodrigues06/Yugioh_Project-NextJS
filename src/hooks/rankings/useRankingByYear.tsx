import { getRankingByYear } from "@/_lib/apis/rankings-api";
import { useQuery } from "@tanstack/react-query";

export default function useRankingByYear(ano: number, geracao: string) {
  const {
    data = null,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["rankingAnual", ano, geracao],
    queryFn: async () => {
      if (!ano || !geracao) {
        throw new Error("Ano ou geração não fornecidos");
      }

      const ranking = await getRankingByYear(ano, geracao);
      return ranking ?? null;
    },
    enabled: !!ano && !!geracao,
    staleTime: 0, // Force-dynamic: sempre busca dados atualizados
    refetchOnWindowFocus: true, // Refaz a query quando a janela ganha foco
    refetchOnMount: true, // Refaz a query quando o componente é montado
    retry: 2,
  });

  const errorMessage = error
    ? error instanceof Error
      ? `Erro ao carregar o ranking: ${error.message}`
      : "Erro desconhecido ao carregar o ranking."
    : null;

  return { data, error: errorMessage, isLoading };
}
