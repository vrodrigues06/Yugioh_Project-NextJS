import { QueryClient } from "@tanstack/react-query";

// Configuração do React Query com force-dynamic
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Force-dynamic: sempre busca dados atualizados
      staleTime: 0,
      // Refaz a query quando a janela ganha foco
      refetchOnWindowFocus: true,
      // Refaz a query quando o componente é montado
      refetchOnMount: true,
      // Refaz a query quando reconecta à internet
      refetchOnReconnect: true,
      // Número de tentativas em caso de erro
      retry: 2,
      // Tempo entre tentativas (em ms)
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      // Número de tentativas em caso de erro para mutações
      retry: 1,
    },
  },
});

// Função utilitária para invalidar e refetch múltiplas queries
export const invalidateAndRefetchQueries = (
  queryClient: QueryClient,
  queryKeys: string[][],
) => {
  // Invalida todas as queries especificadas
  queryKeys.forEach((queryKey) => {
    queryClient.invalidateQueries({ queryKey });
  });

  // Força refetch imediato das queries principais
  queryKeys.forEach((queryKey) => {
    queryClient.refetchQueries({ queryKey });
  });
};

// Função utilitária para invalidar queries relacionadas a personagens
export const invalidatePersonagemQueries = (queryClient: QueryClient) => {
  invalidateAndRefetchQueries(queryClient, [
    ["allPersonagens"],
    ["personagens"],
    ["personagem"],
  ]);
};

// Função utilitária para invalidar queries relacionadas a torneios
export const invalidateTorneioQueries = (queryClient: QueryClient) => {
  invalidateAndRefetchQueries(queryClient, [
    ["AllTorneios"],
    ["TorneiosByGen"],
    ["torneio"],
    ["rankingAnual"],
  ]);
};

// Função utilitária para invalidar queries relacionadas a mundiais
export const invalidateMundialQueries = (queryClient: QueryClient) => {
  invalidateAndRefetchQueries(queryClient, [
    ["mundiais"],
    ["mundial"],
    ["rankingAnual"],
  ]);
};
