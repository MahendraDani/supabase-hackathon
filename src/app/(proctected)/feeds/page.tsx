// "use client";
// import Feeds from "@/components/custom/feeds/Feed";
// import FeedsCard from "@/components/custom/feeds/FeedCard";
// import { Intruder } from "@/components/custom/unauthorized/intruder";
// import { Button } from "@/components/ui/button"
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import { useEffect, useState } from "react";

import Feeds from "@/components/custom/feeds/Feed";
import { fetchStoryFeeds } from "@/lib/data/feed";

// const FeedsPage = () => {
//   const [isActiveSession, setIsActiveSession] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const validateUser = async () => {

//     const supabase = createClientComponentClient();
//     const { data: { user }, error } = await supabase.auth.getUser();
//     if (error) {
//       JSON.stringify(error);
//       // return;
//     }
//     if (user) {
//       setIsActiveSession(true)
//     }
//     setIsLoading(false);
//   }
//   useEffect(() => {
//     setIsLoading(true);
//     validateUser()
//   }, [isActiveSession])

//   return (
//     <div>
//       {isLoading ? <div className="text-4xl text-red-800"> STILL LOADING</div> :
//         isActiveSession ?
//           <section className="w-full p-16 flex justify-center items-center">
//             <Feeds />
//             {/* <FeedsCard /> */}
//           </section>
//           : <Intruder />}
//     </div>
//   )
// }
// export default FeedsPage;

export default async function FeedsPageNew() {
  return (
    <div className="w-full flex justify-center items-center p-16">
      < Feeds />
    </div >
  )
}
