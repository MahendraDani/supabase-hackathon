"use server";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { cookies } from "next/headers"

export default async function SettingsForm() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: { user } } = await supabase.auth.getUser();
  const { data, error } = await supabase.from("profiles").select("*").eq("user_id", user.id);
  if (error) {
    console.log("Server in fetching profiles data from settings page");
    return;
  }
  const handleForm = async (formData: FormData) => {
    "use server";
    const city = formData.get("city").toString();
    const supabase = createServerComponentClient({ cookies });
    const { data, error } = await supabase
      .from("profiles")
      .update({ city })
      .eq("user_id", user.id);
    if (error) {
      console.log("err in updating");
    }
    console.log("SUCCESS _-------------------------------");
    console.log(data);
    console.log("Happy?");
  };

  return (
    <section className="p-2">
      <form className="flex flex-col md:flex-row md:gap-8 justify-center items-center md:justify-start md:items-start gap-4">
        <section className="w-full md:w-1/2">
          <h2 className="text-center md:text-left mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            Profile Settings
          </h2>
          <div className="relative flex justify-center items-center md:items-start md:justify-start">
            <Image src={"https://github.com/MahendraDani.png"} width={164} height={164} className="md:relative rounded-full border-4 border-slate-400" alt="Profile image" />
            <button className="p-1 absolute bottom-8 md:hidden md:bottom-3 right-20 md:right-80 bg-white rounded-full border-2 border-slate-500">
              <Image src={"/icons/edit.svg"} width={24} height={24} alt="Edit icon" />
            </button>
          </div>
          <div className="mt-3 flex flex-col justify-between items-start gap-5">
            <div className="w-full flex flex-col justify-start items-start gap-2">
              <Label>Name</Label>
              <Input placeholder="Jhon Doe" disabled name="name" defaultValue={data[0].full_name} />
            </div>
            <div className="w-full flex flex-col justify-start items-start gap-2">
              <Label>Username</Label>
              <Input placeholder="jhon9892" disabled name="username" defaultValue={data[0].username} />
            </div>
            {/* </div> */}
            {/* <div className="w-full flex flex-col justify-start items-start gap-2">
              <Label>Email</Label>
              <Input placeholder="Email here ..." disabled name="email" />
            </div> */}
            {/* <div className="w-full flex flex-col justify-start items-start gap-2">
              <Label>Password</Label>
              <Input placeholder="Email here ..." disabled name="password" type="password" />
            </div> */}
            <div className="w-full flex flex-col justify-start items-start gap-2">
              <Label>About</Label>
              <Textarea defaultValue={data[0].about} name="about" placeholder="I am ...." />
            </div>
            <div className="w-full flex flex-col justify-start items-start gap-2">
              <Label>Tagline</Label>
              <Input placeholder="Tagline here ..." name="tagline" defaultValue={data[0].tagline} />
            </div>
            <div className="w-full flex flex-col justify-start items-start gap-2">
              <Label>Gender</Label>
              <Select defaultValue={data[0].gender} name="gender">
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Male" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Others">Others</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>
        <section className="w-full md:mt-6 md:w-1/2 flex flex-col justify-start items-start gap-4">

          <div className="w-full flex flex-col justify-start items-start gap-2">
            <Label>City</Label>
            <Input placeholder="Your city" name="city" defaultValue={data[0].city} />
          </div>
          <div className="w-full flex flex-col justify-start items-start gap-2">
            <Label>Country</Label>
            <Input placeholder="Your country" name="country" defaultValue={data[0].country} />
          </div>
          <div className="w-full flex flex-col justify-start items-start gap-2">
            <Label>Linkedin</Label>
            <Input name="linkdedin" defaultValue={data[0].linkedin_url} />
          </div>
          <div className="w-full flex flex-col justify-start items-start gap-2">
            <Label>Twitter</Label>
            <Input placeholder="Your twitter(X) profile" name="twitter" defaultValue={data[0].twitter_url} />
          </div>
          <div className="w-full  flex flex-col justify-start items-start gap-2">
            <Label>Github</Label>
            <Input placeholder="Your github profile" name="github" defaultValue={data[0].github_url} />
          </div>
          <div className="w-full flex flex-col justify-start items-start gap-2">
            <Label>Hashnode</Label>
            <Input placeholder="Your hashnode profile" name="hashnode" defaultValue={data[0].hashnode_url} />
          </div>
          <div className="w-full flex flex-col justify-start items-start gap-2">
            <Label>Medium</Label>
            <Input placeholder="Your medium profile" name="medium" defaultValue={data[0].medium_url} />
          </div>
          <Button type="submit" className="w-full">Update</Button>
        </section>
      </form>
    </section >
  )
}