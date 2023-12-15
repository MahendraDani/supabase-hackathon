import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

export default function SettingsPage() {
  async function handleForm(formData: FormData) {
    "use server";
    console.log(formData);
  }
  return (
    <section className="p-2">
      <form action={handleForm} className="flex flex-col md:flex-row md:gap-8 justify-center items-center md:justify-start md:items-start gap-4">
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
              <Input placeholder="Jhon Doe" disabled name="name" />
            </div>
            <div className="w-full flex flex-col justify-start items-start gap-2">
              <Label>Username</Label>
              <Input placeholder="jhon9892" disabled name="username" />
            </div>
            {/* </div> */}
            <div className="w-full flex flex-col justify-start items-start gap-2">
              <Label>Email</Label>
              <Input placeholder="Email here ..." disabled name="email" />
            </div>
            <div className="w-full flex flex-col justify-start items-start gap-2">
              <Label>Password</Label>
              <Input placeholder="Email here ..." disabled name="password" type="password" />
            </div>
            <div className="w-full flex flex-col justify-start items-start gap-2">
              <Label>Tagline</Label>
              <Input placeholder="Tagline here ..." name="tagline" />
            </div>
            <div className="w-full flex flex-col justify-start items-start gap-2">
              <Label>Gender</Label>
              <Select defaultValue="Male" name="gender">
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
            <Label>About</Label>
            <Textarea defaultValue={"Default about here"} name="about" />
          </div>
          <div className="w-full flex flex-col justify-start items-start gap-2">
            <Label>City</Label>
            <Input placeholder="City here ..." name="city" />
          </div>
          <div className="w-full flex flex-col justify-start items-start gap-2">
            <Label>Country</Label>
            <Input placeholder="Country here ..." name="country" />
          </div>
          <div className="w-full flex flex-col justify-start items-start gap-2">
            <Label>Linkedin</Label>
            <Input placeholder="Llinked here ..." name="linkdedin" />
          </div>
          <div className="w-full flex flex-col justify-start items-start gap-2">
            <Label>Twitter</Label>
            <Input placeholder="twitter here ..." name="twitter" />
          </div>
          <div className="w-full  flex flex-col justify-start items-start gap-2">
            <Label>Github</Label>
            <Input placeholder="Github here ..." name="github" />
          </div>
          <div className="w-full flex flex-col justify-start items-start gap-2">
            <Label>Hashnode</Label>
            <Input placeholder="Hashnode here ..." name="hashnode" />
          </div>
          <div className="w-full flex flex-col justify-start items-start gap-2">
            <Label>Medium</Label>
            <Input placeholder="Medium here ..." name="medium" />
          </div>
          <Button type="submit" className="w-full">Update</Button>
        </section>
      </form>
    </section >
  )
}