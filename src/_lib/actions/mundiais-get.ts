"use server";
import supabase from "../supabase";
import apiError from "@/functions/api-error";
import { ApiResponse } from "@/@types/api";
import { Mundial } from "@/@types";

export async function mundiaisGet(): Promise<ApiResponse<Mundial[]>> {
  try {
    // const { data, error } = await supabase
    //   .from("torneio_mundial_test")
    //   .select("*");

    const { data, error } = await supabase.from("torneio_mundial").select("*");

    if (error)
      throw new Error(
        `Não foi possível carregar todos os Mundiais: ${error.message}`,
      );

    return {
      data: data as Mundial[],
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
