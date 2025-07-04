import { Personagem } from "@/@types/personagem";
import PersonagemEditForm from "@/components/form/personagem-edit-form";
import Modal from "@/components/modal";
import { FaEdit } from "react-icons/fa";

type ButtonEditProps = {
  handleToggleEditModal: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleToggleModal: VoidFunction;
  open: boolean;
  personagem: Personagem;
};

export default function ButtonEdit({
  handleToggleEditModal,
  handleToggleModal,
  personagem,
  open,
}: ButtonEditProps) {
  return (
    <button
      title="editar personagem"
      className="rounded-sm size-8 sm:size-9 cursor-pointer hover:scale-110 transition-all duration-200 p-2"
      onClick={handleToggleEditModal}
    >
      <Modal handleToggleModal={handleToggleModal} isOpen={open}>
        <PersonagemEditForm personagem={personagem} />
      </Modal>
      <span className="flex justify-center items-center text-lg text-sky-900">
        <FaEdit />
      </span>
    </button>
  );
}
