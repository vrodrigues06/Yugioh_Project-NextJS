import BackLink from "@/components/back-link";
import { IoMdAdd } from "react-icons/io";

export default async function PersonagensGenLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{
    geracao: string;
  }>;
}) {
  const geracao = (await params).geracao;

  if (!geracao || typeof geracao !== "string") return;

  return (
    <section className="container font-sans py-4 px-4 sm:px-8 md:px-16 mx-auto">
      <div className="grid sm:grid-cols-2 gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-transparent bg-clip-text bg-gradient-to-b from-orange-500 to-orange-300 font-bold text-2xl">
              {geracao?.toUpperCase()}
            </h1>
            <BackLink href="/personagens">Voltar para Gerações</BackLink>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}
