"use client";

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
import { useState } from "react";
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { GitHubLogoIcon } from "@radix-ui/react-icons"

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const supabase = createClientComponentClient();
  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      alert(JSON.stringify(error, null, 2))
    }

    router.push("/settings");
    router.refresh();
  }

  const handleLoginWithGithub = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `http://localhost:3000/auth/callback/`
      }
    })

    if (error) {
      alert(JSON.stringify(error, null, 2));
    }
  }

  return (
    <div>
      <Card className="w-[350px]">
        <CardHeader className="text-center -mb-8">
          <CardTitle>Log into your Account</CardTitle>
          <CardDescription>Convert your ideas to amazing stories!</CardDescription>
        </CardHeader>
        <CardHeader className="flex gap-2">
          <Button variant={"outline"} onClick={handleLoginWithGithub} className="flex justify-center items-center gap-2">
            <GitHubLogoIcon className="text-lg" />
            <span>Github</span>
          </Button>
          <Button variant={"outline"}>Login using Google</Button>
        </CardHeader>
        <div className="flex justify-center items-center mb-2">
          <div className="text-sm text-slate-300">OR CONTINUE WITH</div>
        </div>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center items-center">
          <Button onClick={handleLogin}>Log in</Button>
        </CardFooter>
      </Card>

    </div>
  )
}

export default LoginForm;