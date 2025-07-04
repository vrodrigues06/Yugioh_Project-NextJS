import { useState, useCallback } from "react";

export function useConfirmModal(onConfirm: () => void) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const confirmAction = useCallback(() => {
    onConfirm();
    closeModal();
  }, [onConfirm, closeModal]);

  return {
    isModalOpen,
    openModal,
    closeModal,
    confirmAction,
  };
}
