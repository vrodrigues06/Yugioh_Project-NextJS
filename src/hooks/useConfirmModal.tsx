import { useState, useCallback } from "react";
import { boolean } from "zod";

export function useConfirmModal(onConfirm: (duelAmazing: boolean) => void) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const confirmAction = useCallback(
    (duelAmazing: boolean) => {
      onConfirm(duelAmazing);
      closeModal();
    },
    [onConfirm, closeModal],
  );

  return {
    isModalOpen,
    openModal,
    closeModal,
    confirmAction,
  };
}
