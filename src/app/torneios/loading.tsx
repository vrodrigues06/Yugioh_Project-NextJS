import { Skeleton } from "@/components/ui/skeleton";
import { GERACOES } from "@/constants/globals";

export default function Loading() {
  return (
    <section className="container font-sans py-4 px-4 sm:px-8 md:px-16 mx-auto animate-pulse">
      {/* Título */}
      <Skeleton className="h-6 sm:h-8 w-1/3 bg-azul-900 mb-1" />

      {/* Parágrafo */}
      <Skeleton className="h-4 sm:h-5 w-2/3 bg-azul-800 mb-6 sm:mb-16" />

      {/* Grid de skeleton cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {GERACOES.map((_, i) => (
          <div
            key={i}
            className="relative h-36 sm:h-48 rounded-lg p-2 pb-3 sm:p-4 flex items-end overflow-hidden"
          >
            {/* Background simulado */}
            <div className="absolute inset-0 bg-azul-900 rounded-lg z-0" />
            <div className="absolute inset-0 bg-azul-950 opacity-80 rounded-lg z-10" />

            {/* Conteúdo */}
            <div className="z-20 space-y-2">
              <Skeleton className="h-4 w-24 bg-azul-800" />
              <Skeleton className="h-3 w-32 bg-azul-800" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
