import { Skeleton } from "@/components/ui/skeleton";

const categorias = ["Todos", "Dm", "Gx", "5ds", "Zexal", "Arc-v", "Vrains"];

const HomeHighlightSkeleton = () => {
  return (
    <section className="grid md:grid-cols-[1.4fr_1fr] text-white gap-4">
      {/* Skeleton do filtro de categorias */}
      <div className="md:col-span-2 justify-self-center md:justify-self-end">
        <ul className="flex gap-y-1.5 gap-x-1 flex-wrap">
          {categorias.map((categoria, index) => (
            <li key={categoria}>
              <Skeleton
                className={`rounded-sm uppercase text-xs py-1 px-3 ${
                  index === 0 ? "w-14" : "w-10"
                }`}
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Skeleton da lista de personagens */}
      <div className="grid gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-3 bg-azul-800 p-2 rounded-md"
          >
            <Skeleton className="h-10 w-10 rounded-full bg-slate-700" />
            <Skeleton className="h-4 w-[70%] bg-slate-600" />
          </div>
        ))}
      </div>

      {/* Skeleton do overview de rankings */}
      <div className="bg-azul-950 pt-2 px-4 sm:pt-4 rounded-md border border-blue-950">
        <Skeleton className="h-6 w-48 mb-4 bg-azul-800" />
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="bg-azul-800 p-2 flex justify-between items-center mb-2 sm:mb-3 rounded-md"
          >
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 bg-slate-600" />
              <Skeleton className="h-10 w-10 rounded-full bg-slate-700" />
              <Skeleton className="h-4 w-24 bg-slate-600" />
            </div>
            <Skeleton className="h-4 w-16 bg-orange-300" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeHighlightSkeleton;
