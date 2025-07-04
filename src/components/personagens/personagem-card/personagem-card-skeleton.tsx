import { Skeleton } from "@/components/ui/skeleton";

const PersonagemCardSkeleton = () => {
  return (
    <div className="bg-azul-950 shadow-xl rounded-md mb-10 overflow-hidden transition-all hover:ring-1 duration-100 min-h-[400px]">
      {/* Cabeçalho */}
      <div className="bg-azul-900 px-6 py-6 flex justify-between items-center">
        <Skeleton className="h-6 w-1/3 bg-azul-800" />
        <Skeleton className="h-4 w-20 bg-azul-800" />
      </div>

      {/* Corpo */}
      <div className="p-6 space-y-14">
        {/* Linha podium + botão */}
        <div className="flex justify-between">
          <div className="space-y-4">
            <Skeleton className="h-4 w-36 bg-azul-800" />
            <Skeleton className="h-4 w-28 bg-azul-800" />
            <Skeleton className="h-4 w-24 bg-azul-800" />
            <Skeleton className="h-4 w-20 bg-azul-800" />
          </div>
          <Skeleton className="h-12 w-36 bg-azul-800 rounded-md" />
        </div>

        {/* Título "Torneios Anteriores" */}
        <Skeleton className="h-6 w-52 bg-azul-800" />

        {/* Lista de torneios anteriores */}
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-4 w-full bg-azul-800" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonagemCardSkeleton;
