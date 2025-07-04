import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  count?: number;
}

export default function PersonagensListSkeleton({ count = 6 }: Props) {
  return (
    <div className="container py-4 px-4 sm:px-8 md:px-16 mx-auto col-span-2">
      <div className="grid gap-4 ">
        {[...Array(count)].map((_, i) => (
          <div
            key={i}
            className="bg-azul-950 border border-sky-900 text-red-400 py-2 pl-2 sm:p-4 shadow-lg rounded-md flex items-center gap-4 animate-pulse"
          >
            {/* Perfil (avatar) */}
            <Skeleton className="h-16 w-16 rounded-full bg-sky-900 " />

            {/* Conteúdo textual */}
            <div className="flex-1 space-y-2 ">
              {/* Nome */}
              <Skeleton className="h-5 w-3/5 rounded-md bg-sky-900" />

              {/* Deck */}
              <Skeleton className="h-4 w-2/5 rounded-md bg-sky-900" />

              {/* Indicadores de títulos e vices */}
              <div className="flex gap-2 flex-wrap *:bg-sky-900">
                <Skeleton className="h-5 w-5 rounded " />
                <Skeleton className="h-5 w-5 rounded" />
                <Skeleton className="h-5 w-5 rounded" />
                <Skeleton className="h-5 w-5 rounded" />
                <Skeleton className="h-5 w-5 rounded" />
              </div>
            </div>

            {/* Botões de ação */}
            <div className="hidden sm:flex gap-2 ml-auto *:bg-sky-900">
              <Skeleton className="h-8 w-8 rounded-sm" />
              <Skeleton className="h-8 w-8 rounded-sm" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
