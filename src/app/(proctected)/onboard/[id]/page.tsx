"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { z } from "zod";

interface PageProps {
  params: {
    id: string;
  }
}
const onboardingFormSchema = z.object({
  fullName: z.string().min(3, { message: "Name must be atleast 3 characters long" }),
  username: z.string().min(6, { message: "Username must be atleast 6 characters long" })
})

export default function OnboardingPage({ params }: PageProps) {
  const { toast } = useToast()
  const [fullName, setfullName] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [isFullNameError, setIsFullNameError] = useState(false);
  const [fullNameErrorMessage, setFullNameErorrMessage] = useState("");
  const [isUsernameError, setIsUsernameError] = useState(false);
  const [usernameErrorMessage, SetUserNameErrorMessage] = useState("");



  const handleFormSubmit = async () => {

    if (!fullName || !username || !gender) {
      toast({
        title: "Incorrect details",
        description: "All fields are required",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
      return;
    }


    const parsedInput = onboardingFormSchema.safeParse({ fullName, username });
    if (!parsedInput.success) {
      const parsedErrors = parsedInput.error.issues;
      parsedErrors.forEach((e) => {
        console.log(e.path[0]);
        if (e.path[0] === "fullName") {
          setIsFullNameError(true);
          setFullNameErorrMessage(e.message)
        } else if (e.path[0] === "username") {
          setIsUsernameError(true);
          SetUserNameErrorMessage(e.message)
        }
      })
      return;
    }


    const supabase = createClientComponentClient();
    const { data, error } = await supabase.from("profiles").insert([{
      user_id: params.id, full_name: fullName, username: username, gender
    }]);

    if (error) {
      // TODO : handle error when username is not unique
      if (error.code === "23505") {
        toast(
          {
            title: "username already taken",
            description: "The username is already taken by someone please try any other username",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          }
        )
      }

      return;
    }
    alert("Yay, profile created")
    // TODO : redirect user to home page instead
  }
  return (
    <>
      <div className="w-full min-h-[40rem] flex justify-center items-center">
        <Card >
          <CardHeader className="text-center">
            <CardTitle>Create Profile</CardTitle>
            <CardDescription>Others will be able to see the following profile details</CardDescription>
          </CardHeader>
          <CardContent>
            <form >
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Jhon Doe" onChange={e => setfullName(e.target.value)} />
                  {isFullNameError && <span className="text-red-400 text-sm">{fullNameErrorMessage}</span>}

                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" placeholder="jhondoe@13" onChange={e => setUsername(e.target.value)} />
                  {isUsernameError && <span className="text-red-400 text-sm">{usernameErrorMessage}</span>}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="gender">Gender</Label>
                  <Select onValueChange={(value) => { setGender(value) }}>
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
            </form>

          </CardContent>
          <CardFooter className="flex justify-center items-center">
            <Button onClick={handleFormSubmit}>Create</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}


// Aim of this test is to insert the user name of the logged in user and it's user id