import BackLink from "@/components/back-link";
import Link from "next/link";
import { MdError } from "react-icons/md";

export default function NotFound() {
  return (
    <div className="bg-azul-950 min-h-[300px] p-6 mt-16 text-white flex flex-col items-center justify-center rounded-md text-center">
      <div className="bg-azul-800 rounded-sm w-fit mx-auto mb-4 p-2">
        <MdError className="text-orange-500 text-4xl" />
      </div>
      <h1 className="text-lg font-semibold text-slate-200 mb-2">
        Página não encontrada
      </h1>
      <p className="text-slate-400 text-sm mb-4">
        A página que você tentou acessar não existe ou foi removida.
      </p>
      <BackLink href="/">Voltar para a página inicial</BackLink>
    </div>
  );
}
