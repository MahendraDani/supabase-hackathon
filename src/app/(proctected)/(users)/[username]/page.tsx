import Sidebar from "@/components/custom/sidebar/Sidebar";
import Image from "next/image";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { QueryData } from "@supabase/supabase-js";
import { cookies } from "next/headers"
import { AspectRatio } from "@/components/ui/aspect-ratio";

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
  const ProfileSidebarOptions = [
    {
      src: "/icons/person.png",
      alt: "User name",
      name: "mahi09"
    },
    {
      src: "/icons/email.png",
      alt: "Email",
      name: "danimahendra0904@gmail.com"
    },
    {
      src: "/icons/person.png",
      alt: "Tag line",
      name: "Tagline here"
    },
    {
      src: "/icons/location.png",
      alt: "City",
      name: "City here"
    },
    {
      src: "/icons/country.png",
      alt: "Country",
      name: "Country here"
    },
    {
      src: "/icons/date.png",
      alt: "Date",
      name: "Date "
    }
  ]
  return (
    <div>
      <div className="mt-6 w-full flex justify-center items-center">
        <div className="w-[85%] flex justify-between items-start gap-8">
          <Sidebar />
          <div className="w-3/4 border-2 border-slate-50 min-h-[35rem] flex flex-col justify-start items-start gap-4">
            <h3 className="p-4 scroll-m-20 text-2xl font-semibold tracking-tight">
              My Profile
            </h3>
            <section className="w-full flex justify-start items-start gap-6">
              <aside className="grow-1 p-4 border-r-[1px] border-slate-100 min-h-[30rem]">
                <div className="flex flex-col justify-start items-start gap-8">
                  <div className="w-full flex flex-col gap-2 justify-center items-center pr-6">
                    <Image src="https://github.com/shadcn.png" className="rounded-full border-4 border-slate-600" width={168} height={168} alt="Profile image" />
                    <p>Mahendra Dani</p>
                  </div>
                  <div className="flex justify-start items-start gap-2 flex-col">
                    {ProfileSidebarOptions.map((item) => {
                      return (
                        <div key={1} >
                          <ProfileSectionItem src={item.src} alt={item.alt} name={item.name} />
                        </div>
                      )
                    })}
                  </div>
                </div>
              </aside>
              <aside className="grow-[3] min-h-[30rem]">Right</aside>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

interface ProfileSectionItemInterface {
  src: string;
  alt: string;
  name: string;
}

const ProfileSectionItem = ({ src, alt, name }: ProfileSectionItemInterface) => {
  return (
    <div className="flex justify-start items-center gap-2 max-w-[20rem]">
      <Image src={src} width={24} height={24} alt={alt} />
      <p>{name}</p>
    </div>
  )
}