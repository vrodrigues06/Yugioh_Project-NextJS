import { ApiResponse } from "@/@types/api";
import supabase from "../supabase";
import { ConjuntoRegras } from "@/@types/regras";
import apiError from "@/functions/api-error";

export async function regrasByYearGet(
  ano: number,
): Promise<ApiResponse<ConjuntoRegras>> {
  try {
    const { data, error } = await supabase
      .from("regras")
      .select("*")
      .eq("ano", ano)
      .single();

    if (error)
      throw new Error(`Erro ao buscar regras do ano ${ano}: ${error.message}`);

    return {
      data: data as ConjuntoRegras,
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
