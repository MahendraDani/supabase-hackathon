

import Feeds from "@/components/custom/feeds/Feed";
import { fetchStoryFeeds } from "@/lib/data/feed";


export default async function FeedsPageNew() {
  return (
    <div className="w-full flex justify-center items-center p-16">
      < Feeds />
    </div >
  )
}
