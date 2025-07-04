import HomeHighlightSection from "@/components/home/home-highlight-section";
import HomeHighlightSkeleton from "@/components/home/home-highlight-skeleton";
import PersonagemCard from "@/components/personagens/personagem-card/personagem-card";
import PersonagemCardSkeleton from "@/components/personagens/personagem-card/personagem-card-skeleton";
import TorneioCard from "@/components/torneios/torneio-card/torneio-card";
import TorneioCardSkeleton from "@/components/torneios/torneio-card/torneio-card-skeleton";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <section className="text-orange-500 font-sans mx-auto py-4 px-4 sm:px-8 md:px-16">
      <section className="md:grid md:grid-cols-2 gap-8 mb-8">
        <Suspense fallback={<TorneioCardSkeleton />}>
          <TorneioCard />
        </Suspense>
        <Suspense fallback={<PersonagemCardSkeleton />}>
          <PersonagemCard />
        </Suspense>
      </section>
      <Suspense fallback={<HomeHighlightSkeleton />}>
        <HomeHighlightSection />
      </Suspense>
    </section>
  );
}
