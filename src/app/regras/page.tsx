import { regrasGet } from "@/_lib/actions/regras-get";
import Error from "@/components/error";
import RegrasLista from "@/components/regras/regras-lista";
import Link from "next/link";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

type CategoriaChave = "decks" | "torneio" | "mundial";

export default async function RegrasPage() {
  const { data: regras, error } = await regrasGet();

  if (error || !regras || regras.length === 0) {
    return (
      <Error message="Erro ao carregar as regras ou nenhuma regra encontrada." />
    );
  }

  const conjuntoRegrasAtual = regras.reduce((maisRecente, atual) =>
    atual.ano > maisRecente.ano ? atual : maisRecente,
  );

  const anosAnteriores = regras
    .filter((r) => r.ano !== conjuntoRegrasAtual.ano)
    .sort((a, b) => b.ano - a.ano); // Ordem decrescente

  return (
    <section className="space-y-4 animate-slideDown py-4 px-4 sm:px-8 md:px-16 mx-auto">
      <div className="bg-azul-700 border border-azul-500 p-4 rounded-md shadow-sm">
        <h1 className="text-white font-semibold text-sm xs:text-base text-center tracking-wider flex items-center justify-center gap-2">
          <span className="text-orange-400 text-base xs:text-lg">★</span>
          MASTER RULE {conjuntoRegrasAtual.ano}
        </h1>
      </div>
      <RegrasLista regrasAno={conjuntoRegrasAtual} />
      {anosAnteriores.length > 0 && (
        <div className="mt-6 border border-azul-700 bg-azul-950/70 rounded-md p-4 shadow-sm">
          <h3 className="text-white text-sm xs:text-base font-semibold mb-2">
            Veja conjuntos de regras de anos anteriores:
          </h3>
          <ul className="flex flex-wrap gap-2 text-xs xs:text-sm">
            {anosAnteriores.map((regra) => (
              <li key={regra.ano}>
                <Link
                  href={`/regras/${regra.ano}`}
                  className="inline-flex items-center gap-1 text-amber-400 hover:text-white transition"
                >
                  {regra.ano}
                  <MdOutlineKeyboardArrowRight className="text-sm" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
