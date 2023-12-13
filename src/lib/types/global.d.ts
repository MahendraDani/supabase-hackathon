import type { Database as DB } from "@/lib/types/database.types";

declare global {
  type Database = DB;
}
