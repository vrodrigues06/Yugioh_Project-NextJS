"use server";
import { regrasByYearGet } from "@/_lib/actions/regras-get-by-year";
import Error from "@/components/error";
import RegrasLista from "@/components/regras/regras-lista";
import Link from "next/link";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

interface Props {
  params: Promise<{ ano: string }>;
}
export default async function RegrasAnoPage({ params }: Props) {
  const ano = (await params).ano;

  const { data: conjuntoRegras, error } = await regrasByYearGet(Number(ano));

  if (error || !conjuntoRegras) {
    return (
      <Error
        message={`Nenhum Conjunto de regra encontrado para o ano ${ano}.`}
      />
    );
  }

  return (
    <section className="space-y-4 animate-slideDown py-4 px-4 sm:px-8 md:px-16 mx-auto">
      <div className="bg-azul-700 border border-azul-500 p-4 rounded-md shadow-sm">
        <h1 className="text-white font-semibold text-sm xs:text-base text-center tracking-wider flex items-center justify-center gap-2">
          <span className="text-orange-400 text-base xs:text-lg">★</span>
          Master Rule {conjuntoRegras.ano}
        </h1>
      </div>

      <div className="bg-azul-800 rounded-sm p-3">
        <h2 className="text-xs xs:text-lg font-bold mb-2 text-white flex items-center gap-2">
          Torneio
        </h2>
        <RegrasLista regrasAno={conjuntoRegras} />
      </div>

      <div className="pt-2">
        <Link
          href="/regras"
          className="text-white text-sm hover:underline inline-flex items-center gap-1"
        >
          Voltar para regras gerais
          <MdOutlineKeyboardArrowRight className="text-lg" />
        </Link>
      </div>
    </section>
  );
}
