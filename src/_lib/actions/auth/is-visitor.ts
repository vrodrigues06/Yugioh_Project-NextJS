import { cookies } from "next/headers";

export async function isVisitor() {
  const cookieStore = await cookies();

  const role = cookieStore.get("user_role")?.value;
  return role === "visitor";
}
