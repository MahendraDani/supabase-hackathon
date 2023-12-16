import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { QueryData } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export const fetchStoryFeeds = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data, error } = await supabase
    .from("stories")
    .select(
      `*,
    profiles(
      username,
      full_name
    )
    `
    )
    .eq("is_published", true);
  if (error) {
    // console.log(error);
    console.log("Error from story fetch");
  }
  return data;
};

export const fetchPoemFeeds = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data, error } = await supabase
    .from("poems")
    .select(
      `
    *,
    profiles(
      username,
      full_name
    )
    `
    )
    .eq("is_published", true);
  if (error) {
    // console.log(error);
    console.log("Error from poem fetch");
  }
  return data;
};

export const fetchQuoteFeeds = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data, error } = await supabase
    .from("quotes")
    .select(
      `*,
    profiles(
      username,
      full_name
    )
    `
    )
    .eq("is_published", true);
  if (error) {
    // console.log(error);
    console.log("Error from quote fetch");
  }
  return data;
};
