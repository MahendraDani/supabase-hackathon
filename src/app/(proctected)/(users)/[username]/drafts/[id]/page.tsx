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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { createServerActionClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers"
import { redirect } from "next/navigation";
import { Label } from "@radix-ui/react-dropdown-menu";
import Image from "next/image";

interface DraftsPageInterface {
  params: {
    id: string;
  }
}

export default async function DraftPage({ params }: DraftsPageInterface) {
  function trimString(inputString: string, maxLength: number): string {
    if (inputString.length > maxLength) {
      return inputString.substring(0, maxLength - 3) + '...';
    } else {
      return inputString;
    }

  }

  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();
  const { data } = await supabase.from("profiles").select("username").eq("user_id", user.id);
  const username = data[0].username;

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
      console.log("Oops, error")
      return;
    }
  }

  const storiesResponse = await supabase.from("stories").select(`entity_type,entity_id,title,content`).eq("is_published", false).eq("user_id", user.id);
  if (storiesResponse.error) {
    console.log("Error from stories fetchin");
    return;
  }
  const poemsRepsonse = await supabase.from("poems").select(`entity_type,entity_id,title,content`).eq("is_published", false).eq("user_id", user.id);
  if (poemsRepsonse.error) {
    console.log("Error in fetching poems");
    return;
  }
  const quotesRespnse = await supabase.from("quotes").select(`entity_type,entity_id,title,content`).eq("is_published", false).eq("user_id", user.id);
  if (poemsRepsonse.error) {
    console.log("error in fetching quotes");
  }
  let allDrafts = [...storiesResponse.data, ...poemsRepsonse.data, ...quotesRespnse.data];
  // console.log(allDrafts);

  let sidebarOptions = [];
  const currentDraft: { entity_type?: string; title?: string; entity_id?: string; content?: string } = {}
  allDrafts.forEach((draft) => {
    if (params.id === draft.entity_id) {
      currentDraft.entity_id = draft.entity_id;
      currentDraft.entity_type = draft.entity_type;
      currentDraft.title = draft.title;
      currentDraft.content = draft.content;
    }
    sidebarOptions.push({
      href: `/${username}/drafts/${draft.entity_id}`,
      title: draft.title,
      entity_type: draft.entity_type
    })
  })

  const submitPost = async (formData: FormData) => {
    "use server";
    const supabase = createServerActionClient({ cookies });
    if (currentDraft.entity_type === "story") {
      const storiesPostResponse = await supabase.from("stories").update({ "title": formData.get("title").toString(), "content": formData.get("content").toString() }).eq("entity_id", currentDraft.entity_id).select();
      if (storiesPostResponse.error) {
        console.log(storiesPostResponse.error)
        return;
      }
    }
    if (currentDraft.entity_type === 'poem') {
      const poemsPostResponse = await supabase.from("poems").update({ "title": formData.get("title").toString(), "content": formData.get("content").toString() }).eq("entity_id", currentDraft.entity_id).select();
      if (poemsPostResponse.error) {
        console.log(poemsPostResponse.error)
        return;
      }
    }
    if (currentDraft.entity_type === "quote") {
      const quotePostResponse = await supabase.from("quotes").update({ "title": formData.get("title").toString(), "content": formData.get("content").toString() }).eq("entity_id", currentDraft.entity_id).select();
      if (quotePostResponse.error) {
        console.log(quotePostResponse.error)
        return;
      }
    }
  }

  const handleFinalPost = async (formData: FormData) => {
    "use server";
    if (formData.get("genre") === "") {
      return;
    }
    const supabase = createServerActionClient({ cookies });
    if (currentDraft.entity_type === "story") {
      const storiesPostResponse = await supabase.from("stories").update({ "is_published": true, "genre": formData.get("genre") }).eq("entity_id", currentDraft.entity_id).select();
      if (storiesPostResponse.error) {
        console.log(storiesPostResponse.error)
        return;
      }
    }
    else if (currentDraft.entity_type === "poem") {
      const poemsPostResponse = await supabase.from("poems").update({ "is_published": true, "genre": formData.get("genre") }).eq("entity_id", currentDraft.entity_id).select();
      if (poemsPostResponse.error) {
        console.log(poemsPostResponse.error)
        return;
      }
    } else if (currentDraft.entity_type === "quote") {
      const quotePostResponse = await supabase.from("quotes").update({ "is_published": true, "genre": formData.get("genre") }).eq("entity_id", currentDraft.entity_id).select();
      if (quotePostResponse.error) {
        console.log(quotePostResponse.error)
        return;
      }
    }
    redirect("/feeds");
  }

  return (
    <section className="md:mt-4 relative w-full md:flex md:justify-start md:items-start md:gap-4">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col justify-start items-start gap-4 md:w-1/5 fixed left-4 bottom-4 top-[5.5rem] border-[1px] border-slate-300 p-4">
        <h2 className="w-full grid place-content-center">My Drafts</h2>
        <CreateNewDraftComponent handleCreateNewDraft={handleCreateNewDraft} />
        <div className="w-full flex flex-col justify-start items-center gap-2">
          {sidebarOptions.map((item) => {
            const slicedItemName = trimString(item.title, 15);
            return (
              <div key={1}>
                <Link href={item.href}>
                  <Button variant="outline" className="py-[0.5px] md:min-w-[12rem] rounded-md max-w-[15rem]">{slicedItemName}</Button>
                </Link>
              </div>
            )
          })}
        </div>
      </aside>
      <section className="md:w-4/5 md:sticky md:left-72 md:px-8" >
        <form action={submitPost} className="flex flex-col justify-start items-start gap-5">
          {/* <div>
            Add Image
          </div> */}
          <div className="w-full">
            <h1>
              <Textarea placeholder="Title here..." name="title" defaultValue={currentDraft.title} className="min-h-12 overflow-scroll focus-visible:ring-0 focus-visible:ring-offset-0 border-none w-[80%] text-4xl font-bold" />
            </h1>
            <p>
              <Textarea placeholder="Write " name="content" defaultValue={!currentDraft.content ? "Write here..." : currentDraft.content} className="min-h-[400rem] focus-visible:ring-0 focus-visible:ring-offset-0 border-none md:w-[80%] text-lg" />
            </p>
          </div>

          <Button variant="outline" type="submit" className="md:block fixed bottom-5 right-5 md:right-20 w-[12rem]">Save</Button>
          {/* For mobile screens only */}
          <DraftOptionsSidebarMobile trimString={trimString} handleFinalPost={handleFinalPost} sidebarOptions={sidebarOptions} handleCreateNewDraft={handleCreateNewDraft} />
          <PublishPostDesktop handleFinalPost={handleFinalPost} entity_type={currentDraft.entity_type} />
        </form>
      </section>
    </section>
  )
}

const PublishPostDesktop = ({ handleFinalPost, entity_type }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-md hidden md:block md:fixed top-40 right-20 w-[12rem]" variant="secondary">Publish</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] py-4">
        <DialogHeader className="mb-4 ">
          <DialogTitle>Do you really want to post?</DialogTitle>
        </DialogHeader>
        <DialogDescription className="mb-4 flex flex-col justify-start items-start gap-3">
          <p>Once published this post will be visible to all.</p>
          <div className="w-full flex items-end justify-end gap-3">
            <form action={handleFinalPost} className="mt-4 flex flex-col justify-start items-center w-full gap-8">
              <div className="w-full">

                {entity_type === "story" ? <SelectGenreComponentForStory /> : entity_type === "poem" ? <SelectGenreComponentForPoem /> : <SelectGenreComponentForQuote />}
              </div>
              <div className="w-full flex justify-end items-end gap-4">
                <DialogClose><Button type="submit">Publish</Button></DialogClose>
              </div>
            </form>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

const DraftOptionsSidebarMobile = ({ sidebarOptions, handleFinalPost, trimString, handleCreateNewDraft }) => {
  return (<Sheet>
    <SheetTrigger asChild>
      <button className="block fixed top-35 right-5 md:hidden hover:bg-slate-100 p-2 rounded-full">
        <Image src={"/icons/vertical-dots.png"} width={24} height={24} alt="Sidebar menu" />
      </button>
    </SheetTrigger>
    <SheetContent className="flex flex-col justify-between">
      <div>
        <SheetHeader>
          <SheetTitle>Your Drafts</SheetTitle>
          <SheetDescription className="mt-2 mb-4">
            <div className="mb-3">
              <CreateNewDraftComponent handleCreateNewDraft={handleCreateNewDraft} />
            </div>
            <div className="w-full flex flex-col justify-start items-center gap-3">
              {sidebarOptions.map((item) => {
                const slicedItemName = trimString(item.title, 15);
                return (
                  <div key={1}>
                    <Link href={item.href}>
                      <Button variant="outline" className="py-[0.5px] min-w-[16rem] rounded-md">{slicedItemName}</Button>
                    </Link>
                  </div>
                )
              })}
            </div>
          </SheetDescription>
        </SheetHeader>
      </div>
      <div>
        <SheetFooter>
          <div className="flex flex-col justify-between items-center gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="rounded-md md:hidden w-[16rem]">Publish</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] py-4">
                <DialogHeader className="mb-4 ">
                  <DialogTitle>Do you really want to post?</DialogTitle>
                </DialogHeader>
                <DialogDescription className="mb-4 flex flex-col justify-start items-start gap-3">
                  <p>Once published this post will be visible to all.</p>
                  <div className="w-full flex items-end justify-end gap-3">
                    <DialogClose><Button variant="outline">Cancel</Button></DialogClose>
                    <form action={handleFinalPost}>
                      <SelectGenreComponentForStory />
                      <DialogClose><Button type="submit">Publish</Button></DialogClose>
                    </form>
                  </div>
                </DialogDescription>
              </DialogContent>
            </Dialog>
          </div>
        </SheetFooter>
      </div>
    </SheetContent>
  </Sheet>
  )
}

const CreateNewDraftComponent = ({ handleCreateNewDraft }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full rounded-md" variant="secondary">New Draft</Button>
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
      </DialogContent>
    </Dialog>
  )
}

const SelectGenreComponentForStory = () => {
  const selectOptions = [
    {
      name: "Fantasy",
      value: "Fantasy",
    }, {
      name: "Thriller",
      value: "Thriller",
    },
    {
      name: "Romance",
      value: "Romance",
    },
    {
      name: "Horror",
      value: "Horror",
    },
    {
      name: "Adventure",
      value: "Adventure",
    },
    {
      name: "Science-fiction",
      value: "Science-fiction",
    }, {
      name: "Classic",
      value: "Classic",
    }
  ]
  return (
    <div>
      <Select name="genre">
        <SelectTrigger className="text-white">
          <SelectValue placeholder="Select a genre" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {selectOptions.map((item) => {
              return (
                <SelectItem key={1} value={item.value}>{item.name}</SelectItem>
              )
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

const SelectGenreComponentForPoem = () => {
  const selectOptions = [
    {
      name: "Epic",
      value: "Epic",
    }, {
      name: "Balad",
      value: "Balad",
    },
    {
      name: "Haiku",
      value: "Haiku",
    },
    {
      name: "Free verse",
      value: "Free verse",
    },
    {
      name: "Fable",
      value: "Fable",
    },
    {
      name: "Romance",
      value: "Romance",
    }
  ]
  return (
    <div>
      <Select name="genre">
        <SelectTrigger className="text-white">
          <SelectValue placeholder="Select a genre" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {selectOptions.map((item) => {
              return (
                <SelectItem key={1} value={item.value}>{item.name}</SelectItem>
              )
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

const SelectGenreComponentForQuote = () => {
  const selectOptions = [
    {
      name: "Motivational",
      value: "Motivational",
    }, {
      name: "Inspiring",
      value: "Inspiring",
    },
    {
      name: "Emotional",
      value: "Emotional",
    },
    {
      name: "Psychological",
      value: "Psychological",
    },
  ]
  return (
    <div>
      <Select name="genre">
        <SelectTrigger className="text-white">
          <SelectValue placeholder="Select a genre" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {selectOptions.map((item) => {
              return (
                <SelectItem key={1} value={item.value}>{item.name}</SelectItem>
              )
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}