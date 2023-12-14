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

  const feeds = [...poemFeeds, ...storyFeeds, ...quoteFeeds];
  const mixedFeeds = shuffleArray(feeds);
  return (
    <div>
      <div className="flex flex-col gap-8">
        {
          mixedFeeds.map((f) => {
            return (
              <div key={f.entity_id}>
                <Card className="w-[50rem]">
                  <CardContent className="p-8 w-full -mb-8 flex justify-between items-center">
                    <div className="flex justify-start items-center gap-4">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <p>{f.profiles?.username}</p>
                      <p>{f.entity_type}</p>
                    </div>
                    <div>
                      <Link href={`/feeds/${f.entity_id}`}>
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
          })
        }
      </div>
    </div>
  )
}