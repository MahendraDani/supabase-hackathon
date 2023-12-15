import type { Database as DB } from "@/lib/types/Database.types";

declare global {
  type Database = DB;
  type Story = DB["public"]["Tables"]["stories"]["Row"];
  type Profile = DB["public"]["Tables"]["profiles"]["Row"];
}
