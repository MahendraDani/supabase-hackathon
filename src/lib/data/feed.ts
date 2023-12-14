import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { QueryData } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const supabase = createServerComponentClient({ cookies });
export const fetchStoryFeeds = async () => {
  const storiesWithProfiles = supabase.from("stories").select(
    `
    *,
    profiles(
      username,
      full_name
    )
    `
  );
  type StoriesWithProfilesType = QueryData<typeof storiesWithProfiles>;
  const { data, error } = await storiesWithProfiles;
  if (error) {
    console.log(error);
  }
  return data;
};

export const fetchPoemFeeds = async () => {
  const poemsWithProfiles = supabase.from("poems").select(
    `
    *,
    profiles(
      username,
      full_name
    )
    `
  );
  const { data, error } = await poemsWithProfiles;
  if (error) {
    console.log(error);
  }
  return data;
};

export const fetchQuoteFeeds = async () => {
  const quotesWithProfiles = supabase.from("quotes").select(
    `*,
    profiles(
      username,
      full_name
    )
    `
  );
  const { data, error } = await quotesWithProfiles;
  if (error) {
    console.log(error);
  }
  return data;
};
