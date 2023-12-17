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
import { toast } from "@/components/ui/use-toast";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


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
  const handleCreateNewDraft = async (formData: FormData) => {
    "use server";
    const supabase = createServerActionClient({ cookies });
    const inputEntityType = formData.get("entity_type").toString();
    if (inputEntityType === "story") {
      const { data, error } = await supabase.from("stories").insert([{ "title": "untitled", "user_id": user.id }]).select();
      if (error) {
        console.log(error);
        return;
      }
      const entity_id = data[0].entity_id;

      redirect(`/${username}/drafts/${entity_id}`);
    } else if (inputEntityType === "poem") {
      const { data, error } = await supabase.from("poems").insert([{ "title": "untitled", "user_id": user.id }]).select();
      if (error) {
        console.log(error);
        return;
      }
      const entity_id = data[0].entity_id;

      redirect(`/${username}/drafts/${entity_id}`);
    } else if (inputEntityType === "quote") {
      const { data, error } = await supabase.from("quotes").insert([{ "title": "untitled", "user_id": user.id }]).select();
      if (error) {
        console.log(error);
        return;
      }
      const entity_id = data[0].entity_id;

      redirect(`/${username}/drafts/${entity_id}`);
    } else {
      toast({
        title: "Please select a valid option!",
        description: "Incorrect or invalid response"
      })
      return;
    }
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
    <div className="sticky z-10 top-0 left-0 right-0 w-full flex justify-center items-center">
      <nav className="w-full md:w-[85%] p-4 px-6 flex justify-between items-center">
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
                  <CreateNewDraftComponent handleCreateNewDraft={handleCreateNewDraft} />
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

const CreateNewDraftComponent = ({ handleCreateNewDraft }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full rounded-md" variant="secondary">My Draft</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] py-4">
        <DialogHeader className="mb-4">
          <DialogTitle>What do want to write today?</DialogTitle>
        </DialogHeader>
        <DialogDescription className="mb-4 ">
          <form action={handleCreateNewDraft} className="flex justify-start items-start gap-4" >
            <Select name="entity_type">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="New Draft" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="story">Story</SelectItem>
                  <SelectItem value="poem">Poem</SelectItem>
                  <SelectItem value="quote">Quote</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <DialogClose>
              <Button type="submit">Write</Button>
            </DialogClose>

          </form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
