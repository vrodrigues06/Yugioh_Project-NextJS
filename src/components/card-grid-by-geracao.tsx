import { GERACOES } from "@/constants/globals";
import Link from "next/link";
import { ReactNode } from "react";

interface CardGridByGeracaoProps {
  data: { geracao: string }[];
  linkPrefix: "personagens" | "torneios";
  icon: ReactNode;
  label: "Duelista" | "Torneio";
}

export function CardGridByGeracao({
  data,
  linkPrefix,
  icon,
  label,
}: CardGridByGeracaoProps) {
  const pluralLabel = label + "s";
  return (
    <div className="animate-slideDown grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ">
      {GERACOES.map((gen) => {
        const filtered = data.filter((item) => item.geracao === gen);

        return (
          <Link key={gen} className="group" href={`${linkPrefix}/${gen}`}>
            <div className="flex items-end relative h-36 rounded-lg p-2 pb-3 sm:p-4 shadow-lg sm:h-48 transition-all border border-transparent group-hover:border-orange-500">
              <div
                className="absolute inset-0 rounded-lg -z-10"
                style={{
                  backgroundImage: `url('/assets/torneios/torneio-${gen}.jpg')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <div className="absolute inset-0 bg-black opacity-80 rounded-lg -z-5"></div>

              <div>
                <h3 className="text-white font-bold">{gen.toUpperCase()}</h3>
                <span className="bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent text-sm flex items-center gap-1">
                  {icon}
                  {filtered.length <= 1
                    ? `${filtered.length} ${label}`
                    : `${filtered.length} ${pluralLabel}`}
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
