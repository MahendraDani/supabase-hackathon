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

interface PageProps {
  params: {
    id: string;
  }
}
export default function ({ params }: PageProps) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  const handleFormSubmit = async () => {
    // TODO : insert user name and user id of this user in profiles table
    const supabase = createClientComponentClient();
    const { data, error } = await supabase.from("profiles").insert([{
      user_id: params.id, full_name: name, username: username
    }]);

    if (error) {
      alert(JSON.stringify(error, null, 2));

      // Error : when input username is not unique 
      // CODE : 23505
      // message : duplicate key values violate unique constraint 
      return;
    }
    console.log(data);
  }
  return (
    <>
      <div className="w-full min-h-[40rem] flex justify-center items-center">
        {/* <form onSubmit={handleFormSubmit} className="flex flex-col gap-2">
          <Input id="full name" placeholder="Please write your name" onChange={e => setName(e.target.value)} />
          <Input id="user name" placeholder="Please write your user name" onChange={e => setUsername(e.target.value)} />
          <Button type="submit">Submit</Button>
        </form> */}

        <Card >
          <CardHeader className="text-center">
            <CardTitle>Create Profile</CardTitle>
            <CardDescription>Others will be able to see the following profile details</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Jhon Doe" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" placeholder="jhondoe@13" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="gender">Gender</Label>
                  <Select>
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
            <Button>Create</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}

// Aim of this test is to insert the user name of the logged in user and it's user id