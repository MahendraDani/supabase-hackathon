import type { Database as DB } from "@/lib/types/Database.types";

declare global {
  type Database = DB;
  type Story = DB["public"]["Tables"]["stories"]["Row"];
  type Quote = DB["public"]["Tables"]["quotes"]["Row"];
  type Poem = DB["public"]["Tables"]["poems"]["Row"];
  type Profile = DB["public"]["Tables"]["profiles"]["Row"];
}
