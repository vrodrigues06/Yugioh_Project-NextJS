import { Geracao, Torneio } from "@/@types";
import { getTorneioByYear } from "@/_lib/apis/torneios-api";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export function useTorneioByYear(
  geracao: Geracao | string,
  year: number,
  options?: UseQueryOptions<Torneio | null>,
) {
  return useQuery<Torneio | null>({
    queryKey: ["torneio", geracao, year],
    queryFn: () => getTorneioByYear(geracao, year),
    enabled: !!geracao && !!year,
    staleTime: 0, // Force-dynamic: sempre busca dados atualizados
    refetchOnWindowFocus: true, // Refaz a query quando a janela ganha foco
    refetchOnMount: true, // Refaz a query quando o componente é montado
    ...options, // permite sobrescrever opções se necessário
  });
}
