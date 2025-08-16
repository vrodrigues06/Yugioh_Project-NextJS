import { getPersonagemByName } from "@/_lib/apis/personagens-api";
import { useQuery } from "@tanstack/react-query";

export function usePersonagemByName(nome: string) {
  return useQuery({
    queryKey: ["personagem", nome],
    queryFn: () => {
      if (!nome) return Promise.resolve(null);
      return getPersonagemByName(nome);
    },
    enabled: !!nome, // Só executa se o nome existir
    staleTime: 0, // Force-dynamic: sempre busca dados atualizados
    refetchOnWindowFocus: true, // Refaz a query quando a janela ganha foco
    refetchOnMount: true, // Refaz a query quando o componente é montado
    retry: 2, // Tenta no máximo 2 vezes em caso de erro
  });
}
