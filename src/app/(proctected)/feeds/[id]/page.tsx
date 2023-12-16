import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers"

interface FeedPageInterface {
  params: {
    id: string;
  }
}
type currentFeedType = Story | Poem | Quote
const FeedPage = async ({ params }: FeedPageInterface) => {
  const [entity_type, entity_id] = params.id.split("E");

  let currentFeed: currentFeedType = {};
  const supabase = createServerActionClient({ cookies });
  if (entity_type === "story") {
    const storiesResponse = await supabase.from("stories").select("*").eq("entity_id", entity_id);
    if (storiesResponse.error) {
      console.log("Error fetching story in its feed page");
    }
    currentFeed = storiesResponse.data[0];
  } else if (entity_type === "poem") {
    const poemsResponses = await supabase.from("poems").select("*").eq("entity_id", entity_id);
    if (poemsResponses.error) {
      console.log("Error fetching poems in its feed")
    }
    currentFeed = poemsResponses.data[0]

  } else if (entity_type === "quote") {
    const quotesResponse = await supabase.from("quotes").select("*").eq("entity_id", entity_id);
    if (quotesResponse.error) {
      console.log("Error in fetchin quote in its feed")
    }
    currentFeed = quotesResponse.data[0]

  }

  return (
    <div className="mt-4 w-full flex flex-col justify-center items-center">
      <section className="w-full md:w-[80%] bg-green-50 p-4 flex flex-col justify-center items-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {currentFeed.title}
        </h1>
        <p>{currentFeed.entity_type}</p>
        <div>{currentFeed.content}</div>
      </section>
    </div>
  )
}
export default FeedPage;