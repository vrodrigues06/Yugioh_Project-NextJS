import { Match, Torneio } from "@/@types";
import React from "react";
import { DuelistItemModel } from "./dueslit-item-model";
import { ConfirmModal } from "@/components/confirm-modal";
import { useConfirmModal } from "@/hooks/useConfirmModal";
import DuelistPlaceholder from "../duelist-placeholder";
import DuelistToolTip from "./duelist-tooltip";
import DuelistItemCard from "./duelist-item-card";

interface DuelistItemProps {
  match: Match;
  duelista: string | null;
  identificador: "1" | "2";
  torneio: Torneio;
}

const DuelistItem = ({
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
    rankingNacional,
    melhoresColocacoes,
    colocacoesAnteriores,
    titulos,
    vices,
    hasTitulo,
    rivalidades,
    isAvengedDuel,
    isLastChampion,
    eliminadoresAnteriores,
  } = DuelistItemModel({ duelista, match, torneio });
  const { isModalOpen, openModal, closeModal, confirmAction } =
    useConfirmModal(handleMatch);

  if (duelista === null)
    return <DuelistPlaceholder match={match} identificador={identificador} />;

  if (!personagem) return;

  return (
    <>
      <div className="relative group">
        <DuelistItemCard
          duelista={duelista}
          personagem={personagem}
          isPerdedor={isPerdedor}
          isCampeao={isCampeao}
          hasVencedor={hasVencedor}
          isMatchReady={isMatchReady}
          hasTitulo={hasTitulo}
          titulos={titulos}
          vices={vices}
          openModal={openModal}
          rivalidades={rivalidades}
          match={match}
          isAvengedDuel={isAvengedDuel}
          isLastChampion={isLastChampion}
        />
        <DuelistToolTip
          melhoresColocacoes={melhoresColocacoes}
          personagem={personagem}
          rankingNacional={rankingNacional}
          colocacoesAnteriores={colocacoesAnteriores}
          rivalidades={rivalidades}
          eliminadoresAnteriores={eliminadoresAnteriores}
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

export default DuelistItem;
