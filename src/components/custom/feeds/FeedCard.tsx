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

interface storyFeedInterface {
  story_id?: string;
  title?: string;
  genre?: string;
  like_count?: string;
  read_count?: string;
  comment_count?: string;
  created_at?: string;
  profiles?: {
    username: string;
    full_name: string;
  }
}

const FeedsCard = () => {
  // full_name, username, avatar
  const [feed, setFeed] = useState<storyFeedInterface[]>([])

  const fetchStoryFeeds = async () => {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase.from("stories").select(`
      story_id,
      title,
      created_at,
      like_count,
      read_count,
      comment_count,
      genre,
      profiles(
        username,
        full_name
      )
    `);
    if (error) {
      JSON.stringify(error, null, 2);
      return;
    }

    setFeed(data);
  }
  useEffect(() => {
    fetchStoryFeeds();
  }, [])
  return (
    <div className="flex flex-col gap-8">
      {feed.map((f) => {
        return (
          <div key={f.story_id}>
            <Card className="w-[50rem]">
              <CardContent className="p-8 -mb-8 flex justify-start items-center gap-8">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  {f.profiles?.username}
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
  )
}
export default FeedsCard