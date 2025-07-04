import { Personagem } from "@/@types/personagem";
import ButtonAtualizar from "./button-atualizar";
import ButtonEdit from "./button-edit";

type PersonagemActionsProps = {
  handleToggleEditModal: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleToggleModal: VoidFunction;
  open: boolean;
  personagem: Personagem;
  handleSetAtualizar: (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => Promise<void>;
  isAtualizar: boolean | undefined;
};

export default function PersonagemActions({
  handleToggleEditModal,
  handleToggleModal,
  open,
  personagem,
  handleSetAtualizar,
  isAtualizar,
}: PersonagemActionsProps) {
  return (
    <div className="ml-auto flex gap-1 text-white text-xs">
      <ButtonEdit
        handleToggleEditModal={handleToggleEditModal}
        handleToggleModal={handleToggleModal}
        open={open}
        personagem={personagem}
      />
      <ButtonAtualizar
        handleSetAtualizar={handleSetAtualizar}
        isAtualizar={isAtualizar}
      />
    </div>
  );
}
