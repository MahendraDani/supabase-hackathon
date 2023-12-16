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
import { resolve } from "path";


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
                <Card className="w-full md:w-[80%] lg:w-[70%] mx-auto bg-green-50">
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
                      {f.entity_type === "story" ? <Image src={"/icons/story.png"} width={28} height={28} alt="story" />
                        : f.entity_type === "poem" ? <Image src={"/icons/poem.png"} width={28} height={28} alt="Poems" />
                          : <Image src={"/icons/quote.png"} width={28} height={28} alt="story" />
                      }
                    </div>

                  </CardContent>
                  <CardHeader>
                    <CardTitle>
                      <Link href={`/feeds/${f.entity_type}E${f.entity_id}`}>
                        {f.title}
                      </Link>
                    </CardTitle>
                    <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta debitis voluptas eligendi neque deleniti quasi, enim qui in iusto fuga.</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between items-center gap-4 text-slate-600">
                    <div className="flex justify-between items-center gap-2">
                      <div className="flex justify-start items-center gap-2">
                        <Image src={"/icons/red-heart.png"} width={20} height={20} alt="Likes" />
                        <p>{f.like_count}</p>
                      </div>
                      <div className="flex justify-start items-center gap-2">
                        <Image src={"/icons/comment.png"} width={20} height={20} alt="Likes" />
                        <p>{f.comment_count}</p>
                      </div>
                      <div className="flex justify-start items-center gap-2">
                        <Image src={"/icons/book.png"} width={20} height={20} alt="Reads" />
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

