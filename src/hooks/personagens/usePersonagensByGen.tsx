import { Personagem } from "@/@types/personagem";
import { getPersonagensByGen } from "@/_lib/apis/personagens-api";
import { useQuery } from "@tanstack/react-query";

const usePersonagensByGen = (geracao: string) => {
  const {
    data = [],
    error,
    isLoading,
  } = useQuery<Personagem[]>({
    queryKey: ["personagens", geracao],
    queryFn: async ({ queryKey }) => {
      const personagens = await getPersonagensByGen(queryKey[1] as string);
      return personagens ?? [];
    },
    enabled: !!geracao, // Evita chamadas desnecessárias se 'geracao' for undefined/null
    retry: 2,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  const errorMessage = error
    ? error instanceof Error
      ? `Erro ao carregar personagens: ${error.message}`
      : "Erro desconhecido ao carregar personagens."
    : null;

  return { data, error: errorMessage, isLoading };
};

export default usePersonagensByGen;
