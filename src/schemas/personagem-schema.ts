// schemas/personagemSchema.ts
import { z } from "zod";

const apenasLetrasRegex = /^[A-Za-zÀ-ÿ\s]+$/; // aceita letras com acento e espaços

export const personagemSchema = z.object({
  nome: z
    .string()
    .min(3, "Nome deve ter no mínimo 3 caracteres")
    .max(20, "Nome deve ter no máximo 20 caracteres")
    .regex(apenasLetrasRegex, "Nome deve conter apenas letras"),
  deckName: z
    .string()
    .min(3, "Deck deve ter no mínimo 3 caracteres")
    .regex(apenasLetrasRegex, "Deck deve conter apenas letras"),
  perfil: z
    .any()
    .refine((files) => files?.length === 1, "É obrigatório enviar um arquivo")
    .refine(
      (files) =>
        files && files.length === 1 && files[0]?.type.startsWith("image/"),
      "Envie apenas arquivos de imagem",
    ),
  geracao: z.string(),
  inicio_em: z.string().min(1, "Este campo é obrigatório"),
});

// Inferir o tipo TypeScript baseado no schema
export type PersonagemFormData = z.infer<typeof personagemSchema>;
