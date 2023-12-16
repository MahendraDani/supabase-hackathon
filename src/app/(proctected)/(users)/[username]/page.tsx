import Sidebar from "@/components/custom/sidebar/Sidebar";
import Image from "next/image";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { QueryData } from "@supabase/supabase-js";
import { cookies } from "next/headers"
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";

interface ProfilePageProps {
  params: {
    username: string;
  }
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const ProfileSidebarOptions = [];
  let socials = [];

  const supabase = createServerComponentClient<Database>({ cookies });
  const { data, error } = await supabase.from("profiles").select("*").eq("username", params.username);
  socials.push({
    src: "/icons/linkedin.svg",
    href: data[0].linkedin_url,
    alt: "Linkedin"
  });
  socials.push({
    src: "/icons/github.svg",
    href: data[0].github_url,
    alt: "Github"
  })
  socials.push({
    src: "/icons/medium.svg",
    href: data[0].medium_url,
    alt: "Medium"
  })
  socials.push({
    src: "/icons/twitterx.svg",
    href: data[0].twitter_url,
    alt: "Twitter"
  })
  socials.push({
    src: "/icons/hashnode.svg",
    href: data[0].hashnode_url,
    alt: "Hashnode"
  })

  ProfileSidebarOptions.push(
    {
      src: "/icons/person.png",
      alt: "User name",
      name: data[0].username
    },
  );
  ProfileSidebarOptions.push(
    {
      src: "/icons/tagline-2.png",
      alt: "Tag line",
      name: data[0].tagline,
    },
  )
  ProfileSidebarOptions.push(
    {
      src: "/icons/location.png",
      alt: "City",
      name: data[0].city
    },
  );
  ProfileSidebarOptions.push(
    {
      src: "/icons/country.png",
      alt: "Country",
      name: data[0].country
    },
  )


  return (
    <div>
      <div className="mt-6 w-full flex justify-center items-center">
        <section className="w-full p-4 md:px-8 md:w-[80%] min-h-[35rem] flex flex-col md:flex-row justify-start items-center md:justify-start md:items-start gap-2 md:gap-16 bg-red-50">
          <aside className="md:w-[45rem]">
            <div className="pt-4 pb-2 flex justify-center md:justify-center items-center md:flex-col gap-4">
              <Image src={data[0].avatar_url} className="md:hidden rounded-full border-4 border-slate-600" width={64} height={64} alt="Profile image" />
              <Image src={data[0].avatar_url} className="hidden md:block rounded-full border-4 border-slate-600" width={168} height={168} alt="Profile image" />
              <div>
                <p className="text-xl md:text-lg">Mahendra Dani</p>
                <p className="text-sm md:hidden">Tagline</p>
              </div>
            </div>
            <div className="py-2 flex flex-col justify-center items-center gap-4 md:hidden">
              <h3 className="text-center text-lg font-semibold">About</h3>
              <p className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas rem vel ab sit omnis aspernatur numquam iure earum quasi consequuntur!</p>
            </div>
            <div className="py-2">
              <h3 className="text-center text-lg font-semibold md:hidden pb-2">General</h3>
              <div className="flex flex-col justify-start items-start gap-2">
                {ProfileSidebarOptions.map((item) => {
                  return (
                    <div key={1} >
                      <ProfileSectionItem src={item.src} alt={item.alt} name={item.name} />
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="py-2 md:hidden">
              <h3 className="text-center text-lg font-semibold md:hidden pb-4">Socials</h3>
              <div className="flex justify-center items-center gap-4">
                {socials.map((item) => {
                  return (
                    <div key={1}>
                      <Link href={item.href} target="blank" className="cursor-pointer">
                        <Image src={item.src} width={32} height={32} alt={item.alt} />
                      </Link>
                    </div>
                  )
                })}
              </div>
            </div>
          </aside>

          {/* RIght side */}
          <aside className="hidden md:flex flex-col justify-start items-start gap-4 pt-4">
            <div className="flex justify-start items-start gap-3 flex-col pb-3">
              <h3 className="text-xl font-semibold">About</h3>
              <p>{data[0].about}</p>
            </div>
            <div className="flex justify-start items-start gap-3 flex-col">
              <h3 className="text-xl font-semibold pb-3">Socials</h3>
              <div className="flex flex-col justify-start items-start gap-3">
                {socials.map((item) => {
                  return (
                    <div key={1}>
                      <Link href={item.href} target="blank" className="cursor-pointer">
                        <div className="flex justify-start items-center gap-3">
                          <Image src={item.src} width={24} height={24} alt={item.alt} />
                          <p className="text-[1rem] hover:underline text-slate-600">{item.href}</p>
                        </div>
                      </Link>
                    </div>
                  )
                })}
              </div>
            </div>
          </aside>
        </section>
      </div>
    </div >
  )
}

interface ProfileSectionItemInterface {
  src: string;
  alt: string;
  name: string;
}

const ProfileSectionItem = ({ src, alt, name }: ProfileSectionItemInterface) => {
  return (
    <div className="flex justify-start items-start gap-2 max-w-[20rem]">
      <Image src={src} width={24} height={24} alt={alt} />
      <p>{name}</p>
    </div>
  )
}
