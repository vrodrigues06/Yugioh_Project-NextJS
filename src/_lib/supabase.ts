import { createClient } from "@supabase/supabase-js";
import { createBrowserClient } from "@supabase/ssr";
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY as string;
const supabase = createBrowserClient(supabaseUrl, supabaseKey);

export default supabase;
