import React from "react";
import Error from "@/components/error";
import { Metadata } from "next";
import { torneiosGet } from "@/_lib/actions/torneios-get";
import { FaTrophy } from "react-icons/fa";
import SectionHeader from "@/components/section-header/section-header";
import SectionTitulo from "@/components/section-header/section-titulo";
import SectionDescription from "@/components/section-header/section-description";
import SectionPainelLink from "@/components/section-header/section-painel-link";
import { CardGridByGeracao } from "@/components/card-grid-by-geracao";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Yugioh | Torneios",
  description: "Página contendo os detalhes cada geração de Torneios",
};

export default async function TorneiosPage() {
  const { data: torneios, error } = await torneiosGet();
  const role = (await cookies()).get("user_role")?.value;

  if (error) return <Error message={error} />;

  if (!torneios) return;

  return (
    <section className="container font-sans  py-4 px-4 sm:px-8 md:px-16 mx-auto">
      <SectionHeader>
        <div className="flex">
          <div>
            <SectionTitulo> Geração de Torneios</SectionTitulo>
            <SectionDescription>
              {" "}
              Explore as diferentes gerações dos torneios e seu incrível
              histórico.
            </SectionDescription>
          </div>
          {role !== "admin" ? (
            ""
          ) : (
            <SectionPainelLink
              href="/torneios/painel-torneio"
              title="Painel-Torneio"
            />
          )}
        </div>
      </SectionHeader>

      <CardGridByGeracao
        data={torneios}
        linkPrefix="torneios"
        icon={<FaTrophy className="text-orange-500" />}
        label="Torneio"
      />
    </section>
  );
}
