import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const role = cookieStore.get("user_role")?.value;

  return NextResponse.json({ role });
}
