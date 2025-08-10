import { Geracao, Mundial, Torneio } from "@/@types";
import { getMundialByAno } from "@/_lib/apis/mundial-api";
import { getTorneioByYear } from "@/_lib/apis/torneios-api";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export function useMundialByYear(
  year: number,
  options?: UseQueryOptions<Mundial | null>,
) {
  return useQuery<Mundial | null>({
    queryKey: ["mundial", year],
    queryFn: () => getMundialByAno(year),
    enabled: !!year,
    staleTime: 0,
    ...options, // permite sobrescrever opções se necessário
  });
}
