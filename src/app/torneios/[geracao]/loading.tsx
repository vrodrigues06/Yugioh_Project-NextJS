import { Skeleton } from "@/components/ui/skeleton";

export default function TorneioPageSkeleton() {
  return (
    <section className="container font-sans py-4 px-4 sm:px-8 md:px-16 mx-auto animate-pulse">
      <div className="grid gap-8">
        {/* Cabeçalho com geração + select + botão */}
        <div>
          <div className="flex justify-between items-center mb-2 sm:mb-0">
            {/* Título */}
            <Skeleton className="h-6 sm:h-8 w-1/3 bg-azul-950" />

            {/* Select + botão */}
            <div className="flex gap-2 items-center">
              <Skeleton className="h-8 sm:h-9 w-24 bg-azul-950 rounded-md" />
              <Skeleton className="h-8 sm:h-9 w-8 bg-azul-950 rounded-sm" />
            </div>
          </div>

          {/* Subtítulo */}
          <Skeleton className="h-4 w-40 bg-azul-800 mt-2" />
        </div>

        {/* Torneios Hall of Fame */}
        <div className="grid gap-2">
          <Skeleton className="h-5 w-40 bg-azul-800" />
          <Skeleton className="h-20 sm:h-24 rounded-md bg-azul-950" />
        </div>

        {/* Grid Resultados + Ranking */}
        <div className="grid lg:grid-cols-[3fr_1fr] gap-4">
          {/* TorneioResultados */}
          <div className="grid gap-4">
            <Skeleton className="h-6 w-28 bg-azul-800" />
            <Skeleton className="h-36 sm:h-44 bg-azul-950 rounded-md" />
            <Skeleton className="h-24 bg-azul-950 rounded-md" />
          </div>

          {/* RankingAnual */}
          <div className="grid gap-2">
            <Skeleton className="h-5 w-24 bg-azul-800" />
            <Skeleton className="h-64 bg-azul-950 rounded-md" />
          </div>
        </div>

        {/* Torneios Anteriores */}
        <div className="grid gap-2">
          <Skeleton className="h-5 w-32 bg-azul-800" />
          <Skeleton className="h-28 sm:h-32 bg-azul-950 rounded-md" />
        </div>
      </div>
    </section>
  );
}
