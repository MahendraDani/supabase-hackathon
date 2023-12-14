import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { cookies } from "next/headers"
import { ModeToggle } from "../theme/theme";

export default async function ProtectedNavbar() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) {
    JSON.stringify(error, null, 2);
  }
  const { data } = await supabase.from("profiles").select(`username,full_name`).eq("user_id", user?.id);
  const username = data[0]?.username;
  const full_name = data[0]?.full_name;
  const ProfileMenuOptions = [
    {
      "href": `/${username}`,
      "itemName": "Profile"
    },
    {
      "href": `/feeds`,
      "itemName": "Feeds"
    },
    {
      "href": `/${username}/drafts`,
      "itemName": "Drafts"
    },
    {
      "href": `/${username}/reads`,
      "itemName": "Reads"
    },
    {
      "href": `/${username}/favourites`,
      "itemName": "Favourites"
    },
    {
      "href": `/${username}/logout`,
      "itemName": "Log out"
    },
  ]
  return (
    <div className="w-full flex justify-center items-center">
      <nav className="w-full md:w-[85%] bg-green-50 p-4 px-6 flex justify-between items-center">
        <div>Rhymes and Fables</div>
        <div className="flex justify-start gap-4 items-center">
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{full_name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {ProfileMenuOptions.map((item) => {
                return (
                  <ProfileDropDownItem key={1} href={item.href} itemName={item.itemName} />
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
      </nav>
    </div>
  )
}

interface ProfileDropDownItemProps {
  href: string;
  itemName: string;
}
const ProfileDropDownItem = ({ href, itemName }: ProfileDropDownItemProps) => {
  return (
    <Link href={href} >
      <DropdownMenuItem className="cursor-pointer">
        {itemName}
      </DropdownMenuItem>
    </Link>
  )
}