import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import SidebarItem from "./SidebarItem";

export default async function Sidebar() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();
  const { data, error } = await supabase.from("profiles").select("username").eq("user_id", user?.id)
  if (error) {
    JSON.stringify(error, null, 2);
    return;
  }
  const username = data[0]?.username;

  const sidebarOptions = [
    {
      href: `/${username}`,
      itemName: "Home"
    },
    {
      href: `/${username}/general`,
      itemName: "General",
    },
    {
      href: `/${username}/account`,
      itemName: "Account",
    }, {
      href: `/${username}/location`,
      itemName: "Location"
    },
    {
      href: `/${username}/socials`,
      itemName: "My Socials"
    },
    {
      href: `/${username}/activity`,
      itemName: "My Activity"
    }
  ]
  return (
    <aside className="min-h-[35rem] p-4 w-1/4 bg-red-50">
      <section className="flex flex-col gap-4 justify-start items-center">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          My Profile
        </h3>
        <div className="flex flex-col justify-start items-center gap-4">
          {sidebarOptions.map((item) => {
            return (
              <div key={1}>
                <SidebarItem href={item.href} itemName={item.itemName} />
              </div>
            )
          })}
        </div>
      </section>
    </aside>
  )

}