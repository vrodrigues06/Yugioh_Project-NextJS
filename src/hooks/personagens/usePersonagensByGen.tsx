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
    staleTime: 0, // Force-dynamic: sempre busca dados atualizados
    refetchOnWindowFocus: true, // Refaz a query quando a janela ganha foco
    refetchOnMount: true, // Refaz a query quando o componente é montado
  });

  const errorMessage = error
    ? error instanceof Error
      ? `Erro ao carregar personagens: ${error.message}`
      : "Erro desconhecido ao carregar personagens."
    : null;

  return { data, error: errorMessage, isLoading };
};

export default usePersonagensByGen;
