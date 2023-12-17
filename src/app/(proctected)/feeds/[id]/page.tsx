import { createServerActionClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { IconButton } from "@/components/custom/buttons/IconButton";
import { formatDate } from "@/lib/utils/formatDate";
import { MdOutlineComment } from "react-icons/md"
import { IoMdShare } from "react-icons/io"
import { GoHeartFill, GoHeart } from "react-icons/go"



interface FeedPageInterface {
  params: {
    id: string;
  }
}
type currentFeedType = Story | Poem | Quote
const FeedPage = async ({ params }: FeedPageInterface) => {
  const [entity_type, entity_id] = params.id.split("E");

  let currentFeed: currentFeedType = {};
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();
  if (entity_type === "story") {
    const storiesResponse = await supabase.from("stories").select("*").eq("entity_id", entity_id);
    if (storiesResponse.error) {
      console.log("Error fetching story in its feed page");
    }
    currentFeed = storiesResponse.data[0];
    const storyReadsFetch = await supabase.from("story_reads").select("*").eq("user_id", user.id);
    if (storyReadsFetch.error) {
      console.log(storiesResponse.error)
    }
    const isReadAlready = await supabase.from("story_reads").select("user_id").eq("user_id", user.id).eq("entity_id", entity_id)
    if (isReadAlready.data.length === 0) {
      await supabase.from("story_reads").insert([{ "user_id": user.id, "entity_id": entity_id }])
      await supabase.from("stories").update({ "read_count": currentFeed.read_count + 1 }).eq("entity_id", entity_id);
    }
  } else if (entity_type === "poem") {
    const poemsResponses = await supabase.from("poems").select("*").eq("entity_id", entity_id);
    if (poemsResponses.error) {
      console.log("Error fetching poems in its feed")
    }
    currentFeed = poemsResponses.data[0]
    const poemReadsFetch = await supabase.from("poem_reads").select("*").eq("user_id", user.id);
    if (poemReadsFetch.error) {
      console.log(poemReadsFetch.error)
    }
    const isReadAlready = await supabase.from("poem_reads").select("user_id").eq("user_id", user.id).eq("entity_id", entity_id)
    if (isReadAlready.data.length === 0) {
      await supabase.from("poem_reads").insert([{ "user_id": user.id, "entity_id": entity_id }])
      await supabase.from("poems").update({ "read_count": currentFeed.read_count + 1 }).eq("entity_id", entity_id);
    }

  } else if (entity_type === "quote") {
    const quotesResponse = await supabase.from("quotes").select("*").eq("entity_id", entity_id);
    if (quotesResponse.error) {
      console.log("Error in fetchin quote in its feed")
    }
    currentFeed = quotesResponse.data[0]
    const quoteReadsFetch = await supabase.from("quote_reads").select("*").eq("user_id", user.id).eq("entity_id", entity_id);
    if (quoteReadsFetch.error) {
      console.log(quoteReadsFetch.error)
    }
    const isReadAlready = await supabase.from("quote_reads").select("user_id").eq("user_id", user.id);
    if (isReadAlready.data.length === 0) {
      await supabase.from("quote_reads").insert([{ "user_id": user.id, "entity_id": entity_id }])
      await supabase.from("quotes").update({ "read_count": currentFeed.read_count + 1 }).eq("entity_id", entity_id);
    }

  }

  const handleLikePost = async () => {
    "use server";

    const supabase = createServerActionClient({ cookies });
    if (entity_type === "story") {
      const response = await supabase.from("story_likes").select("*").eq("user_id", user.id).eq("entity_id", entity_id);
      if (response.data.length === 0) {
        await supabase.from("story_likes").insert([{ "user_id": user.id, "entity_id": entity_id }]);
        const prevLikeCount = await supabase.from("stories").select("like_count").eq("entity_id", entity_id);
        await supabase.from("stories").update({ "like_count": prevLikeCount.data[0].like_count + 1 }).eq("entity_id", entity_id);
      }
    } else if (entity_type === "quote") {
      const response = await supabase.from("quote_likes").select("*").eq("user_id", user.id).eq("entity_id", entity_id);
      if (response.data.length === 0) {
        await supabase.from("quote_likes").insert([{ "user_id": user.id, "entity_id": entity_id }]);
        const prevLikeCount = await supabase.from("quotes").select("like_count").eq("entity_id", entity_id);
        await supabase.from("quotes").update({ "like_count": prevLikeCount.data[0].like_count + 1 }).eq("entity_id", entity_id);
      }
    } else if (entity_type === "poem") {
      const response = await supabase.from("poem_likes").select("*").eq("user_id", user.id).eq("entity_id", entity_id);
      if (response.data.length === 0) {
        await supabase.from("poem_likes").insert([{ "user_id": user.id, "entity_id": entity_id }]);
        const prevLikeCount = await supabase.from("poems").select("like_count").eq("entity_id", entity_id);
        await supabase.from("poems").update({ "like_count": prevLikeCount.data[0].like_count + 1 }).eq("entity_id", entity_id);
      }
    }
  }

  let isLiked = false;
  if (entity_type === "story") {
    const response = await supabase.from("story_likes").select("*").eq("user_id", user.id).eq("entity_id", entity_id);
    if (response.data.length !== 0) {
      isLiked = true;
    }
  } else if (entity_type === "poem") {
    const response = await supabase.from("quote_likes").select("*").eq("user_id", user.id).eq("entity_id", entity_id);
    if (response.data.length !== 0) {
      isLiked = true;
    }
  } else if (entity_type === "quote") {
    const response = await supabase.from("poem_likes").select("*").eq("user_id", user.id).eq("entity_id", entity_id);
    if (response.data.length !== 0) {
      isLiked = true;
    }
  }
  return (
    <div className="relative mt-4 w-full flex flex-col justify-center items-center">
      <section className="w-full md:w-[80%] p-4 flex flex-col justify-center items-center">
        <h1 className="scroll-m-20 sm:text-5xl md:text-7xl dark:text-card-foreground font-openSans font-extrabold tracking-tight lg:text-5xl">
          {currentFeed.title}
        </h1>
        <p>{currentFeed.entity_type}</p>
        <div className="">{currentFeed.content}</div>
        <div className="fixed bottom-10 flex justify-between items-center gap-3 border-2 dark:bg-background border-heading px-4 rounded-full">
          {!isLiked ? <form action={handleLikePost}>
            <div className="text-2xl cursor-pointer"><GoHeart /></div>
          </form> : <div className="text-2xl cursor-pointer"><GoHeartFill /></div>}
          <CommentsComponent entity_id={entity_id} entity_type={entity_type} />
          <div className="text-2xl cursor-pointer">
            <IoMdShare />
          </div>
        </div>
      </section>
    </div>
  )
}
export default FeedPage;


// Comments component
const CommentsComponent = async ({ entity_id, entity_type }) => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const userAuth = await supabase.auth.getUser();
  const profileDetails = await supabase.from("profiles").select(`username,full_name,avatar_url`).eq("user_id", userAuth.data.user.id);

  const handleSubmitComment = async (formData: FormData) => {
    "use server";
    if (!formData.get("comment")) {
      return;
    }
    const supbaseActionClient = createServerActionClient({ cookies });
    if (entity_type === "story") {
      const hasComentedBefore = await supbaseActionClient.from("story_comments").select("*").eq("user_id", userAuth.data.user.id).eq("entity_id", entity_id);
      if (hasComentedBefore.data.length === 0) {
        await supbaseActionClient.from("story_comments").insert([{ "user_id": userAuth.data.user.id, "entity_id": entity_id, "comment": formData.get("comment").toString() }]);
      } else {
        await supbaseActionClient.from("story_comments").update({ "comment": formData.get("comment").toString() }).eq("user_id", userAuth.data.user.id).eq("entity_id", entity_id);
      }
    }
    else if (entity_type === "poem") {
      const hasComentedBefore = await supbaseActionClient.from("poem_comments").select("*").eq("user_id", userAuth.data.user.id).eq("entity_id", entity_id);
      if (hasComentedBefore.data.length === 0) {
        await supbaseActionClient.from("poem_comments").insert([{ "user_id": userAuth.data.user.id, "entity_id": entity_id, "comment": formData.get("comment").toString() }]);
      } else {
        await supbaseActionClient.from("poem_comments").update({ "comment": formData.get("comment").toString() }).eq("user_id", userAuth.data.user.id).eq("entity_id", entity_id);
      }
    }
    else if (entity_type === "quote") {
      const hasComentedBefore = await supbaseActionClient.from("quote_comments").select("*").eq("user_id", userAuth.data.user.id).eq("entity_id", entity_id);
      if (hasComentedBefore.data.length === 0) {
        await supbaseActionClient.from("quote_comments").insert([{ "user_id": userAuth.data.user.id, "entity_id": entity_id, "comment": formData.get("comment").toString() }]);
      } else {
        await supbaseActionClient.from("poem_comments").update({ "comment": formData.get("comment").toString() }).eq("user_id", userAuth.data.user.id).eq("entity_id", entity_id);
      }
    }
  }

  // Fetch existing comments
  let ExisingComments = [];
  if (entity_type === "story") {
    const response = await supabase.from("story_comments").select(`*, profiles(
      username,full_name,avatar_url
    )`).eq("entity_id", entity_id);
    ExisingComments = response.data;
  } else if (entity_type === "poem") {
    const response = await supabase.from("poem_comments").select(`*, profiles(
      username,full_name,avatar_url
    )`).eq("entity_id", entity_id);
    ExisingComments = response.data;
  }
  else if (entity_type === "quote") {
    const response = await supabase.from("quote_comments").select(`*, profiles(
      username,full_name,avatar_url
    )`).eq("entity_id", entity_id);
    ExisingComments = response.data;
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        {/* <Button variant="outline">Open</Button> */}
        {/* <IconButton src="/icons/comment.png" width={28} height={28} alt="Comment Button" /> */}
        <div className="text-lg">
          <MdOutlineComment />
        </div>
      </SheetTrigger>
      <SheetContent className="flex flex-col justify-start items-start gap-4">
        <SheetHeader>
          <SheetTitle>Comments</SheetTitle>
        </SheetHeader>
        <SheetDescription className="w-full flex justify-start items-start gap-3 flex-col">
          {/* Make changes to your profile here. Click save when you're done. */}
          <div className="flex justify-start items-start gap-4">
            <Avatar>
              <AvatarImage src={profileDetails?.data[0].avatar_url} alt={profileDetails?.data[0].full_name} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-start items-start ">
              <p>{profileDetails?.data[0].full_name}</p>
              <p>{profileDetails?.data[0].username}</p>
            </div>
          </div>
          <div className="w-full border-t-[1px] border-b-[1px] border-slate-300">
            <form action={handleSubmitComment} className="py-3 w-full flex flex-col justify-start items-start gap-2">
              <Label className="pl-3">Write your comment below</Label>
              <Textarea name="comment" placeholder="Your comment here" className="focus-visible:ring-0 focus-visible:ring-offset-0 border-none" />
              <div className="w-full flex justify-end items-end">
                <Button variant="outline" className="rounded-full -py-1">Comment</Button>
              </div>
            </form>
          </div>
          <div>
            {ExisingComments.length != 0 ? ExisingComments.map((item) => {
              const dateTime = formatDate(item.created_at);
              return (
                <div key={item.entity_id}>
                  <EachCommentComponent comment={item.comment} avatar_url={item.profiles.avatar_url} username={item.profiles.username} full_name={item.profiles.full_name} createdAt={dateTime} />
                </div>
              )
            }) : <p>No comments yet!</p>}
          </div>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  )
}


// Each comments layout component
const EachCommentComponent = ({ avatar_url, full_name, username, comment, createdAt }) => {
  return (
    <div className="flex flex-col justify-start items-start gap-2">
      <div className="flex justify-start items-start gap-4">
        <Avatar>
          <AvatarImage src={avatar_url} alt={full_name} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-start items-start ">
          <p>{full_name}</p>
          <p>{username}</p>
        </div>
      </div>
      <div>
        <p>{createdAt}</p>
      </div>
      <div>
        <p>{comment}</p>
      </div>
    </div>
  )
}





