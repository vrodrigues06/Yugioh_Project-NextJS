"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export default function ReactQueryProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
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
            retryDelay: (attemptIndex) =>
              Math.min(1000 * 2 ** attemptIndex, 30000),
          },
          mutations: {
            // Número de tentativas em caso de erro para mutações
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
