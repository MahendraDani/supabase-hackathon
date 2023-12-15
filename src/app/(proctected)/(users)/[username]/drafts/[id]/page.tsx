import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { createServerActionClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers"
import { redirect } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

export default async function DraftPage() {
  // const supabase = createServerComponentClient({ cookies });
  // const { data: { user } } = await supabase.auth.getUser();
  // const { data } = await supabase.from("profiles").select("username").eq("user_id", user.id);
  // const username = data[0].username;

  const handleCreateNewDraft = async (formData: FormData) => {
    "use server";
    const supabase = createServerActionClient({ cookies });
    const { data: { user }, error } = await supabase.auth.getUser();
    const profileResponse = await supabase.from("profiles").select("username").eq("user_id", user.id);
    if (profileResponse.error) {
      console.log("Error in fetching username")
      return;
    }
    const inputEntityType = formData.get("entity_type").toString();
    if (inputEntityType === "story") {
      const { data, error } = await supabase.from("stories").insert([{ "title": "untitled", "user_id": user.id }]).select();
      if (error) {
        console.log(error);
        return;
      }
      const entity_id = data[0].entity_id;

      redirect(`/${profileResponse.data[0].username}/drafts/${entity_id}`);
    } else if (inputEntityType === "poem") {
      const { data, error } = await supabase.from("poems").insert([{ "title": "untitled", "user_id": user.id }]).select();
      if (error) {
        console.log(error);
        return;
      }
      const entity_id = data[0].entity_id;

      redirect(`/${profileResponse.data[0].username}/drafts/${entity_id}`);
    } else if (inputEntityType === "quote") {
      const { data, error } = await supabase.from("quotes").insert([{ "title": "untitled", "user_id": user.id }]).select();
      if (error) {
        console.log(error);
        return;
      }
      const entity_id = data[0].entity_id;

      redirect(`/${profileResponse.data[0].username}/drafts/${entity_id}`);
    } else {
      toast({
        title: "Please select a valid option!",
        description: "Incorrect or invalid response"
      })
      return;
    }
  }
  // const drafts = [
  //   {
  //     href: `/${username}/draft-id`,
  //     title: 'Name of it',
  //     type: "entity_type",
  //   }
  // ]

  /**
   * 1. Get userid first
   * 2. Then get the username
   * 3. Insert a new row in the content bucket based on kajdskfjdf
   * 
   */

  // TODO : Editor will be shown here
  // TODO : Sidebar in drafts section will be diferent
  return (
    <section className="md:mt-4 relative w-full md:flex md:justify-start md:items-start md:gap-4">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col justify-start items-start gap-4 md:w-1/5 fixed left-4 bottom-4 top-[5.5rem] border-[1px] border-slate-300 p-4">
        <h2 className="w-full grid place-content-center">My Drafts</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full rounded-full" variant="outline">New Draft</Button>
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
                <Button type="submit">Write</Button>
              </form>
            </DialogDescription>
            {/* <DialogFooter>
            </DialogFooter> */}
          </DialogContent>
        </Dialog>

        <Link href={"/username/drafts/3"}>
          <p>The rabbit and the heir</p>
        </Link>
      </aside>
      <section className="md:w-4/5 md:fixed md:left-72 md:px-8" >
        <form className="flex flex-col justify-start items-start gap-5">
          {/* <div>
            Add Image
          </div> */}
          <div className="w-full">
            <h1>
              {/* <Input placeholder="Title" className="border-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0" /> */}
              <Textarea placeholder="Title here..." className="min-h-12 overflow-hidden focus-visible:ring-0 focus-visible:ring-offset-0 border-none md:w-[80%] text-4xl font-bold" />
            </h1>
            <p>
              <Textarea placeholder="Once upon a time..." className="min-h-[40rem] focus-visible:ring-0 focus-visible:ring-offset-0 border-none md:w-[80%] text-lg" />
            </p>
          </div>
        </form>
      </section>
    </section>
  )
}

// On click new draft a new entity should be inserted in the db with title as untitiled and the user should be re-routed to /username/drafts/id