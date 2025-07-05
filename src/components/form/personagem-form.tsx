import { useForm } from "react-hook-form";
import Input from "./input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  personagemSchema,
  PersonagemFormData,
} from "@/schemas/personagem-schema";
import FileInput from "./file-input";
import Button from "./button-form";
import useCreatePersonagem from "@/hooks/personagens/useCreatePersonagem";
import { uploadImagemPerfil } from "@/_lib/apis/personagens-api";
import Select from "./select";
import { setAnos } from "@/functions/setAnos";
import { INICIO_POR_GERACAO } from "@/constants/globals";
import useAllPersonagens from "@/hooks/personagens/useAllPersonagens";

export default function PersonagemForm({
  geracao,
  closeModal,
}: {
  geracao: string;
  closeModal: VoidFunction;
}) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<PersonagemFormData>({
    resolver: zodResolver(personagemSchema),
  });
  const { data: allPersonagens } = useAllPersonagens();

  const { isCreating, mutate: createPersonagem } = useCreatePersonagem();

  async function onSubmit(data: PersonagemFormData) {
    if (
      allPersonagens?.some(
        (p) => p.nome.toLowerCase() === data.nome.toLowerCase(),
      )
    ) {
      setError("nome", {
        type: "manual",
        message: "Já existe um personagem com esse nome.",
      });
      return;
    }
    const imagemFile = data.perfil[0];

    const imageUrl = await uploadImagemPerfil(imagemFile, data.nome);
    if (!imageUrl) return;

    const personagemData = {
      ...data,
      perfil: imageUrl,
      precisa_atualizar: true,
    };

    createPersonagem(personagemData, {
      onSuccess: () => {
        reset();
        closeModal();
      },
    });
  }

  const anosForCreate = setAnos(INICIO_POR_GERACAO[geracao]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-3 items-center mb-2">
        <h3 className="text-slate-500 text-md">Duelista</h3>
        <span className="bg-sky-900 text-sky-200 px-2 py-1 rounded-sm text-xs shadow-sm tracking-wide">
          {geracao.toUpperCase()}
        </span>
      </div>
      <div className="grid sm:grid-cols-2 gap-2 gap-y-2 border-t border-sky-900 pt-4 items-center sm:w-md mb-16">
        <Input label="Nome" id="nome" register={register} errors={errors} />
        <Input label="Deck" id="deckName" register={register} errors={errors} />
        <input
          type="hidden"
          value={geracao}
          {...register("geracao")}
          name="geracao"
        />
        <Select
          options={anosForCreate}
          label="Inicio em"
          id="inicio_em"
          register={register}
          errors={errors}
        />
        <FileInput errors={errors} id="perfil" register={register} />
      </div>
      <Button disabled={isCreating}>
        {isCreating ? "Criando..." : "Criar Duelista"}
      </Button>
    </form>
  );
}
