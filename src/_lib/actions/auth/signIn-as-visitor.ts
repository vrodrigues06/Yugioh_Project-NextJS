// app/login/actions/visitor-actions.ts
"use server";

import { cookies } from "next/headers";

export async function signInAsVisitor() {
  const cookieStore = await cookies();

  cookieStore.set("user_role", "visitor", {
    path: "/",
    httpOnly: true,
    secure: true,
    maxAge: 60 * 15, // 15 minutos em segundos
  });

  return { success: true };
}
