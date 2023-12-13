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
  type StoriesWithProfilesType = QueryData<typeof storiesWithProfiles>
  const [feed, setFeed] = useState<StoriesWithProfilesType | null>([])
  const handleFeeds = async () => {
    const { data, error } = await storiesWithProfiles;
    if (error) {
      JSON.stringify(error, null, 2);
    }
    // console.log(data);
    setFeed(data);
  }
  useEffect(() => {
    handleFeeds();
  }, [])
  return (
    <div className="flex flex-col gap-8">
      {feed?.map((f) => {
        return (
          <div key={f.story_id}>
            <Card className="w-[50rem]">
              <CardContent className="p-8 -mb-8 flex justify-start items-center gap-4">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p>{f.profiles?.username}</p>
                <div>
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
    // <div>Hello</div>
  )
}
export default FeedsCard;
