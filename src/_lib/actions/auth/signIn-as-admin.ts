// app/login/actions/admin-actions.ts
"use server";

import { createServerSupabase } from "@/_lib/supabase-server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signInAsAdmin(prev_state = {}, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const cookieStore = await cookies();
  const supabase = await createServerSupabase();

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error("Senha ou Email inválidos.");
    }

    // Adiciona cookie extra para saber que é admin (opcional)
    cookieStore.set("user_role", "admin", {
      path: "/",
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 7,
    });

    return {
      data: null,
      ok: true,
      error: "",
    };
  } catch (error: unknown) {
    if (error instanceof Error)
      return {
        data: null,
        ok: false,
        error: error.message,
      };
  }
}
