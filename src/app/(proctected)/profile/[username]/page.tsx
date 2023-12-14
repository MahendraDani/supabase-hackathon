import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { QueryData } from "@supabase/supabase-js";
import { cookies } from "next/headers"

interface ProfilePageProps {
  params: {
    username: string;
  }
}
/* 
------------------------------------------------------------------------------------------
TODO
------------------------------------------------------------------------------------------
ref : This page will be similar to hashnode.com/settings
All the features will be present there
------------------------------------------------------------------------------------------
*/
export default async function ProfilePage({ params }: ProfilePageProps) {
  const supabase = createServerComponentClient<Database>({ cookies });
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
  type PoemsWithProfiles = QueryData<typeof poemsWithProfiles>
  type StoriesWithProfilesType = QueryData<typeof storiesWithProfiles>
  const storyFeedsResponse = await storiesWithProfiles;
  if (storyFeedsResponse.error) {
    console.log(storyFeedsResponse.error);
  }
  const storyFeeds: StoriesWithProfilesType | null = storyFeedsResponse.data;

  const poemFeedsResponse = await poemsWithProfiles;
  if (poemFeedsResponse.error) {
    console.log(poemFeedsResponse.error)
  }
  const poemFeeds: PoemsWithProfiles | null = poemFeedsResponse.data;
  // const { data, error } = await supabase.from("stories").select("*");

  const allFeeds = [...poemFeeds, ...storyFeeds];
  return (
    <div>
      <div>This is private user's page</div>
      {params.username}
      <pre>{JSON.stringify(allFeeds, null, 2)}</pre>
    </div>
  )
}