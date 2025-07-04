import React from "react";
import { GiWizardFace } from "react-icons/gi";
import Error from "@/components/error";
import { Metadata } from "next";
import { allPersonagensGet } from "@/_lib/actions/all-personagens-get";
import SectionHeader from "@/components/section-header/section-header";
import SectionTitulo from "@/components/section-header/section-titulo";
import SectionDescription from "@/components/section-header/section-description";
import { CardGridByGeracao } from "@/components/card-grid-by-geracao";
import { torneiosGet } from "@/_lib/actions/torneios-get";
import { filtrarPersonagensPorInicio } from "@/functions/filtrar-personagens-inicio";

export const metadata: Metadata = {
  title: "Yugioh | Personagens",
  description: "Página contendo os detalhes de cada Personagem",
};

export default async function PersonagensPage() {
  const { data: personagens, error } = await allPersonagensGet();
  const { data: allTorneios, error: errorTorneios } = await torneiosGet();

  if (error) return <Error message={error} />;

  if (!personagens || !allTorneios) return;

  const personagensFiltrados = filtrarPersonagensPorInicio(
    personagens,
    allTorneios,
  );

  return (
    <section className="container font-sans  py-4 px-4 sm:px-8 md:px-16 mx-auto">
      <SectionHeader>
        <SectionTitulo> Geração de Personagens</SectionTitulo>
        <SectionDescription>
          Explore os mais poderosos duelistas de diferentes gerações dos
          torneios e seus feitos.
        </SectionDescription>
      </SectionHeader>

      <CardGridByGeracao
        data={personagensFiltrados}
        linkPrefix="personagens"
        icon={<GiWizardFace className="text-orange-500" />}
        label="Duelista"
      />
    </section>
  );
}
