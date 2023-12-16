import { fetchPoemFeeds, fetchQuoteFeeds, fetchStoryFeeds } from "@/lib/data/feed";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils/formatDate";
import { MdOutlineComment } from "react-icons/md"
import { GoHeartFill } from "react-icons/go"
import { FaBookReader, FaLightbulb } from "react-icons/fa"
import { GiStabbedNote } from "react-icons/gi"
import { LuTrees } from "react-icons/lu"


const shuffleArray = (array: any) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};


export default async function Feeds() {
  const storyFeeds = await fetchStoryFeeds();
  const poemFeeds = await fetchPoemFeeds();
  const quoteFeeds = await fetchQuoteFeeds();

  const feeds = [...poemFeeds, ...quoteFeeds, ...storyFeeds];
  const mixedFeeds = shuffleArray(feeds);
  return (
    <div>
      <div className="flex flex-col gap-8">
        {
          mixedFeeds.map((f) => {
            return (
              <div key={f.entity_id}>
                <Card className="w-full md:w-[80%] lg:w-[70%] mx-auto">
                  <CardContent className="p-8 w-full -mb-8 flex justify-between items-center">
                    <div className="flex justify-start items-center gap-4">
                      <Avatar>
                        <AvatarImage src={f.profiles.avatar_url} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col justify-start items-start">
                        <p>{f.profiles?.full_name}</p>
                        <div className="flex justify-start items-start gap-1 text-sm">
                          <p>{f.profiles?.username}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-start items-start gap-2">
                      {f.entity_type === "story" ? <div className="text-lg"><LuTrees /></div>
                        : f.entity_type === "poem" ? <div className="text-lg"><GiStabbedNote /></div>
                          : <div className="text-lg"><FaLightbulb /></div>
                      }
                    </div>

                  </CardContent>
                  <CardHeader>
                    <CardTitle>
                      <Link href={`/feeds/${f.entity_type}E${f.entity_id}`}>
                        {f.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="w-full min-h-12 max-h-16 text-ellipsis overflow-hidden">{f.content}</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between items-center gap-4 text-slate-600">
                    <div className="flex justify-between items-center gap-4">
                      <div className="flex justify-start items-center gap-1">
                        <div className="text-lg">
                          <GoHeartFill />
                        </div>
                        <p>{f.like_count}</p>
                      </div>
                      <div className="flex justify-start items-center gap-1">
                        <div className="text-lg">
                          <MdOutlineComment />
                        </div>
                        <p>{f.comment_count}</p>
                      </div>
                      <div className="flex justify-start items-center gap-1">
                        <div className="text-lg">
                          <FaBookReader />
                        </div>
                        <p>{f.read_count}</p>
                      </div>
                    </div>
                    <div className="text-sm text-slate-400">
                      {formatDate(f.created_at)}
                    </div>
                  </CardFooter>
                </Card>
              </div>
            )
          })
        }
      </div>
      {/* {JSON.stringify(quoteFeeds, null, 2)} */}
    </div>
  )
}

