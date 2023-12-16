import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { createServerActionClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { cookies } from "next/headers"
import { ModeToggle } from "../theme/theme";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";


export default async function ProtectedNavbar() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) {
    JSON.stringify(error, null, 2);
  }
  const { data } = await supabase.from("profiles").select(`username,full_name`).eq("user_id", user?.id);
  const username = data[0]?.username;
  const full_name = data[0]?.full_name;

  let redirectDraftHref: string = "";
  const storiesResponse = await supabase.from("stories").select(`entity_type,entity_id,title`).eq("is_published", false).eq("user_id", user.id);
  if (storiesResponse.error) {
    console.log(storiesResponse.error);
  }
  if (storiesResponse.data) {
    redirectDraftHref = storiesResponse.data[0].entity_id;
  }

  const sidebarOptions = [
    {
      href: `/${username}`,
      itemName: "Profile"
    },
    {
      href: `/feeds`,
      itemName: "Feeds"
    },
    {
      href: `/${username}/drafts/${redirectDraftHref}`,
      itemName: "Drafts",
    },
    {
      href: `/${username}/favourites`,
      itemName: "Favourites"
    },
    {
      href: `/${username}/activity`,
      itemName: "My Activity"
    },
    {
      href: `/${username}/settings`,
      itemName: "Settings",
    },
  ];
  return (
    <div className="w-full flex justify-center items-center">
      <nav className="w-full md:w-[85%] bg-green-50 p-4 px-6 flex justify-between items-center">
        <div>Rhymes and Fables</div>
        <div className="flex justify-start gap-4 items-center">
          <ModeToggle />
          <Sheet>
            <SheetTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <div className="mt-4 flex justify-start items-center gap-4">
                  <Image src={"https://github.com/shadcn.png"} alt="Profile image" width={64} height={64} className="rounded-full" />
                  <div className="flex flex-col ">
                    <p>{full_name}</p>
                    <p className="text-sm">{`@${username}`}</p>
                  </div>
                </div>
              </SheetHeader>
              <SheetDescription className="mt-3">
                <div className="p-2 flex flex-col justify-start items-start gap-2">
                  {sidebarOptions.map((item) => {
                    return (
                      <div key={1}>
                        <Link href={item.href}>
                          <SheetClose>
                            <Button variant="outline" className="min-w-[20rem]">{item.itemName}</Button>
                          </SheetClose>
                        </Link>
                      </div>
                    )
                  })}
                  <LogoutComponent />
                </div>

              </SheetDescription>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </div>
  )
}

interface ProfileDropDownItemProps {
  href: string;
  itemName: string;
}

const LogoutComponent = () => {
  const handleLogout = async () => {
    "use server";
    const supabase = createServerActionClient({ cookies });
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("Error while logging out")
      return;
    }
    redirect("/");
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="w-full">Logout</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            There are many more stories, poems and quotes left to read, explore, learn and have fun.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form action={handleLogout}>
            <Button type="submit" >Log out</Button>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}