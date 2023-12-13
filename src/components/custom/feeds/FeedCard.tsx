import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";
import { QueryResult, QueryData, QueryError } from '@supabase/supabase-js'
import Link from "next/link";


const FeedsCard = () => {
  const supabase = createClientComponentClient<Database>();
  const storiesWithProfiles = supabase.from("stories").select(
    `
    *,
    profiles(
      username,
      full_name
    )
    `
  )
  const poemsWithProfiles = supabase.from("poems").select(
    `
    *,
    profiles(
      username,
      full_name
    )
    `
  )
  const quotesWithProfiles = supabase.from("quotes").select(
    `*,
    profiles(
      username,
      full_name
    )
    `
  )
  type QuotesWithProfiles = QueryData<typeof quotesWithProfiles>
  type PoemsWithProfiles = QueryData<typeof poemsWithProfiles>
  type StoriesWithProfilesType = QueryData<typeof storiesWithProfiles>
  type AllFeedsType = {
    poems: PoemsWithProfiles,
    stories: StoriesWithProfilesType,
    quotes: QuotesWithProfiles,
  }
  const [feed, setFeed] = useState<AllFeedsType | null>({
    quotes: [],
    poems: [],
    stories: [],
  });

  const handleQuotesFeeds = async () => {
    const { data, error } = await quotesWithProfiles;
    if (error) {
      JSON.stringify(error, null, 2);
    }
    return data;
  }

  const handlePoemFeeds = async () => {
    const { data, error } = await poemsWithProfiles;
    if (error) {
      JSON.stringify(error, null, 2);
    }
    return data;
  }
  const handleStoryFeeds = async () => {
    const { data, error } = await storiesWithProfiles;
    if (error) {
      JSON.stringify(error, null, 2);
    }
    return data;
  }

  const handleFeeds = async () => {
    const poems = await handlePoemFeeds();
    const stories = await handleStoryFeeds();
    const quotes = await handleQuotesFeeds();
    const allFeeds = {
      poems,
      stories,
      quotes,
    }

    console.log(allFeeds);
    setFeed(allFeeds);
  }
  useEffect(() => {
    handleFeeds();
  }, [])
  return (
    <div>
      <div className="flex flex-col gap-8">
        {feed?.stories?.map((f) => {
          return (
            <div key={f.story_id}>
              <Card className="w-[50rem]">
                <CardContent className="p-8 w-full -mb-8 flex justify-between items-center">
                  <div className="flex justify-start items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p>{f.profiles?.username}</p>
                  </div>
                  <div>
                    <Link href={`/feeds/${f.story_id}`}>
                      Read
                    </Link>
                  </div>
                </CardContent>
                <CardHeader>
                  <CardTitle>{f.title}</CardTitle>
                  <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta debitis voluptas eligendi neque deleniti quasi, enim qui in iusto fuga.</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-start items-center gap-4 text-slate-600">
                  <p>{`Likes ${f.like_count}`}</p>
                  <p>{`Reads ${f.read_count}`}</p>
                </CardFooter>
              </Card>
            </div>
          )
        })}
      </div>
      <div className="flex flex-col gap-8">
        {feed?.poems?.map((f) => {
          return (
            <div key={f.poem_id}>
              <Card className="w-[50rem]">
                <CardContent className="p-8 w-full -mb-8 flex justify-between items-center">
                  <div className="flex justify-start items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p>{f.profiles?.username}</p>
                  </div>
                  <div>
                    <Link href={`/feeds/${f.poem_id}`}>
                      Read
                    </Link>
                  </div>
                </CardContent>
                <CardHeader>
                  <CardTitle>{f.title}</CardTitle>
                  <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta debitis voluptas eligendi neque deleniti quasi, enim qui in iusto fuga.</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-start items-center gap-4 text-slate-600">
                  <p>{`Likes ${f.like_count}`}</p>
                  <p>{`Reads ${f.read_count}`}</p>
                </CardFooter>
              </Card>
            </div>
          )
        })}
      </div>
      <div className="flex flex-col gap-8">
        {feed?.quotes?.map((f) => {
          return (
            <div key={f.quote_id}>
              <Card className="w-[50rem]">
                <CardContent className="p-8 w-full -mb-8 flex justify-between items-center">
                  <div className="flex justify-start items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p>{f.profiles?.username}</p>
                  </div>
                  <div>
                    <Link href={`/feeds/${f.quote_id}`}>
                      Read
                    </Link>
                  </div>
                </CardContent>
                <CardHeader>
                  <CardTitle>{f.written_by}</CardTitle>
                  <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta debitis voluptas eligendi neque deleniti quasi, enim qui in iusto fuga.</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-start items-center gap-4 text-slate-600">
                  <p>{`Likes ${f.like_count}`}</p>
                  <p>{`Reads ${f.read_count}`}</p>
                </CardFooter>
              </Card>
            </div>
          )
        })}
      </div>
      {/* <div>
        <Button onClick={() => {
          handleFeeds();
        }}>Get feeds</Button>
      </div> */}
    </div>
  )
}
export default FeedsCard;
