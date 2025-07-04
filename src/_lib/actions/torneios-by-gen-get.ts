"use server";
import { Torneio } from "@/@types";
import supabase from "../supabase";
import apiError from "@/functions/api-error";
import { ApiResponse } from "@/@types/api";

export async function torneiosByGenGet(
  geracao: string,
): Promise<ApiResponse<Torneio[]>> {
  try {
    if (!geracao) throw new Error("Precisa ser passado uma geração");
    const { data, error } = await supabase
      .from(`torneio_${geracao}`)
      .select("*");

    if (error)
      throw new Error(
        `Não foi possível carregar os torneios: ${error.message}`,
      );

    return {
      data,
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
