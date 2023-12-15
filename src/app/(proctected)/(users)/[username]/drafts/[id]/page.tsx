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
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

export default function DraftPage() {
  const currentDrafts = [];

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
            <DialogDescription className="mb-4">
              <form >
                <Select>
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
              </form>
            </DialogDescription>
            <DialogFooter>
              <Button type="submit">Write</Button>
            </DialogFooter>
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
              <Input placeholder="Title here..." className="focus-visible:ring-0 focus-visible:ring-offset-0 border-none md:w-[80%] text-4xl font-bold" />
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