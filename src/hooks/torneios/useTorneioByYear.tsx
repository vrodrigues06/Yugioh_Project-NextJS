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
    staleTime: 0,
    ...options, // permite sobrescrever opções se necessário
  });
}
