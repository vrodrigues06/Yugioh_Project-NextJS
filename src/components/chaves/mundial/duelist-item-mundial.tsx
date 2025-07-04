import React from "react";
import { Classificacao, Match, Mundial, Ranking, Torneio } from "@/@types";
import { DuelistItemMundialModel } from "./duelist-item-mundial-model";
import { setEmoji } from "@/functions/setEmoji";
import { ConfirmModal } from "@/components/confirm-modal";
import { useConfirmModal } from "@/hooks/useConfirmModal";
import DuelistPlaceholder from "../duelist-placeholder";
import { DuelistItemCardMundial } from "./duelist-item-card-mundial";
import { DuelistMundialTooltip } from "./duelist-mundial-tooltip";

interface DuelistItemProps {
  match: Match;
  duelista: string | null;
  identificador: "1" | "2";
  torneio: Mundial;
}

const DuelistItemMundial = ({
  match,
  duelista,
  identificador,
  torneio,
}: DuelistItemProps) => {
  const {
    personagem,
    handleMatch,
    isPerdedor,
    hasVencedor,
    isMatchReady,
    isCampeao,
    rankingMundial,
    melhoresColocacoes,
    colocacoesAnteriores,
    melhoresColocacoesMundial,
    colocacoesAnterioresMundial,
    titulos,
    vices,
    terceiro,
    quarto,
    hasTitulo,
  } = DuelistItemMundialModel({ duelista, match, torneio });
  const { isModalOpen, openModal, closeModal, confirmAction } =
    useConfirmModal(handleMatch);

  if (duelista === null)
    return <DuelistPlaceholder match={match} identificador={identificador} />;

  if (!personagem) return;

  return (
    <>
      <div className="relative group">
        <DuelistItemCardMundial
          duelista={duelista}
          personagem={personagem}
          isPerdedor={isPerdedor}
          isCampeao={isCampeao}
          hasVencedor={hasVencedor}
          isMatchReady={isMatchReady}
          hasTitulo={hasTitulo}
          titulos={titulos}
          vices={vices}
          terceiro={terceiro}
          quarto={quarto}
          openModal={openModal}
        />
        <DuelistMundialTooltip
          personagem={personagem}
          rankingMundial={rankingMundial}
          melhoresColocacoes={melhoresColocacoes}
          colocacoesAnterioresMundial={colocacoesAnterioresMundial}
          colocacoesAnteriores={colocacoesAnteriores}
        />
      </div>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmAction}
        title="Deseja definir o vencedor?"
        duelista={duelista}
      />
    </>
  );
};

export default DuelistItemMundial;
