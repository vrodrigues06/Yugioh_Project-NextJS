import { Skeleton } from "@/components/ui/skeleton";

export default function PersonagemPageSkeleton() {
  return (
    <div className="bg-azul-950 p-2 rounded animate-pulse col-span-2">
      <div className="text-slate-400 text-xs block p-2">
        <Skeleton className="w-32 h-4 bg-azul-800" />
      </div>

      <div className="bg-azul-950 shadow-xl rounded-md mb-10 overflow-hidden ring-1 ring-white/5">
        {/* Header com imagem */}
        <div className="relative h-56 sm:h-72 overflow-hidden rounded-t-md">
          <Skeleton className="absolute inset-0 w-full h-full bg-azul-800" />
          <div className="absolute bottom-3 left-3">
            <Skeleton className="h-6 w-48 rounded-md bg-azul-800" />
          </div>
        </div>

        <div className="p-4">
          <div className="grid xs:grid-cols-2 gap-y-6 mb-8">
            {/* Titulos Skeleton */}
            <div>
              <Skeleton className="w-24 h-4 mb-2 bg-azul-800" />
              <div className="space-y-1">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-4 w-40 bg-azul-800" />
                ))}
              </div>
            </div>

            {/* Rankings Skeleton */}
            <div>
              <Skeleton className="w-24 h-4 mb-2 bg-azul-800" />
              <div className="space-y-1 mb-4">
                {[...Array(2)].map((_, i) => (
                  <Skeleton key={i} className="h-4 w-48 bg-azul-800" />
                ))}
              </div>
              <Skeleton className="w-24 h-4 mb-2 bg-azul-800" />
              <div className="space-y-1">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-4 w-40 bg-azul-800" />
                ))}
              </div>
            </div>
          </div>

          {/* Histórico Skeleton */}
          <div>
            <Skeleton className="w-24 h-4 mb-3 bg-azul-800" />
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-5 w-full bg-azul-800" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
