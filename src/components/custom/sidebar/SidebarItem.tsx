import { Button } from "@/components/ui/button";
import Link from "next/link";

interface SidebarItemProps {
  href: string;
  itemName: string;
}
export default function SidebarItem({ href, itemName }: SidebarItemProps) {
  return (
    <div>
      <Link href={href}>
        <Button variant={"outline"} className="py-0 min-w-[10rem]">{itemName}</Button>
      </Link>
    </div>
  )
}