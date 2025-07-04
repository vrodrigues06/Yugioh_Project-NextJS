"use server";
import { Personagem } from "@/@types/personagem";
import supabase from "../supabase";
import apiError from "@/functions/api-error";
import { ApiResponse } from "@/@types/api";

export async function personagemGet(
  id: number,
): Promise<ApiResponse<Personagem>> {
  try {
    const { data, error } = await supabase
      .from("personagens")
      .select()
      .eq("id", id);

    if (error)
      throw new Error(`Não foi possível carregar Personagem: ${error.message}`);

    if (!data) throw new Error(`Personagem não encontrado`);

    return {
      data: data[0] as Personagem,
      error: "",
      ok: true,
    };
  } catch (error: unknown) {
    const message = apiError(error);
    return {
      ok: false,
      error: message,
      data: null,
    };
  }
}
